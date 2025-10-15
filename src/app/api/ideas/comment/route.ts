import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { ideaId, commentId } = await req.json();

  // Increment the comments count
  const { data, error } = await supabase
    .from("ideas")
    .update({ comments: supabase.rpc('increment') })
    .eq("id", ideaId)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
