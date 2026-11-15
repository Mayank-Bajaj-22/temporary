import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center', // 'center' | 'left'
  linkTo,
  linkLabel,
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase mb-2.5">
          {eyebrow}
        </p>
      )}

      <div className={`flex flex-col ${isCenter ? 'items-center' : 'sm:flex-row sm:items-end sm:justify-between'} gap-4`}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight text-[#29251F]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[#777166] max-w-2xl leading-relaxed font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {linkTo && linkLabel && (
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#76501F] hover:text-[#281A10] transition-colors group shrink-0"
          >
            <span>{linkLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
