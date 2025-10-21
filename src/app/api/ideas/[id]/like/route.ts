import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const supabase = await createClient();

    // Get the current logged-in user from the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing ideaId" }, { status: 400 });
    }

    // Call toggle_like function in Supabase
    const { error } = await supabase.rpc("toggle_like", { idea_id: id });
    if (error) throw error;

    // Optionally, fetch updated likes count
    const { data: ideaData, error: fetchError } = await supabase
      .from("ideas")
      .select("likes")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    return NextResponse.json({ message: "Like toggled successfully", likes: ideaData.likes });
  } catch (err: any) {
    console.error("Error toggling like:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
