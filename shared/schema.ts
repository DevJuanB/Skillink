import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  coins: integer("coins").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  coins: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coins: integer("coins").notNull(),
  category: text("category").notNull(),
  sellerId: varchar("seller_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
}).extend({
  coins: z.number().min(1, "Must be at least 1 coin (1 hour)").max(1000, "Cannot exceed 1000 coins (1000 hours)"),
});

export const updateSkillSchema = insertSkillSchema.partial().omit({
  sellerId: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type UpdateSkill = z.infer<typeof updateSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type SkillWithSeller = Skill & {
  seller: {
    id: string;
    name: string;
    email: string;
  };
};

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const exchangeRates = {
  smallPackage: {
    coins: 10,
    price: 25000,
  },
  largePackage: {
    coins: 1000,
    price: 30000,
  },
} as const;
