"use client";
import React, { useState } from "react";

interface TagsInputProps {
  value: string[]; // tags from parent
  onChange: (tags: string[]) => void; // callback to update parent
}

const TagsInput: React.FC<TagsInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.startsWith("#")
        ? inputValue.trim()
        : `#${inputValue.trim()}`;
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="bg-bg-dark border border-border-secondary rounded-lg p-4 h-64">
      <h3 className="font-semibold mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {value.map((tag) => (
          <div
            key={tag}
            className="bg-bg-gray text-text-primary text-sm font-medium px-3 py-1 rounded flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-text-secondary hover:text-text-primary"
            >
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
        placeholder="Enter a tag"
        className="w-full bg-bg-gray border placeholder:text-text-secondary border-btn-secondary-hover rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-brand-red"
      />
      <p className="text-xs text-text-secondary mt-2">
        Press Enter to add a tag.
      </p>
    </div>
  );
};

export default TagsInput;
