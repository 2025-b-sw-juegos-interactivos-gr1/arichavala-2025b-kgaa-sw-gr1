# Arquitectura de Arithmos

Este documento describe la estructura del código siguiendo el Capítulo VII del GDD.

##  Estructura del Proyecto

```
src/
├── core/               # Núcleo del juego
│   └── GameManager.ts  # Singleton - Gestión de estados
│
├── player/             # Jugador
│   └── PlayerController.ts  # Control WASD + Cámara FPS
│
├── interactables/      # Objetos interactivos
│   ├── InteractableObject.ts    # Clase base (Observer Pattern)
│   └── SphereInteractable.ts    # Esferas de respuesta
│
├── mechanics/          # Mecánicas de juego
│   └── DoorMechanism.ts         # Puertas/Obstáculos (Observer)
│
├── puzzles/           # Sistema de puzzles
│   └── PuzzleManager.ts         # Gestión de puzzles
│
├── levels/            # Niveles
│   ├── Level.ts       # Clase base abstracta
│   └── Level4.ts      # Nivel 4: Río Divisor
│
├── states/            # State Pattern
│   ├── GameState.ts   # Clase base abstracta
│   ├── MenuState.ts   # Estado del menú
│   ├── GameplayState.ts  # Estado de juego activo
│   └── WinState.ts    # Estado de victoria
│
├── utils/             # Utilidades
│   └── SaveSystem.ts  # Persistencia con LocalStorage
│
└── index.ts           # Punto de entrada principal
```

##  Patrones de Diseño Aplicados

### 1. **Singleton Pattern** - GameManager
- **Propósito**: Una única instancia global que coordina el estado del juego
- **Ubicación**: `src/core/GameManager.ts`
- **Uso**: `GameManager.getInstance()`

### 2. **Observer Pattern** - Sistema de Puzzles
- **Propósito**: Desacoplar la lógica de interacción de las respuestas visuales
- **Clases involucradas**:
  - `InteractableObject` (Subject)
  - `DoorMechanism` (Observer)
- **Flujo**: Jugador clica esfera → Notifica observadores → Puerta reacciona

### 3. **State Pattern** - Flujo de Estados
- **Propósito**: Gestionar transiciones entre estados del juego
- **Estados**:
  - `MenuState` - Menú principal
  - `GameplayState` - Jugando
  - `WinState` - Victoria

##  Implementación Gradual

El esqueleto está preparado para desarrollo incremental siguiendo las Historias de Usuario:

### ✅ Épica 2: Ingeniería Core (Ya implementada)
- [x] E2-HU-05: Configuración del proyecto
- [ ] E2-HU-06: Sistema de Movimiento WASD
- [ ] E2-HU-07: Sistema de Interacción (Raycast)
- [ ] E2-HU-08: Sistema de Feedback

### ✅ Épica 3: Nivel 4 (Estructura lista)
- [x] E3-HU-09: Greyboxing del Nivel 4
- [x] E3-HU-10: Colocar Interactuables
- [ ] E3-HU-11: Lógica de la Pared Glitch
- [ ] E3-HU-12: Zona de Meta

## 🔧 Stack Tecnológico

- **Motor**: Babylon.js 6.0+
- **Lenguaje**: TypeScript 5.0
- **Control de Versiones**: Git + GitHub
- **Persistencia**: LocalStorage (JSON)
- **IDE**: Visual Studio Code

##  Notas de Diseño

1. **Modularidad**: Cada clase tiene una única responsabilidad (SOLID)
2. **Bajo Acoplamiento**: Los sistemas se comunican mediante interfaces y patrones
3. **Extensibilidad**: Fácil añadir nuevos niveles heredando de `Level`
4. **Mantenibilidad**: TypeScript previene errores en tiempo de compilación

##  Próximos Pasos

1. Implementar sistema de raycast para detección de clics (E2-HU-07)
2. Conectar esferas con `ActionManager` de Babylon.js
3. Implementar movimiento WASD del jugador (E2-HU-06)
4. Añadir zona de meta con trigger invisible (E3-HU-12)
5. Sistema de feedback visual y audio (E4-HU-13, E4-HU-14)
