'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Building2, Calculator, CalendarRange, TrendingUp, DollarSign, Settings, BarChart3, Wallet, Sparkles } from 'lucide-react';
import { cn } from '@lostmonster/ui';
import { getAppColor } from '@/lib/app-colors';

const ancarraigNav = [
  { name: 'Dashboard', href: '/ancarraig', icon: Building2 },
  { name: 'AI Assistant', href: '/ancarraig/ai', icon: Sparkles },
  { name: 'Calculator', href: '/ancarraig/calculator', icon: Calculator },
  { name: 'Comparison', href: '/ancarraig/comparison', icon: BarChart3 },
  { name: 'Cash Flow', href: '/ancarraig/cashflow', icon: Wallet },
  { name: 'Calendar', href: '/ancarraig/calendar', icon: CalendarRange },
  { name: 'Live Rates', href: '/ancarraig/rates', icon: TrendingUp },
  { name: 'Costs', href: '/ancarraig/costs', icon: DollarSign },
  { name: 'Settings', href: '/ancarraig/settings', icon: Settings },
];

export function AncarraigLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const appColor = getAppColor('ancarraig');

  return (
    <div
      className="flex min-h-screen bg-background"
      style={{
        // @ts-ignore - CSS variables
        '--primary': appColor.primary,
        '--primary-rgb': appColor.primaryRgb,
      } as React.CSSProperties}
    >
      {/* Left Sidebar - Glass Morphism */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card/50 backdrop-blur-xl shadow-lg">
        <div className="flex h-full flex-col">
          {/* App Header */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">Ancarraig</span>
                <span className="text-xs text-muted-foreground">Pricing</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {ancarraigNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:shadow-sm'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Subtle Divider */}
          <div className="mx-3 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

          {/* Footer Info */}
          <div className="px-6 py-3">
            <p className="text-xs text-muted-foreground/70">
              Cost-first pricing intelligence
            </p>
          </div>

          {/* Back to Apps Link - Bottom */}
          <div className="px-3 pb-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200 hover:shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Apps</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64">
        {/* Page Header - Glass Morphism */}
        {(title || description) && (
          <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="px-6 py-6">
              {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
              {description && (
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
