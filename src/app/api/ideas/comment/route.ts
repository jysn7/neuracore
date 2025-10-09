// import { NextResponse } from "next/server";
// import { supabase } from "../../../supabase-client";

// export async function POST(req: Request) {
//   const { ideaId, commentId } = await req.json();

//   const { error } = await supabase
//     .from("ideas")
//     .update({ comments: supabase.raw(`array_append(comments, '${commentId}')`) })
//     .eq("id", ideaId);

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json({ success: true });
// }
