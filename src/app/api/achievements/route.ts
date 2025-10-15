import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user's achievements
    const { data: achievements, error } = await supabase
      .from("user_achievements")
      .select(
        `
        *,
        achievement:achievements(*)
      `,
      )
      .eq("user_id", user.id);

    if (error) throw error;

    // Get all available achievements
    const { data: allAchievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*");

    if (achievementsError) throw achievementsError;

    // Calculate progress and format response
    const formattedAchievements = allAchievements.map((achievement) => {
      const userAchievement = achievements?.find(
        (ua) => ua.achievement_id === achievement.id,
      );
      return {
        ...achievement,
        unlocked: Boolean(userAchievement),
        unlockedAt: userAchievement?.unlocked_at || null,
      };
    });

    return NextResponse.json({ achievements: formattedAchievements });
  } catch (error: any) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Function to check and award achievements
export async function checkAndAwardAchievements(userId: string) {
  const supabase = await createClient();

  try {
    // Get user stats using proper count aggregation
    const { data: stats, error: statsError } = await supabase
      .from("profiles")
      .select(`
        id,
        ideas_count:ideas(count),
        likes_count:idea_likes(count),
        comments_count:comments(count)
      `)
      .eq("id", userId)
      .single();

    if (statsError) throw statsError;

    // Extract counts from the response
    const ideasCount = stats?.ideas_count?.[0]?.count ?? 0;
    const likesCount = stats?.likes_count?.[0]?.count ?? 0;
    const commentsCount = stats?.comments_count?.[0]?.count ?? 0;

    // Define achievement conditions with proper count values
    const achievements = [
      {
        id: "first_idea",
        condition: ideasCount >= 1,
        points: 10,
      },
      {
        id: "popular_idea",
        condition: likesCount >= 100,
        points: 50,
      },
      {
        id: "active_commenter",
        condition: commentsCount >= 50,
        points: 30,
      },
    ];

    // Check and award achievements
    for (const achievement of achievements) {
      if (achievement.condition) {
        const { error } = await supabase.from("user_achievements").upsert(
          {
            user_id: userId,
            achievement_id: achievement.id,
            unlocked_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,achievement_id",
          },
        );

        if (error) throw error;
      }
    }
  } catch (error) {
    console.error("Error checking achievements:", error);
    throw error;
  }
}
