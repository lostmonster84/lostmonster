import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LauncherTopBar } from '@/components/layout/LauncherTopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lostmonster/ui';
import { Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const apps = [
    {
      name: 'Ancarraig Pricing',
      description: 'Pricing intelligence for your lodges',
      icon: Building2,
      href: '/ancarraig',
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LauncherTopBar userName={session.user.name} />

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        {/* Greeting */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Welcome back, {session.user.name || 'User'}!
          </h1>
          <p className="text-lg text-muted-foreground">Choose an app to get started</p>
        </div>

        {/* App Grid - Spacious */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link key={app.name} href={app.href}>
                <Card className="group cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.05] h-full">
                  <CardHeader className="text-center pb-4">
                    {/* Larger Icon on Top */}
                    <div className="flex justify-center mb-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${app.color} shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    <CardDescription className="text-center mt-2">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-6">
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-2" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
