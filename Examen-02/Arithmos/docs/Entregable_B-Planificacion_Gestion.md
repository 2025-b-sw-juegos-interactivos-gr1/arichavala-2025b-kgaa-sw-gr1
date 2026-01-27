# PLANIFICACIÓN Y GESTIÓN (Project Management)
## Arithmos: El Reino de los Números

**Escuela Politécnica Nacional**  
**Facultad de Ingeniería de Sistemas**  
**Juegos Interactivos**  
**Karina Arichavala**
**Tatiana Gualpa**

---

## ÉPICA 1: Concepto y Documentación (El PDF)

**Meta:** Completar la escritura de los capítulos teóricos del GDD para justificar el diseño.

### Historias de Usuario

- **E1-HU-01: Redactar Ficha Técnica y High Concept**
  - Escribir GDD Cap. I: Definir título, género Point & Click y público objetivo

- **E1-HU-02: Definir Análisis MDA**
  - Escribir GDD Cap. II: Explicar estética "Zen", dinámicas de fallo seguro y mecánica de selección

- **E1-HU-03: Desarrollar Narrativa y Mundo**
  - Escribir GDD Cap. IV: Escribir la historia del "Glitch", el protagonista y Pipo

- **E1-HU-04: Describir los 10 Niveles Teóricos**
  - Escribir GDD Cap. V: Llenar la tabla con los temas matemáticos de los 10 niveles

---

## ÉPICA 2: Ingeniería Core (El Motor)

**Meta:** Configurar Babylon.js y programar las mecánicas básicas que funcionarán en el juego (sin importar el nivel).

### Historias de Usuario

- **E2-HU-05: Configuración del Proyecto**
  - Crear repo en GitHub, instalar Babylon.js + TypeScript y ver la pantalla "Hola Mundo"

- **E2-HU-06: Sistema de Movimiento (WASD)**
  - Programar cámara en primera persona que camine por un plano, sin físicas de salto

- **E2-HU-07: Sistema de Interacción (Raycast)**
  - Programar script para que al hacer clic izquierdo, el juego detecte qué objeto 3D se tocó

- **E2-HU-08: Sistema de Feedback**
  - Programar que la consola imprima "Acierto" o "Error" al clicar objetos

---

## ÉPICA 3: Construcción del Nivel 4 (El Slice Jugable)

**Meta:** Construir específicamente el escenario del "Río Divisor" y su lógica única.

### Historias de Usuario

- **E3-HU-09: Greyboxing del Nivel 4**
  - Colocar cubos simples para hacer el pasillo, el suelo y la pared que bloquea el camino

- **E3-HU-10: Colocar Interactuables**
  - Posicionar 3 esferas flotantes frente a la pared con los valores 5, 7 y 6

- **E3-HU-11: Lógica de la Pared Glitch**
  - Programar script: Si clic en esfera 6 → `Pared.dispose()`

- **E3-HU-12: Zona de Meta**
  - Colocar un trigger invisible al final del pasillo que muestre un mensaje de "¡Nivel Completado!"

---

## ÉPICA 4: Arte, Audio y Entrega

**Meta:** Darle el aspecto visual final al prototipo y entregarlo.

### Historias de Usuario

- **E4-HU-13: Arte Low Poly**
  - Aplicar colores simples a los modelos: Suelo gris, Esferas amarillas, Pared Roja semitransparente

- **E4-HU-14: Implementar Audio**
  - Buscar 2 sonidos gratis e integrarlos

- **E4-HU-15: Pruebas de Usuario**
  - Jugar el nivel completo una vez para asegurar que la pared desaparece y no hay errores

- **E4-HU-16: Exportar GDD**
  - Revisar ortografía del Word, añadir los diagramas UML y exportar a PDF final

---

