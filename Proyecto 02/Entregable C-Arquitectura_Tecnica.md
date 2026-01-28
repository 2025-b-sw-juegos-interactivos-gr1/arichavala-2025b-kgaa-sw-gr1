# C. Arquitectura Técnica (Ingeniería de Software)

## 1. Diseño de la Solución Técnica

El sistema está diseñado siguiendo una arquitectura modular por capas que separa las responsabilidades del juego en componentes independientes y cohesivos:

### Capa Core (Núcleo del Sistema)

- **GameManager**: Controlador principal del flujo del juego, gestiona transiciones de estados y carga de niveles
- **FeedbackSystem**: Singleton que centraliza todo el feedback auditivo (música ambiente, efectos de sonido, beeps de interacción)
- **GameState**: Jerarquía de estados (Loading, Playing, Victory) que controla el ciclo de vida del juego

### Capa Mechanics (Mecánicas de Juego)

- **PlayerController**: Gestiona input del usuario (WASD + Mouse) y física del personaje FPS
- **InteractionSystem**: Implementa raycast para detectar objetos interactuables bajo el cursor
- **DoorMechanism**: Lógica de puertas/barreras con fragmentación matemática animada
- **TriggerZone**: Detecta entrada del jugador en zonas específicas (meta, checkpoints)

### Capa Interactables (Objetos del Mundo)

- **InteractableObject**: Clase base abstracta que define la interfaz para objetos clickeables
- **SphereInteractable**: Implementación concreta de esferas numéricas con feedback visual

### Capa Levels (Construcción de Niveles)

- **Level4**: Construye la geometría del nivel, instancia objetos, configura lógica del puzzle

### Capa Characters (Personajes)

- **Pipo**: Personaje mentor 3D con animación de flotación y geometría jerárquica

### Capa UI (Interfaz de Usuario)

- **DialogueSystem**: Sistema de diálogos con DynamicTexture para renderizar texto en el mundo 3D

### Flujo de Comunicación

```
Usuario → PlayerController → InteractionSystem → InteractableObject
                                                         ↓
                                                  Observer Pattern
                                                         ↓
                                         DoorMechanism ← FeedbackSystem
                                                         ↓
                                                    TriggerZone
                                                         ↓
                                                    GameManager
```

---

## 2. Diagramas UML

### Diagrama de Clases (Implementación Real)

```
┌─────────────────┐
│   GameManager   │ (Singleton)
├─────────────────┤
│ - instance      │
│ - currentState  │
│ - scene         │
│ - engine        │
├─────────────────┤
│ + getInstance() │
│ + loadLevel()   │
│ + changeState() │
│ + showVictory() │
└────────┬────────┘
         │ manages
         ↓
┌─────────────────┐
│   GameState     │ (Abstract)
├─────────────────┤
│ # scene         │
├─────────────────┤
│ + onEnter()     │
│ + onUpdate()    │
│ + onExit()      │
└────────┬────────┘
         △
         │ extends
    ┌────┴────┬───────────┐
    │         │           │
┌───┴──┐ ┌───┴────┐ ┌───┴─────┐
│Loading│ │Playing │ │Victory  │
└───────┘ └────────┘ └─────────┘

┌──────────────────────┐
│ InteractableObject   │ (Abstract)
├──────────────────────┤
│ # mesh: Mesh         │
│ # observers: Array   │
│ # value: number      │
├──────────────────────┤
│ + interact(): void   │
│ + attach(obs): void  │
│ + notify(): void     │
└──────────┬───────────┘
           △
           │ extends
           │
┌──────────┴────────────┐
│ SphereInteractable    │
├───────────────────────┤
│ - isCorrect: boolean  │
│ - material: Material  │
├───────────────────────┤
│ + interact(): void    │
│ + setCorrect(bool)    │
│ + showFeedback()      │
└───────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│ DoorMechanism    │◄────────│ InteractableObject│
├──────────────────┤ observes├──────────────────┤
│ - door: Mesh     │         │                  │
│ - requiredValue  │         └──────────────────┘
│ - isOpen: bool   │
├──────────────────┤
│ + onNotify(val)  │
│ + openDoor()     │
│ + createFragment()│
└──────────────────┘

┌──────────────────┐
│ FeedbackSystem   │ (Singleton)
├──────────────────┤
│ - audioContext   │
│ - musicInterval  │
│ - noteSequence   │
├──────────────────┤
│ + playBeep(freq) │
│ + startMusic()   │
│ + stopMusic()    │
│ + playVictory()  │
└──────────────────┘

┌──────────────────┐
│ PlayerController │
├──────────────────┤
│ - camera         │
│ - speed: number  │
│ - inputMap       │
├──────────────────┤
│ + setupInput()   │
│ + move()         │
│ + updateCamera() │
└──────────────────┘

┌──────────────────┐
│InteractionSystem │
├──────────────────┤
│ - scene: Scene   │
│ - camera         │
├──────────────────┤
│ + setupRaycast() │
│ + checkHit()     │
└──────────────────┘

┌──────────────────┐
│   TriggerZone    │
├──────────────────┤
│ - mesh: Mesh     │
│ - onEnter: func  │
├──────────────────┤
│ + checkCollision()│
└──────────────────┘

┌──────────────────┐
│     Level4       │
├──────────────────┤
│ - scene          │
│ - door           │
│ - spheres[]      │
│ - pipo           │
├──────────────────┤
│ + buildGeometry()│
│ + setupPuzzle()  │
│ + dispose()      │
└──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│      Pipo        │       │ DialogueSystem   │
├──────────────────┤       ├──────────────────┤
│ - rootMesh       │       │ - plane: Mesh    │
│ - body: Mesh     │       │ - texture        │
│ - head: Mesh     │       │ - isActive       │
│ - scale: 0.5     │       ├──────────────────┤
├──────────────────┤       │ + showDialogue() │
│ + createBody()   │       │ + hide()         │
│ + createHead()   │       │ + wrapText()     │
│ + animate()      │       └──────────────────┘
└──────────────────┘
```

