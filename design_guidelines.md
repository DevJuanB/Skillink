# SkillMarket Design Guidelines

## Design Approach

**Reference-Based Approach** drawing inspiration from modern marketplace leaders:
- **Primary Reference**: Fiverr's vibrant, approachable marketplace aesthetic
- **Secondary Influences**: Dribbble's creative showcase + Upwork's professional trust signals
- **Rationale**: SkillMarket is an experience-driven, visually-differentiated marketplace where emotional appeal and trust are critical to conversion

## Core Design Principles

1. **Vibrant yet Professional**: Balance creative energy with trustworthy presentation
2. **Skill-First Showcase**: Every design decision elevates the skills being sold
3. **Conversion-Optimized**: Clear CTAs and friction-free user flows
4. **Trust Building**: Visual cues that establish credibility and safety

---

## Typography System

### Font Families
- **Primary (Headings)**: 'Inter' or 'DM Sans' - 600/700 weights
- **Secondary (Body)**: 'Inter' or 'DM Sans' - 400/500 weights
- **Accent (CTAs/Labels)**: Same family, 600 weight

### Type Scale
- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold
- **Section Headers**: text-3xl md:text-4xl, font-bold
- **Card Titles**: text-xl md:text-2xl, font-semibold
- **Body Text**: text-base md:text-lg
- **Small Labels**: text-sm, font-medium
- **Micro Text**: text-xs

---

## Layout System

### Spacing Units
**Tailwind primitives: 2, 4, 6, 8, 12, 16, 20, 24**
- Component padding: p-4 to p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 md:gap-8
- Element margins: mb-2, mb-4, mb-6 for vertical rhythm

### Container Strategy
- **Full-width sections**: w-full with inner max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- **Content containers**: max-w-6xl mx-auto
- **Text content**: max-w-4xl for readability
- **Skill cards grid**: max-w-7xl with responsive columns

### Grid Layouts
- **Skill Cards**: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
- **Features/Benefits**: grid-cols-1 md:grid-cols-3 gap-8
- **Dashboard**: grid-cols-1 lg:grid-cols-4 with sidebar (col-span-1) and main (col-span-3)

---

## Component Library

