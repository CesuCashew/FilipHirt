# REDESIGN PROMPT: Filip Hirt Portfolio
## Profesionální WOW Design pro sekce "Co nabízím" a "Moje práce"

---

## 📊 ANALÝZA SOUČASNÉHO STAVU

### Současná sekce "Co nabízím"
- **Layout**: Tradičně 6 karet v grid layoutu (3x2)
- **Styl**: Minimalistický s ikonami a popisky
- **Problémy**: 
  - Statické karty bez interaktivity
  - Vizuálně fádní a standardní
  - Chybí "WOW" efekt
  - Nedostatečně se odlišuje od konkurence

### Současná sekce "Moje práce"
- **Layout**: Modální okna s náhledy projektů
- **Styl**: Kategorizované projekty s device mockupy
- **Problémy**:
  - Generický vzhled
  - Slabá vizuální hierarchie
  - Nedostatečná interaktivita
  - Malá vizuální přitažlivost

---

## 🎨 DESIGN TREND ANALÝZA 2025

### Klíčové trendy z Awwwards & Dribbble:
1. **Bento Grid Layout** - Modulární design inspirovaný japonskými bento boxy
2. **Micro-interactions** - Subtilní animace při hover efektech
3. **3D Elements & Glassmorphism** - Hloubka a moderní vzhled
4. **Dynamic Typography** - Živá typografie s animacemi
5. **Asymetrické layouty** - Netradiční uspořádání prvků
6. **Gradient Overlays** - Barevné přechody a duotone efekty
7. **Scroll-triggered animations** - Animace při scrollování
8. **Interactive Cards** - Karty reagující na pohyb myši

---

## ✨ REDESIGN NÁVRH #1: "CO NABÍZÍM" - BENTO GRID STYLE

### Koncept: Interaktivní Bento Grid s 3D Hover Efekty

```html
LAYOUT STRUKTURA:
┌─────────────────────────────────────────────┐
│  CO NABÍZÍM                                 │
│  Komplexní digitální strategie pro váš      │
│  úspěch a růst                              │
├──────────────┬──────────────┬───────────────┤
│              │              │               │
│   VELKÁ      │   STŘEDNÍ    │   MALÁ       │
│   KARTA      │   KARTA      │   KARTA      │
│   (2x2)      │   (2x1)      │   (1x1)      │
│              │              ├───────────────┤
│              │              │   MALÁ       │
│              │              │   KARTA      │
├──────────────┼──────────────┤   (1x1)      │
│   STŘEDNÍ    │   STŘEDNÍ    │               │
│   KARTA      │   KARTA      ├───────────────┤
│   (2x1)      │   (1x2)      │   MALÁ       │
│              │              │   KARTA      │
│              │              │   (1x1)      │
└──────────────┴──────────────┴───────────────┘
```

### Designové prvky:

#### 1. Velká prioritní karta (Chytré Webové Stránky)
```css
Vlastnosti:
- Gradient pozadí (modro-fialový přechod)
- Floating 3D ikona AI (levitující s animací)
- Glassmorphism efekt na hover
- Particle efekty na pozadí
- Tilt efekt při hover (3D náhled)
- Expanduje na fullwidth při kliku

Animace:
- Ikona: Continuous float animation (nahoru-dolů)
- Text: Fade in + slide up při scroll trigger
- Background: Gradient shift při hover
- Border: Glowing border animation
```

#### 2. Střední karty (E-commerce, Restaurace)
```css
Vlastnosti:
- Asymetrické rozmístění
- Screenshot preview webu v mobile/desktop
- Color overlay specifický pro kategorii
- Icon badge v rohu
- Hover: Zoom in na preview + brightness increase

Barvy:
- E-commerce: Zeleno-žlutý gradient
- Restaurace: Oranžovo-červený gradient
```

#### 3. Malé karty (Ostatní služby)
```css
Vlastnosti:
- Minimalistické ikony (line-art style)
- Jemný background pattern
- Counter animace pro statistiky
- Click: Otevře detail v slide-in panel

Hover efekty:
- Icon rotation 360°
- Background color shift
- Scale up 1.05
```

### Technická implementace:

```javascript
// Hover 3D Tilt efekt
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.transform = `
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale3d(1.05, 1.05, 1.05)
  `;
});

// Scroll-triggered animations (GSAP)
gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 80%',
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: 'power3.out'
});
```

