---
name: sna-homepage
description: Design and build the SNA handicap association homepage. Use this skill when working on the home page, landing page, hero section, or any public-facing page for this French handicap association that helps families find places and aids across France. Produces accessible, emotionally resonant, French-language-aware UI using the project's React/Inertia/TypeScript/Tailwind stack.
user-invocable: true
---

# SNA Handicap — Homepage Design Skill

This skill guides the design and implementation of the public-facing homepage for a French handicap association (SNA) that helps families find adapted places and financial/social aids across France.

## Project Context

- **Stack**: Laravel 12 + Inertia v2 + React + TypeScript + Tailwind CSS
- **Audience**: Families with disabled members, caregivers, social workers across France
- **Language**: French (UI copy must be in French)
- **Purpose**: Help families discover:
  - Adapted establishments & places (ESAT, IME, MAS, EHPAD, etc.)
  - Financial aids & benefits (AAH, PCH, AEEH, etc.)
  - Regional resources across all French departments
- **Accessibility**: WCAG 2.1 AA minimum — this is an association serving people with disabilities, so accessibility is non-negotiable

## Design Direction

### Aesthetic
- **Tone**: Warm, trustworthy, human — NOT clinical or governmental
- **Feel**: Like a caring guide, not a cold administration portal
- **Inspiration**: Modern French editorial design meets accessible civic design
- **Avoid**: Stock-photo overload, generic blue/white government sites, overly corporate feel

### Color Philosophy
- Warm, inclusive palette — consider deep blues + warm amber/ochre accents, or soft greens evoking nature and calm
- High contrast for accessibility (4.5:1 minimum for text)
- Use CSS variables for the entire palette

### Typography
- Choose a distinctive French-friendly font pairing
- Display font: something with character (Playfair Display, Cormorant Garamond, Syne, or similar)
- Body font: highly legible (Source Serif Pro, Lora, DM Sans, or similar)
- Never use Inter, Roboto, or Arial

### Key Sections to Include
1. **Hero** — Emotional headline, clear mission statement, primary CTA ("Trouver une aide" / "Trouver un établissement")
2. **Search/Filter** — Quick search by type of aid or region (department selector for France)
3. **How it works** — 3-step explainer, visual and simple
4. **Categories** — Visual cards for main resource types (établissements, aides financières, accompagnement, etc.)
5. **Map teaser** — France map visual suggesting geographic coverage
6. **Testimonials** — Real family voices, human and warm
7. **Partners/Institutions** — MDPH, CAF, CNSA logos for trust signals
8. **Footer** — Full navigation, legal mentions, accessibility statement link

## Implementation Rules

### File Location
- Page component: `resources/js/pages/Home.tsx`
- Reusable components: `resources/js/components/`
- Use existing layout from `resources/js/layouts/`

### Inertia
- Use `Inertia::render('Home', [...])` in the controller
- Props passed from Laravel should be typed with TypeScript interfaces

### Accessibility Checklist
- All images have `alt` text in French
- Interactive elements are keyboard-navigable
- Focus rings are visible and styled (not removed)
- ARIA labels on icon-only buttons
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Skip-to-content link at the top

### Motion
- Subtle entrance animations with `animation-delay` staggering
- Respect `prefers-reduced-motion` media query — wrap all animations
- No autoplay video or flashing content

### French UX Conventions
- Use "vous" form (formal) in UI copy
- Dates in DD/MM/YYYY format
- Department numbers (01–95 + DOM-TOM) for location selectors
- RGPD-compliant cookie notice

## French Disability Resource Glossary
When generating copy or data structures, use correct French terminology:
- **AAH** — Allocation aux adultes handicapés
- **PCH** — Prestation de compensation du handicap
- **AEEH** — Allocation d'éducation de l'enfant handicapé
- **MDPH** — Maison départementale des personnes handicapées
- **ESAT** — Établissement et service d'aide par le travail
- **IME** — Institut médico-éducatif
- **MAS** — Maison d'accueil spécialisée
- **FAM** — Foyer d'accueil médicalisé
- **SESSAD** — Service d'éducation spéciale et de soins à domicile
- **CNSA** — Caisse nationale de solidarité pour l'autonomie
