import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Coins, Users, TrendingUp, Clock, DollarSign, CheckCircle2, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 aurora">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8 py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight fade-in-up" data-testid="text-how-it-works-title">
              How SkillMarket Works
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto fade-in-delay-1">
              A revolutionary marketplace where time equals value. Work, earn coins, and exchange them for real money.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                The Coin System
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every coin represents one hour of skilled work
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center lift-hover glass fade-in-delay-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shimmer">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">1 Coin = 1 Hour</h3>
                <p className="text-muted-foreground">
                  Each coin you earn represents one hour of quality work delivered. Simple and transparent.
                </p>
              </Card>

              <Card className="p-8 text-center lift-hover glass fade-in-delay-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shimmer">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Exchange Rates</h3>
                <p className="text-muted-foreground">
                  10 coins = $25,000<br />
                  1,000 coins = $30,000<br />
                  <span className="text-sm text-primary font-semibold">Save more with bulk exchange!</span>
                </p>
              </Card>

              <Card className="p-8 text-center lift-hover glass fade-in-delay-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 mb-4 shimmer">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Earn More</h3>
                <p className="text-muted-foreground">
                  Build your reputation, complete more work, and watch your coins grow. Exchange anytime.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl float" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Getting Started
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these simple steps to start earning
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center fade-in-delay-1">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl shimmer">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Create Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free and set up your professional profile
                </p>
              </div>

              <div className="text-center fade-in-delay-2">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl shimmer">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">List Your Skills</h3>
                <p className="text-muted-foreground">
                  Showcase your expertise and set your coin rate per hour
                </p>
              </div>

              <div className="text-center fade-in-delay-3">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl shimmer">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Complete Work</h3>
                <p className="text-muted-foreground">
                  Deliver quality work and earn coins for every hour worked
                </p>
              </div>

              <div className="text-center fade-in-delay-3">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl shimmer">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Exchange Coins</h3>
                <p className="text-muted-foreground">
                  Convert your earned coins into real money anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose SkillMarket?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 lift-hover glass fade-in-delay-1">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Fair Compensation</h3>
                <p className="text-muted-foreground">
                  Every hour of work equals one coin. Transparent and fair pricing for both buyers and sellers.
                </p>
              </Card>

              <Card className="p-8 lift-hover glass fade-in-delay-1">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Flexible Exchange</h3>
                <p className="text-muted-foreground">
                  Exchange small amounts (10 coins) or save up for bulk exchange (1,000 coins) at better rates.
                </p>
              </Card>

              <Card className="p-8 lift-hover glass fade-in-delay-2">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Global Talent Pool</h3>
                <p className="text-muted-foreground">
                  Connect with professionals worldwide. Find the perfect match for your project needs.
                </p>
              </Card>

              <Card className="p-8 lift-hover glass fade-in-delay-2">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Secure Platform</h3>
                <p className="text-muted-foreground">
                  Your coins and earnings are safe. We handle all transactions securely and transparently.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white aurora">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 float" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-up">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-gray-100 fade-in-delay-1">
              Join thousands of professionals already earning on SkillMarket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-delay-2">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 rounded-full font-semibold smooth-all magnetic-hover"
                  data-testid="button-get-started"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white glass hover:bg-white hover:text-purple-600 px-8 py-6 rounded-full font-semibold smooth-all"
                  data-testid="button-browse-skills"
                >
                  Browse Skills
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
