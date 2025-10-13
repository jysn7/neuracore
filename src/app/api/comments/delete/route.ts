// import { NextResponse } from "next/server";
// import { supabase } from "@/app/supabase-client";

// export async function DELETE(req: Request) {
//   const { comment_id } = await req.json();

//   const { error } = await supabase
//     .from("comments")
//     .delete()
//     .eq("id", comment_id);

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });
//   return NextResponse.json({ message: "Comment deleted!" });
// }
