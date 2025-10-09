import { NextResponse } from "next/server";
import { supabase } from "../../../supabase-client";

export async function POST(req: Request) {
  const { ideaId, userId } = await req.json();

  const { data, error } = await supabase.rpc("toggle_like", {
    idea_id: ideaId,
    user_id: userId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
