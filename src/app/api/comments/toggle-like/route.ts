import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { comment_id, user_id, type } = await req.json();

  const { data, error } = await supabase.rpc("toggle_comment_reaction", {
    comment_id,
    user_id,
    reaction_type: type
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ message: "Reaction toggled!", data });
}
