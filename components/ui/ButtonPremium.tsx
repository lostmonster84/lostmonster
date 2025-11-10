'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface ButtonPremiumProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: 'arrow' | 'sparkles' | 'zap' | 'none';
  asChild?: boolean;
  href?: string;
}

const ButtonPremium = forwardRef<HTMLButtonElement, ButtonPremiumProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon = 'arrow',
      asChild,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ease-natural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-600/30 active:translate-y-0 btn-shine',
      secondary:
        'bg-neutral-800 text-white hover:bg-neutral-900 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-neutral-800/30 active:translate-y-0',
      outline:
        'border-2 border-neutral-300 text-neutral-900 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
      gradient:
        'bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600 bg-size-200 bg-pos-0 text-white hover:bg-pos-100 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-600/40 active:translate-y-0 transition-all duration-500',
      glow: 'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary-500/50 active:translate-y-0 relative overflow-hidden',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    const IconComponent = {
      arrow: ArrowRight,
      sparkles: Sparkles,
      zap: Zap,
      none: null,
    }[icon];

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        <span className="relative z-10">{children}</span>
        {IconComponent && (
          <IconComponent
            className={cn(
              'transition-transform duration-300 group-hover:translate-x-1',
              size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
            )}
          />
        )}
      </>
    );

    if (asChild && href) {
      return (
        <Link href={href} className={cn(classes, 'group')}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <Link href={href} className={cn(classes, 'group')}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={cn(classes, 'group')} {...props}>
        {content}
      </button>
    );
  }
);

ButtonPremium.displayName = 'ButtonPremium';

export default ButtonPremium;
