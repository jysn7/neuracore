// import { NextResponse } from "next/server";
// import { supabase } from "@/app/supabase-client";

// export async function POST(req: Request) {
//   const { idea_id, author, content } = await req.json();

//   const { data, error } = await supabase
//     .from("comments")
//     .insert([{ idea_id, author, content }]);

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });
//   return NextResponse.json({ message: "Comment created!", data });
// }
