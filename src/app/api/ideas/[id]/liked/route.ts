import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      return NextResponse.json({ liked: false }, { status: 200 });
    }
    const userId = session.user.id;

    const { id } = params;
    if (!id) return NextResponse.json({ liked: false }, { status: 400 });

    // Check if the user liked this idea
    const { data, error } = await supabase
      .from("idea_likes")
      .select("*")
      .eq("idea_id", id)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; 

    return NextResponse.json({ liked: !!data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ liked: false }, { status: 500 });
  }
}
