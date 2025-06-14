# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ことちゃんバースデーアプリ (KOTO-CHAN Birthday App)** - An interactive web application designed for 1-year-old "ことちゃん" (Koto-chan) to celebrate their birthday. This is a touch-optimized, family-friendly app providing safe interactions for toddlers while serving as a digital memory keeper.

## Development Commands

This project uses **pnpm** as the package manager:

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build production version
pnpm start        # Start production server

# Code Quality (run these before committing)
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix linting issues
pnpm type-check   # Run TypeScript compiler
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting without fixing

# Testing
pnpm test         # Run unit tests with Vitest
pnpm test:ui      # Run tests with UI
pnpm test:coverage # Run tests with coverage
pnpm e2e          # Run Playwright E2E tests
pnpm e2e:ui       # Run E2E tests with UI

# Utilities
pnpm optimize:images # Optimize images for web
```

## Architecture

**Next.js 14 App Router** structure with component-based architecture:

- `app/` - App Router (pages, API routes, layouts, global styles)
- `components/` - Organized as:
  - `ui/` - Reusable UI components (buttons, modals, etc.)
  - `features/` - Feature-specific components (drawing, photo-album, etc.)
  - `layouts/` - Layout components
- `lib/` - Utilities, custom hooks, constants, and type definitions
- `types/` - TypeScript type definitions
- `public/` - Static assets (audio, images, icons)

**Path aliases configured** for clean imports:
- `@/` maps to root directory
- `@/components/` maps to components directory
- `@/lib/` maps to lib directory
- `@/hooks/*` maps to lib/hooks/*
- `@/utils/*` maps to lib/utils/*
- `@/types/*` maps to types/*
- `@/public/*` maps to public/*

## Technology Stack

- **Frontend**: Next.js 14, TypeScript 5.3+, Tailwind CSS, Framer Motion
- **State Management**: Zustand for client state
- **Audio**: Howler.js for sound effects and music
- **Backend**: Vercel KV (Redis) for data, Vercel Blob for file storage
- **Deployment**: Vercel with security headers and CSP

## Testing Strategy

**Two-tier testing approach**:
- **Unit Tests**: Vitest + Testing Library for component and utility testing
- **E2E Tests**: Playwright with multi-browser support (Chrome, Firefox, Safari, Mobile Chrome/Safari)

Test files use `.test.ts` or `.spec.ts` extensions.

## Code Quality Standards

**Automated tooling enforces**:
- **ESLint**: TypeScript + Next.js rules
- **Prettier**: 80 char width, 2-space indentation, trailing commas
- **Husky + lint-staged**: Pre-commit hooks run linting/formatting
- **Commitlint**: Enforces Conventional Commits (feat:, fix:, etc.)

## Design System

**Child-optimized design**:
- Minimum 44px touch targets for small fingers
- Rounded, child-friendly fonts (Rounded Mplus 1c, Hiragino Maru Gothic ProN)
- Custom kotochan color palette: cream, brown, pink, mint, yellow, orange, blue, purple
- Custom animations: bounce-gentle, wiggle, float, sparkle, slide-in, fade-in
- Custom border radius (kotochan: 20px) for friendly rounded corners

## Security Considerations

**Family-safe configuration**:
- Comprehensive CSP headers prevent external resource loading
- No external navigation allowed
- XSS and clickjacking protections enabled
- Secure headers configured in `next.config.js`

## Special Development Notes

- **Target audience**: 1-year-old child - prioritize large, simple interactions
- **Audio files**: Use Howler.js for cross-browser compatibility
- **Images**: Optimize with built-in Next.js Image component, prefer AVIF/WebP
- **Touch interactions**: Test on mobile devices, consider accidental touches
- **Family memories**: Handle photo/video uploads securely with Vercel Blob