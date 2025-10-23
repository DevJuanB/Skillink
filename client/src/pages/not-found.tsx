import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4 gradient-animate aurora relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" style={{ animationDelay: '1s' }} />
      </div>
      
      <Card className="max-w-md w-full p-12 text-center shadow-2xl glass lift-hover fade-in-up relative z-10">
        <Sparkles className="w-20 h-20 mx-auto mb-6 text-primary float" />
        <h1 className="text-6xl font-bold mb-4 text-gradient neon-text">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 smooth-all magnetic-hover pulse-glow" data-testid="button-home">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
