'use client';

import { signOut } from 'next-auth/react';
import { LogOut, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function LauncherTopBar({ userName }: { userName?: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <svg
            className="h-4 w-4 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-lg font-bold text-foreground">Lost Monster</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* User Menu - Simple Hover Dropdown */}
        <div className="relative group">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {userName?.[0]?.toUpperCase() || 'J'}
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-foreground rounded-t-lg">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-red-600 rounded-b-lg"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
