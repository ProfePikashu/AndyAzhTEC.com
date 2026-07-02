# DEBUGLOG — AndyAzhTEC.com
## Beta v0.3.1 · Build 004 · 2026-04-14

---

## REGISTRO DE CAMBIOS (CHANGELOG) — BUILD 002

```
2026-04-14 [BUILD 002] — Beta v0.2.0
  ~ UPDATED index.html — Sección AyRPC completamente reemplazada
      - Nombre correcto: "Armado y Reparación de PC (AyRPC)"
      - Canal real: twitch.tv/profe_pikashu (link directo)
      - Módulos actualizados a temario real del curso
      - Nuevo bloque: Video Showcase con portal lightbox
  + CREATED js/video-config.js — Sistema de configuración de videos por el creador
      - Array AYRPC_VIDEOS: título, descripción, ID, tipo, timestamp, badge, accent
      - tsToTwitchTime(): convierte {h,m,s,ms} a "1h30m45s" para Twitch embed
      - tsToReadable(): versión human-readable del timestamp
      - getTwitchEmbedURL(): genera URL de embed respetando window.location.hostname
      - getTwitchChannelURL(): URL del canal de Twitch
      - CARD_GRADIENTS: 4 gradientes neon para cards sin thumbnail
  ~ UPDATED css/styles.css — +220 líneas de estilos nuevos
      - .ayrpc-subtitle: subtítulo pequeño debajo del título de sección
      - .video-showcase + .video-showcase-header: contenedor y encabezado
      - .videos-link: botón "Ver todos los videos" con flecha
      - .video-cards-grid: grid auto-fill de cards de video
      - .video-card: card base con hover transform + glow por accent color
      - .vc-thumb: thumbnail 16:9 con zoom en hover
      - .vc-play-overlay + .vc-play-btn: botón play que aparece al hover con spring
      - .vc-ts: badge de timestamp en la esquina inferior de la thumbnail
      - .vc-body, .vc-badge, .vc-title, .vc-desc, .vc-footer: body de la card
      - .vc-expand-hint: flecha "Ver en grande" que desliza al hover
      - .video-portal-overlay: overlay oscuro con backdrop blur al abrir portal
      - .video-portal: lightbox central con spring animation (scale 0.06 → 1)
      - .video-portal-close, .video-portal-info, .video-portal-embed: partes del portal
      - .video-portal-footer: footer con timestamp y link al canal live
      - Responsive: 768px y 480px breakpoints para el showcase
  ~ UPDATED js/main.js — Módulo VideoShowcase agregado al final
      - renderCard(): genera HTML de una card desde el objeto de config
      - open(video): rellena el portal con iframe + info + footer, anima apertura
      - close(): cierra el portal, destruye el iframe tras 450ms (detiene audio)
      - init(): renderiza todas las cards desde AYRPC_VIDEOS al cargar el DOM
      - Soporte keyboard: Enter / Espacio para abrir card, Escape para cerrar portal
      - Soporte click en overlay para cerrar
```

---

## INSTRUCCIONES DE USO — VIDEO-CONFIG.JS

Para agregar o cambiar los videos del showcase:

1. Abrí `js/video-config.js`
2. Encontrá el ID del VOD en la URL de Twitch: `twitch.tv/videos/XXXXXXXXXX`
3. Editá los campos del objeto correspondiente:
   ```js
   {
     id: "2376081829",         // ← número de la URL
     type: "vod",              // "vod" o "clip"
     title: "Nombre del video",
     description: "Descripción corta",
     thumbnail: "",            // URL de imagen o vacío para gradiente
     badge: "Clase 1",         // etiqueta de la card
     timestamp: { h: 0, m: 45, s: 30, ms: 0 }, // desde dónde empieza
     accent: "#00f5ff",        // color neon del borde
   }
   ```
4. Guardá el archivo → el cambio se ve en el browser sin recargar en la versión React

**Nota para el embed de Twitch:**
El parámetro `parent` en la URL del embed DEBE coincidir con el dominio donde está hosteada la página.
- En local con Live Server de VS Code: `parent=127.0.0.1`
- En Vercel: `parent=andyazhtec.com`
El código usa `window.location.hostname` automáticamente — no hay que cambiar nada.

---

---

## REGISTRO DE CAMBIOS — BUILD 004

