# Portafolio — Jean Pool Huaman De La Cruz

Portafolio interactivo en formato de presentación (deck de diapositivas a pantalla
completa), construido con **HTML5, CSS3 y JavaScript Vanilla puro** — sin frameworks,
sin librerías, sin paso de compilación.

## Cómo abrirlo

Simplemente haz doble clic sobre `index.html`. Se abre directamente en el navegador,
sin instalar nada ni levantar un servidor.

> Nota: para que las fuentes (Space Grotesk / Inter / JetBrains Mono) carguen, el
> navegador necesita conexión a internet la primera vez (se cargan desde Google Fonts
> vía `@import` en `assets/css/variables.css`). Si no hay conexión, el sitio usa
> automáticamente las fuentes del sistema como respaldo — el diseño no se rompe.

## Estructura del proyecto

```
portfolio/
├── index.html                 → estructura completa de las 8 diapositivas
├── README.md                  → este archivo
└── assets/
    ├── css/
    │   ├── variables.css      → tokens de diseño (colores, tipografía, espaciado)
    │   ├── reset.css          → reset mínimo
    │   ├── base.css           → tipografía global, foco accesible, skip-link
    │   ├── layout.css         → estructura del deck, barra superior, riel lateral
    │   ├── components.css     → botones, cards, modal, timeline, chips, etc.
    │   ├── animations.css     → keyframes, loader, entradas escalonadas
    │   └── responsive.css     → breakpoints tablet / mobile
    ├── js/
    │   ├── main.js            → orquesta la inicialización de todo
    │   ├── slideDeck.js       → motor de navegación (wheel, touch, teclado, riel)
    │   ├── reveal.js          → animaciones de entrada + IntersectionObserver
    │   ├── cursor.js          → cursor personalizado (solo puntero fino)
    │   ├── particles.js       → fondo animado de red de nodos (canvas)
    │   ├── projectModal.js    → modal accesible de detalle de proyecto
    │   └── contact.js         → copiar correo, volver al inicio
    ├── images/
    │   ├── profile-full.webp / .png     → foto principal (fondo removido)
    │   └── profile-square.webp / .png   → recorte cuadrado para avatar circular
    ├── icons/                 → (reservado; los iconos van embebidos como
    │                             <symbol> inline en index.html para evitar
    │                             llamadas fetch() que fallan al abrir con file://)
    ├── fonts/                 → (reservado; actualmente se usan Google Fonts vía
    │                             CDN — ver nota de personalización más abajo)
    └── cv/
        └── CV_Jean_Pool_Huaman_De_La_Cruz.pdf   → CV descargable desde la Slide 8
```

## Las 9 diapositivas

1. **Inicio** — Presentación, foto principal, CTA.
2. **Sobre mí** — Perfil, timeline de formación, tecnologías favoritas.
3. **Stack tecnológico** — 10 tarjetas (lenguajes, frameworks, bases de datos, control de versiones).
4. **Proyectos** — PetCare, NeuroZen y AgroSMART, con modal de detalle (problema, rol, arquitectura, impacto).
5. **Trayectoria** — Timeline de crecimiento: fundamentos → cursos clave → proyectos aplicados → próximo paso.
6. **Habilidades** — Barras decorativas basadas en la cantidad real de tecnologías por área (nunca porcentajes inventados).
7. **Habilidades blandas** — Glass cards con icono, hover e inclinación 3D sutil al mover el cursor.
8. **GitHub** — Tarjetas de repositorios, con la estructura lista para conectar la API pública de GitHub.
9. **Contacto** — Correo (con botón de copiar), LinkedIn, GitHub, descarga de CV y botón de volver al inicio.

## Navegación

- **Rueda del mouse** (con umbral y bloqueo de animación para evitar saltos).
- **Touch / swipe** vertical (los swipes horizontales se ignoran para no chocar con los carruseles internos en mobile).
- **Teclado**: `↑` `↓`, `Page Up` / `Page Down`, `Home` (primera slide), `End` (última slide).
- **Riel lateral** (los 8 puntos, con etiqueta al pasar el mouse o el foco).
- **Flechas** inferiores.

## Personalización

### Colores y tipografía
Todo el sistema de diseño vive en `assets/css/variables.css`. Cambia las variables
`--void`, `--electric`, `--frost`, etc. y se propaga a todo el sitio.

### Contenido
El texto vive directamente en `index.html`, organizado por `<section class="slide">`.
Los datos de los modales de proyecto están en `assets/js/projectModal.js` (objeto `DATA`).

### Conectar la API real de GitHub (Slide 7)
Actualmente la Slide 7 muestra tarjetas estáticas con la etiqueta "sync pendiente" en
lugar de estrellas/forks inventados. Para conectarlo a datos reales:

1. Al abrir el sitio con `file://`, las llamadas `fetch()` a APIs externas están
   bloqueadas por el navegador. Si vas a activar esta función, sirve el proyecto con
   un servidor local simple (por ejemplo `npx serve` o la extensión "Live Server").
2. En `assets/js/main.js`, agrega una función que haga
   `fetch('https://api.github.com/users/charlie404x/repos')`, y con la respuesta,
   reemplaza el contenido de `[data-gh-stat="stars"]` y `[data-gh-stat="forks"]`
   por `repo.stargazers_count` y `repo.forks_count`.

### CV
Reemplaza el archivo en `assets/cv/CV_Jean_Pool_Huaman_De_La_Cruz.pdf` cuando
tengas una versión actualizada (el botón "Descargar CV" ya apunta a esa ruta).

## Accesibilidad

- Todas las imágenes tienen `alt` (las decorativas usan `alt=""`).
- Foco visible (`:focus-visible`) en todos los elementos interactivos.
- `skip-link` para saltar directo al contenido.
- El modal de proyecto atrapa el foco (`Tab` / `Shift+Tab`) y se cierra con `Escape`,
  devolviendo el foco a quien lo abrió.
- Se respeta `prefers-reduced-motion`: se desactivan animaciones decorativas y las
  transiciones de slide pasan a un fade simple.
- Contraste de texto verificado sobre los fondos oscuros (texto principal en `--frost`,
  texto secundario en `--mist`, ambos con contraste suficiente sobre `--void`/`--panel`).

## Rendimiento

- Imágenes en WebP con respaldo PNG vía `<picture>`.
- Animaciones basadas únicamente en `transform` y `opacity` (evita relayout/repaint costoso).
- El canvas de fondo pausa su animación cuando la pestaña no está visible
  (`visibilitychange`) y respeta `prefers-reduced-motion`.
- `IntersectionObserver` real se usa para detectar qué tarjeta está visible en los
  carruseles horizontales de mobile (no solo un timer decorativo).

## Compatibilidad

Probado en Chromium vía automatización (navegación por rueda, touch simulado, teclado,
modal, responsive en 1440px / 1024px / 390px). Se recomienda un navegador moderno
actualizado (Chrome, Edge, Firefox o Safari recientes). No usa `<script type="module">`
ni `fetch()` de archivos locales, precisamente para garantizar que funcione al abrir
`index.html` con doble clic (protocolo `file://`), sin necesidad de servidor.

## Créditos

Diseño y desarrollo: construido a medida para Jean Pool Huaman De La Cruz,
estudiante de Ingeniería de Software (UPC), como portafolio para procesos de
prácticas pre profesionales.
