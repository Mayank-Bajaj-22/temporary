
import React from 'react';

export default function Container({
  children,
  className = '',
  size = 'default',
}) {
  const sizeClasses = {
    narrow: 'max-w-5xl',
    default: 'max-w-[1500px]',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-5 lg:px-7 w-full ${
        sizeClasses[size] || sizeClasses.default
      } ${className}`}
    >
      {children}
    </div>
  );
}
