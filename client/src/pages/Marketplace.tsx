import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { Search, Filter, Sparkles } from "lucide-react";
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

const categories = ["All", "Design", "Programming", "Writing", "Illustration", "Video Editing", "Marketing"];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const { data: skills, isLoading } = useQuery<SkillWithSeller[]>({
    queryKey: ["/api/skills"],
  });

  const filteredSkills = skills?.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "coins-low") return a.coins - b.coins;
    if (sortBy === "coins-high") return b.coins - a.coins;
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient" data-testid="text-marketplace-title">
              Skill Marketplace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse and hire talented professionals. Pay with coins (1 coin = 1 hour)
            </p>
          </div>

          <div className="mb-8 space-y-4 fade-in-delay-1">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 smooth-all"
                  data-testid="input-search"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 smooth-all" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 smooth-all" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="coins-low">Coins: Low to High</SelectItem>
                  <SelectItem value="coins-high">Coins: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="smooth-all"
                  data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted shimmer" />
              ))}
            </div>
          ) : filteredSkills && filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  imageUrl={categoryImages[skill.category]}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center fade-in-up glass">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground float" />
              <h3 className="text-xl font-semibold mb-2">No skills found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedCategory !== "All" 
                  ? "Try adjusting your filters" 
                  : "Be the first to offer your expertise!"}
              </p>
              {!searchQuery && selectedCategory === "All" && (
                <Button className="magnetic-hover" data-testid="button-create-skill">
                  Create Your First Skill
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
