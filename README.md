# PetAlo Landing Page

Landing page oficial de PetAlo: un collar GPS inteligente para mascotas con IA integrada. El sitio está construido con Astro, Tailwind CSS y salida estática lista para Vercel.

## Correr local

Requisitos:

- Node.js 20 o superior.
- npm.

Instala dependencias:

```bash
npm install
```

Arranca el servidor local:

```bash
npm run dev
```

Abre:

```text
http://localhost:4321
```

Genera el build de producción:

```bash
npm run build
```

Previsualiza el build:

```bash
npm run preview
```

Nota para Windows/PowerShell: si aparece un error de política de ejecución con `npm.ps1`, usa `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

## Configurar Formspree

El formulario usa la variable pública `PUBLIC_FORMSPREE_ENDPOINT`.

1. Entra a [Formspree](https://formspree.io/) y crea una cuenta.
2. Crea un nuevo form para PetAlo.
3. Configura el correo receptor como `hola@petalogps.com` o el correo que prefieras.
4. Copia el endpoint que te da Formspree. Se ve parecido a:

```text
https://formspree.io/f/abcdwxyz
```

5. Crea un archivo `.env` en la raíz del proyecto, usando `.env.example` como base:

```bash
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
```

6. Reinicia el servidor local si estaba corriendo.

Si la variable no está configurada, o si Formspree falla, la landing muestra un fallback suave con enlace a `mailto:hola@petalogps.com`.

## Deploy en Vercel

1. Sube este proyecto a GitHub.
2. Entra a [Vercel](https://vercel.com/).
3. Selecciona **Add New Project**.
4. Importa el repo de GitHub.
5. Vercel debería detectar Astro automáticamente.
6. Confirma estos valores si Vercel los pide:

```text
Framework Preset: Astro
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

7. En **Environment Variables**, agrega:

```text
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
```

8. Haz deploy.

Este sitio no necesita server functions. Astro genera HTML, CSS, JS y assets estáticos en `dist/`, y Vercel los sirve directamente.

## Conectar petalogps.com en Vercel y Namecheap

Primero agrega el dominio en Vercel:

1. Entra al proyecto en Vercel.
2. Ve a **Settings**.
3. Abre **Domains**.
4. Agrega:

```text
petalogps.com
www.petalogps.com
```

5. Vercel mostrará los DNS records exactos que debes poner.

Valores generales recomendados por Vercel:

| Tipo | Host | Valor |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns-0.com` |

Importante: copia los valores exactos que aparezcan en Vercel si son distintos. Vercel puede asignar un CNAME específico para tu proyecto.

Luego configura Namecheap:

1. Entra a Namecheap.
2. Ve a **Domain List**.
3. Busca `petalogps.com`.
4. Haz clic en **Manage**.
5. Abre **Advanced DNS**.
6. En **Host Records**, elimina records `A`, `AAAA` o `CNAME` anteriores que choquen con `@` o `www`.
7. Agrega el record del dominio raíz:

```text
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

8. Agrega el record de `www`:

```text
Type: CNAME Record
Host: www
Value: cname.vercel-dns-0.com
TTL: Automatic
```

9. Guarda cambios.
10. Vuelve a Vercel y espera la verificación.

La propagación suele tomar minutos, pero puede tardar hasta 24-48 horas. Cuando Vercel marque el dominio como válido, SSL se activa automáticamente.

## Editar copy y contenido

La landing está separada por secciones en `src/components/`:

- `Navbar.astro`: navegación y CTA superior.
- `Hero.astro`: hero principal.
- `Problema.astro`: sección del problema.
- `Producto.astro`: features de PetAlo.
- `Filosofia.astro`: calm tech y mockup de notificación.
- `ParaQuien.astro`: perfiles de usuario.
- `Waitlist.astro`: formulario y fallback.
- `About.astro`: texto de Anti-Real Labs / Medellín.
- `Footer.astro`: email, enlaces y redes placeholder.

La página principal está en:

```text
src/pages/index.astro
```

Los metadatos SEO principales están en:

```text
src/layouts/Layout.astro
```

## Cambiar colores de marca

Los colores viven en:

```text
src/styles/global.css
```

Busca estos bloques:

```css
:root { ... }
@theme { ... }
```

Actualiza ambos si cambias un color. `:root` alimenta CSS normal y `@theme` alimenta clases Tailwind como `bg-cielo`, `text-horizonte` o `border-nube`.

Paleta actual:

```css
--lienzo: #FAFCFE;
--cielo: #B8E0F5;
--horizonte: #4A9FD4;
--horizonte-oscuro: #2C6FA0;
--nube: #E2E8F0;
--tinta: #2D3748;
--tinta-suave: #4A5568;
--niebla: #718096;
--pradera: #68D391;
--coral: #FC8181;
```

## Assets de marca

Los SVG públicos están en:

```text
public/petalo-isotipo.svg
public/petalo-logo-completo.svg
```

Los assets generados están en:

```text
public/favicon.ico
public/apple-touch-icon.png
public/og-image.png
```

Para regenerarlos:

```bash
npm run generate:assets
```

El script usa:

```text
scripts/generate-assets.mjs
```

## Notas futuras sugeridas

- Agregar testimonios cuando haya primeros usuarios beta.
- Agregar pricing cuando el producto tenga precio definido.
- Crear páginas reales de privacidad y términos antes de campañas pagas.
- Conectar Plausible o eventos de conversión más finos si Vercel Analytics se queda corto.
