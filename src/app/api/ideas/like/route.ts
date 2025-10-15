import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { ideaId } = await req.json();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Call the toggle_like function
    const { error } = await supabase.rpc("toggle_like", { idea_id: ideaId });

    if (error) throw error;

    // Get updated like count and status
    const { data: idea, error: ideaError } = await supabase
      .from("ideas")
      .select(
        `
        likes,
        liked:idea_likes!inner(user_id)
      `,
      )
      .eq("id", ideaId)
      .single();

    if (ideaError) throw ideaError;

    return NextResponse.json({
      message: "Like toggled successfully",
      likes: idea.likes,
      isLiked: Boolean(idea.liked),
    });
  } catch (error: any) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
