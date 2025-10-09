import { NextResponse } from "next/server";
import { supabase } from "../../../supabase-client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const author = formData.get("author") as string;
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags")?.toString().split(",") || [];
    const coverImg = formData.get("coverImg") as File | null;

    let coverImgUrl: string | null = null;

    if (coverImg) {
      const filePath = `idea-covers/${Date.now()}-${coverImg.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("idea-covers")
        .upload(filePath, coverImg);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("idea-covers")
        .getPublicUrl(filePath);

      coverImgUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase.from("ideas").insert([
      {
        author,
        title,
        summary,
        content,
        tags,
        category,
        cover_img: coverImgUrl,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Idea created!", data });
  } catch (error: any) {
    console.error("Error creating idea:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