### Diagrama de Casos de Uso

```
                    ┌──────────────┐
                    │   Jugador    │
                    │  (9-11 años) │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ↓                  ↓                  ↓
  ┌──────────┐      ┌─────────────┐    ┌──────────────┐
  │ Moverse  │      │ Interactuar │    │ Escuchar     │
  │ en FPS   │      │ con Objetos │    │ Feedback     │
  │ (WASD +  │      │ (Click)     │    │ Audio        │
  │  Mouse)  │      └──────┬──────┘    └──────────────┘
  └──────────┘             │
                ┌──────────┴──────────┐
                │                     │
                ↓                     ↓
        ┌───────────────┐     ┌──────────────┐
        │ Seleccionar   │     │ Resolver     │
        │ Esfera con    │────→│ Puzzle de    │
        │ Número        │     │ División     │
        │ Correcto (6)  │     │ (24 ÷ 6 = 4) │
        └───────────────┘     └──────┬───────┘
                                     │
                        ┌────────────┴────────────┐
                        │                         │
                        ↓                         ↓
                ┌───────────────┐         ┌──────────────┐
                │ Ver Barrera   │         │ Caminar      │
                │ Fragmentarse  │         │ hacia Meta   │
                │ en 4 Partes   │         │              │
                └───────────────┘         └──────┬───────┘
                                                 │
                                                 ↓
                                         ┌───────────────┐
                                         │ Completar     │
                                         │ Nivel y Ver   │
                                         │ Victoria      │
                                         └───────────────┘

        «include»
        ┌───────────────────────────────┐
        │ Sistema de Juego:             │
        │ - Validar respuesta correcta  │
        │ - Reproducir beep/música      │
        │ - Animar fragmentación 3D     │
        │ - Detectar entrada a zona     │
        │ - Transicionar a victoria     │
        └───────────────────────────────┘
```

### Diagrama de Secuencia (Interacción con Esfera)