### Hero Section (Home)
- **Full viewport height**: min-h-[90vh] with centered content
- **Gradient background**: From deep blue (#1e3a8a) through purple (#7c3aed) to pink (#ec4899) - diagonal or radial
- **Content structure**:
  - Main headline with bold typography
  - Descriptive subheadline (text-lg md:text-xl, text-gray-100)
  - Dual CTA buttons (primary + secondary outlined)
  - Trust indicators below CTAs (e.g., "Join 50,000+ creators" with small avatars)
- **Visual enhancement**: Floating skill category badges with subtle animation, or abstract geometric shapes in background

### Navigation Bar
- **Sticky positioning**: sticky top-0 z-50
- **Backdrop blur**: backdrop-blur-lg bg-white/90 with shadow-sm
- **Layout**: Flexbox with logo left, nav center, auth buttons right
- **Mobile**: Hamburger menu with slide-in drawer
- **Elements**: Logo, Browse/Explore link, Become a Seller link, Login/Register (outline) or Dashboard (if logged in)
- **Height**: h-16 md:h-20

### Skill Cards (Primary Component)
- **Structure**: Vertical card with image, content, and pricing footer
- **Card styling**: 
  - rounded-xl overflow-hidden
  - bg-white with shadow-md hover:shadow-xl transition-all duration-300
  - hover:-translate-y-1 for lift effect
- **Image section**: 
  - aspect-ratio-video (16:9)
  - object-cover with gradient overlay on hover
- **Content section**: p-4 md:p-6
  - Seller avatar + name (flex items-center gap-2)
  - Skill title (text-lg font-semibold, line-clamp-2)
  - Category badge (inline-flex rounded-full px-3 py-1 text-xs bg-purple-100 text-purple-700)
  - Rating stars + review count
- **Footer section**: border-t pt-4 flex justify-between items-center
  - Price display (text-xl font-bold)
  - "View Details" button or arrow icon

### Authentication Forms (Login/Register)
- **Container**: max-w-md mx-auto with centered layout
- **Card styling**: bg-white rounded-2xl shadow-2xl p-8 md:p-12
- **Input fields**: 
  - Full-width with border-2 border-gray-200 focus:border-purple-500 rounded-lg p-3
  - Label above (text-sm font-medium mb-2)
  - Spacing between fields: space-y-4
- **Submit button**: Full-width, h-12, primary styling
- **Alternate action**: "Don't have an account? Register" link below form

### Dashboard Layout
- **Sidebar**: 
  - w-64 fixed left-0 h-screen bg-gray-50 border-r
  - Navigation items with icons (text-base font-medium)
  - Active state: bg-purple-100 text-purple-700 with left border accent
- **Main content**: ml-64 p-6 md:p-8
  - Stats cards grid (grid-cols-1 md:grid-cols-3)
  - "Your Skills" section with user's skill cards
  - "Create New Skill" prominent CTA

### Buttons
- **Primary CTA**: 
  - bg-gradient-to-r from-purple-600 to-pink-600
  - text-white font-semibold
  - px-8 py-3 rounded-full
  - hover:scale-105 transition-transform
  - shadow-lg hover:shadow-xl
- **Secondary**: 
  - border-2 border-white text-white (on dark) or border-purple-600 text-purple-600 (on light)
  - px-8 py-3 rounded-full
  - hover:bg-white hover:text-purple-600 transition-colors
- **Text/Link buttons**: 
  - No border, underline on hover
  - text-purple-600 font-medium

### Footer
- **Background**: bg-gray-900 text-gray-300
- **Layout**: 4-column grid on desktop, stacked on mobile
  - Column 1: Logo + tagline
  - Column 2: Quick links (About, How it Works, FAQ)
  - Column 3: Categories (Design, Writing, Programming, etc.)
  - Column 4: Newsletter signup + social icons
- **Spacing**: py-12 md:py-16
- **Bottom bar**: border-t border-gray-800 pt-8 with copyright

### Featured Skills Section (Home)
- **Header**: "Explore Popular Skills" with "View All" link
- **Grid**: 6 featured skill cards
- **Spacing**: py-16 md:py-24 with max-w-7xl container

### Category Browse Section
- **Grid of category cards**: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4
- **Card styling**: 
  - rounded-lg p-6 text-center
  - bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100
  - hover:shadow-lg hover:scale-105 transition-all
  - Icon (64x64) + category name

### Loading States
- **Skeleton cards**: Matching skill card dimensions with animated pulse
- **Spinner**: Purple gradient spinner (border-t-purple-600) for full-page loads

### Error/Success Messages
- **Toast notifications**: Top-right corner, rounded-lg with icon
- **Success**: bg-green-50 border-l-4 border-green-500 text-green-800
- **Error**: bg-red-50 border-l-4 border-red-500 text-red-800
- **Slide-in animation**: from right with auto-dismiss after 4s

---

## Images

### Hero Section
- **Large hero image**: NO - Use vibrant gradient background instead
- **Supporting visuals**: Floating skill category badges or abstract geometric shapes (subtle, semi-transparent)

### Skill Cards
- **Required**: Each skill card needs a featured image (16:9 aspect ratio)
- **Placeholder approach**: Use category-specific stock images or colorful gradients with centered skill category icon
- **Image treatment**: Slight desaturation filter with color overlay on hover

### Category Cards
- **Icons**: Use Heroicons (via CDN) - 64px size, purple-600 color
- **Examples**: PencilIcon (Design), CodeBracketIcon (Programming), ChatBubbleLeftIcon (Writing)

### Profile/Seller Images
- **Avatar sizes**: w-8 h-8 (card thumbnails), w-12 h-12 (profile headers)
- **Styling**: rounded-full with ring-2 ring-purple-200

---

## Visual Enhancements

### Animations (Minimal, Strategic Use)
- **Skill card hover**: Subtle lift (-translate-y-1) + shadow expansion
- **Button hover**: Scale to 105% for primary CTAs
- **Category cards**: Scale to 105% on hover
- **NO**: Complex scroll animations, parallax, or distracting motion

### Micro-interactions
- **Input focus**: Border color transition to purple-500
- **Link hover**: Smooth underline slide-in
- **Toast entrance**: Slide-in from right with fade

---

## Accessibility Requirements

- **Color contrast**: All text meets WCAG AA standards (4.5:1 for body, 3:1 for large)
- **Focus states**: Visible 2px purple ring (ring-2 ring-purple-500 ring-offset-2) on all interactive elements
- **Form labels**: Always visible, associated with inputs via htmlFor
- **Button states**: Clear hover, focus, and active states
- **Alt text**: Descriptive alt attributes for all skill images

---

**Final Note**: This marketplace design prioritizes vibrant energy and approachability while maintaining professional credibility. Every element should feel crafted to showcase skills beautifully and drive user engagement toward buying or selling.