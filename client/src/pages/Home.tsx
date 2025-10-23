import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { Sparkles, Code, Palette, PenTool, TrendingUp, Video, MessageSquare } from "lucide-react";
import type { SkillWithSeller } from "@shared/schema";
import heroImage from "@assets/generated_images/Hero_gradient_background_image_58955a18.png";
import designImage from "@assets/generated_images/Design_skill_card_image_030f9e07.png";
import programmingImage from "@assets/generated_images/Programming_skill_card_image_76cea057.png";
import writingImage from "@assets/generated_images/Writing_skill_card_image_052c812c.png";
import illustrationImage from "@assets/generated_images/Illustration_skill_card_image_0fae6233.png";
import videoImage from "@assets/generated_images/Video_editing_skill_image_6df11a72.png";
import marketingImage from "@assets/generated_images/Marketing_skill_card_image_cb2a1801.png";

const categories = [
  { name: "Design", icon: Palette, color: "from-purple-500 to-pink-500" },
  { name: "Programming", icon: Code, color: "from-blue-500 to-purple-500" },
  { name: "Writing", icon: PenTool, color: "from-green-500 to-teal-500" },
  { name: "Illustration", icon: Sparkles, color: "from-orange-500 to-red-500" },
  { name: "Video Editing", icon: Video, color: "from-pink-500 to-rose-500" },
  { name: "Marketing", icon: TrendingUp, color: "from-indigo-500 to-purple-500" },
];

const categoryImages: Record<string, string> = {
  "Design": designImage,
  "Programming": programmingImage,
  "Writing": writingImage,
  "Illustration": illustrationImage,
  "Video Editing": videoImage,
  "Marketing": marketingImage,
};

export default function Home() {
  const { data: skills, isLoading } = useQuery<SkillWithSeller[]>({
    queryKey: ["/api/skills"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(124, 58, 237, 0.95) 50%, rgba(236, 72, 153, 0.95) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight" data-testid="text-hero-title">
            Buy and Sell Real Skills
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            Find talented designers, programmers, writers and more. Or offer your expertise to thousands of buyers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-base"
                data-testid="button-explore-skills"
              >
                Explore Skills
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-purple-600 px-8 py-6 rounded-full font-semibold transition-all text-base"
                data-testid="button-offer-service"
              >
                Offer a Service
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-gray-200">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm ml-2">Join 50,000+ creators</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-categories-title">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover skills across all categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className="p-6 text-center hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 hover:scale-105"
                  data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
                Featured Skills
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore top-rated services from talented professionals
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : skills && skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {skills.slice(0, 6).map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  imageUrl={categoryImages[skill.category]}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No skills yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to offer your expertise!
              </p>
              <Link href="/dashboard">
                <Button data-testid="button-create-first-skill">Create Your First Skill</Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
