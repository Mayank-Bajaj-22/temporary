import React from 'react';
import { siteConfig } from '../../config/site';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#B69A63] text-[#281A10] text-xs font-medium tracking-wider uppercase py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-80 hidden sm:inline" />
        <span className="truncate">{siteConfig.announcement}</span>
      </div>
    </div>
  );
}
