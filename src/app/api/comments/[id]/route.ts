import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("idea_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}
