import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

const categories = ["General", "Tech", "Health", "Education", "Finance"];

export async function POST(req: NextRequest) {
  try {
    // Create Supabase client with cookie-based session
    const supabase = await createClient();
    
    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        {
          error: "Authentication required",
          code: "AUTH_REQUIRED",
        },
        { status: 401 }
      );
    }

    const author = user.id;
    
    const formData = await req.formData();

    // Get and validate fields from form data with defaults
    const title = (formData.get("title") as string) || "Untitled Idea";
    const summary = (formData.get("summary") as string) || "No summary provided";
    const content = (formData.get("content") as string) || "";
    let category = (formData.get("category") as string) || "General";
    // Ensure category is valid, fallback to "General" if invalid
    if (!categories.includes(category)) {
      category = "General";
    }
    const tags = formData.get("tags")?.toString().split(",").filter(Boolean) || [];
    const coverImg = formData.get("coverImg") as File | null;

    // Only validate content since we have defaults for other fields
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    let coverImgUrl: string | null = null;

    // Handle cover image upload
    if (coverImg && coverImg instanceof File) {
      const filePath = `idea-covers/${Date.now()}-${coverImg.name}`;

      const { error: uploadError } = await supabase.storage
        .from("idea-covers")
        .upload(filePath, coverImg);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("idea-covers")
        .getPublicUrl(filePath);

      coverImgUrl = publicUrlData.publicUrl;
    }

    // Validate required fields for RLS policy
    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Ensure author is set and matches authenticated user
    if (!author || author !== user.id) {
      return NextResponse.json(
        { error: "Invalid author - must match authenticated user" },
        { status: 403 }
      );
    }

    // Insert idea into database using authenticated client
    const { data, error } = await supabase
      .from("ideas")
      .insert([
        {
          author: user.id,
          title: title.trim(),
          summary: summary?.trim() || null,
          content: content.trim(),
          tags: tags.filter((tag: string) => tag.trim()),
          category: category.trim(),
          cover_img: coverImgUrl
          // Let the database handle created_at with default value
        },
      ])
      .select('*');

    if (error) {
      console.error("Database error:", error);
      if (error.code === '42501') {
        return NextResponse.json(
          { error: "Permission denied - RLS policy violation" },
          { status: 403 }
        );
      }
      throw error;
    }

    return NextResponse.json({ message: "Idea created!", data });
  } catch (error: any) {
    console.error("Error creating idea:", error);
    // Add specific error handling for common RLS violations
    if (error.code === 'PGRST301') {
      return NextResponse.json(
        { error: "Row-level security policy violation" },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create idea" },
      { status: 500 }
    );
  }
}
