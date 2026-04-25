# PetAlo · Brief para construir la landing page

## Cómo usar este documento

Este es un brief completo para que un agente de IA (Claude, GPT, Gemini, Cursor, etc.) construya la landing page inicial de **PetAlo**. Toda la información de marca, diseño, contenido y stack técnico está aquí. El agente NO debe inventar — solo ejecutar.

---

## 0. Quién es el cliente y qué se está construyendo

**Cliente:** Juan David Montoya — emprendedor en Medellín, Colombia, con Master en IA de la Universidad de los Andes.

**Empresa:** Anti-Real Labs S.A.S. (NIT 902.051.688-7, Medellín, Colombia, formalizada).

**Producto:** **PetAlo** — un collar GPS inteligente para mascotas con TinyML/Edge AI integrado. El dispositivo se comunica con la nube vía LTE-M y envía datos de ubicación, actividad y estado de batería a una app móvil. El producto está en fase de prototipo (hardware llegando esta semana, primeros experimentos en Wokwi ya hechos).

**Propuesta de valor central:** "Tecnología que cuida a tu mascota" — protección emocional + tracking + analytics, con filosofía calm tech (no alarmista).

**Estado del proyecto al construir esta página:**
- Hardware: en camino (ESP32, GPS, MPU6050, SIM7000G LiPo, TP4056). Primer Blink físico a punto de hacer.
- Marca: nombre PetAlo verificado en SIPI Colombia (libre en clases 9, 18, 42). Logo final aprobado (cloud + heart antenna + paws). Dominio petalogps.com comprado y con email profesional vía Zoho Mail funcional.
- Producto: aún sin lanzar. Esta landing es para **capturar interés temprano** (lista de espera), no para vender.

---

## 1. Objetivo de la landing page

**Una sola misión:** capturar correos electrónicos de personas interesadas en PetAlo cuando lance.

**Métricas de éxito:**
- Visitantes que se inscriben en lista de espera (target: 5-10% conversion)
- Compartibilidad orgánica (que la gente quiera mostrarla a sus amigos)
- Confianza percibida (que se vea profesional, no "MVP feo")

**NO hay carrito de compras, NO hay producto físico aún, NO hay precio. Solo presencia + waitlist.**

---

## 2. Stack técnico recomendado

### Hosting: Vercel (gratis)
- Deploy desde GitHub
- SSL automático
- Custom domain → conectar petalogps.com
- Edge functions disponibles si se necesitan

### Framework: Astro
- Razón: estático, ultra-rápido, SEO perfecto, soporte de animaciones
- Alternativa aceptable: Next.js (si el agente lo prefiere) o HTML+CSS+JS puro
- Si el agente domina mejor un stack, puede sustituir, pero la salida debe ser igual de rápida

### Estilos: Tailwind CSS
- Usar las variables de marca (ver sección 5)
- Mobile-first

### Formulario: Formspree (free tier)
- 50 envíos al mes gratis
- Reenvía a `juan@petalogps.com` y/o `hola@petalogps.com`
- O alternativa: Netlify Forms si se hostea ahí, o un endpoint custom de Vercel

### Analytics: Plausible o Vercel Analytics (no Google Analytics — más privacy-friendly y coherente con la filosofía)

### Performance target
- Lighthouse score: 95+ en Performance, Accessibility, SEO
- LCP < 1.5s
- 100% responsive (mobile, tablet, desktop)

---

## 3. Identidad de marca

### Filosofía
**Calm tech.** El producto NO grita "EMERGENCIA, TU PERRO SE PERDIÓ", susurra "Luna está bien, descansando en el sofá". Toda la comunicación debe transmitir tranquilidad, calidez, y confianza tecnológica sin frialdad.

### Tono de voz
- Cálido pero profesional
- Habla de "tu mascota" o usa nombres reales (Luna, Simón, Coco) en ejemplos
- Evita jerga técnica innecesaria
- Tono colombiano natural pero universal (sin "parce", sin "bacano" — palabras que vivan en cualquier país hispano)
- Frases cortas, impacto visual

