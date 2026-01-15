/**
 * App Color Configuration
 *
 * Each app in the Lost Monster dashboard has its own color scheme
 * to create distinct visual identities while maintaining brand consistency.
 */

export type AppColor = {
  name: string;
  primary: string; // HSL format: "hue saturation% lightness%"
  primaryRgb: string; // For gradients/opacity
  icon: string; // Hex color for launcher icons
};

export const APP_COLORS: Record<string, AppColor> = {
  // Main launcher keeps Lost Monster brand cyan
  launcher: {
    name: 'Lost Monster',
    primary: '189 70% 43%', // Cyan
    primaryRgb: '20, 138, 158',
    icon: '#148a9e',
  },

  // Ancarraig Pricing - Purple (intelligence, insights, premium)
  ancarraig: {
    name: 'Ancarraig',
    primary: '258 90% 66%', // Purple/Violet
    primaryRgb: '139, 92, 246',
    icon: '#8b5cf6',
  },

  // Future apps - ready to add
  analytics: {
    name: 'Analytics',
    primary: '258 90% 66%', // Purple
    primaryRgb: '139, 92, 246',
    icon: '#8b5cf6',
  },

  bookings: {
    name: 'Bookings',
    primary: '158 64% 52%', // Emerald green
    primaryRgb: '16, 185, 129',
    icon: '#10b981',
  },

  tasks: {
    name: 'Tasks',
    primary: '25 95% 53%', // Orange
    primaryRgb: '249, 115, 22',
    icon: '#f97316',
  },
};

/**
 * Get app color configuration
 */
export function getAppColor(appId: string): AppColor {
  return APP_COLORS[appId] || APP_COLORS.launcher;
}
