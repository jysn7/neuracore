import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { comment_id } = await req.json();

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ message: "Comment deleted!" });
}
