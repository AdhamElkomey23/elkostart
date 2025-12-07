# Elkostart - Web Design Agency Homepage

## Overview
A premium, modern homepage for Elkostart, a web design agency. The website features a dark luxury theme with glassmorphism effects, smooth animations, and a conversion-focused design.

## Project Structure
```
/
├── index.html      # Main homepage with all sections
├── about.html      # About page (team, values, approach)
├── services.html   # Services page (offerings, packages, FAQ)
├── style.css       # Comprehensive CSS with dark theme, animations
├── about.css       # Additional styles for About page
├── services.css    # Additional styles for Services page
├── script.js       # JavaScript for animations and interactivity
└── replit.md       # This documentation file
```

## Homepage Sections
1. **Hero Section** - Punchy headline, subheadline, CTAs, stats, and browser mockup visual
2. **Social Proof Strip** - Client logo display
3. **Problem/Solution Section** - Addresses pain points and positions agency as solution
4. **Portfolio Preview** - 4 project cards with results
5. **Services Overview** - 4 service cards with one featured
6. **Testimonials** - 3 client testimonials with ratings
7. **Process Overview** - 4-step process visualization
8. **Final CTA Section** - Strong call-to-action with trust signals
9. **Footer** - Navigation, social links, legal

## Design System
- **Colors**: Dark theme (#0a0a0f background) with purple accent gradient (#6366f1 → #8b5cf6)
- **Typography**: Inter font family, large bold headlines (clamp 2.5rem-4rem)
- **Effects**: Glassmorphism, subtle gradients, hover animations, scroll reveals
- **Spacing**: Generous whitespace, 120px section padding

## Technical Details
- Pure HTML/CSS/JS (no framework dependencies)
- Responsive design (mobile-first breakpoints at 640px, 768px, 900px, 1024px, 1100px)
- Smooth scroll, intersection observer animations
- Accessibility: Reduced motion support, semantic HTML

## Running the Project
The site is served using Python's HTTP server on port 5000:
```
python -m http.server 5000 --bind 0.0.0.0
```

## Key Conversion Features
- Multiple CTAs throughout the page
- Trust signals (testimonials, stats, process)
- Clear value proposition in hero
- Results-focused portfolio cards
- No-obligation messaging in final CTA