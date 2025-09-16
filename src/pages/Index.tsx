import { Button } from "@/components/ui/button";
import WalletConnect from "@/components/WalletConnect";
import TradingInterface from "@/components/TradingInterface";
import MarketOverview from "@/components/MarketOverview";
import { Shield, Leaf, Eye } from "lucide-react";
import earthHero from "@/assets/earth-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-earth-green">CarbonSecure</h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={earthHero}
            alt="Earth from space representing global carbon trading"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Trade Carbon,{" "}
              <span className="bg-gradient-earth bg-clip-text text-transparent">
                Protect Privacy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of carbon credit trading with encrypted pricing and anonymous settlements. 
              Build a sustainable future while maintaining your privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="bg-gradient-earth text-primary-foreground hover:opacity-90 transition-opacity shadow-eco px-8 py-3 text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Start Trading
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5 px-8 py-3 text-lg">
                <Eye className="w-5 h-5 mr-2" />
                View Market
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-card border border-primary/20 rounded-full shadow-eco">
                <Shield className="w-4 h-4 text-earth-green" />
                <span className="text-sm font-medium text-foreground">Encrypted Pricing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-card border border-primary/20 rounded-full shadow-eco">
                <Eye className="w-4 h-4 text-earth-green" />
                <span className="text-sm font-medium text-foreground">Anonymous Trading</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-card border border-primary/20 rounded-full shadow-eco">
                <Leaf className="w-4 h-4 text-earth-green" />
                <span className="text-sm font-medium text-foreground">Sustainable Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Market Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into the encrypted carbon credit trading ecosystem
          </p>
        </div>
        <MarketOverview />
      </section>

      {/* Trading Interface */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trade with Privacy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience secure, anonymous carbon credit trading with encrypted pricing revealed only after settlement
            </p>
          </div>
          <TradingInterface />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 CarbonSecure. Building a sustainable future through private trading.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