```
Jugador    InteractionSystem    SphereInteractable    DoorMechanism    FeedbackSystem
   │                │                    │                   │                │
   │ Click mouse    │                    │                   │                │
   │───────────────→│                    │                   │                │
   │                │ Raycast hit?       │                   │                │
   │                │───────────────────→│                   │                │
   │                │                    │                   │                │
   │                │     interact()     │                   │                │
   │                │───────────────────→│                   │                │
   │                │                    │                   │                │
   │                │                    │ notify(value=6)   │                │
   │                │                    │──────────────────→│                │
   │                │                    │                   │                │
   │                │                    │                   │ playBeep(800Hz)│
   │                │                    │                   │───────────────→│
   │                │                    │                   │                │
   │                │                    │ change color      │                │
   │                │                    │◄──────────        │                │
   │                │                    │                   │                │
   │                │                    │                   │ openDoor()     │
   │                │                    │                   │◄───────        │
   │                │                    │                   │                │
   │                │                    │                   │ createFragments()
   │                │                    │                   │────────────────│
   │                │                    │                   │                │
   │◄───────────────────────────────────────────────────────────────────────│
   │                    Visualiza animación de 4 fragmentos                  │
```

---

## 3. Patrones de Diseño Seleccionados y Justificación

### Observer Pattern (Observador)

**Ubicación:** `InteractableObject` → `DoorMechanism`

**Implementación:**
```typescript
// InteractableObject.ts (Sujeto Observable)
export abstract class InteractableObject {
    protected observers: Array<(value: number) => void> = [];
    
    public attach(observer: (value: number) => void): void {
        this.observers.push(observer);
    }
    
    protected notify(): void {
        this.observers.forEach(obs => obs(this.value));
    }
}

// DoorMechanism.ts (Observador)
public setupObserver(sphere: InteractableObject): void {
    sphere.attach((value: number) => {
        if (value === this.requiredValue) {
            this.openDoor();
        }
    });
}
```

**Justificación:** 
Permite desacoplar los objetos interactuables de las mecánicas que responden a ellos. Cuando una esfera es clickeada, notifica a sus observadores sin necesidad de conocer su implementación concreta. Esto facilita agregar nuevos tipos de respuestas (animaciones, efectos de partículas, cambios en UI) sin modificar la clase `InteractableObject`.

**Ventaja:** 
- Escalabilidad: Podemos tener múltiples mecanismos escuchando a un mismo objeto sin crear dependencias circulares
- Open/Closed Principle: Abierto a extensión, cerrado a modificación

---

### Singleton Pattern

**Ubicación:** `GameManager`, `FeedbackSystem`

**Implementación:**
```typescript
export class GameManager {
    private static instance: GameManager;
    
    private constructor() {} // Constructor privado
    
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
}
```

**Justificación:** 
Estos sistemas deben tener una única instancia global accesible desde cualquier parte del código. `GameManager` controla el estado del juego completo y `FeedbackSystem` gestiona el Web Audio API que requiere un solo `AudioContext`. Múltiples instancias causarían conflictos de estado y consumo excesivo de recursos.

**Ventaja:** 
- Garantiza una única fuente de verdad
- Facilita el acceso global sin variables globales
- Control sobre la creación de instancias

---

### State Pattern (Estado)

**Ubicación:** `GameState` → `LoadingState`, `PlayingState`, `VictoryState`

**Implementación:**
```typescript
export abstract class GameState {
    constructor(protected scene: Scene) {}
    
    public abstract onEnter(): void;
    public abstract onUpdate(deltaTime: number): void;
    public abstract onExit(): void;
}

export class PlayingState extends GameState {
    public onEnter(): void {
        // Iniciar música, habilitar controles
    }
    
    public onUpdate(deltaTime: number): void {
        // Lógica del gameplay
    }
}
```

**Justificación:** 
El juego tiene comportamientos completamente diferentes según su estado actual. En `Loading` se muestra una pantalla de carga, en `Playing` se permiten inputs del jugador, en `Victory` se muestra un mensaje final. El patrón State encapsula cada comportamiento en una clase separada, evitando condicionales gigantes (if/switch) y facilitando agregar nuevos estados (Pause, GameOver, MainMenu).

**Ventaja:** 
- Código más mantenible y extensible
- Cada estado tiene su propia lógica aislada
- Facilita testing de estados individuales

---

### Strategy Pattern (Estrategia)

**Ubicación:** Jerarquía de `InteractableObject`

**Implementación:**
```typescript
// Estrategia base
export abstract class InteractableObject {
    public abstract interact(): void;
}

// Estrategia concreta 1
export class SphereInteractable extends InteractableObject {
    public interact(): void {
        // Cambiar color, reproducir beep, notificar
    }
}

// Estrategia concreta 2 (futuro)
export class ButtonInteractable extends InteractableObject {
    public interact(): void {
        // Presionar botón, activar mecanismo
    }
}
```

