
// import { NextResponse } from "next/server";
// import { supabase } from "@/app/supabase-client";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     // Get the currently logged-in user
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (!user || userError) {
//       return NextResponse.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const author = user.id;

//     // Get fields from form data
//     const title = formData.get("title") as string;
//     const summary = formData.get("summary") as string;
//     const content = formData.get("content") as string;
//     const category = formData.get("category") as string;
//     const tags = formData.get("tags")?.toString().split(",") || [];
//     const coverImg = formData.get("coverImg") as File | null;

//     let coverImgUrl: string | null = null;

//     // Handle cover image upload
//     if (coverImg && coverImg instanceof File) {
//       const filePath = `idea-covers/${Date.now()}-${coverImg.name}`;

//       const { error: uploadError } = await supabase.storage
//         .from("idea-covers")
//         .upload(filePath, coverImg);

//       if (uploadError) throw uploadError;

//       const { data: publicUrlData } = supabase.storage
//         .from("idea-covers")
//         .getPublicUrl(filePath);

//       coverImgUrl = publicUrlData.publicUrl;
//     }

//     // Insert idea into database
//     const { data, error } = await supabase.from("ideas").insert([
//       {
//         author,
//         title,
//         summary,
//         content,
//         tags,
//         category,
//         cover_img: coverImgUrl,
//         likers: [],
//         collaborators: [],
//         comments: [],
//         share_count: 0,
//         view_count: 0,
//       },
//     ]);

//     if (error) throw error;

//     return NextResponse.json({ message: "Idea created!", data });
//   } catch (error: any) {
//     console.error("Error creating idea:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
