import { Highlight } from "@/types/experience";

export default function HighlightCard({ title, description }: Highlight) {
  return (
    <div className="h-full glass p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(99,102,241,0.2)] hover:border-primary/30">
      {/* Top accent bar */}
      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mb-3" />
      <h4 className="text-base font-semibold text-white mb-2 leading-tight">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{description}</p>
    </div>
  );
}
