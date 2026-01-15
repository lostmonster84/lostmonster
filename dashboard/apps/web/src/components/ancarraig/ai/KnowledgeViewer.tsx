'use client';

import { useState } from 'react';
import { AncarraigAIKnowledge, AIKnowledgeCategory } from '@lostmonster/database';
import { Badge } from '@lostmonster/ui/badge';
import { Card } from '@lostmonster/ui/card';
import { Input } from '@lostmonster/ui/input';
import { Lightbulb, Target, TrendingUp, Users, Search } from 'lucide-react';
import { cn } from '@lostmonster/ui';

interface KnowledgeViewerProps {
  knowledge: AncarraigAIKnowledge[];
}

const categoryIcons = {
  preference: Target,
  rule: Lightbulb,
  insight: TrendingUp,
  competitor: Users,
};

const categoryColors = {
  preference: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  rule: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  insight: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  competitor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
};

export function KnowledgeViewer({ knowledge }: KnowledgeViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<AIKnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Group by category
  const knowledgeByCategory = knowledge.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<AIKnowledgeCategory, AncarraigAIKnowledge[]>);

  // Filter knowledge
  const filteredKnowledge = knowledge.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Count by category
  const categoryCounts = {
    all: knowledge.length,
    preference: knowledgeByCategory.preference?.length || 0,
    rule: knowledgeByCategory.rule?.length || 0,
    insight: knowledgeByCategory.insight?.length || 0,
    competitor: knowledgeByCategory.competitor?.length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            All ({categoryCounts.all})
          </button>
          {(['preference', 'rule', 'insight', 'competitor'] as AIKnowledgeCategory[]).map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap',
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <Icon className="h-4 w-4" />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}s ({categoryCounts[cat]})
              </button>
            );
          })}
        </div>
      </div>

      {/* Knowledge Items */}
      {filteredKnowledge.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery || selectedCategory !== 'all'
                  ? 'No matching knowledge found'
                  : 'No knowledge yet'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Start chatting with the AI to build your knowledge base'}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredKnowledge.map((item) => {
            const Icon = categoryIcons[item.category];
            const colorClass = categoryColors[item.category];

            return (
              <Card key={item.id} className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn('p-2 rounded-lg', colorClass)}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground">{item.key}</h3>
                      <Badge variant="outline" className="flex-shrink-0">
                        {Math.round(item.confidence * 100)}% confident
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.value}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className={cn('capitalize px-2 py-1 rounded', colorClass)}>
                        {item.category}
                      </span>
                      <span>
                        Added {new Date(item.created_at).toLocaleDateString()}
                      </span>
                      {item.updated_at !== item.created_at && (
                        <span>
                          Updated {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
