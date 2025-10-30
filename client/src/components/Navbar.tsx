import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, LogOut, Coins, Menu, X, ShoppingBag, TrendingUp, HelpCircle, User as UserIcon } from "lucide-react";
import { useState } from "react";
import type { User } from "@shared/schema";

export default function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/user/me"],
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/how-it-works", label: "How It Works", icon: HelpCircle },
    ...(isAuthenticated ? [
      { href: "/exchange", label: "Exchange", icon: TrendingUp },
    ] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 smooth-all" data-testid="link-home">
            <Sparkles className="w-6 h-6 text-primary float" />
            <span className="text-xl font-bold text-gradient">
              SkillMarket
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className="smooth-all flex items-center gap-2"
                    data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 fade-in-delay-1">
            {isAuthenticated ? (
              <>
                {currentUser && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 smooth-all hover:from-purple-200 hover:to-pink-200">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-primary" data-testid="text-navbar-coins">
                      {currentUser.coins}
                    </span>
                    <span className="text-xs text-muted-foreground">coins</span>
                  </div>
                )}
                <Link href="/profile">
                  <Button
                    variant={location === "/profile" ? "default" : "ghost"}
                    size="icon"
                    className="smooth-all"
                    data-testid="link-profile"
                  >
                    <UserIcon className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant={location === "/dashboard" ? "default" : "ghost"}
                    size="default"
                    className="smooth-all"
                    data-testid="link-dashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="smooth-all"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="default" className="smooth-all" data-testid="link-login">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="default" className="smooth-all pulse-glow" data-testid="link-register">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden smooth-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 fade-in-up">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start smooth-all flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <>
                {currentUser && (
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-md">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-primary">
                        {currentUser.coins} coins
                      </span>
                    </div>
                  </div>
                )}
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start smooth-all"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-profile"
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start smooth-all"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-dashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start smooth-all"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  data-testid="mobile-button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start smooth-all"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="w-full smooth-all"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-register"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
