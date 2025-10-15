import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { comment_id, content } = await req.json();

  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", comment_id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ message: "Comment updated!", data });
}
