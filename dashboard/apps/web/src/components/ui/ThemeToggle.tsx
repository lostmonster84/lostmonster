"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const themes: Array<{ value: "light" | "dark" | "system"; icon: typeof Sun; label: string }> = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md transition-colors
            ${
              theme === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }
          `}
          title={label}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
