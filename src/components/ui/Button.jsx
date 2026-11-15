import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...rest
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wide select-none focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary: 'bg-[#281A10] text-[#F7F5F0] hover:bg-[#76501F] shadow-xs active:translate-y-[1px]',
    secondary: 'border border-[#76501F] text-[#76501F] hover:bg-[#76501F] hover:text-white active:translate-y-[1px]',
    gold: 'bg-[#B69A63] text-[#281A10] hover:bg-[#9e834b] active:translate-y-[1px]',
    subtle: 'bg-white border border-[#E8E3D9] text-[#29251F] hover:border-[#76501F] hover:text-[#76501F] shadow-2xs',
    ghost: 'text-[#29251F] hover:text-[#76501F] hover:bg-[#E8E3D9]/40',
    wood: 'bg-[#76501F] text-white hover:bg-[#5C3E18] active:translate-y-[1px]',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2',
    lg: 'text-base px-7 py-3.5 rounded-sm gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...rest}
    >
      {content}
    </button>
  );
}
