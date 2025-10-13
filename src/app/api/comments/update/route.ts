// import { NextResponse } from "next/server";
// import { supabase } from "@/app/supabase-client";

// export async function PATCH(req: Request) {
//   const { comment_id, content } = await req.json();

//   const { data, error } = await supabase
//     .from("comments")
//     .update({ content })
//     .eq("id", comment_id);

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });
//   return NextResponse.json({ message: "Comment updated!", data });
// }
