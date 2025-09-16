import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Globe, Users, Zap } from "lucide-react";

const MarketOverview = () => {
  const stats = [
    {
      title: "Total Volume",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: Globe,
    },
    {
      title: "Active Traders",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Avg. Credit Price",
      value: "$45.20",
      change: "-2.1%",
      trend: "down",
      icon: Zap,
    },
    {
      title: "Privacy Score",
      value: "99.8%",
      change: "+0.1%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="bg-gradient-card border-primary/20 shadow-eco hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-earth-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                <TrendIcon
                  className={`h-3 w-3 mr-1 ${
                    stat.trend === "up" ? "text-emerald" : "text-destructive"
                  }`}
                />
                <span
                  className={`font-medium ${
                    stat.trend === "up" ? "text-emerald" : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketOverview;