import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;

  try {
    // Fetch the current view count
    const { data: idea, error: fetchError } = await supabase
      .from("ideas")
      .select("view_count")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching idea:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Increment locally
    const newViewCount = (idea.view_count || 0) + 1;

    // Update the idea
    const { error: updateError } = await supabase
      .from("ideas")
      .update({ view_count: newViewCount })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating view count:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ view_count: newViewCount });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




// function version doesnt work being table name in function isnt passed as a parameter so it is null
// import { NextResponse } from "next/server";
// import { createClient } from "@/app/lib/supabase/server"; 

// export async function POST(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const supabase = await createClient();
//   const { id } = params;

//   try {
//     const { data, error } = await supabase.rpc("increment_counter", {
//       row_id: id,
//       counter_name: "view_count",
//     });

//     if (error) {
//       console.error("Error incrementing view count:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ view_count: data });
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
