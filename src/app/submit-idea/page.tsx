"use client";
import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import TagsInput from '@/components/Tags/TagsInput'; 
import TiptapEditor from '@/components/submitIdea/TiptapEditor';

const SubmitIdeaPage = () => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState("");

  return (
    <main className="p-8 text-white py-8 px-[8vw] md:px-[16vw] bg-[#141414] min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Submit Idea</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-bg-dark border-2 border-dashed border-border-secondary rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-500 transition-colors">
            <UploadCloud size={48} className="text-gray-500 mb-4" />
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-sm text-text-secondary">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

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
        
        <div className="space-y-6">
          <TagsInput />
          
          <button className="w-full bg-btn-primary hover:bg-btn-primary-hover cursor-pointer text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Submit
          </button>
        </div>

      </div>
    </main>
  );
};

export default SubmitIdeaPage;