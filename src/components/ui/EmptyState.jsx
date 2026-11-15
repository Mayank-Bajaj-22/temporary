import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Compass,
  title = "No products found",
  description = "We couldn't find any handcrafted pieces matching your current filters or search term.",
  actionLabel = "Reset Filters",
  onAction,
  actionTo,
}) {
  return (
    <div className="py-16 sm:py-24 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#E8E3D9]/60 flex items-center justify-center text-[#76501F]">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="font-serif text-2xl text-[#29251F] mb-2">{title}</h3>
      <p className="text-sm text-[#777166] leading-relaxed mb-6 font-sans">
        {description}
      </p>
      {(onAction || actionTo) && (
        <Button
          variant="secondary"
          size="md"
          onClick={onAction}
          to={actionTo}
          icon={RotateCcw}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
