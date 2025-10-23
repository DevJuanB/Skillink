import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { SkillWithSeller } from "@shared/schema";
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

export default function SkillDetail() {
  const [match, params] = useRoute("/skills/:id");
  const [, setLocation] = useLocation();
  const skillId = params?.id;

  const { data: skills, isLoading } = useQuery<SkillWithSeller[]>({
    queryKey: ["/api/skills"],
  });

  const skill = skills?.find(s => s.id === skillId);

  useEffect(() => {
    if (!match || !skillId) {
      setLocation("/");
    }
  }, [match, skillId, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-12 text-center max-w-md">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Skill not found</h2>
            <p className="text-muted-foreground mb-6">
              This skill doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation("/")} data-testid="button-back-home">
              Back to Home
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const initials = skill.seller.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            className="mb-8 gap-2"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Skills
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                {categoryImages[skill.category] ? (
                  <img
                    src={categoryImages[skill.category]}
                    alt={skill.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-bold text-purple-300">
                      {skill.category[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid="badge-category">
                    {skill.category}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4" data-testid="text-skill-title">
                  {skill.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-skill-description">
                  {skill.description}
                </p>
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About this Service</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    This professional service is offered by an experienced freelancer who specializes in {skill.category.toLowerCase()}.
                  </p>
                  <p>
                    The seller will work with you to deliver high-quality results tailored to your specific needs and requirements.
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-6">
                <div className="flex items-center gap-3 pb-6 border-b">
                  <Avatar className="w-12 h-12 ring-2 ring-purple-200">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold" data-testid="text-seller-name">{skill.seller.name}</p>
                    <p className="text-sm text-muted-foreground">Seller</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Starting at</p>
                  <p className="text-4xl font-bold" data-testid="text-price">
                    ${skill.price}
                  </p>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" data-testid="button-contact">
                  Contact Seller
                </Button>

                <div className="pt-6 border-t space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{skill.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
