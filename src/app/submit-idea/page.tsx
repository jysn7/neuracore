"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import TagsInput from "@/components/Tags/TagsInput";
import TiptapEditor from "@/components/submitIdea/TiptapEditor";
import { supabase } from "@/app/supabase-client";

interface User {
  id: string;
  email: string;
  full_name: string;
}

const categories = ["General", "Tech", "Health", "Education", "Finance"];

const SubmitIdeaPage = () => {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImg, setCoverImg] = useState<File | null>(null);
  const [category, setCategory] = useState("General");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users for collaborator selection
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("id, email, full_name");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
    };
    fetchUsers();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImg(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!ideaTitle || !content) {
      alert("Title and Content are required");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", ideaTitle);
    formData.append("summary", subtitle);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags.join(","));
    formData.append("collaborators", collaborators.join(",")); // send as CSV
    if (coverImg) formData.append("coverImg", coverImg);

    try {
      const res = await fetch("/api/ideas/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        alert("Error creating idea: " + data.error);
      } else {
        alert("Idea created successfully!");
        // Reset form
        setIdeaTitle("");
        setSubtitle("");
        setContent("");
        setTags([]);
        setCoverImg(null);
        setCategory("General");
        setCollaborators([]);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your idea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 text-white py-8 px-[8vw] md:px-[16vw] bg-[#141414] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Submit Idea</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <label className="bg-bg-dark border-2 border-dashed border-border-secondary rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-500 transition-colors">
            <UploadCloud size={48} className="text-gray-500 mb-4" />
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-sm text-text-secondary">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {coverImg && <p className="text-sm text-gray-300">{coverImg.name}</p>}

          <input
            type="text"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-bg-dark border border-border-secondary rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />

          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
            className="w-full bg-bg-dark border border-border-secondary rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />

          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <TagsInput value={tags} onChange={setTags} />

          {/* Category Selector */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-bg-dark border border-border-secondary rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Collaborators Multi-Select */}
          <div className="bg-bg-dark border border-border-secondary rounded-lg p-4">
            <label className="block mb-2 text-gray-400 text-sm">
              Collaborators
            </label>
            <select
              multiple
              value={collaborators}
              onChange={(e) =>
                setCollaborators(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full bg-bg-dark border-none focus:outline-none text-white"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name || user.email}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-btn-primary hover:bg-btn-primary-hover cursor-pointer text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SubmitIdeaPage;
