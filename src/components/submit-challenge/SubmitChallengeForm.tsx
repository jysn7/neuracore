"use client";
import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

const SubmitChallengeForm = () => {
  const [tags, setTags] = useState<string[]>(['AI', 'Healthcare']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Create an Innovation Challenge</h2>
      <p className="text-gray-500 text-sm mt-2 mb-6">Post a challenge for innovators to solve. Provide clear requirements and attractive incentives.</p>
      
      <form className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company/Organization Name *</label>
          <input type="text" id="company-name" placeholder="Enter your company or organization name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>

        {/* Challenge Title */}
        <div>
          <label htmlFor="challenge-title" className="block text-sm font-medium text-gray-700">Challenge Title *</label>
          <input type="text" id="challenge-title" placeholder="Enter a compelling challenge title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>

        {/* Category & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
            <select id="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
              <option>Select a category</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty Level *</label>
            <select id="difficulty" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
              <option>Select difficulty</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Challenge Description *</label>
          <textarea id="description" rows={4} placeholder="Describe the challenge in detail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Challenge Objectives *</label>
          <textarea id="objectives" rows={4} placeholder="What are the main goals of this challenge?" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements & Deliverables *</label>
          <textarea id="requirements" rows={4} placeholder="List the specific requirements and expected deliverables" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>

        {/* Prize & Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="prize" className="block text-sm font-medium text-gray-700">Prize / Reward *</label>
            <input type="text" id="prize" placeholder="e.g., $10,000 or Job Opportunity" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div className="relative">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Submission Deadline *</label>
            <input type="text" id="deadline" placeholder="mm/dd/yyyy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
            <CalendarIcon className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex items-center mt-1">
            <input 
              type="text" 
              id="tags" 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add relevant tags (press Enter)" 
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" 
            />
            <button type="button" onClick={handleAddTag} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md border border-l-0 border-gray-300 hover:bg-gray-300">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div key={tag} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                {tag}
                <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-800">&times;</button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm">
            Cancel
          </button>
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm">
            Submit Challenge
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitChallengeForm;