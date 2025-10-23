import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import type { SkillWithSeller } from "@shared/schema";

interface SkillCardProps {
  skill: SkillWithSeller;
  imageUrl?: string;
}

export default function SkillCard({ skill, imageUrl }: SkillCardProps) {
  const initials = skill.seller.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/skills/${skill.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group" data-testid={`card-skill-${skill.id}`}>
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={skill.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-purple-300">{skill.category[0].toUpperCase()}</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 ring-2 ring-purple-200">
              <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{skill.seller.name}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2 text-foreground" data-testid={`text-skill-title-${skill.id}`}>
              {skill.title}
            </h3>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid={`badge-category-${skill.id}`}>
              {skill.category}
            </Badge>
          </div>

          <div className="border-t border-border pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Starting at</p>
              <p className="text-xl font-bold text-foreground" data-testid={`text-price-${skill.id}`}>
                ${skill.price}
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
              <span>View</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
