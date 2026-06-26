# TaxJet Website

A custom, atmospheric website for TaxJet - U.S. Expat & International Tax Specialists.

## Features

- **Custom Atmospheric Design**: Calm, borderless, and expressive visual world inspired by Anything.com, Superhuman.com, Stripe.com, and Apple's iPhone product page
- **Signature Animation**: Jetstream and plane as the primary moving element - everything else remains cinematic and still
- **Layered Atmospheric Textures**: Real document overlays (IRS forms, passport stamps, country codes) at low opacity
- **Scroll-Triggered Animations**: Subtle, cinematic animations using Framer Motion
- **Micro-Interactions**: Hover effects and smooth transitions throughout
- **10 Complete Pages**:
  1. Homepage
  2. About
  3. Services
  4. Process
  5. Contact
  6. International Tax Services (detail)
  7. U.S. Tax Returns (detail)
  8. FBAR Reporting (detail)
  9. Blog
  10. Client Portal
- **Mobile-First Responsive Design**: Optimized for all screen sizes
- **SEO-Ready**: Proper metadata and semantic HTML
- **Fast Loading**: Optimized performance with Next.js 14

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-ready animations
- **Lucide React** - Beautiful icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Design Principles

- **Motion Restraint**: Only the jetstream and plane move continuously - other elements animate on scroll or interaction
- **Atmospheric Depth**: Layered textures create depth without clutter
- **Cinematic Stillness**: Content sections feel grounded and intentional
- **Subtle Interactions**: Micro-interactions enhance UX without distraction
- **Borderless Feel**: Minimal borders, relying on spacing and typography for structure

## Pages Overview

- **/**: Hero with jetstream animation, services preview, why choose us section
- **/about**: Company story, values, and differentiation
- **/services**: Full service overview with detailed breakdowns
- **/process**: Step-by-step workflow with client testimonials
- **/contact**: Contact form and consultation scheduling
- **/service/international-tax-services**: Detailed international tax services
- **/service/us-tax-returns**: Detailed U.S. tax return services
- **/service/fbar-reporting**: Detailed FBAR and foreign account reporting
- **/blog**: Tax insights and guidance for expats
- **/client-portal**: Client onboarding and account creation

## Custom Components

- **JetstreamAnimation**: SVG-based jetstream and plane animation
- **AtmosphericTextures**: Layered document overlays (IRS forms, passport stamps, country codes)
- **Navigation**: Responsive navigation with smooth animations

## Performance

- Optimized images and assets
- Code splitting with Next.js
- Minimal JavaScript bundle
- CSS-in-JS with Tailwind for optimal loading
