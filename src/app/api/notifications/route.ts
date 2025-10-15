import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get notifications
    const { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient();
    const { notificationIds } = await req.json();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Mark notifications as read
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("id", notificationIds)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ message: "Notifications marked as read" });
  } catch (error: any) {
    console.error("Error updating notifications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
