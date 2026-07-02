# AndyAzhTEC.com — Catálogo humano de animaciones

Este archivo resume las animaciones y efectos visuales actuales del sitio para poder reutilizarlos sin perder la estética original.

## 1. Fondo de partículas / estrellas

**Nombre técnico:** `twinkle`  
**Dónde vive:** `css/styles.css` + generación desde `js/main.js`  
**Qué hace:** crea puntitos/estrellas en el fondo que aparecen, brillan y se apagan suavemente.  
**Uso ideal:** fondo global del sitio, hero, secciones importantes.  
**Peso visual:** leve.  
**No tocar salvo que:** queramos cambiar cantidad de partículas o intensidad.

---

## 2. Borde pulsante de badges

**Nombre técnico:** `pulse-border`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** genera un pulso alrededor de badges o etiquetas destacadas.  
**Uso ideal:** estados online, “en vivo”, “nuevo”, “disponible”, “próximamente”.  
**Peso visual:** leve.

---

## 3. Texto glitch

**Nombre técnico:** `glitch-1` y `glitch-2`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** duplica el texto con capas cian/rosa para simular interferencia digital.  
**Uso ideal:** logo, hero, títulos muy importantes.  
**Peso visual:** medio.  
**Cuidado:** no abusar en textos largos porque cansa.

---

## 4. Anillo del avatar

**Nombre técnico:** `ring-rotate`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** anima el brillo del aro circular del avatar/robot.  
**Uso ideal:** hero principal, Pelusita Bot, perfiles destacados.  
**Peso visual:** medio.

---

## 5. Chips flotantes

**Nombre técnico:** `float`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** hace flotar etiquetas pequeñas alrededor del hero.  
**Uso ideal:** tecnologías, skills, features, herramientas.  
**Peso visual:** leve/medio.

---

## 6. Indicador de scroll

**Nombre técnico:** `bounce`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** anima la flecha hacia abajo para indicar que hay más contenido.  
**Uso ideal:** final del hero.  
**Peso visual:** leve.

---

## 7. Cards con reveal al hacer scroll

**Nombre técnico:** `IntersectionObserver` + `.visible`  
**Dónde vive:** `js/main.js` + `css/styles.css`  
**Qué hace:** las cards aparecen suavemente cuando entran en pantalla.  
**Uso ideal:** secciones de cards: Tools, Cursos, Tecnologías, FAQ visuales.  
**Peso visual:** leve.  
**Importante:** es de las mejores animaciones para mantener sensación premium.

---

## 8. Contadores animados

**Nombre técnico:** `requestAnimationFrame` en `initCounters()`  
**Dónde vive:** `js/main.js`  
**Qué hace:** cuenta números desde 0 hasta un objetivo cuando la sección aparece.  
**Uso ideal:** métricas públicas: alumnos, herramientas, clases, horas de contenido.  
**Peso visual:** leve.

---

## 9. Cursor trail neón

**Nombre técnico:** `initCursorTrail()`  
**Dónde vive:** `js/main.js`  
**Qué hace:** genera una estela de puntos neón siguiendo el cursor en escritorio.  
**Uso ideal:** estética general del sitio.  
**Peso visual:** medio.  
**Cuidado:** mantener desactivado en mobile, como ya está.

---

## 10. Live pulse

**Nombre técnico:** `live-pulse`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** pulsa elementos relacionados con vivo/streaming.  
**Uso ideal:** Twitch, clases en vivo, estado online, avisos activos.  
**Peso visual:** leve.

---

## 11. Scanline / barrido visual

**Nombre técnico:** `scanline-sweep`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** simula una línea de escaneo estilo pantalla tecnológica.  
**Uso ideal:** cards especiales, store/hardware, paneles tipo consola.  
**Peso visual:** medio.

---

## 12. Bordes animados

**Nombre técnico:** `border-spin`, `border-glow-fallback`  
**Dónde vive:** `css/styles.css`  
**Qué hace:** anima bordes con glow o movimiento circular.  
**Uso ideal:** cards destacadas, llamadas a la acción, Pelusita Bot, herramientas principales.  
**Peso visual:** medio/alto.  
**Cuidado:** usar en pocas cards para que no parezca casino cyberpunk.

---

## 13. Efectos Store / Hardware

**Nombres técnicos:** `sad-drift`, `sad-spin`, `sad-dot-pulse`, `sad-shimmer`, `sad-hot-pulse`, `sad-btn-gradient`, `sad-btn-glow`  
**Dónde vive:** `css/styles.css`  
**Qué hacen:** animaciones de iconos flotantes, brillos, precios, botones y efectos publicitarios.  
**Uso ideal:** sección Hardware, cards premium, banners de herramientas importantes.  
**Peso visual:** medio/alto.  
**Cuidado:** son hermosas pero muy protagonistas.

---

## 14. Botón pulsante de store

**Nombre técnico:** `store-btn-pulse`  
**Dónde vive:** `css/store.css`  
**Qué hace:** pulso visual para botones de acción.  
**Uso ideal:** CTA principales: contacto, Classroom, ExamPro, WhatsApp.  
**Peso visual:** medio.

---

## Reglas de uso recomendadas

- Mantener partículas, reveal de cards y hover glow como identidad base.
- Usar glitch solo en títulos grandes o branding.
- Usar scanline/bordes animados en secciones premium.
- No poner todas las animaciones juntas en todas las cards.
- Priorizar fluidez y mobile antes que exceso visual.
- Cada sección nueva debería reutilizar al menos una animación existente antes de inventar otra.

## Próximas pruebas sugeridas

- Aplicar chips flotantes a la sección Tecnologías.
- Aplicar reveal a Tools.
- Aplicar bordes animados a ExamPro y Classroom.
- Crear una card especial para Pelusita Bot usando ring-rotate.
- Crear CTA de contacto con store-btn-pulse o sad-btn-glow.