```
2026-04-14 [BUILD 004] — Beta v0.3.1
  ~ UPDATED index.html — Sección store → tarjeta publicitaria única (.store-ad-card)
      - Eliminado: section-header, 6 pills de categoría, 3 preview-cards, store-teaser-cta
      - Agregado: banner clickeable completo → store.html
        · sad-bg-grid: rejilla tenue de fondo
        · sad-scanline: línea de barrido luminosa cada 3s
        · sad-border: borde cónico rainbow con @property --angle (CSS Houdini)
        · sad-floaters: 9 íconos flotando (drift + spin individual)
        · sad-eyebrow + dots pulsantes · sad-title con shimmer 2.8s
        · sad-prices: 3 chips animados (precio / ofertas / envío)
        · sad-cta: gradiente cycling + glow + arrow slide en hover
        · Scroll-reveal spring al entrar en viewport
        · Hover: scale(1.025) + translateY(-6px) + mega-glow
  ~ UPDATED css/styles.css — +240 líneas (10 keyframes nuevos, fallback Firefox/Safari)
  ~ UPDATED js/main.js — −37% líneas: removido Cart IIFE + initStoreFilters
      · initScrollReveal ahora incluye #storeAdCard
```

---

## REGISTRO DE CAMBIOS — BUILD 003

```
2026-04-14 [BUILD 003] — Beta v0.3.0
  + CREATED TASKS.txt — Tareas pendientes en 3 niveles (Urgente / Menos necesarias / Recomendadas)
      18 tareas documentadas con instrucciones paso a paso para el creador
  ~ UPDATED index.html — Sección store reemplazada por teaser mínimo
      - Eliminado: grid de 6 productos, carrito FAB, cart drawer completo
      - Agregado: pills de categorías, 3 preview-cards, CTA animado a store.html
  + CREATED store.html — E-commerce completo (26 KB HTML)
      - Topbar con ofertas de envío / seguridad / devoluciones
      - Header sticky con logo, searchbar con sugerencias, acciones (cuenta, carrito)
      - Nav de categorías horizontal con scroll
      - Hero banner con precio, descuento y CTA
      - Grid de categorías (8 pills con hover effect)
      - Deals del día: carrusel horizontal con countdown timer real
      - Layout store: sidebar de filtros + grid de productos
      - Sidebar: precio range slider, condición, marcas, rating
      - Sort: relevancia / precio asc-desc / nombre A-Z
      - 20 productos reales en 7 categorías (GPU, Periféricos, Audio, Storage, Cooling, Monitor, Silla)
      - Modales: Login, Registro, Mis Compras, Mis Sugerencias (wishlist), Checkout
      - Cart drawer con resumen (subtotal, envío gratis +$150, total)
      - Modal de detalle de producto (specs, stars, descripción extendida)
      - Andy banner con link al canal Twitch
      - Toast notifications
      - Footer con 4 columnas
  + CREATED css/store.css — 600+ líneas de estilos exclusivos para la tienda
      - Fondo: #0e0e2a (más claro que el main #050510)
      - Todos los estilos del e-commerce sin tocar styles.css
      - Estilos del teaser (store-preview-grid, store-cat-pill, btn-store-enter)
      - Responsive: 1024px, 768px, 480px breakpoints
  + CREATED js/store.js — 400+ líneas de lógica de tienda
      - PRODUCTS: 20 productos con brand, name, desc, price, specs, stars, badge
      - Módulo StoreApp (IIFE): init, filter, sort, search, cart, wishlist, modals
      - Search: debounce 180ms + sugerencias inline
      - Cart: localStorage (clave: atec_store_cart), render dinámico, badge bounce
      - Wishlist: localStorage (clave: atec_wishlist), toggle heart, render
      - Password strength indicator (weak/medium/strong)
      - Deals timer: countdown real con setInterval
      - XSS prevention: esc() en todos los datos del producto antes de innerHTML
```

---

## RESUMEN EJECUTIVO

| Campo            | Valor                                                                    |
|------------------|--------------------------------------------------------------------------|
| Versión          | Beta v0.3.0                                                              |
| Build            | 003                                                                      |
| Fecha            | 2026-04-14                                                               |
| Archivos totales | 8 (`index.html`, `store.html`, `TASKS.txt`, `css/styles.css`, `css/store.css`, `js/main.js`, `js/video-config.js`, `js/store.js`, `DEBUGLOG.md`) |
| Líneas de código | ~4200 (HTML: ~770 · CSS: ~1520 · JS: ~960)                              |
| Estado           | FUNCIONAL – abre directo en browser                                      |
| Tecnología base  | HTML5 + CSS3 Custom Properties + JS ES2022                               |
| Canal Twitch     | twitch.tv/profe_pikashu                                                  |
| Framework        | Vanilla (sin build tools) → migración a React planeada v0.3             |

