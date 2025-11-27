# 🌊 Submarino de Rescate

**Examen 01 - Juegos Interactivos**  
Juego 3D de recoger y entregar usando Babylon.js

---

## 📋 Descripción del Proyecto

Submarino de Rescate es un juego 3D donde controlas un submarino amarillo que debe rescatar buzos perdidos en el fondo del océano y llevarlos a un barco en la superficie.

**Mecánica principal:** Recoger buzos → Transportar → Entregar al barco

---

## 🎮 Controles del Juego

| Tecla | Acción |
|-------|--------|
| **W** | Mover hacia adelante |
| **S** | Mover hacia atrás |
| **A** | Mover a la izquierda |
| **D** | Mover a la derecha |
| **Q** | Subir (hacia la superficie) |
| **E** | Bajar (hacia el fondo) |
| **ESPACIO** | Recoger buzo / Entregar al barco |

---

## 🎯 Objetivo del Juego

1. **Explorar** el fondo del océano
2. **Localizar** buzos perdidos (figuras naranjas con aro brillante)
3. **Acercarte** al buzo hasta que veas el mensaje "Presiona ESPACIO para recoger"
4. **Presionar ESPACIO** para recoger al buzo (se unirá al submarino)
5. **Subir a la superficie** y acercarte al barco
6. **Presionar ESPACIO** cerca del barco para entregar al buzo
7. **Repetir** hasta rescatar todos los buzos (5 en total)

---

## 🏗️ Estructura del Proyecto
```
SubmarinoDeRescate/
│
├── index.html                 # Punto de entrada del juego
├── README.md                  # Este archivo
│
├── css/
│   └── styles.css            # Estilos del HUD y canvas
│
├── js/
│   ├── main.js               # Orquestador principal del juego
│   ├── config.js             # Configuración y constantes
│   │
│   ├── entities/             # Objetos del juego
│   │   ├── Submarine.js      # Clase del submarino (jugador)
│   │   ├── Diver.js          # Clase de los buzos (paquetes)
│   │   └── Ship.js           # Clase del barco (zona de entrega)
│   │
│   ├── systems/              # Sistemas del juego
│   │   ├── InputManager.js   # Manejo de teclado
│   │   ├── CollisionManager.js # Detección de proximidad
│   │   └── UIManager.js      # Interfaz de usuario (HUD)
│   │
│   └── environment/          # Ambiente y efectos
│       ├── Ocean.js          # Escenario submarino
│       └── Effects.js        # Efectos visuales (burbujas, rocas, corales)
│
└── assets/                   # (Vacío - todo generado por código)
```

---

## ⚙️ Arquitectura del Código



## ✅ Requisitos del Examen Cumplidos

| Requisito | Implementación | Ubicación |
|-----------|----------------|-----------|
| **1. Jugador controlable** | Submarino con WASD + Q/E | `Submarine.js` + `InputManager.js` |
| **2. Paquete a recoger** | Buzos en el fondo del océano | `Diver.js` |
| **3. Zona de recogida** | Fondo marino (y = -15) | `config.js` + `Ocean.js` |
| **4. Zona de entrega** | Barco en superficie (y = 5) | `Ship.js` |
| **5. Mecánica de recogida** | ESPACIO cerca del buzo | `main.js` → `tryPickup()` |
| **6. Mecánica de entrega** | ESPACIO cerca del barco | `main.js` → `tryDelivery()` |
| **7. Estado del juego** | `submarine.hasDiver()` | `Submarine.js` línea 195 |
| **8. Texturas y modelos** | Submarino, buzos, barco, efectos | Todas las entidades |

---

## 🔧 Conceptos de Babylon.js Utilizados

✅ **BABYLON.Engine**
```javascript
const engine = new BABYLON.Engine(canvas, true);
// main.js línea 33
```

✅ **BABYLON.Scene**
```javascript
const scene = new BABYLON.Scene(engine);
// main.js línea 36
```

✅ **BABYLON.FreeCamera**
```javascript
const camera = new BABYLON.FreeCamera("camera", position, scene);
// main.js línea 73
```

✅ **BABYLON.HemisphericLight**
```javascript
const light = new BABYLON.HemisphericLight("light", direction, scene);
// Ocean.js línea 52
```

✅ **BABYLON.MeshBuilder**
```javascript
// CreateBox, CreateSphere, CreateGround, CreateCylinder
BABYLON.MeshBuilder.CreateBox("name", options, scene);
// Usado en TODAS las entidades
```

✅ **BABYLON.StandardMaterial**
```javascript
const material = new BABYLON.StandardMaterial("mat", scene);
material.diffuseColor = BABYLON.Color3.FromHexString("#FFD700");
// Usado en todas las entidades
```

✅ **scene.onKeyboardObservable**
```javascript
scene.onKeyDownObservable.add((kbInfo) => { ... });
// InputManager.js línea 45
```

✅ **Parenting (emparentamiento)**
```javascript
// RECOGER: diver.mesh.parent = submarine.mesh
// Submarine.js línea 163

// SOLTAR: diver.mesh.parent = null
// Submarine.js línea 184
```

✅ **BABYLON.Vector3.Distance()**
```javascript
const distance = BABYLON.Vector3.Distance(pos1, pos2);
// CollisionManager.js línea 20
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Abrir directamente

1. Navega a la carpeta `SubmarinoDeRescate`
2. Haz doble clic en `index.html`
3. El juego se abrirá en tu navegador predeterminado
4. ¡Comienza a jugar!

---


## 🎓 Conceptos Aprendidos

### **Babylon.js**
- Motor 3D y escenas
- Creación de meshes (cajas, esferas, cilindros)
- Materiales y colores
- Iluminación (hemisférica, direccional, puntual)
- Cámaras y control
- Detección de entrada (teclado)
- Parenting (jerarquía de objetos)
- Animaciones
- Sistema de partículas básico (burbujas)

### **Desarrollo de Juegos**
- Game loop (bucle de renderizado)
- Manejo de estado del juego
- Sistema de colisiones/proximidad
- Interfaz de usuario (HUD)
- Feedback visual al jugador


---

## 👤 Autor

**Karina Arichavala**  
Estudiante de Juegos Interactivos  
Fecha: Noviembre 2025
