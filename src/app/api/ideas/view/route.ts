import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { ideaId } = await req.json();

    // Increment view count
    const { error } = await supabase.rpc("increment_view_count", {
      idea_id: ideaId,
    });

    if (error) throw error;

    // Get updated view count
    const { data: idea, error: countError } = await supabase
      .from("ideas")
      .select("view_count")
      .eq("id", ideaId)
      .single();

    if (countError) throw countError;

    return NextResponse.json({
      message: "View count incremented successfully",
      viewCount: idea.view_count,
    });
  } catch (error: any) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