---

## ESTRUCTURA DE ARCHIVOS

```
AndyAzhTEC.com/
├── index.html          ← Página principal completa (6 secciones)
├── css/
│   └── styles.css      ← Estilos Neon completos + responsive
├── js/
│   └── main.js         ← Lógica interactiva (cart, FAQ, counters…)
└── DEBUGLOG.md         ← Este archivo
```

---

## SECCIONES IMPLEMENTADAS

### 1. `#about` — Hero / Sobre AndyAzhTEC
- **Estado:** ✅ Completa
- Componentes:
  - Badge "Online" animado con `pulse-border`
  - Título con **efecto Glitch** (`::before` / `::after` con `clip-path` y keyframes)
  - Descripción, tags de rol y CTAs principales
  - Avatar circular con borde degradado animado (`ring-rotate`)
  - Floating chips con animación `float` individual (React, Supabase, GPU, Live)
  - Scroll indicator con bounce animation
- Notas: el avatar usa `<i class="fa-solid fa-robot">` como placeholder hasta que se agregue una imagen real.

### 2. `#gaming` — Gaming
- **Estado:** ✅ Completa
- Componentes:
  - 4 cards con `IntersectionObserver` scroll-reveal (delay escalonado: 0, 100, 200, 300ms)
  - Stats bar con contadores animados (1200+, 5400+, 48)
  - Efecto hover con borde violeta y elevación `translateY(-6px)`
- Bug conocido: los números de stats son placeholder, se conectarán a Supabase en v0.4.

### 3. `#ayrpc` — Curso AyRPC + Twitch
- **Estado:** ✅ Completa
- Componentes:
  - Grid de 2 columnas (contenido + panel de stats)
  - `live-badge` con punto rojo pulsante (`live-pulse`)
  - Lista de features con iconos Font Awesome
  - Twitch card: viewers, suscriptores, clases (con contadores animados)
  - Lista de módulos del curso (5 módulos placeholder)
  - Fondo con grid CSS punteado (`ayrpc-bg-grid`)
- Notas: los módulos y stats se gestionarán desde Supabase en v0.4.

### 4. `#store` — Hardware Store
- **Estado:** ✅ Funcional (frontend completo)
- Componentes:
  - 5 botones de filtro por categoría (all / gpu / periféricos / audio / storage)
  - 6 productos con: badge, ícono FA, nombre, descripción, precio (con tachado para descuento), botón "Agregar"
  - **Carrito completo:**
    - FAB flotante con badge de cantidad
    - Drawer lateral animado (slide desde derecha)
    - Overlay con backdrop-filter blur
    - Items con control de cantidad (+ / -)
    - Total calculado en tiempo real
    - Persistencia en `localStorage` (clave: `andyazhtec_cart`)
    - Feedback visual al agregar (scale + neon glow)
  - XSS prevention: `escapeHtml()` en nombres de productos antes de insertar en DOM
- Bug conocido: checkout button no tiene integración real (Stripe pendiente, v1.0).
- Bug conocido: filtro de tienda oculta items con `display:none` → el grid puede mostrar "huecos" visuales con algunos layouts. Fix planificado: usar `grid` con `visibility` en v0.2.

### 5. `#faq` — Preguntas Frecuentes
- **Estado:** ✅ Completa
- Componentes:
  - 5 preguntas con acordeón animado (`max-height` transition)
  - Comportamiento: solo 1 item abierto a la vez
  - Ícono rotante (`chevron-down → rotate(180deg)`)
  - Contenido: stream schedule, nivel del curso, envíos, Discord, seguridad/autenticación

### 6. Footer
- **Estado:** ✅ Completo
- Grid 3 columnas (brand + social links, secciones, tecnologías)
- Social links: Twitch, YouTube, Discord, X (Twitter), GitHub
- Version badge: `Beta v0.1.0`
- Co-autoría y créditos

---

## SISTEMA DE DISEÑO

