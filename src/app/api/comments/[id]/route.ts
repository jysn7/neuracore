// import { NextResponse } from "next/server";
// import { supabase } from "@/app/supabase-client";

// export async function GET(req: Request, { params }: { params: { idea_id: string } }) {
//   const { data, error } = await supabase
//     .from("comments")
//     .select("*")
//     .eq("idea_id", params.idea_id)
//     .order("created_at", { ascending: true });

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });
//   return NextResponse.json({ data });
// }