### Barevná paleta:
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--ecommerce-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--restaurant-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--corporate-gradient: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
--seo-gradient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
--glassmorphism: rgba(255, 255, 255, 0.1);
--blur: blur(10px);
```

---

## 🎯 REDESIGN NÁVRH #2: "CO NABÍZÍM" - INTERACTIVE CARD DECK

### Koncept: Expandující karty s mikrointerakcemi

```
VIZUALIZACE:
[══════════════════════════════════════]
[ 🤖 AI WEBY    →  Hover: Expands 50% ]
[═══════════════════════════]
[ 🛒 E-SHOPY    →  Normal state      ]
[═══════════════════════════]
[ 🍽️ RESTAURACE →  Normal state      ]
[═══════════════════════════]
[ 🏢 FIRMY      →  Normal state      ]
[═══════════════════════════]
[ 📊 SEO        →  Normal state      ]
[═══════════════════════════]
[ 🎨 UX/UI      →  Normal state      ]
[══════════════════════════════════════]
```

### Features:
1. **Stacked Cards Layout** - Karty jsou mírně překrývající se
2. **Expand on Hover** - Aktivní karta se rozšíří a odhalí více detailů
3. **Blur Background** - Neaktivní karty se rozmazají
4. **Icon Animation** - 3D rotující ikony
5. **Progress Indicators** - Mini vizuální indikátory zkušeností

### Interactive Elements:
```javascript
// Card expand animation
const expandCard = (card) => {
  gsap.to(card, {
    height: '400px',
    zIndex: 10,
    boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
    duration: 0.4,
    ease: 'power2.out'
  });
  
  // Blur other cards
  gsap.to('.service-card:not(:hover)', {
    filter: 'blur(4px)',
    opacity: 0.7,
    scale: 0.95
  });
};
```

---

## 🖼️ REDESIGN NÁVRH #1: "MOJE PRÁCE" - MASONRY GRID WITH HOVER REVEALS

### Koncept: Pinterest-style Masonry Grid s reveal efekty

```
LAYOUT:
┌───────┬───────┬───────┬───────┐
│       │ Short │       │ Short │
│  Tall │───────│  Tall │───────│
│       │       │       │       │
│       │  Med  │       │  Med  │
├───────┼───────┼───────┼───────┤
│       │       │ Short │       │
│  Med  │  Tall │───────│ Short │
│       │       │       │───────│
│       │       │  Med  │  Tall │
└───────┴───────┴───────┴───────┘
```

### Designové prvky:

#### 1. Project Cards
```css
Struktur:
- Fullscreen project thumbnail
- Gradient overlay (bottom to top)
- Hidden info panel
- Category badge (floating)
- Tech stack icons (absolute positioned)

Hover State:
- Image: Zoom 1.1x + brightness reduce
- Overlay: Opacity increase
- Info Panel: Slide up from bottom
- CTA Button: Fade in + scale
- Cursor: Custom cursor (→ "View Project")
```

#### 2. Filter System
```html
<div class="filter-tabs">
  <button class="filter-tab active" data-filter="all">
    Všechny projekty <span class="count">12</span>
  </button>
  <button class="filter-tab" data-filter="ai">
    AI Weby <span class="count">4</span>
  </button>
  <button class="filter-tab" data-filter="ecommerce">
    E-shopy <span class="count">3</span>
  </button>
  <button class="filter-tab" data-filter="restaurant">
    Restaurace <span class="count">5</span>
  </button>
</div>
```

Styl:
- Pill-shaped buttons
- Smooth color transition
- Active state: Gradient background
- Count badge: Different color per category

#### 3. Hover Info Panel
```html
<div class="project-info">
  <div class="project-header">
    <span class="category-badge">AI Web</span>
    <h3 class="project-title">Moderní Restaurace Praha</h3>
  </div>
  
  <p class="project-description">
    Elegantní web s rezervačním systémem a AI chatbotem...
  </p>
  
  <div class="tech-stack">
    <span class="tech">React</span>
    <span class="tech">Node.js</span>
    <span class="tech">AI</span>
  </div>
  
  <div class="project-metrics">
    <div class="metric">
      <span class="value">+245%</span>
      <span class="label">Konverze</span>
    </div>
    <div class="metric">
      <span class="value">95</span>
      <span class="label">Page Speed</span>
    </div>
  </div>
  
  <a href="#" class="view-project-btn">
    Zobrazit projekt
    <svg>→</svg>
  </a>
</div>
```

---

## 🎬 REDESIGN NÁVRH #2: "MOJE PRÁCE" - HORIZONTAL SCROLL SHOWCASE

### Koncept: Apple-style horizontální scroll s parallax

```
DESKTOP VIEW:
←═══════════════════════════════════════════→
  [Project 1]  [Project 2]  [Project 3]  
     🖥️           📱           💻
  ← SCROLL HORIZONTÁLNĚ →
```

### Features:

1. **Horizontal Scroll Container**
```javascript
// Smooth horizontal scroll
const projects = gsap.utils.toArray('.project-slide');

