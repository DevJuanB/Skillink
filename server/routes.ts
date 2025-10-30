import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { authMiddleware, generateToken, type AuthRequest } from "./middleware/auth";
import { AppError, errorHandler } from "./middleware/error-handler";
import { loginSchema, registerSchema, insertSkillSchema, updateSkillSchema, exchangeRates } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const validatedData = registerSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        throw new AppError("Email already registered", 400);
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      const token = generateToken(user.id);

      const { password, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/login", async (req, res, next) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        throw new AppError("Invalid email or password", 401);
      }

      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
      if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
      }

      const token = generateToken(user.id);

      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/user/me", authMiddleware, async (req: AuthRequest, res, next) => {
    try {
      if (!req.userId) {
        throw new AppError("Unauthorized", 401);
      }

      const user = await storage.getUser(req.userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/skills", async (req, res, next) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/skills/:id", async (req, res, next) => {
    try {
      const skill = await storage.getSkillById(req.params.id);
      if (!skill) {
        throw new AppError("Skill not found", 404);
      }
      res.json(skill);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/skills", authMiddleware, async (req: AuthRequest, res, next) => {
    try {
      if (!req.userId) {
        throw new AppError("Unauthorized", 401);
      }

      const validatedData = insertSkillSchema.parse({
        ...req.body,
        sellerId: req.userId,
      });

      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/skills/:id", authMiddleware, async (req: AuthRequest, res, next) => {
    try {
      if (!req.userId) {
        throw new AppError("Unauthorized", 401);
      }

      const validatedData = updateSkillSchema.parse(req.body);

      const updatedSkill = await storage.updateSkill(req.params.id, req.userId, validatedData);
      if (!updatedSkill) {
        throw new AppError("Skill not found or unauthorized", 404);
      }

      res.json(updatedSkill);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/skills/:id", authMiddleware, async (req: AuthRequest, res, next) => {
    try {
      if (!req.userId) {
        throw new AppError("Unauthorized", 401);
      }

      const deleted = await storage.deleteSkill(req.params.id, req.userId);
      if (!deleted) {
        throw new AppError("Skill not found or unauthorized", 404);
      }

      res.json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/coins/exchange", authMiddleware, async (req: AuthRequest, res, next) => {
    try {
      if (!req.userId) {
        throw new AppError("Unauthorized", 401);
      }

      const { packageType } = z.object({
        packageType: z.enum(["small", "large"]),
      }).parse(req.body);

      const user = await storage.getUser(req.userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }

      const requiredCoins = packageType === "small" 
        ? exchangeRates.smallPackage.coins 
        : exchangeRates.largePackage.coins;

      if (user.coins < requiredCoins) {
        throw new AppError(`Insufficient coins. You need ${requiredCoins} coins to exchange.`, 400);
      }

      const newCoinBalance = user.coins - requiredCoins;
      const updatedUser = await storage.updateUserCoins(req.userId, newCoinBalance);

      if (!updatedUser) {
        throw new AppError("Failed to update user coins", 500);
      }

      const amount = packageType === "small" 
        ? exchangeRates.smallPackage.price 
        : exchangeRates.largePackage.price;

      const { password, ...userWithoutPassword } = updatedUser;

      res.json({
        success: true,
        message: `Successfully exchanged ${requiredCoins} coins for $${amount.toLocaleString()}`,
        user: userWithoutPassword,
        transaction: {
          coinsExchanged: requiredCoins,
          amountReceived: amount,
          remainingCoins: newCoinBalance,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);

  const httpServer = createServer(app);
  return httpServer;
}
