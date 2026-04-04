import React from "react";

interface TechStackTagsProps {
  tags: string[];
}

export default function TechStackTags({ tags }: TechStackTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-slate-300 font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