gsap.to(projects, {
  xPercent: -100 * (projects.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.projects-container',
    pin: true,
    scrub: 1,
    snap: 1 / (projects.length - 1),
    end: () => '+=' + document.querySelector('.projects-container').offsetWidth
  }
});
```

2. **Project Slide Design**
```html
<div class="project-slide">
  <div class="project-visual">
    <!-- Animated device mockup -->
    <div class="device-mockup desktop">
      <img src="screenshot.jpg" class="parallax-img">
    </div>
  </div>
  
  <div class="project-content">
    <span class="project-number">01</span>
    <h2 class="project-title">Luxusní E-shop</h2>
    <p class="project-tagline">
      Premium shopping experience s AI asistenty
    </p>
    
    <div class="project-highlights">
      <div class="highlight">
        <h4>Výzva</h4>
        <p>Nízké konverze a zastaralý design</p>
      </div>
      <div class="highlight">
        <h4>Řešení</h4>
        <p>Moderní UX a AI chatbot pro podporu</p>
      </div>
      <div class="highlight">
        <h4>Výsledek</h4>
        <p>+340% konverze za 3 měsíce</p>
      </div>
    </div>
    
    <a href="#" class="case-study-btn">
      Číst case study →
    </a>
  </div>
</div>
```

3. **Parallax Effect na Screenshots**
```javascript
// Parallax na obrázky při scrollu
gsap.to('.parallax-img', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.project-slide',
    scrub: true
  }
});
```

---

## 🎨 REDESIGN NÁVRH #3: "MOJE PRÁCE" - NETFLIX-STYLE CAROUSEL

### Koncept: Kategorizované carousely s preview na hover

```
LAYOUT:
═══════════════════════════════════════════
  AI WEBY (4 projekty)
  [◄] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [►]
───────────────────────────────────────────
  E-SHOPY (3 projekty)
  [◄] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [►]
───────────────────────────────────────────
  RESTAURACE (5 projektů)
  [◄] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [▓▓▓▓] [►]
═══════════════════════════════════════════
```

### Features:

1. **Card Expansion na Hover**
```css
.project-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: scale(1.15) translateY(-10px);
  z-index: 10;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.project-card:hover .project-details {
  opacity: 1;
  transform: translateY(0);
}
```

2. **Auto-play Preview Video**
```html
<div class="project-card">
  <div class="project-media">
    <img src="thumbnail.jpg" class="thumbnail">
    <video class="preview-video" muted loop>
      <source src="preview.mp4">
    </video>
  </div>
  
  <div class="project-details">
    <h4>Název projektu</h4>
    <div class="tags">
      <span>React</span>
      <span>AI</span>
    </div>
    <button class="quick-view">Quick View</button>
  </div>
</div>
```

3. **Smooth Carousel Navigation**
```javascript
// Swiper.js configuration
const swiper = new Swiper('.projects-carousel', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  navigation: {
    nextEl: '.carousel-next',
    prevEl: '.carousel-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    }
  }
});
```

---

## 💎 DOPORUČENÉ KOMBINACE

### 🏆 NEJLEPŠÍ KOMBINÁCE:

**PRO "CO NABÍZÍM":**
→ **Bento Grid Style** (Návrh #1)
- Moderní a jedinečný
- Flexibilní pro různé obsahy
- Skvělé pro hierarchii informací
- Trendy v roce 2025

**PRO "MOJE PRÁCE":**
→ **Horizontal Scroll Showcase** (Návrh #2)
- Immersive experience
- Apple-like kvalita
- Storytelling approach
- Zapamatovatelný

---

## 🛠️ TECHNOLOGIE & KNIHOVNY

### Doporučené:
```json
{
  "animations": "GSAP 3.12 + ScrollTrigger",
  "3d_effects": "Three.js (optional)",
  "particles": "Particles.js",
  "carousel": "Swiper.js",
  "masonry": "Masonry.js nebo CSS Grid",
  "tilt": "Vanilla-tilt.js",
  "smooth_scroll": "Lenis.js",
  "cursor": "Custom cursor library"
}
```

### Performance optimalizace:
```javascript
// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  // Disable animations
  gsap.config({ nullTargetWarn: false, trialWarn: false });
}
```

---

## 📱 RESPONSIVITA

### Breakpoints:
```css
/* Mobile First Approach */
:root {
  --mobile: 320px;
  --tablet: 768px;
  --desktop: 1024px;
  --wide: 1440px;
}

/* Mobile (320-767px) */
@media (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .project-card {
    width: 100%;
  }
}

