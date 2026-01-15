import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@lostmonster/ui';
import { Calculator, TrendingUp, CheckSquare, Clock } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const stats = [
    {
      title: 'Active Quotes',
      value: '12',
      change: '+3 this week',
      icon: Calculator,
      href: '/pricing',
    },
    {
      title: 'Portfolio Value',
      value: '£245,890',
      change: '+4.2% this month',
      icon: TrendingUp,
      href: '/investments',
    },
    {
      title: 'Open Tasks',
      value: '8',
      change: '3 due today',
      icon: CheckSquare,
      href: '/tasks',
    },
    {
      title: 'Hours This Week',
      value: '32',
      change: '8 remaining',
      icon: Clock,
      href: '#',
    },
  ];

  return (
    <DashboardLayout title="Dashboard" description={`Welcome back, ${session.user.name || 'User'}!`}>
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <a key={stat.title} href={stat.href}>
            <Card className="hover:border-border-hover transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="/pricing"
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-border-hover transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Create Quote</h3>
              <p className="text-sm text-muted-foreground">Generate a new price quote</p>
            </div>
          </a>

          <a
            href="/investments"
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-border-hover transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 dark:bg-green-500/20">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Add Investment</h3>
              <p className="text-sm text-muted-foreground">Track a new investment</p>
            </div>
          </a>

          <a
            href="/tasks"
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-border-hover transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 dark:bg-purple-500/20">
              <CheckSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Add Task</h3>
              <p className="text-sm text-muted-foreground">Create a new task</p>
            </div>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