**Justificación:** 
Diferentes objetos interactuables tienen diferentes comportamientos al ser clickeados (esferas cambian color, puertas se abren, botones activan mecanismos). En lugar de un único método `interact()` con condicionales, cada tipo de objeto implementa su propia estrategia de interacción mediante herencia/polimorfismo.

**Ventaja:** 
- Facilita agregar nuevos tipos de interactuables sin modificar código existente
- Cumple con Open/Closed Principle
- Reduce complejidad ciclomática

---

### Composite Pattern (Implícito en Babylon.js)

**Ubicación:** Jerarquía de meshes en `Pipo`

**Implementación:**
```typescript
export class Pipo {
    private rootMesh: TransformNode; // Nodo padre
    
    constructor(scene: Scene, position: Vector3) {
        this.rootMesh = new TransformNode('pipoRoot', scene);
        this.rootMesh.position = position;
        
        const body = this.createBody(scene);
        body.parent = this.rootMesh; // Relación padre-hijo
        
        const head = this.createHead(scene);
        head.parent = body; // Jerarquía anidada
    }
}
```

**Justificación:** 
El personaje Pipo está construido como un árbol de meshes hijos (cuerpo → cabeza → ojos, gorro, brazos). Babylon.js usa el patrón Composite para su scene graph, permitiendo transformar el mesh padre y que todos los hijos se transformen automáticamente (posición, rotación, escala).

**Ventaja:** 
- Facilita animaciones complejas (rotar cuerpo rota toda la jerarquía)
- Manipulación jerárquica de objetos 3D
- Escalado uniforme con un solo parámetro

---

## 4. Stack Tecnológico Implementado

### Frontend (Cliente)

#### Motor Gráfico

**Babylon.js 6.0+**
- Motor WebGL de alto rendimiento para renderizado 3D en navegador
- **Justificación:** 
  - Cross-platform (funciona en cualquier dispositivo con navegador moderno)
  - Documentación extensa y comunidad activa
  - Sistema de física integrado (colisiones, gravedad)
  - Compatible nativamente con TypeScript
  - Licencia Apache 2.0 (open source)
- **Alternativas consideradas:** 
  - Three.js (más bajo nivel, requiere más código boilerplate)
  - Unity WebGL (mayor peso de descarga >50MB, requiere compilación)
  - PlayCanvas (menos documentación en español)

#### Lenguaje de Programación

**TypeScript 5.0**
- Superset de JavaScript con tipado estático
- **Justificación:**
  - Detecta errores en tiempo de compilación (ej: `number + string`)
  - Mejor autocompletado en IDE (IntelliSense)
  - Refactoring más seguro con rename automático
  - Ideal para proyectos medianos-grandes
  - Documentación inline con JSDoc
- **Configuración:**
  - Target: ES6 (compatibilidad con navegadores modernos)
  - Strict mode: `true` (máximo nivel de type-safety)
  - Módulos: ESNext (import/export estándar)

#### Empaquetador de Módulos

**Webpack 5**
- Bundler que genera un único archivo JavaScript optimizado
- **Justificación:**
  - Hot Module Replacement (HMR) para desarrollo ágil sin recargar página
  - Tree-shaking para reducir tamaño del bundle (elimina código no usado)
  - Dev-server integrado con proxy
  - Soporte para source maps (debugging en desarrollo)
- **Configuración:**
  - Modo desarrollo: Source maps completos, sin minificación
  - Modo producción: Minificación, eliminación de console.log, compresión gzip

#### Sistema de Audio

**Web Audio API (Nativo del Navegador)**
- API estándar del navegador para generación y procesamiento de audio
- **Justificación:**
  - No requiere archivos externos MP3/WAV (reduce peso del juego)
  - Generación procedural de beeps y melodías con `OscillatorNode`
  - Control total sobre frecuencias (440Hz = La, 800Hz = beep agudo)
  - Control de envolventes ADSR (Attack, Decay, Sustain, Release)
  - Latencia mínima (<20ms) ideal para feedback inmediato
