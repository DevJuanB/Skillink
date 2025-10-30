import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { Coins, Mail, Clock, TrendingUp, Briefcase, Sparkles } from "lucide-react";
import type { User, SkillWithSeller } from "@shared/schema";
import designImage from "@assets/generated_images/Design_skill_card_image_030f9e07.png";
import programmingImage from "@assets/generated_images/Programming_skill_card_image_76cea057.png";
import writingImage from "@assets/generated_images/Writing_skill_card_image_052c812c.png";
import illustrationImage from "@assets/generated_images/Illustration_skill_card_image_0fae6233.png";
import videoImage from "@assets/generated_images/Video_editing_skill_image_6df11a72.png";
import marketingImage from "@assets/generated_images/Marketing_skill_card_image_cb2a1801.png";

const categoryImages: Record<string, string> = {
  "Design": designImage,
  "Programming": programmingImage,
  "Writing": writingImage,
  "Illustration": illustrationImage,
  "Video Editing": videoImage,
  "Marketing": marketingImage,
};

export default function Profile() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user } = useAuth();

  const { data: currentUser, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user/me"],
    enabled: isAuthenticated,
  });

  const { data: allSkills, isLoading: skillsLoading } = useQuery<SkillWithSeller[]>({
    queryKey: ["/api/skills"],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  const userSkills = allSkills?.filter(skill => skill.sellerId === user?.id) || [];
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  const totalCoins = currentUser?.coins || 0;
  const totalHours = userSkills.reduce((sum, skill) => sum + skill.coins, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12 fade-in-up">
            <Card className="p-8 md:p-12 glass shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl float" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <Avatar className="w-32 h-32 ring-4 ring-purple-200 smooth-all hover:ring-purple-400">
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-profile-name">
                    {user?.name}
                  </h1>
                  <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span data-testid="text-profile-email">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{userSkills.length} {userSkills.length === 1 ? "Skill" : "Skills"} Listed</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Total Coins</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900" data-testid="text-profile-coins">
                        {userLoading ? "..." : totalCoins}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Hours Offered</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {totalHours}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Potential Value</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">
                        ${totalCoins >= 1000 ? "30k" : totalCoins >= 10 ? "25k" : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href="/exchange">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 smooth-all pulse-glow" data-testid="button-exchange">
                      <Coins className="w-4 h-4 mr-2" />
                      Exchange Coins
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full smooth-all" data-testid="button-manage-skills">
                      Manage Skills
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="fade-in-delay-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Skills</h2>
                <p className="text-muted-foreground">
                  Skills and services you're offering on the marketplace
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="smooth-all" data-testid="button-add-skill">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add New Skill
                </Button>
              </Link>
            </div>

            {skillsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-96 animate-pulse bg-muted shimmer" />
                ))}
              </div>
            ) : userSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    imageUrl={categoryImages[skill.category]}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center glass">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground float" />
                <h3 className="text-xl font-semibold mb-2">No skills yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start earning by listing your first skill!
                </p>
                <Link href="/dashboard">
                  <Button className="magnetic-hover" data-testid="button-create-first-skill">
                    Create Your First Skill
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
