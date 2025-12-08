# Elkostart - Web Design Agency Homepage

## Overview
A premium, modern homepage for Elkostart, a web design agency. The website features a dark luxury theme with glassmorphism effects, smooth animations, and a conversion-focused design.

## Project Structure
```
/
├── index.html      # Main homepage with all sections
├── about.html      # About page (team, values, approach)
├── services.html   # Services page with tabbed interface (6 services + custom quote form)
├── contact.html    # Contact page with form
├── blog.html       # Blog archive page with category filters
├── privacy.html    # Privacy Policy page
├── terms.html      # Terms of Service page
├── style.css       # Comprehensive CSS with dark theme, animations
├── about.css       # Additional styles for About page
├── services.css    # Additional styles for Services page
├── contact.css     # Additional styles for Contact page
├── blog.css        # Additional styles for Blog archive page
├── legal.css       # Styles for Privacy Policy and Terms pages
├── script.js       # JavaScript for animations and interactivity
├── contact.js      # Contact form handling
├── blog.js         # Blog filtering and search functionality
├── services.js     # Services page tab switching and form handling
├── server.py       # Flask backend for contact form & email
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
- Comprehensive responsive design with breakpoints at:
  - 1100px (large screens)
  - 1024px (tablets landscape)
  - 900px (tablets)
  - 768px (tablet portrait - stacked layouts)
  - 640px (large mobile)
  - 480px (mobile - full mobile optimization)
  - 360px (small mobile devices)
- Smooth scroll, intersection observer animations
- Accessibility: Reduced motion support, semantic HTML

## Mobile Responsive Features
- Stacked single-column layouts on mobile
- Appropriately sized typography for touch screens
- Full-width buttons for easy tapping
- Optimized section padding and spacing
- Hidden decorative elements on small screens
- Touch-friendly navigation with hamburger menu

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