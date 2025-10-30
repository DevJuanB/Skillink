import { type User, type InsertUser, type Skill, type InsertSkill, type SkillWithSeller } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCoins(id: string, coins: number): Promise<User | undefined>;
  
  getSkills(): Promise<SkillWithSeller[]>;
  getSkillById(id: string): Promise<SkillWithSeller | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, userId: string, updates: Partial<Skill>): Promise<Skill | undefined>;
  deleteSkill(id: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private skills: Map<string, Skill>;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, coins: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserCoins(id: string, coins: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, coins };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getSkills(): Promise<SkillWithSeller[]> {
    const skills = Array.from(this.skills.values());
    return Promise.all(
      skills.map(async (skill) => {
        const seller = await this.getUser(skill.sellerId);
        if (!seller) {
          throw new Error(`Seller not found for skill ${skill.id}`);
        }
        return {
          ...skill,
          seller: {
            id: seller.id,
            name: seller.name,
            email: seller.email,
          },
        };
      })
    );
  }

  async getSkillById(id: string): Promise<SkillWithSeller | undefined> {
    const skill = this.skills.get(id);
    if (!skill) return undefined;

    const seller = await this.getUser(skill.sellerId);
    if (!seller) {
      throw new Error(`Seller not found for skill ${skill.id}`);
    }

    return {
      ...skill,
      seller: {
        id: seller.id,
        name: seller.name,
        email: seller.email,
      },
    };
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = {
      ...insertSkill,
      id,
      createdAt: new Date(),
    };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: string, userId: string, updates: Partial<Skill>): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    if (!skill) return undefined;
    if (skill.sellerId !== userId) return undefined;
    
    const updatedSkill = {
      ...skill,
      ...updates,
      id: skill.id,
      sellerId: skill.sellerId,
      createdAt: skill.createdAt,
    };
    
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: string, userId: string): Promise<boolean> {
    const skill = this.skills.get(id);
    if (!skill) return false;
    if (skill.sellerId !== userId) return false;
    
    return this.skills.delete(id);
  }
}

export const storage = new MemStorage();
