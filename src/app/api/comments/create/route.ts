import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { idea_id, content } = await req.json();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Begin transaction
    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .insert([
        {
          idea_id,
          author: user.id,
          content,
          created_at: new Date().toISOString(),
        },
      ])
      .select(
        `
        *,
        author:profiles(id, username, avatar_url)
      `,
      )
      .single();

    if (commentError) throw commentError;

    // Increment comment count on the idea
    const { error: updateError } = await supabase
      .from("ideas")
      .update({
        comments_count: supabase.rpc("increment_counter", {
          row_id: idea_id,
          counter_name: "comments_count",
        }),
      })
      .eq("id", idea_id);

    if (updateError) throw updateError;

    // Create notification for idea author
    const { data: idea } = await supabase
      .from("ideas")
      .select("author")
      .eq("id", idea_id)
      .single();

    if (idea && idea.author !== user.id) {
      await supabase.from("notifications").insert([
        {
          user_id: idea.author,
          type: "new_comment",
          content: `${user.email} commented on your idea`,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    return NextResponse.json({
      message: "Comment created successfully!",
      data: comment,
    });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
