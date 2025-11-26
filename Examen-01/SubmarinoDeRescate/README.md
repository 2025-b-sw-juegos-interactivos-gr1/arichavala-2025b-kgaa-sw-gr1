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