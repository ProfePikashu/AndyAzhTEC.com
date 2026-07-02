/* ════════════════════════════════════════════════════════
   AndyAzhTEC.com — Configuración de videos destacados
   Curso: Armado y Reparación de PC (AyRPC)
   Canal: twitch.tv/profe_pikashu
   ════════════════════════════════════════════════════════

   INSTRUCCIONES:
   ─────────────────────────────────────────────────────────
   Para agregar o cambiar un video en la sección del curso,
   editá los objetos dentro del array AYRPC_VIDEOS.

   TIPOS DE VIDEO:
     type: "vod"   → Un VOD (grabación) de Twitch
                     El ID está en la URL: twitch.tv/videos/XXXXXXXXXX
                                                              ↑ ese número

     type: "clip"  → Un Clip de Twitch
                     El slug está en la URL: clips.twitch.tv/NombreDelClip
                                                               ↑ esa parte

   TIMESTAMP — desde dónde empieza el video:
     h  → horas       (0-99)
     m  → minutos     (0-59)
     s  → segundos    (0-59)
     ms → milisegundos (0-999) — se redondea al segundo más cercano para Twitch

   THUMBNAIL:
     Podés poner la URL de cualquier imagen.
     Si la dejás vacía (""), se genera un gradiente neon automático.
     Para VODs de Twitch el formato es:
       https://static-cdn.jtvnw.net/cf_vods/dgeft87wbj63y/CHANNEL_HASH/thumb/thumb0-320x240.jpg

   BADGE:
     Etiqueta pequeña arriba de la card. Ej: "Clase 1", "Momento épico", "Tip rápido"

   ════════════════════════════════════════════════════════ */

const AYRPC_CHANNEL = "profe_pikashu";

const AYRPC_VIDEOS = [
  {
    id: "2376081829",           // ← Cambiá este número por el ID real del VOD
    type: "vod",
    title: "Clase 1 — ¿Qué es una PC? Partes y función de cada componente",
    description: "Arrancamos desde cero: CPU, GPU, RAM, almacenamiento, fuente y gabinete. Todo explicado sin tecnicismos.",
    thumbnail: "",              // ← Pegá la URL de la miniatura o dejá vacío para gradiente automático
    badge: "Clase 1",
    timestamp: { h: 0, m: 0, s: 0, ms: 0 },
    accent: "#00f5ff",          // color del borde neon (cyan, violet, pink, etc.)
  },
  {
    id: "2376081830",           // ← Cambiá por el ID real
    type: "vod",
    title: "Clase 2 — Selección de componentes: cómo no tirar la plata",
    description: "Compatibilidad entre piezas, presupuestos reales y dónde comprar sin que te estafes.",
    thumbnail: "",
    badge: "Clase 2",
    timestamp: { h: 0, m: 15, s: 30, ms: 0 },
    accent: "#a855f7",
  },
  {
    id: "2376081831",           // ← Cambiá por el ID real
    type: "vod",
    title: "Clase 3 — Armado en vivo: de las piezas a la primera imagen",
    description: "Ensamblado completo en pantalla, sin cortes. Cada cable, cada tornillo, en tiempo real.",
    thumbnail: "",
    badge: "Armado en vivo",
    timestamp: { h: 0, m: 45, s: 0, ms: 0 },
    accent: "#e879f9",
  },
  {
    id: "2376081832",           // ← Cambiá por el ID real
    type: "vod",
    title: "Diagnóstico y reparación — PC que no enciende: metodología paso a paso",
    description: "Cómo identificar fallas, hacer pruebas con y sin gabinete, y resolver el problema sin cambiar piezas al azar.",
    thumbnail: "",
    badge: "Reparación",
    timestamp: { h: 1, m: 0, s: 0, ms: 0 },
    accent: "#00f5ff",
  },
  {
    id: "SomeClipSlugHere",     // ← Para un CLIP: ponés el slug de la URL del clip
    type: "clip",
    title: "Momento épico — Primera PC armada por un alumno en vivo",
    description: "La reacción cuando el POST suena por primera vez después de un armado guiado por el chat.",
    thumbnail: "",
    badge: "Momento icónico",
    timestamp: { h: 0, m: 0, s: 0, ms: 0 }, // los clips ignoran timestamp
    accent: "#a855f7",
  },
  {
    id: "2376081834",
    type: "vod",
    title: "Clase 5 — BIOS/UEFI: configuración básica y XMP/EXPO para la RAM",
    description: "Cómo entrar a la BIOS, activar XMP, configurar el orden de booteo y actualizar el firmware.",
    thumbnail: "",
    badge: "Clase 5",
    timestamp: { h: 0, m: 10, s: 0, ms: 0 },
    accent: "#e879f9",
  },
];

/* ════════════════════════════════════════════════════════
   NO EDITAR DEBAJO DE ESTA LÍNEA
   (lógica interna del sistema de videos)
════════════════════════════════════════════════════════ */

/**
 * Convierte el objeto timestamp a formato Twitch: "1h30m45s"
 */
function tsToTwitchTime(ts) {
  const { h = 0, m = 0, s = 0, ms = 0 } = ts;
  const totalS = h * 3600 + m * 60 + s + Math.round(ms / 1000);
  const hh = Math.floor(totalS / 3600);
  const mm = Math.floor((totalS % 3600) / 60);
  const ss = totalS % 60;
  return `${hh}h${mm}m${ss}s`;
}

/**
 * Convierte el timestamp a texto legible: "1h 30m 45s"
 */
function tsToReadable(ts) {
  const { h = 0, m = 0, s = 0 } = ts;
  let parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return parts.join(' ');
}

/**
 * Genera la URL del embed de Twitch (respeta el parent del dominio actual)
 */
function getTwitchEmbedURL(video) {
  const parent = window.location.hostname || 'localhost';
  const time = tsToTwitchTime(video.timestamp);

  if (video.type === 'clip') {
    return `https://clips.twitch.tv/embed?clip=${video.id}&parent=${parent}&autoplay=true`;
  }
  return `https://player.twitch.tv/?video=${video.id}&t=${time}&parent=${parent}&autoplay=true&muted=false`;
}

/**
 * Genera la URL del canal en Twitch
 */
function getTwitchChannelURL() {
  return `https://www.twitch.tv/${AYRPC_CHANNEL}`;
}

/**
 * Retorna gradientes para cards sin thumbnail
 */
const CARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(0,245,255,0.15) 0%, rgba(168,85,247,0.1) 100%)',
  'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(232,121,249,0.1) 100%)',
  'linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(0,245,255,0.08) 100%)',
  'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(232,121,249,0.15) 100%)',
];
