import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: idea, error } = await supabase
    .from("ideas")
    .select(`
      *,
      author:profiles(id, username, avatar_url),
      comments:comments(count),
      likes
    `)
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!idea) {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }


  return NextResponse.json(idea, { status: 200 });
}
 