### Paleta de colores (CSS Custom Properties)
| Variable         | Color     | Uso                                         |
|------------------|-----------|---------------------------------------------|
| `--cyan`         | `#00f5ff` | Precios, iconos activos, glow primario       |
| `--cyan-dim`     | `#00b4cc` | Sombras, gradientes                          |
| `--violet`       | `#a855f7` | Botones primarios, bordes hover, FAQs        |
| `--violet-dim`   | `#7c3aed` | Gradientes de botones                        |
| `--lilac`        | `#c084fc` | Títulos de cards, brand, texto destacado     |
| `--lilac-dim`    | `#9333ea` | Variante oscura                              |
| `--pink`         | `#e879f9` | Glitch accent, badges                        |
| `--bg-deep`      | `#050510` | Fondo base (casi negro con tono azul noche)  |
| `--bg-card`      | `rgba(10,10,30,0.85)` | Cards, panels                    |
| `--border-glow`  | `rgba(168,85,247,0.35)` | Bordes de todos los elementos  |

### Tipografías
- **Orbitron** (Google Fonts) — Títulos, brand, números, badges
- **Exo 2** (Google Fonts) — Texto corrido, botones, etiquetas

### Animaciones implementadas
| Nombre           | Tipo         | Usado en                               |
|------------------|--------------|----------------------------------------|
| `twinkle`        | opacity+scale | Stars del fondo de partículas          |
| `pulse-border`   | box-shadow    | Badge "Online" en hero                 |
| `glitch-1/2`     | transform+opacity | Texto "AndyAzhTEC" efecto glitch   |
| `ring-rotate`    | box-shadow glow | Ring del avatar                      |
| `float`          | translateY    | Floating chips del hero                |
| `bounce`         | translateY    | Scroll indicator                       |
| `live-pulse`     | opacity+scale | Punto rojo LIVE en Twitch card         |
| ScrollReveal     | IntersectionObserver | Cards de gaming (delay escalonado) |
| Counter          | rAF + easeOut cubic | Stats numéricos                   |
| Cursor trail     | rAF múltiple  | 8 dots en mouse (desktop only)         |

---

## DEPENDENCIAS EXTERNAS (CDN)

| Librería         | Versión | URL                                              |
|------------------|---------|--------------------------------------------------|
| Font Awesome     | 6.5.2   | cdnjs.cloudflare.com                             |
| Google Fonts     | latest  | Orbitron + Exo 2                                 |

**Sin NPM, sin build tools, sin bundler** — abre directamente en browser.

---

## SEGURIDAD IMPLEMENTADA

- `escapeHtml()` en Cart.render() para nombres de productos (previene XSS)
- `localStorage` solo guarda `name`, `price`, `qty` (no datos sensibles)
- Sin `eval()`, sin `innerHTML` dinámico sin escape
- `"use strict"` global en main.js
- No se carga ningún script de terceros excepto Font Awesome y Google Fonts

---

## BUGS CONOCIDOS / TECH DEBT

| ID   | Descripción                                                            | Severidad | Milestone |
|------|------------------------------------------------------------------------|-----------|-----------|
| B001 | Store filter: grid puede mostrar gaps al ocultar items                | Low       | v0.2      |
| B002 | Cart: checkout button sin lógica real (falta Stripe)                  | Medium    | v1.0      |
| B003 | Avatar usa ícono placeholder (sin imagen real)                        | Low       | v0.2      |
| B004 | Stats de gaming y Twitch son datos hardcoded (no dinámicos)           | Medium    | v0.4      |
| B005 | FAQ sin búsqueda/filtrado por texto                                   | Low       | v0.3      |
| B006 | No hay página 404 personalizada                                       | Low       | v0.2      |
| B007 | Cursor trail no se oculta al salir del viewport                       | Low       | v0.3      |
| B008 | Video embed Twitch requiere `parent` correcto — en `file://` no funciona | Medium  | README    |
| B009 | Thumbnails de VODs son placeholder (necesitan URL real del CDN de Twitch) | Low    | v0.3      |
| B010 | Portal de video: en mobile el iframe puede no respetar la altura mínima  | Low     | v0.3      |

---

## ROADMAP DE VERSIONES

### Beta v0.1.0 — ACTUAL (2026-04-14)
> Skeleton completo, todas las secciones, diseño neon, animaciones, carrito con localStorage

### Beta v0.2.0 — Pulido visual
- [ ] Fix B001, B003, B006, B007
- [ ] Agregar foto/avatar real
- [ ] Página 404 personalizada
- [ ] Optimización de performance (lazy load images, etc.)
- [ ] SEO básico (meta tags, og:image, sitemap)

### Beta v0.3.0 — Migración a React + Vite
- [ ] Setup: `npm create vite@latest` con template React + TypeScript
- [ ] Instalar Tailwind CSS (reemplaza parte de styles.css)
- [ ] Componentes: `<Navbar>`, `<HeroSection>`, `<GamingSection>`, `<AyRPCSection>`, `<Store>`, `<Cart>`, `<FAQ>`, `<Footer>`
- [ ] React Router para rutas separadas (`/`, `/store`, `/ayrpc`)
- [ ] Estado del carrito con Zustand
- [ ] FAQ con búsqueda en tiempo real

