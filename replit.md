# SkillMarket - Freelance Marketplace Platform

## Overview

SkillMarket is a modern fullstack marketplace application for buying and selling freelance services (skills). The platform enables users to register, browse available skills across various categories, create skill listings, and manage their offerings through a personal dashboard. The application emphasizes a vibrant, conversion-optimized design inspired by Fiverr's approachable marketplace aesthetic while maintaining professional trust signals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React with TypeScript as the core frontend framework
- Wouter for client-side routing (lightweight alternative to React Router)
- Vite as the build tool and development server with HMR support

**UI Components & Styling**
- Shadcn/ui component library (Radix UI primitives) for accessible, composable components
- TailwindCSS for utility-first styling with custom design tokens
- Design system based on "new-york" style variant with neutral base color
- Custom CSS variables for theme management supporting light/dark modes
- Inter/DM Sans typography system with defined type scales

**State Management**
- React Context API for authentication state (`AuthContext`)
- TanStack Query (React Query) for server state management, caching, and data fetching
- React Hook Form with Zod validation for form handling

**Key Design Decisions**
- Component-based architecture with reusable UI primitives
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)
- Design guidelines emphasize vibrant-yet-professional aesthetic with conversion optimization
- Mobile-first responsive design with Tailwind breakpoints

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript throughout the entire stack
- ESM (ES Modules) module system

**API Structure**
- RESTful API design with `/api` prefix
- Route registration pattern centralizing all endpoints in `server/routes.ts`
- Middleware-based request processing (authentication, error handling, logging)

**Authentication & Authorization**
- JWT (JSON Web Tokens) for stateless authentication with 7-day expiration
- bcrypt for password hashing (10 salt rounds)
- Bearer token authentication via Authorization headers
- Custom `authMiddleware` protecting authenticated routes
- User context injection into requests via `AuthRequest` interface

**Data Layer**
- In-memory storage implementation (`MemStorage`) for development
- Storage abstraction via `IStorage` interface enabling easy database swapping
- Drizzle ORM configured for PostgreSQL with schema-first approach
- Schema definitions shared between client and server (`shared/schema.ts`)

**Error Handling**
- Custom `AppError` class for application-specific errors with status codes
- Centralized error handler middleware
- Zod schema validation for request data with automatic error responses

**Key Design Decisions**
- Separation of concerns: routes, storage, middleware in separate modules
- Storage abstraction allows switching from memory to database without route changes
- Shared schema definitions (Zod + Drizzle) ensure type safety across stack
- Request/response logging middleware for debugging and monitoring

### Data Models

**User Schema**
- `id`: UUID primary key (auto-generated)
- `name`: User display name
- `email`: Unique email for authentication
- `password`: Bcrypt-hashed password

**Skill Schema**
- `id`: UUID primary key (auto-generated)
- `title`: Skill listing title
- `description`: Detailed description
- `price`: Integer price (in cents/smallest currency unit)
- `category`: Categorical classification (Design, Programming, Writing, etc.)
- `sellerId`: Foreign key reference to users table
- `createdAt`: Timestamp for creation tracking

**Extended Types**
- `SkillWithSeller`: Joins skill with seller user data for API responses
- Validation schemas exported via Zod for runtime type checking

## External Dependencies

### Database & ORM
- **PostgreSQL**: Relational database (configured via Drizzle but currently using in-memory storage)
- **Drizzle ORM**: Type-safe SQL query builder and schema manager
- **@neondatabase/serverless**: PostgreSQL driver for serverless/edge environments
- Connection configured via `DATABASE_URL` environment variable

### Authentication & Security
- **jsonwebtoken**: JWT generation and verification
- **bcryptjs**: Password hashing and comparison
- **JWT_SECRET**: Environment variable for token signing (defaults to development key)

### UI Component Libraries
- **Radix UI**: Headless, accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component patterns built on Radix
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling
- **tailwind-merge**: Intelligent Tailwind class merging

### Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Bridge between React Hook Form and Zod

### Development Tools
- **Vite**: Fast build tool with native ESM and HMR
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Build & Deployment
- Production build compiles client (Vite) and server (esbuild) separately
- Client assets output to `dist/public`
- Server bundle output to `dist/index.js`
- Environment-based configuration (`NODE_ENV`)