/* Tablet (768-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

---

## 🎯 MĚŘITELNÉ CÍLE REDESIGNU

### Očekávané výsledky:
- ✅ **+50% čas strávený na stránce** (více engagementu)
- ✅ **+70% interakce s projekty** (lepší CTR)
- ✅ **+40% konverze na kontakt** (více leadů)
- ✅ **Snížení bounce rate o 30%** (kvalitnější zážitek)
- ✅ **95+ Google PageSpeed skóre** (optimalizace)

### A/B Testing:
```javascript
// Track interactions
analytics.track('service_card_hover', {
  card_type: 'ai_web',
  duration: 2.5 // seconds
});

analytics.track('project_view', {
  project_name: 'Luxury Eshop',
  category: 'ecommerce'
});
```

---

## 🎨 DESIGNOVÉ PRINCIPY

### Hierarchie informací:
1. **Primary**: Hlavní nabídka (AI Weby) - největší prostor
2. **Secondary**: E-shopy, Restaurace - střední velikost
3. **Tertiary**: Ostatní služby - menší karty

### Konzistence:
- **Spacing**: 8px grid system
- **Typography**: Max 3 fonty (Heading, Body, Mono)
- **Colors**: Max 5 hlavních barev + gradienty
- **Animations**: Max 0.4s duration pro micro-interactions

### Accessibility:
```css
/* Focus states */
.service-card:focus,
.project-card:focus {
  outline: 3px solid var(--primary);
  outline-offset: 4px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .glassmorphism {
    background: rgba(255, 255, 255, 0.95);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --text: #ffffff;
  }
}
```

---

## 🚀 IMPLEMENTAČNÍ PLÁN

### Fáze 1: Příprava (Týden 1)
- [ ] Vytvoření wireframes v Figma
- [ ] Schválení designu
- [ ] Příprava assetů (ikony, obrázky)
- [ ] Setup projektu (GSAP, knihovny)

### Fáze 2: Vývoj "Co nabízím" (Týden 2-3)
- [ ] HTML struktura
- [ ] CSS styling (Bento Grid)
- [ ] JavaScript interakce
- [ ] Animace (GSAP)
- [ ] Mobile responsivita
- [ ] Testing

### Fáze 3: Vývoj "Moje práce" (Týden 3-4)
- [ ] HTML struktura
- [ ] CSS styling (Horizontal Scroll)
- [ ] JavaScript logika
- [ ] Animace a parallax
- [ ] Filter systém
- [ ] Testing

### Fáze 4: Optimalizace (Týden 4-5)
- [ ] Performance audit
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] SEO check

### Fáze 5: Launch (Týden 5)
- [ ] Final testing
- [ ] Staging deploy
- [ ] Client approval
- [ ] Production deploy
- [ ] Analytics setup
- [ ] Monitoring

---

## 📚 INSPIRAČNÍ ODKAZY

### Top Portfolio Examples:
1. **https://www.aristidebenoist.com/** - Bento grid mastery
2. **https://www.guillaumemercier.fr/** - Horizontal scroll
3. **https://davidsierra.co/** - Interactive elements
4. **https://www.joanramos.me/** - Immersive experience
5. **https://www.dennissnellenberg.com/** - Modern minimalism

### Design Resources:
- **Awwwards Portfolio Collection**: Nejlepší portfolio weby
- **Dribbble Portfolio Tag**: Denní inspirace
- **BentoGrids.com**: Galerie Bento designů
- **Codrops**: Tutoriály na moderní efekty

---

## 💡 EXTRA TIPY

### Pro WOW efekt:
1. **Cursor Follower**: Custom cursor který reaguje na hover
2. **Magnetic Buttons**: Tlačítka přitahující cursor
3. **Scroll Progress**: Vizuální indikátor progress
4. **Loading Animation**: Stylová preloader animace
5. **Easter Eggs**: Skryté interaktivní prvky (Konami code?)

### Pro SEO:
```html
<!-- Structured Data pro Services -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Person",
    "name": "Filip Hirt"
  }
}
</script>
```

---

## 🎬 ZÁVĚR

Tento redesign kombinuje nejmodernější trendy z roku 2025 s osvědčenými UX principy. 

**Klíčové body:**
✨ Bento Grid pro "Co nabízím" - jedinečný, flexibilní, moderní
🎯 Horizontal Scroll pro "Moje práce" - immersive, storytelling
⚡ GSAP animace - smooth, profesionální
📱 Mobile-first approach - responsivní na všech zařízeních
♿ Accessibility - přístupný pro všechny
🚀 Performance - rychlý a optimalizovaný

**Výsledek:**
Portfolio které se **vynikne** nad konkurencí a zanechá **nezapomenutelný dojem** na potenciální klienty.

---

_Prompt vytvořen: 3. 2. 2025_
_Verze: 1.0 - Kompletní redesign brief_