// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const supabase = createRouteHandlerClient({ cookies });

//   const { data: idea, error } = await supabase
//     .from("ideas")
//     .select("*")
//     .eq("id", params.id)
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }

//   return new Response(JSON.stringify(idea), { status: 200 });
// }
