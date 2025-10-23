import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/queryClient";
import { registerSchema, type RegisterInput } from "@shared/schema";
import { Sparkles, Loader2 } from "lucide-react";
import type { User } from "@shared/schema";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const result = await apiRequest<{ user: User; token: string }>("POST", "/api/auth/register", data);
      return result;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      toast({
        title: "Account created!",
        description: "Welcome to SkillMarket. Start offering your skills today.",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4 gradient-animate aurora relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 fade-in-up">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover-elevate active-elevate-2 rounded-md px-3 py-2 smooth-all" data-testid="link-home-logo">
            <Sparkles className="w-8 h-8 text-primary float" />
            <span className="text-2xl font-bold text-gradient">
              SkillMarket
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2 fade-in-delay-1" data-testid="text-register-title">
            Join SkillMarket
          </h1>
          <p className="text-muted-foreground fade-in-delay-2">
            Create an account to start buying or selling skills
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-2xl glass fade-in-delay-3 lift-hover">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        {...field}
                        className="border-2 focus:border-primary rounded-lg p-3 smooth-all"
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className="border-2 focus:border-primary rounded-lg p-3 smooth-all"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="At least 6 characters"
                        {...field}
                        className="border-2 focus:border-primary rounded-lg p-3 smooth-all"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg smooth-all magnetic-hover pulse-glow"
                disabled={registerMutation.isPending}
                data-testid="button-submit"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary font-medium underline-animate" data-testid="link-login">
              Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
