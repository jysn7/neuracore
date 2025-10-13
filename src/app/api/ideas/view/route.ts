// import { NextResponse } from "next/server";
// import { supabase } from "../../../supabase-client";

// export async function POST(req: Request) {
//   const { ideaId } = await req.json();

//   const { error } = await supabase.rpc("increment_view_count", { idea_id: ideaId });
//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json({ success: true });
// }
