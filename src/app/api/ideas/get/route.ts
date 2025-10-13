// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function GET() {
//   const supabase = createRouteHandlerClient({ cookies });

//   const { data: ideas, error } = await supabase
//     .from("ideas")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }

//   return new Response(JSON.stringify(ideas), { status: 200 });
// }