- **Implementación:**
  - `OscillatorNode` para tonos puros (música ambiente, beeps)
  - `GainNode` para control de volumen (0.3 = 30%)
  - `AudioContext` único en FeedbackSystem (Singleton)

#### Gestión de Paquetes

**npm (Node Package Manager)**
- Gestor de dependencias estándar del ecosistema JavaScript
- **Dependencias principales:**
  - `@babylonjs/core`: ^6.0.0 (motor gráfico)
  - `typescript`: ^5.0.0 (compilador)
  - `webpack`: ^5.104.0 (bundler)
  - `webpack-cli`: ^5.0.0 (CLI de webpack)
  - `webpack-dev-server`: ^4.11.0 (servidor de desarrollo)
  - `ts-loader`: ^9.5.0 (loader de TypeScript para webpack)

### Backend (No aplica para MVP)

El vertical slice actual **no requiere backend** ya que es un juego single-player sin persistencia de datos en servidor.

**Para versión completa se consideraría:**
- **Node.js + Express** para API REST (endpoints de guardado, ranking)
- **MongoDB** para guardar progreso del jugador (niveles completados, puntuaciones)
- **Firebase Authentication** para login de estudiantes (Google OAuth)
- **AWS S3** para almacenar assets si se escala el proyecto (texturas HD, audio pregrabado)
- **WebSocket (Socket.io)** para modo multijugador cooperativo futuro

### Herramientas de Desarrollo

**IDE y Extensiones:**
- **Visual Studio Code** con extensiones:
  - ESLint (linting de código TypeScript)
  - Prettier (formateo automático)
  - Babylon.js Snippet Pack (autocompletado)
  - GitLens (visualización de Git)

**Control de Versiones:**
- **Git + GitHub**
- Flujo de trabajo: Feature branches + Pull Requests
- Repository: `arichavala-2025b-kgaa-sw-gr1/Examen-02/Arithmos`

**Gestión de Proyecto:**
- **GitHub Projects** (tablero Kanban)
- Épicas → User Stories → Tasks
- URL: https://github.com/orgs/2025-b-sw-juegos-interactivos-gr1/projects/3

**Debugging y Profiling:**
- **Chrome DevTools**
  - Console para logs de Babylon.js
  - Performance tab para medir FPS
  - Memory tab para detectar memory leaks
  - Network tab para optimizar carga de assets

### Consideraciones de Rendimiento

**Objetivos de Performance:**
- **FPS Target:** 60 FPS en navegadores modernos (Chrome, Firefox, Edge)
- **Resolución:** 1920x1080 escalable a diferentes pantallas (responsive)
- **Memoria:** <100MB de RAM gracias a low poly art (bajo polycount)
- **Carga inicial:** <5 segundos en conexión 4G (sin assets externos pesados)
- **Compatibilidad:** WebGL 2.0 mínimo (soporte desde 2017 en todos los navegadores)

**Optimizaciones Implementadas:**
- Low poly meshes (<500 polígonos por objeto)
- Materiales sin texturas (colores sólidos)
- Audio procedural (sin archivos MP3/WAV)
- Sin iluminación dinámica (luz direccional estática)
- Culling automático de Babylon.js (objetos fuera de cámara no se renderizan)

### Justificación General del Stack

Este stack permite:
1. **Desarrollo rápido de prototipos** (HMR, TypeScript autocomplete)
2. **Deployment sin instalación** (solo URL, acceso desde navegador)
3. **Cross-platform automático** (Windows, Mac, Linux, tablets, Chromebooks)
4. **Ideal para entornos educativos** (sin necesidad de permisos de administrador para instalar)
5. **Bajo costo de hosting** (archivos estáticos servidos por GitHub Pages o Netlify)
6. **Escalabilidad futura** (fácil agregar backend Node.js si se necesita persistencia)

---

## 5. Estructura de Directorios Implementada

