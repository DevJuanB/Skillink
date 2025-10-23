import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, LogOut } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

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

          <div className="flex items-center gap-3 fade-in-delay-1">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline fade-in-delay-2">
                  {user?.name}
                </span>
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
        </div>
      </div>
    </nav>
  );
}
