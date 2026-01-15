import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { AIHeroSection } from '@/components/ancarraig/home/AIHeroSection';
import { InlineChatInput } from '@/components/ancarraig/home/InlineChatInput';
import { AIStatusBadge } from '@/components/ancarraig/home/AIStatusBadge';
import { QuickActionCards } from '@/components/ancarraig/home/QuickActionCards';
import { CompactToolsGrid } from '@/components/ancarraig/home/CompactToolsGrid';

export default async function AncarraigDashboardPage() {
  return (
    <AncarraigLayout
      title="Ancarraig"
      description="AI-powered pricing intelligence"
    >
      {/* Centered container with generous padding */}
      <div className="max-w-4xl mx-auto space-y-8 py-8">

        {/* Hero Section - Big centered icon, headline, subtitle */}
        <AIHeroSection />

        {/* Inline Chat Input - Large, prominent, immediate access */}
        <InlineChatInput />

        {/* AI Status Badge - Shows what AI knows */}
        <AIStatusBadge lodgeCount={3} conversationCount={5} />

        {/* Quick Action Cards - App-like card grid (NOT chips) */}
        <QuickActionCards />

        {/* Compact Tools Grid - Secondary access at bottom */}
        <CompactToolsGrid />

      </div>
    </AncarraigLayout>
  );
}