### Paleta de colores (variables CSS)

```css
:root {
  --lienzo: #FAFCFE;       /* fondo principal claro */
  --cielo: #B8E0F5;        /* azul claro suave */
  --cielo-suave: rgba(184, 224, 245, 0.35);
  --horizonte: #4A9FD4;    /* azul principal de marca */
  --horizonte-oscuro: #2C6FA0;
  --nube: #E2E8F0;         /* gris muy claro */
  --tinta: #2D3748;        /* texto principal oscuro */
  --tinta-suave: #4A5568;
  --niebla: #718096;       /* texto secundario */
  --pradera: #68D391;      /* verde · confirmación · éxito */
  --coral: #FC8181;        /* coral · alertas suaves (NO usar mucho) */
}
```

**Regla de oro:** la página debe sentirse **azul-cielo dominante**, con acentos blancos y tinta oscura para texto. El coral solo aparece en errores o estados críticos. El verde confirma acciones positivas.

### Tipografía

**Display/Headings: Fraunces (Google Fonts)**
- Pesos: 500 (regular), 600 (semibold)
- La "a" central de "petalo" SIEMPRE va en **itálica peso 600 color Horizonte (#4A9FD4)**
- Usado en h1, h2, hero text, wordmarks

**Body/UI: Nunito (Google Fonts)**
- Pesos: 400, 500, 600, 700
- Usado en párrafos, botones, formularios, navegación

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,600&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Logo

Los archivos del logo están en la carpeta del proyecto:
- `petalo-isotipo.svg` — solo el símbolo (cloud + heart + waves + paw trail)
- `petalo-logo-completo.svg` — símbolo + wordmark "petalo"
- También disponibles en PNG, JPG, PDF

**El logo principal en el hero debe ser el SVG isotipo con animación sutil (heart pulsing, waves emanating).** El wordmark "petalo" (con la a azul itálica) va abajo o al lado según el lockup.

**Animaciones del logo (CSS keyframes):**
```css
@keyframes wave-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.08); }
}
@keyframes heart-beat {
  0%, 70%, 100% { transform: scale(1); }
  35% { transform: scale(1.08); }
}
```

---

## 4. Arquitectura de la página

Una sola página vertical (one-pager) con las siguientes secciones en orden:

### 4.1. Navbar (sticky, transparente con backdrop-blur)
- Logo PetAlo a la izquierda (isotipo pequeño + wordmark)
- Links derecha: "Producto", "Filosofía", "Contacto"
- Botón CTA derecha: "Avísame cuando lance" (scroll suave al formulario)

### 4.2. Hero (full-height, centered)
- Logo PetAlo grande animado (isotipo) — el respirando
- Headline: **"Tecnología que cuida a tu mascota"** (Fraunces 500, grande)
- Subheadline: **"Un collar GPS con inteligencia artificial integrada que cuida a tu mascota como tú lo harías. Calmo. Preciso. Siempre presente."**
- CTA primario: **"Avísame cuando lance"** (botón Horizonte)
- Background: gradiente sutil del Lienzo al Cielo, con tal vez ondas SVG decorativas suaves al fondo
- En mobile: layout vertical, todo centrado

### 4.3. Sección "El problema"
- Título: **"Cuando tu mascota desaparece, el tiempo se detiene"**
- 3 cards horizontales (mobile: stack vertical):
  1. **Ansiedad constante** — "El 25% de mascotas se escapan al menos una vez en la vida. Vivimos con miedo de que pase."
  2. **Tracking imperfecto** — "Los GPS tradicionales son grandes, agresivos, mandan alertas estridentes y duran horas, no días."
  3. **Sin contexto** — "Solo te dicen DÓNDE está. No CÓMO está, qué hace, si necesita algo."
- Tono empático, no catastrófico

### 4.4. Sección "Conoce PetAlo" (la solución)
- Título: **"PetAlo, el primer collar que entiende a tu mascota"**
- Layout split: imagen del logo PetAlo grande a un lado, lista de features al otro

**Features (íconos minimalistas + texto corto):**

1. **🌐 GPS inteligente con IA**  
   Solo se enciende cuando hace falta. Aprende los patrones de tu mascota y solo te avisa cuando algo es realmente distinto.

2. **🔋 Hasta 7 días de batería**  
   Diseñado para que cargues una vez por semana, no todas las noches. Como un Apple Watch, pero para tu mascota.

3. **💗 Cuida la salud, no solo la ubicación**  
   Detecta movimiento, descanso, ejercicio y patrones inusuales. Te ayuda a entender mejor a tu compañero.

4. **☁️ Conexión segura en la nube**  
   Comunicación cifrada de extremo a extremo. Ni nosotros podemos leer tus datos. Solo tú y tu mascota.

5. **🎨 Diseño hecho con cariño**  
   Pequeño, ligero, hermoso. Cómodo para mascotas de 3 kg en adelante. Resistente al agua y al barro.

6. **📱 App con personalidad**  
   No alertas estridentes. Conversaciones suaves. "Luna está bien, descansando en el sofá".

### 4.5. Sección "Filosofía: calm tech"
- Título: **"La tecnología más poderosa es la que casi no se nota"**
- Texto largo descriptivo (1-2 párrafos):

> "PetAlo no te bombardea con notificaciones. No te despierta a las 3 a.m. con alertas falsas. No te hace sentir que tu mascota está siempre en peligro.
>
> En cambio, está siempre vigilante en silencio. Solo aparece cuando importa. Habla suave, como un amigo que está al pendiente."

- Imagen/ilustración: un mockup de notificación de la app que diga "🌤️ Luna al 87% · 5 días de energía" con estilo iOS

### 4.6. Sección "Para quién es"
- Título: **"PetAlo es para ti si..."**
- 3-4 perfiles cortos:
  - **Tu mascota es de la familia.** No es solo un perro. Es Luna, Simón, Coco. Y quieres lo mejor para ellos.
  - **Quieres tranquilidad sin obsesión.** No quieres tener el celular en la mano todo el día. Quieres saber que cuando algo importe, te enterarás.
  - **Valoras el diseño y la simplicidad.** Te molestan los productos toscos, agresivos, mal pensados. Quieres algo que se sienta bien tener.
  - **Crees en tecnología con propósito.** No tecnología por tecnología. Tecnología que mejora la vida de quienes amas, incluyendo a los que no hablan.

### 4.7. Sección CTA principal · Lista de espera
- Título grande: **"Sé de los primeros en conocer a Luna y a su PetAlo"**
- Subtítulo: **"Estamos en fase final de desarrollo. Suscríbete y te avisaremos antes que a nadie cuando esté listo, con un descuento especial para los primeros 100."**
- Formulario con:
  - Campo: Nombre
  - Campo: Correo electrónico
  - Campo opcional: Nombre de tu mascota (textfield, opcional, agrega calor)
  - Campo opcional dropdown: Tipo de mascota (perro, gato, otro)
  - Botón: "Avísame cuando lance" (Horizonte, grande)
- Pequeño texto debajo: "No spam. No vendemos tu correo. Solo te avisamos cuando PetAlo esté listo."
- Después de enviar: mensaje de confirmación cálido tipo "🌱 ¡Gracias! Te avisaremos pronto. Mientras tanto, dale un abrazo a tu mascota de nuestra parte."

### 4.8. Sección "Sobre nosotros" (corta)
- Título: **"Construido con amor desde Medellín"**
- Texto: "PetAlo nace en los laboratorios de Anti-Real Labs, una startup de Colombia dedicada a crear tecnología con alma. Combinamos IA de punta con un cariño profundo por las mascotas y sus humanos."

### 4.9. Footer
- Logo PetAlo pequeño
- Copyright: "© 2026 Anti-Real Labs S.A.S. · Hecho en Medellín, Colombia 🇨🇴"
- Email de contacto: hola@petalogps.com (mailto link)
- Enlaces: Privacidad, Términos (placeholder #, los llenamos después)
- Redes sociales (placeholders por ahora — Instagram, TikTok, X)

---

## 5. Implementación técnica detallada

### Estructura de carpetas (Astro)

```
petalo-landing/
├── public/
│   ├── petalo-isotipo.svg
│   ├── petalo-logo-completo.svg
│   ├── favicon.ico (generar a partir del isotipo)
│   ├── og-image.png (1200x630, generar con isotipo + wordmark)
│   └── robots.txt
├── src/
│   ├── pages/
│   │   └── index.astro
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Problema.astro
│   │   ├── Producto.astro
│   │   ├── Filosofia.astro
│   │   ├── ParaQuien.astro
│   │   ├── Waitlist.astro
│   │   ├── About.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css
│   └── layouts/
│       └── Layout.astro
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

### SEO meta tags (en Layout.astro)

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PetAlo · Tecnología que cuida a tu mascota</title>
<meta name="description" content="PetAlo es el primer collar GPS inteligente con IA integrada que cuida a tu mascota como tú lo harías. Calmo. Preciso. Siempre presente." />

<!-- Open Graph -->
<meta property="og:title" content="PetAlo · Tecnología que cuida a tu mascota" />
<meta property="og:description" content="Collar GPS con inteligencia artificial. Calmo. Preciso. Siempre presente." />
<meta property="og:image" content="https://petalogps.com/og-image.png" />
<meta property="og:url" content="https://petalogps.com" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/petalo-isotipo.svg" />

<link rel="canonical" href="https://petalogps.com" />
```

### Animaciones / interactividad

- **Scroll suave** entre secciones (nav links a anchors)
- **Fade-in al scroll** para cada sección (Intersection Observer o librería simple como `aos`)
- **Logo del hero** con la animación de respiración (CSS keyframes ya definidos)
- **Hover states** en botones (suave, ~200ms transition)
- **Micro-interacciones** en el formulario (focus rings con color Horizonte, validación en vivo)

### Accesibilidad
- Alt text en todas las imágenes
- aria-labels en botones de íconos
- Contraste WCAG AA mínimo
- Focus indicators visibles
- Navegación por teclado funcional
- prefers-reduced-motion: respetar y desactivar animaciones si está activo

### Performance
- Imágenes en WebP
- SVG inline cuando se pueda
- Lazy load de secciones inferiores
- Preconnect a fonts.googleapis.com
- Critical CSS inline
- Sin librerías pesadas innecesarias

---

## 6. Logo SVG completo (referencia visual)

El logo principal usa esta estructura (ya está en los archivos pero por si el agente necesita inline):

```svg
<svg viewBox="-40 0 340 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudMain" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#B8E0F5"/>
      <stop offset="55%" stop-color="#7DB9DC"/>
      <stop offset="100%" stop-color="#4A9FD4"/>
    </linearGradient>
    <radialGradient id="cloudInner" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>

  <!-- Signal waves -->
  <path d="M 100 52 Q 80 70 100 88" stroke="#4A9FD4" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.35"/>
  <path d="M 110 60 Q 96 70 110 80" stroke="#4A9FD4" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
  <path d="M 160 52 Q 180 70 160 88" stroke="#4A9FD4" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.35"/>
  <path d="M 150 60 Q 164 70 150 80" stroke="#4A9FD4" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>

  <!-- Heart antenna -->
  <path d="M 130 62 C 124 53, 112 56, 115 68 C 118 79, 130 88, 130 88 C 130 88, 142 79, 145 68 C 148 56, 136 53, 130 62 Z" fill="#4A9FD4"/>
  <line x1="130" y1="88" x2="130" y2="102" stroke="#4A9FD4" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Cloud -->
  <path d="M 45 240 C 10 240, 5 198, 42 183 C 20 148, 55 120, 92 138 C 92 92, 160 92, 168 135 C 205 115, 245 145, 222 182 C 255 200, 248 240, 210 240 Z" fill="url(#cloudMain)"/>
  <path d="M 45 240 C 10 240, 5 198, 42 183 C 20 148, 55 120, 92 138 C 92 92, 160 92, 168 135 C 205 115, 245 145, 222 182 C 255 200, 248 240, 210 240 Z" fill="url(#cloudInner)"/>

  <!-- Paw trail (4 paws diagonal inside cloud) -->
  <g fill="white">
    <g transform="translate(60 220) rotate(28) scale(0.65)">
      <ellipse cx="-13" cy="-7" rx="5.5" ry="7" transform="rotate(-24 -13 -7)"/>
      <ellipse cx="-5" cy="-16" rx="5.5" ry="7.5" transform="rotate(-6 -5 -16)"/>
      <ellipse cx="5" cy="-16" rx="5.5" ry="7.5" transform="rotate(6 5 -16)"/>
      <ellipse cx="13" cy="-7" rx="5.5" ry="7" transform="rotate(24 13 -7)"/>
      <path d="M 0 -1 C -10 -3, -20 2, -23 11 C -25 20, -21 28, -15 30 C -9 31, -4 28, 0 26 C 4 28, 9 31, 15 30 C 21 28, 25 20, 23 11 C 20 2, 10 -3, 0 -1 Z"/>
    </g>
    <g transform="translate(110 195) rotate(30) scale(0.65)">
      <ellipse cx="-13" cy="-7" rx="5.5" ry="7" transform="rotate(-24 -13 -7)"/>
      <ellipse cx="-5" cy="-16" rx="5.5" ry="7.5" transform="rotate(-6 -5 -16)"/>
      <ellipse cx="5" cy="-16" rx="5.5" ry="7.5" transform="rotate(6 5 -16)"/>
      <ellipse cx="13" cy="-7" rx="5.5" ry="7" transform="rotate(24 13 -7)"/>
      <path d="M 0 -1 C -10 -3, -20 2, -23 11 C -25 20, -21 28, -15 30 C -9 31, -4 28, 0 26 C 4 28, 9 31, 15 30 C 21 28, 25 20, 23 11 C 20 2, 10 -3, 0 -1 Z"/>
    </g>
    <g transform="translate(160 170) rotate(28) scale(0.65)">
      <ellipse cx="-13" cy="-7" rx="5.5" ry="7" transform="rotate(-24 -13 -7)"/>
      <ellipse cx="-5" cy="-16" rx="5.5" ry="7.5" transform="rotate(-6 -5 -16)"/>
      <ellipse cx="5" cy="-16" rx="5.5" ry="7.5" transform="rotate(6 5 -16)"/>
      <ellipse cx="13" cy="-7" rx="5.5" ry="7" transform="rotate(24 13 -7)"/>
      <path d="M 0 -1 C -10 -3, -20 2, -23 11 C -25 20, -21 28, -15 30 C -9 31, -4 28, 0 26 C 4 28, 9 31, 15 30 C 21 28, 25 20, 23 11 C 20 2, 10 -3, 0 -1 Z"/>
    </g>
    <g transform="translate(210 140) rotate(30) scale(0.65)">
      <ellipse cx="-13" cy="-7" rx="5.5" ry="7" transform="rotate(-24 -13 -7)"/>
      <ellipse cx="-5" cy="-16" rx="5.5" ry="7.5" transform="rotate(-6 -5 -16)"/>
      <ellipse cx="5" cy="-16" rx="5.5" ry="7.5" transform="rotate(6 5 -16)"/>
      <ellipse cx="13" cy="-7" rx="5.5" ry="7" transform="rotate(24 13 -7)"/>
      <path d="M 0 -1 C -10 -3, -20 2, -23 11 C -25 20, -21 28, -15 30 C -9 31, -4 28, 0 26 C 4 28, 9 31, 15 30 C 21 28, 25 20, 23 11 C 20 2, 10 -3, 0 -1 Z"/>
    </g>
  </g>
</svg>
```

---

## 7. Plan de deployment paso a paso

1. **Crear repo en GitHub:** `petalogps-landing` (privado por ahora)
2. **Inicializar Astro:** `npm create astro@latest`
3. **Configurar Tailwind:** seguir guía oficial de Astro+Tailwind
4. **Construir todas las secciones** según specs arriba
5. **Test local:** `npm run dev`, verificar responsive en mobile/tablet/desktop
6. **Lighthouse audit:** target 95+ en todo
7. **Push a GitHub**
8. **Conectar con Vercel:** importar repo, deploy automático
9. **Conectar dominio:** en Vercel Domains, agregar `petalogps.com`. Vercel da los DNS records necesarios (CNAME o A record). El usuario los agrega en Namecheap (Advanced DNS).
10. **Verificar SSL:** Vercel lo activa automáticamente
11. **Test final:** ingresar a https://petalogps.com y validar que todo funcione

---

## 8. Lo que el agente NO debe hacer

- ❌ No inventar features que no estén en este brief
- ❌ No agregar precio del producto (no hay precio definido)
- ❌ No prometer fechas específicas de lanzamiento
- ❌ No usar lenguaje agresivo de venta ("¡COMPRA YA!", "¡OFERTA LIMITADA!")
- ❌ No usar stock photos genéricas de mascotas si no las pide el usuario — preferir ilustraciones/SVG/abstracto
- ❌ No agregar un blog (aún)
- ❌ No agregar un sistema de login (aún)
- ❌ No usar emojis en exceso — máximo 1 por sección, con propósito
- ❌ No usar pop-ups intrusivos

## 9. Lo que el agente SÍ debe hacer

- ✅ Hacer una landing simple, hermosa, que cargue rápido
- ✅ Respetar 100% la paleta y tipografía
- ✅ Que se vea profesional pero cálida
- ✅ Mobile-first, responsive impecable
- ✅ Formulario funcional que reenvíe a hola@petalogps.com
- ✅ SEO-ready (meta tags, OG image, sitemap.xml, robots.txt)
- ✅ Performance 95+ Lighthouse
- ✅ Código limpio, comentado, mantenible
- ✅ Si hay dudas estéticas: tomar la decisión que MÁS respete la filosofía calm tech (suave > agresivo, sutil > exagerado)

---

## 10. Entregables esperados

1. **Repo de GitHub** con todo el código
2. **Sitio en producción** en https://petalogps.com
3. **README.md** explicando cómo correr local, cómo deployar, cómo modificar contenido
4. **Notas de cambios futuros sugeridos** (e.g., agregar testimonios cuando haya, agregar pricing cuando se defina, etc.)

---

## Anexo A: Frases clave para reusar

- "Tecnología que cuida a tu mascota"
- "Calmo. Preciso. Siempre presente."
- "Como tú lo harías."
- "Hecho con cariño desde Medellín."
- "Luna está bien."
- "Energía para 5 días más."
- "No alertas estridentes. Conversaciones suaves."

## Anexo B: Datos de contacto y referencias

- **Dominio:** petalogps.com
- **Email principal:** juan@petalogps.com
- **Email contacto público:** hola@petalogps.com
- **Empresa:** Anti-Real Labs S.A.S., NIT 902.051.688-7, Medellín, Colombia
- **Repositorio:** (pendiente, crear)
- **Hosting:** Vercel (cuenta pendiente)
- **Form handler:** Formspree (cuenta pendiente)

---

**Fin del brief. Que el otro agente construya. 🌱🐾**
