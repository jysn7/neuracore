// src/components/TagsInput.tsx
"use client";
import React, { useState } from 'react';

const TagsInput = () => {
  const [tags, setTags] = useState<string[]>(['#innovation', '#tech']);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.startsWith('#') ? inputValue.trim() : `#${inputValue.trim()}`;
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-4 h-full">
      <h3 className="font-semibold mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <div key={tag} className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-white">
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter"
        className="w-full bg-[#2A2A2A] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
      <p className="text-xs text-gray-500 mt-2">Start with '#' to see tag suggestions.</p>
    </div>
  );
};

export default TagsInput;