import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { queryClient, apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { insertSkillSchema, type InsertSkill, type SkillWithSeller } from "@shared/schema";
import { Plus, Trash2, Loader2, Sparkles } from "lucide-react";
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

const categories = ["Design", "Programming", "Writing", "Illustration", "Video Editing", "Marketing"];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const { data: skills, isLoading } = useQuery<SkillWithSeller[]>({
    queryKey: ["/api/skills"],
    enabled: isAuthenticated,
  });

  const userSkills = skills?.filter(skill => skill.sellerId === user?.id) || [];

  const form = useForm<InsertSkill>({
    resolver: zodResolver(insertSkillSchema),
    defaultValues: {
      title: "",
      description: "",
      coins: 0,
      category: "",
      sellerId: user?.id || "",
    },
  });

  const createSkillMutation = useMutation({
    mutationFn: async (data: InsertSkill) => {
      return await apiRequest("POST", "/api/skills", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({
        title: "Skill created!",
        description: "Your skill has been published successfully.",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create skill",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      return await apiRequest("DELETE", `/api/skills/${skillId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({
        title: "Skill deleted",
        description: "Your skill has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete skill",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSkill) => {
    createSkillMutation.mutate({
      ...data,
      sellerId: user?.id || "",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">
              Welcome back, {user?.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your skills and track your offerings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Skills</h3>
              <p className="text-3xl font-bold" data-testid="text-total-skills">{userSkills.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Listings</h3>
              <p className="text-3xl font-bold">{userSkills.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
              <p className="text-3xl font-bold">
                {new Set(userSkills.map(s => s.category)).size}
              </p>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Your Skills</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" data-testid="button-create-skill">
                  <Plus className="w-4 h-4" />
                  Create New Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Skill</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Professional Logo Design"
                              {...field}
                              data-testid="input-skill-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you offer..."
                              className="min-h-32"
                              {...field}
                              data-testid="input-skill-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coins"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coins (Hours)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="10"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-skill-coins"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createSkillMutation.isPending}
                      data-testid="button-submit-skill"
                    >
                      {createSkillMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Skill"
                      )}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : userSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkills.map((skill) => (
                <div key={skill.id} className="relative group">
                  <SkillCard
                    skill={skill}
                    imageUrl={categoryImages[skill.category]}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={() => deleteSkillMutation.mutate(skill.id)}
                    disabled={deleteSkillMutation.isPending}
                    data-testid={`button-delete-${skill.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No skills yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first skill to start selling your expertise
              </p>
              <Button onClick={() => setIsDialogOpen(true)} data-testid="button-create-first">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Skill
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
