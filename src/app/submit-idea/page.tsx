// src/app/submit-idea/page.tsx
"use client";
import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import TagsInput from '@/components/TagsInput'; // We will create this next

const SubmitIdeaPage = () => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <main className="p-8 text-white bg-[#141414] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Submit Idea</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Image Upload */}
          <div className="bg-[#1C1C1C] border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-500 transition-colors">
            <UploadCloud size={48} className="text-gray-500 mb-4" />
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            placeholder="Idea Title"
            className="w-full bg-[#1C1C1C] border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Subtitle Input */}
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle or a short pitch"
            className="w-full bg-[#1C1C1C] border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Description Textarea */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of your idea..."
            rows={10}
            className="w-full bg-[#1C1C1C] border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Right Column (Tags and Submit Button) */}
        <div className="space-y-6">
          <TagsInput />
          
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Submit
          </button>
        </div>

      </div>
    </main>
  );
};

export default SubmitIdeaPage;