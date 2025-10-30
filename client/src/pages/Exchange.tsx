import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Coins, DollarSign, TrendingUp, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { exchangeRates, type User } from "@shared/schema";

export default function Exchange() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user, login } = useAuth();
  const { toast } = useToast();

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["/api/user/me"],
    enabled: isAuthenticated,
  });

  const exchangeMutation = useMutation({
    mutationFn: async (packageType: "small" | "large") => {
      return await apiRequest("POST", "/api/coins/exchange", { packageType });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Exchange Successful!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/me"] });
      if (data.user) {
        const token = localStorage.getItem("token");
        if (token) {
          login(data.user, token);
        }
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Exchange Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  const userCoins = currentUser?.coins || 0;
  const canExchangeSmall = userCoins >= exchangeRates.smallPackage.coins;
  const canExchangeLarge = userCoins >= exchangeRates.largePackage.coins;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-16 aurora relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <Coins className="w-12 h-12 text-primary float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient" data-testid="text-exchange-title">
              Exchange Coins
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your earned coins (hours) into real money
            </p>
          </div>

          <div className="mb-12 fade-in-delay-1">
            <Card className="p-8 text-center glass shadow-xl">
              <p className="text-sm text-muted-foreground mb-2">Your Balance</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Coins className="w-10 h-10 text-primary" />
                <p className="text-5xl font-bold text-gradient" data-testid="text-user-coins">
                  {isLoading ? "..." : userCoins}
                </p>
              </div>
              <p className="text-muted-foreground">
                <Clock className="inline w-4 h-4 mr-1" />
                {userCoins} {userCoins === 1 ? "hour" : "hours"} of work
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 glass lift-hover shadow-xl fade-in-delay-2 glow-border" data-testid="card-small-package">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shimmer">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Small Package</h3>
                <p className="text-muted-foreground">Perfect for quick cash-outs</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">Exchange Rate</span>
                  <span className="font-bold">{exchangeRates.smallPackage.coins} coins</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">You Receive</span>
                  <span className="font-bold text-primary">
                    ${exchangeRates.smallPackage.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">Per Coin</span>
                  <span className="text-sm text-muted-foreground">
                    ${(exchangeRates.smallPackage.price / exchangeRates.smallPackage.coins).toLocaleString()} / coin
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 smooth-all magnetic-hover"
                disabled={!canExchangeSmall || exchangeMutation.isPending}
                onClick={() => exchangeMutation.mutate("small")}
                data-testid="button-exchange-small"
              >
                {canExchangeSmall ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Exchange Now
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 mr-2" />
                    Need {exchangeRates.smallPackage.coins - userCoins} more coins
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-8 glass lift-hover shadow-xl fade-in-delay-3 glow-border relative overflow-hidden" data-testid="card-large-package">
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full pulse-glow">
                  BEST VALUE
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shimmer pulse-glow">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Large Package</h3>
                <p className="text-muted-foreground">Maximum value for your coins</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">Exchange Rate</span>
                  <span className="font-bold">{exchangeRates.largePackage.coins} coins</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">You Receive</span>
                  <span className="font-bold text-primary">
                    ${exchangeRates.largePackage.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/30 rounded-md">
                  <span className="text-sm font-medium">Per Coin</span>
                  <span className="text-sm text-muted-foreground">
                    ${(exchangeRates.largePackage.price / exchangeRates.largePackage.coins).toLocaleString()} / coin
                  </span>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-md border border-purple-200">
                  <p className="text-xs font-medium text-purple-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Save ${((exchangeRates.largePackage.price / exchangeRates.largePackage.coins) - (exchangeRates.smallPackage.price / exchangeRates.smallPackage.coins)) * exchangeRates.largePackage.coins} compared to small packages!
                  </p>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 smooth-all magnetic-hover pulse-glow"
                disabled={!canExchangeLarge || exchangeMutation.isPending}
                onClick={() => exchangeMutation.mutate("large")}
                data-testid="button-exchange-large"
              >
                {canExchangeLarge ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Exchange Now
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 mr-2" />
                    Need {exchangeRates.largePackage.coins - userCoins} more coins
                  </>
                )}
              </Button>
            </Card>
          </div>

          <Card className="p-8 glass fade-in-delay-3">
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold mb-2">Earn Coins</h4>
                <p className="text-sm text-muted-foreground">
                  Complete work and earn coins. 1 coin = 1 hour of work
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold mb-2">Choose Package</h4>
                <p className="text-sm text-muted-foreground">
                  Select small (10 coins) or large (1000 coins) package
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold mb-2">Get Paid</h4>
                <p className="text-sm text-muted-foreground">
                  Receive real money directly to your account
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
