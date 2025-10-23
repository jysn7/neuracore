import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

interface Params {
  params: { ideaId: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const supabase = await createClient();
    const { ideaId } = params;
    if (!ideaId) {
      return NextResponse.json({ error: "Missing ideaId" }, { status: 400 });
    }

    // Fetch all comments for this idea
    const { data: comments, error } = await supabase
      .from("comments")
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url)
      `)
      .eq("idea_id", ideaId)
      .order("created_at", { ascending: false }); 

    if (error) throw error;

    return NextResponse.json({ comments });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
