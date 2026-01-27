# Arithmos: El Reino de los Números

Juego educativo de puzzles matemáticos en primera persona desarrollado con Babylon.js.

##  Descripción

Arithmos es una aventura de exploración y lógica donde el jugador asume el rol de un "Ingeniero Mágico" que debe reactivar una antigua civilización matemática resolviendo puzzles basados en conceptos del currículo de 5to grado.

##  Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build
```

El juego se abrirá en `http://localhost:8080`

##  Controles

- **W A S D**: Movimiento (adelante, izquierda, atrás, derecha)
- **Mouse**: Mirar alrededor
- **Clic izquierdo**: Interactuar con objetos

##  Vertical Slice - Nivel 4: Río Divisor

**Enfoque del Examen**: **Mecánicas** (Juego Serio - Gamificación y Feedback)

Este prototipo implementa el **Nivel 4 completo** como prueba de concepto:

**Objetivo**: Resolver el puzzle matemático para cruzar el puente de cristal.

**Gameplay**:
1. Caminas sobre un puente de cristal transparente sobre un río de datos azul
2. Una barrera roja con el número **24** bloquea tu camino
3. Debes elegir la "varita divisora" correcta (esfera verde con el número **6**)
4. Al elegir correctamente, la barrera se fragmenta en **4 partes** (24 ÷ 6 = 4)
5. Continúas caminando hasta la zona de meta
6. Aparece mensaje de victoria con música triunfal

**Concepto Matemático**: División exacta (24 ÷ 6 = 4)

**Mecánicas Core Implementadas**:
- Sistema de movimiento FPS con colisiones físicas
- Raycast para interacción con objetos 3D
- Observer Pattern para comunicación entre sistemas
- Feedback visual (cambio de colores, animación de fragmentación)
- Feedback auditivo (beeps de éxito/error, música ambiente, sonido de victoria)
- State Management (carga → gameplay → victoria)

##  Características Implementadas

- ✓ Movimiento en primera persona con colisiones
- ✓ Sistema de interacción por raycast
- ✓ Feedback visual (colores, animaciones) y auditivo (beeps procedurales)
- ✓ Puzzle matemático funcional con Observer Pattern
- ✓ Fragmentación animada de la barrera
- ✓ Música de fondo ambiente
- ✓ Detección de completación de nivel
- ✓ Arte low poly (puente cristal, río de datos)

**Nota**: El audio usa Web Audio API para generar sonidos proceduralmente - no requiere archivos externos.

##  Tecnologías

- **Babylon.js 6.0+**: Motor gráfico WebGL
- **TypeScript 5.0**: Lenguaje de programación
- **Webpack**: Empaquetador de módulos

##  Estado del Desarrollo

###  ÉPICA 2: Ingeniería Core
- [x] E2-HU-05: Configuración del Proyecto
- [x] E2-HU-06: Sistema de Movimiento (WASD)
- [x] E2-HU-07: Sistema de Interacción (Raycast)
- [x] E2-HU-08: Sistema de Feedback

### ÉPICA 3: Nivel 4 - El Río Divisor
- [x] E3-HU-09: Greyboxing del Nivel 4
- [x] E3-HU-10: Colocar Interactuables
- [x] E3-HU-11: Lógica de la Pared Glitch
- [x] E3-HU-12: Zona de Meta

### ÉPICA 4: Arte, Audio y Entrega
- [x] E4-HU-13: Arte Low Poly
- [x] E4-HU-14: Implementar Audio
- [x] E4-HU-15: Pruebas de Usuario
- [x] E4-HU-16: Exportar GDD

##  Equipo

- Karina Arichavala
- Tatiana Gualpa