```
Arithmos/
│
├── docs/                              # Documentación del proyecto
│   ├── Entregable_A-GDD.md            # Game Design Document
│   ├── Entregable_B-Planificacion_Gestion.md
│   └── Arquitectura_Tecnica.md        # Este documento
│
├── public/                            # Archivos estáticos
│   └── index.html                     # HTML principal
│
├── src/                               # Código fuente TypeScript
│   ├── index.ts                       # Entry point
│   │
│   ├── core/                          # Núcleo del sistema
│   │   ├── GameManager.ts             # Singleton - Controlador principal
│   │   ├── FeedbackSystem.ts          # Singleton - Sistema de audio
│   │   └── GameState.ts               # State Pattern - Estados del juego
│   │
│   ├── mechanics/                     # Mecánicas de gameplay
│   │   ├── PlayerController.ts        # Movimiento FPS
│   │   ├── InteractionSystem.ts       # Raycast para clicks
│   │   ├── DoorMechanism.ts           # Lógica de puertas/barreras
│   │   └── TriggerZone.ts             # Detección de zonas
│   │
│   ├── interactables/                 # Objetos interactuables
│   │   ├── InteractableObject.ts      # Clase base abstracta
│   │   └── SphereInteractable.ts      # Esferas con números
│   │
│   ├── levels/                        # Construcción de niveles
│   │   └── Level4.ts                  # Nivel 4: Río Divisor
│   │
│   ├── characters/                    # Personajes del juego
│   │   └── Pipo.ts                    # Mentor 3D
│   │
│   └── ui/                            # Interfaz de usuario
│       └── DialogueSystem.ts          # Sistema de diálogos
│
├── dist/                              # Archivos compilados (generado por Webpack)
│   ├── bundle.js                      # JavaScript compilado y minificado
│   └── index.html                     # HTML copiado
│
├── node_modules/                      # Dependencias instaladas (git ignored)
│
├── package.json                       # Configuración npm y scripts
├── package-lock.json                  # Versiones exactas de dependencias
├── tsconfig.json                      # Configuración TypeScript
├── webpack.config.js                  # Configuración Webpack
├── .gitignore                         # Archivos ignorados por Git
└── README.md                          # Documentación principal

```

### Justificación de la Estructura

**Separación por Responsabilidades:**
- Cada carpeta agrupa clases con responsabilidades similares (cohesión alta)
- Facilita encontrar código relacionado sin navegar por toda la jerarquía
- Evita el "God folder" con 50 archivos mezclados

**Escalabilidad:**
- Fácil agregar nuevos niveles en `levels/`
- Nuevos tipos de interactuables en `interactables/`
- Nuevos personajes en `characters/`

**Mantenibilidad:**
- Un bug en el sistema de audio solo requiere revisar `FeedbackSystem.ts`
- Refactoring de UI no afecta a las mecánicas core
- Testing unitario facilitado por módulos independientes

---

## 6. Métricas de Calidad del Código

### Principios SOLID Aplicados

**S - Single Responsibility Principle (SRP):**
- ✅ `PlayerController` solo gestiona movimiento (no audio, ni lógica de puzzles)
- ✅ `FeedbackSystem` solo gestiona audio (no UI, ni física)

**O - Open/Closed Principle (OCP):**
- ✅ `InteractableObject` es abstracta, cerrada a modificación pero abierta a extensión (nuevas subclases)
- ✅ Observer Pattern permite agregar nuevos observadores sin modificar `InteractableObject`

**L - Liskov Substitution Principle (LSP):**
- ✅ Cualquier `InteractableObject` puede ser reemplazada por `SphereInteractable` sin romper el sistema

**I - Interface Segregation Principle (ISP):**
- ✅ `GameState` define solo métodos esenciales (onEnter, onUpdate, onExit)
- ✅ No hay interfaces "gordas" con métodos no utilizados

**D - Dependency Inversion Principle (DIP):**
- ✅ `DoorMechanism` depende de la abstracción `InteractableObject`, no de implementaciones concretas
- ✅ `GameManager` depende de la abstracción `GameState`

### Complejidad Ciclomática

- **Promedio:** <10 (ideal para mantenibilidad)
- **Máximo:** 15 en `Level4.buildGeometry()` (aceptable por ser código de construcción de nivel)

### Cobertura de Comentarios

- Todos los métodos públicos tienen JSDoc
- Lógica compleja comentada inline (ej: cálculo de fragmentación 24÷4)

---

**Documento creado:** Enero 27, 2026  
**Versión:** 1.0 - Vertical Slice Nivel 4  
**Autoras:** Karina Arichavala, Tatiana Gualpa