### Beta v0.4.0 — Backend + Base de datos
- [ ] Setup Supabase: `npm install @supabase/supabase-js`
- [ ] Tablas: `products`, `orders`, `order_items`, `profiles`, `courses`, `stream_stats`
- [ ] Row Level Security (RLS) policies
- [ ] Stats reales desde Supabase (gaming stats, Twitch viewers)
- [ ] Real-time con `supabase.channel()` para stats en vivo

### Beta v0.5.0 — Autenticación
- [ ] Setup Clerk: `npm install @clerk/clerk-react`
- [ ] `<ClerkProvider>` wrapping la app
- [ ] `<SignInButton>`, `<UserButton>` en navbar
- [ ] Rutas protegidas (acceso al temario del curso, historial de pedidos)
- [ ] Webhooks de Clerk → Supabase para sincronizar `user_id`

### v1.0.0 — Producción
- [ ] Integración Stripe: `npm install @stripe/stripe-js @stripe/react-stripe-js`
- [ ] Checkout completo con Stripe Elements
- [ ] Emails transaccionales con Resend
- [ ] Deploy en Vercel (`vercel deploy`)
- [ ] Dominio personalizado + SSL
- [ ] Analytics con Vercel Analytics o Plausible
- [ ] Monitoreo de errores con Sentry

---

## STACK TECNOLÓGICO RECOMENDADO (COMPLETO)

```
FRONTEND
  ├── React 19 + Vite 6          ← Build tool ultrarrápido, HMR instantáneo
  ├── TypeScript 5               ← Tipado estático, menos bugs
  ├── Tailwind CSS 4             ← Utility-first, diseño sin salir del JSX
  ├── Framer Motion              ← Animaciones declarativas en React
  ├── Zustand                    ← Estado global mínimo (carrito, auth state)
  ├── React Router 7             ← Enrutamiento SPA
  └── Font Awesome 6 (npm)       ← Iconos (ya en uso)

BACKEND / BAAS
  ├── Supabase                   ← PostgreSQL + realtime + storage + edge functions
  │   ├── Auth (alternativa a Clerk si se quiere todo en uno)
  │   ├── Database (tablas + RLS)
  │   ├── Storage (imágenes de productos, avatar)
  │   └── Realtime (stats de live, viewers)
  └── Vercel Functions / Edge    ← Serverless para lógica de negocio sensible

AUTENTICACIÓN
  └── Clerk                      ← Auth con UI lista, OAuth (Google, Twitch), MFA

PAGOS
  └── Stripe                     ← Checkout Elements, webhooks, facturas

DEPLOY
  ├── Vercel                     ← Deploy automático desde GitHub, CDN global
  └── Cloudflare                 ← DNS + protección DDoS + caché

EXTRAS RECOMENDADOS
  ├── Resend                     ← Emails transaccionales (confirmación de pedido)
  ├── Sentry                     ← Error tracking
  ├── Plausible                  ← Analytics sin cookies, GDPR-friendly
  └── Zod                        ← Validación de esquemas en forms y API responses
```

---

## REGISTRO DE CAMBIOS (CHANGELOG)

```
2026-04-14 [BUILD 001] — Beta v0.1.0
  + CREATED index.html — Estructura completa de 6 secciones
  + CREATED css/styles.css — Sistema de diseño neon (cyan/violet/lilac)
  + CREATED js/main.js — Lógica interactiva (8 módulos)
  + CREATED DEBUGLOG.md — Este archivo
  
  Módulos JS:
    + initParticles()      — 90 estrellas animadas en fondo
    + initNavbar()         — Scroll-aware con backdrop blur
    + initHamburger()      — Mobile menu toggle
    + initScrollReveal()   — Cards con IntersectionObserver
    + initCounters()       — Contadores numéricos con easeOut
    + initStoreFilters()   — Filtrado por categoría con fade
    + Cart (IIFE)          — Carrito completo con localStorage
    + initFAQ()            — Acordeón exclusivo
    + initActiveNav()      — Highlight de nav por sección visible
    + initCursorTrail()    — Trail de 8 dots en mouse (desktop)
```

---

*DEBUGLOG generado automáticamente · AndyAzhTEC.com · Beta v0.1.0*
