/**
 * CONFIG.JS
 * Configuración central del juego
 * Todas las constantes y valores ajustables en un solo lugar
 */

const CONFIG = {
    // === CONFIGURACIÓN DEL SUBMARINO ===
    SUBMARINE: {
        SPEED: 0.3,              // Velocidad de movimiento horizontal
        VERTICAL_SPEED: 0.2,     // Velocidad de subida/bajada
        SIZE: { width: 2, height: 1, depth: 4 }, // Dimensiones del submarino
        COLOR: "#FFD700",        // Color amarillo dorado
        START_POSITION: { x: 0, y: -5, z: 0 } // Posición inicial
    },

    // === CONFIGURACIÓN DE BUZOS ===
    DIVER: {
        COUNT: 5,                // Número de buzos en el juego
        SIZE: 1.2,               // Tamaño del buzo
        COLOR: "#FF6600",        // Color naranja (traje de buzo)
        SPAWN_AREA: {
            minX: -40,           // Límite mínimo X
            maxX: 40,            // Límite máximo X
            y: -15,              // Altura fija en el fondo
            minZ: -40,           // Límite mínimo Z
            maxZ: 40             // Límite máximo Z
        },
        PICKUP_DISTANCE: 4       // Distancia para poder recoger
    },

    // === CONFIGURACIÓN DEL BARCO ===
    SHIP: {
        SIZE: { width: 8, height: 3, depth: 15 }, // Dimensiones del barco
        COLOR: "#8B4513",        // Color café (madera)
        POSITION: { x: 0, y: 5, z: 0 }, // Posición en la superficie
        DROP_DISTANCE: 8         // Distancia para poder entregar
    },

    // === CONFIGURACIÓN DEL OCÉANO ===
    OCEAN: {
        GROUND_SIZE: 200,        // Tamaño del fondo marino
        GROUND_COLOR: "#1a4d2e", // Color verde oscuro (arena)
        WATER_LEVEL: 0,          // Nivel del agua (y = 0)
        FOG_START: 20,           // Inicio de la niebla
        FOG_END: 100,            // Fin de la niebla
        FOG_COLOR: "#003366"     // Color de la niebla (azul oscuro)
    },

    // === CONFIGURACIÓN DE ILUMINACIÓN ===
    LIGHTING: {
        AMBIENT_INTENSITY: 0.4,  // Intensidad de luz ambiental
        AMBIENT_COLOR: "#4da6ff", // Color azul agua
        HEMISPHERE_INTENSITY: 0.7 // Intensidad de luz hemisférica
    },

    // === CONFIGURACIÓN DE LA CÁMARA ===
    CAMERA: {
        OFFSET: { x: 0, y: 8, z: -15 }, // Posición relativa al submarino
        FOLLOW_SPEED: 0.1        // Velocidad de seguimiento (suave)
    },

    // === CONFIGURACIÓN DE EFECTOS ===
    EFFECTS: {
        BUBBLES_COUNT: 30,       // Número de burbujas
        BUBBLE_SPEED: 0.05,      // Velocidad de subida de burbujas
        ROCKS_COUNT: 20,         // Número de rocas decorativas
        CORALS_COUNT: 15         // Número de corales decorativos
    },

    // === CONFIGURACIÓN DE TECLAS ===
    KEYS: {
        FORWARD: 87,             // W
        BACKWARD: 83,            // S
        LEFT: 65,                // A
        RIGHT: 68,               // D
        UP: 81,                  // Q
        DOWN: 69,                // E
        ACTION: 32               // ESPACIO
    },

    // === MENSAJES DEL JUEGO ===
    MESSAGES: {
        SEARCHING: "🔍 Busca buzos en el fondo del océano",
        NEAR_DIVER: "⚡ Presiona ESPACIO para recoger al buzo",
        DIVER_PICKED: "✅ ¡Buzo recogido! Llévalo al barco",
        NEAR_SHIP: "🚢 Presiona ESPACIO para entregar al buzo",
        DIVER_DELIVERED: "🎉 ¡Buzo rescatado! Busca más buzos",
        ALL_COMPLETE: "🏆 ¡Misión completada! Todos los buzos rescatados"
    }
};

// Hacer CONFIG disponible globalmente
// (En un proyecto más grande usaríamos módulos ES6, pero esto funciona sin servidor)