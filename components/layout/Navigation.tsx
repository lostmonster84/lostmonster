'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/process', label: 'Process' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navigation({ className, onLinkClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') ?? false);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              'text-sm font-medium transition-colors hover:text-white/80',
              isActive ? 'text-white' : 'text-white/70'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

