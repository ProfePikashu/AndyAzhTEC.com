/* ════════════════════════════════════════════════════════
   AndyAzhTEC.com — site-config.js
   Configuración pública del ecosistema AndyAzhTEC
════════════════════════════════════════════════════════ */

"use strict";

const AAT_LINKS = {
  classroom: "https://classroom.andyazhtec.com",
  exampro: "https://exampro.andyazhtec.com",
  linkedin: "https://www.linkedin.com/in/arturoandrescoria/",
  twitch: "https://www.twitch.tv/profe_pikashu",
  youtube: "#",
  github: "https://github.com/ProfePikashu",
  emailProfe: "mailto:profepikashu@andyazhtec.com",
  emailContacto: "mailto:contacto@andyazhtec.com",
  whatsapp: "#"
};

const AAT_TOOLS = [
  {
    title: "ExamPro",
    status: "Disponible",
    statusType: "live",
    icon: "fa-solid fa-clipboard-check",
    description: "Sistema de corrección, rúbricas, recuperatorios y verificación de estados académicos.",
    url: AAT_LINKS.exampro,
    cta: "Abrir ExamPro"
  },
  {
    title: "Classroom",
    status: "En desarrollo activo",
    statusType: "dev",
    icon: "fa-solid fa-graduation-cap",
    description: "Plataforma de alumnos con cursos, materiales, comunidad, certificados y notificaciones.",
    url: AAT_LINKS.classroom,
    cta: "Entrar al Classroom"
  },
  {
    title: "Simulador de presupuestos",
    status: "Próximamente",
    statusType: "soon",
    icon: "fa-solid fa-calculator",
    description: "Herramienta para armar presupuestos técnicos de forma clara, rápida y profesional.",
    url: "#",
    cta: "Próximamente"
  },
  {
    title: "Buscador de proveedores",
    status: "Próximamente",
    statusType: "soon",
    icon: "fa-solid fa-map-location-dot",
    description: "Listado inteligente de proveedores por zona, rubro, disponibilidad y tipo de producto.",
    url: "#",
    cta: "Próximamente"
  },
  {
    title: "Solicitud Multimedia",
    status: "MVP en desarrollo",
    statusType: "dev",
    icon: "fa-solid fa-photo-film",
    description: "Sistema para pedir videos, reels, flyers, placas y piezas multimedia sin perder solicitudes.",
    url: "#",
    cta: "En desarrollo"
  },
  {
    title: "Stream Tools",
    status: "Próximamente",
    statusType: "soon",
    icon: "fa-solid fa-sliders",
    description: "Botonera, sonidos y herramientas para clases en vivo, OBS y moderadores.",
    url: "#",
    cta: "Próximamente"
  }
];
