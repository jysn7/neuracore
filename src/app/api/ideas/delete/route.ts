import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { id } = await req.json();

  const { data, error } = await supabase
    .from("ideas")
    .delete()
    .eq("id", id)
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ deleted: data[0] });
}
