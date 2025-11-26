/**
 * MAIN.JS
 * Archivo principal del juego
 * Orquestador que conecta todas las clases y sistemas
 * 
 * Autor: [Tu nombre]
 * Proyecto: Submarino de Rescate - Examen 01
 * Fecha: Noviembre 2024
 */

class Game {
    constructor() {
        // Referencias a elementos del DOM
        this.canvas = document.getElementById('gameCanvas');
        
        // Babylon.js core
        this.engine = null;
        this.scene = null;
        this.camera = null;
        
        // Sistemas
        this.inputManager = null;
        this.collisionManager = null;
        this.uiManager = null;
        
        // Entidades
        this.submarine = null;
        this.divers = [];
        this.ship = null;
        
        // Ambiente
        this.ocean = null;
        this.effects = null;
        
        // Estado del juego
        this.gameRunning = false;
        
        // Inicializar el juego
        this.initialize();
    }

    /**
     * Inicializa el motor Babylon.js y la escena
     */
    initialize() {
        console.log("🎮 Iniciando Submarino de Rescate...");
        
        // Crear el motor de Babylon.js
        this.engine = new BABYLON.Engine(this.canvas, true);
        
        // Crear la escena
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color3.FromHexString("#001a33");
        
        // Crear la cámara
        this.createCamera();
        
        // Crear sistemas
        this.createSystems();
        
        // Crear ambiente
        this.createEnvironment();
        
        // Crear entidades
        this.createEntities();
        
        // Conectar controles
        this.setupControls();
        
        // Inicializar UI
        this.uiManager.initialize(CONFIG.DIVER.COUNT);
        
        // Iniciar el loop de renderizado
        this.startGameLoop();
        
        // Marcar como iniciado
        this.gameRunning = true;
        
        console.log("✅ Juego iniciado correctamente");
        console.log("📊 Estadísticas:");
        console.log(`   - Buzos en el océano: ${this.divers.length}`);
        console.log(`   - Posición del submarino: ${this.submarine.getPosition()}`);
        console.log(`   - Posición del barco: ${this.ship.getPosition()}`);
    }

    /**
     * Crea la cámara que sigue al submarino
     * Usa BABYLON.FreeCamera o BABYLON.FollowCamera (requisito del profesor)
     */
    createCamera() {
        // Crear cámara libre
        this.camera = new BABYLON.FreeCamera(
            "camera",
            new BABYLON.Vector3(0, 5, -15),
            this.scene
        );
        
        // Configurar la cámara
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        
        // Limitar rotación para evitar confusión
        this.camera.lowerBetaLimit = 0.1;
        this.camera.upperBetaLimit = Math.PI / 2;
        
        console.log("  ✓ Cámara creada");
    }

    /**
     * Crea todos los sistemas del juego
     */
    createSystems() {
        this.collisionManager = new CollisionManager();
        this.inputManager = new InputManager(this.scene);
        this.uiManager = new UIManager();
        
        console.log("  ✓ Sistemas creados");
    }

    /**
     * Crea el ambiente (océano y efectos)
     */
    createEnvironment() {
        this.ocean = new Ocean(this.scene);
        this.effects = new Effects(this.scene);
        
        console.log("  ✓ Ambiente creado");
    }

    /**
     * Crea todas las entidades del juego
     */
    createEntities() {
        // Crear el submarino
        this.submarine = new Submarine(this.scene);
        
        // Crear los buzos en posiciones aleatorias
        for (let i = 0; i < CONFIG.DIVER.COUNT; i++) {
            const randomPos = new BABYLON.Vector3(
                Math.random() * (CONFIG.DIVER.SPAWN_AREA.maxX - CONFIG.DIVER.SPAWN_AREA.minX) + CONFIG.DIVER.SPAWN_AREA.minX,
                CONFIG.DIVER.SPAWN_AREA.y,
                Math.random() * (CONFIG.DIVER.SPAWN_AREA.maxZ - CONFIG.DIVER.SPAWN_AREA.minZ) + CONFIG.DIVER.SPAWN_AREA.minZ
            );
            
            const diver = new Diver(this.scene, randomPos);
            this.divers.push(diver);
        }
        
        // Crear el barco
        this.ship = new Ship(this.scene);
        
        console.log("  ✓ Entidades creadas");
    }

    /**
     * Conecta los controles del InputManager con las acciones del juego
     */
    setupControls() {
        // Movimiento hacia adelante
        this.inputManager.onMoveForward = () => {
            this.submarine.move('forward');
        };
        
        // Movimiento hacia atrás
        this.inputManager.onMoveBackward = () => {
            this.submarine.move('backward');
        };
        
        // Movimiento a la izquierda
        this.inputManager.onMoveLeft = () => {
            this.submarine.move('left');
        };
        
        // Movimiento a la derecha
        this.inputManager.onMoveRight = () => {
            this.submarine.move('right');
        };
        
        // Movimiento hacia arriba
        this.inputManager.onMoveUp = () => {
            this.submarine.move('up');
        };
        
        // Movimiento hacia abajo
        this.inputManager.onMoveDown = () => {
            this.submarine.move('down');
        };
        
        // Acción (recoger/entregar)
        this.inputManager.onAction = () => {
            this.handleAction();
        };
        
        console.log("  ✓ Controles configurados");
    }

    /**
     * Maneja la acción principal (ESPACIO)
     * Decide si recoger un buzo o entregarlo al barco
     */
    handleAction() {
        if (this.submarine.hasDiver()) {
            // Si tiene un buzo, intentar entregar
            this.tryDelivery();
        } else {
            // Si no tiene buzo, intentar recoger
            this.tryPickup();
        }
    }

    /**
     * Intenta recoger un buzo cercano
     * Usa CollisionManager para verificar distancia
     */
    tryPickup() {
        const submarinePos = this.submarine.getPosition();
        
        // Buscar el buzo más cercano no recogido
        for (let diver of this.divers) {
            // Verificar que el buzo no ha sido recogido ni entregado
            if (!diver.isPickedUp() && !diver.isDelivered()) {
                // Verificar distancia usando CollisionManager
                const distance = this.collisionManager.getDistance(
                    submarinePos,
                    diver.getPosition()
                );
                
                // Si está dentro del rango de recogida
                if (distance <= CONFIG.DIVER.PICKUP_DISTANCE) {
                    // Recoger el buzo (PARENTING)
                    this.submarine.pickupDiver(diver);
                    diver.markAsPickedUp();
                    
                    // Actualizar UI
                    this.uiManager.showPickupEffect();
                    
                    console.log("✅ Buzo recogido");
                    return; // Solo recoger uno a la vez
                }
            }
        }
        
        console.log("⚠️ No hay buzos cerca");
    }

    /**
     * Intenta entregar el buzo al barco
     * Usa CollisionManager para verificar distancia
     */
    tryDelivery() {
        const submarinePos = this.submarine.getPosition();
        const shipPos = this.ship.getPosition();
        
        // Verificar distancia al barco
        const distance = this.collisionManager.getDistance(submarinePos, shipPos);
        
        if (distance <= CONFIG.SHIP.DROP_DISTANCE) {
            // Soltar el buzo (PARENTING = null)
            const deliveredDiver = this.submarine.getCurrentDiver();
            this.submarine.dropDiver();
            
            if (deliveredDiver) {
                deliveredDiver.markAsDelivered();
            }
            
            // Actualizar UI
            this.uiManager.showDeliveryEffect();
            
            // Verificar si el juego terminó
            if (this.uiManager.isGameComplete()) {
                this.onGameComplete();
            }
            
            console.log("✅ Buzo entregado");
        } else {
            console.log("⚠️ Estás muy lejos del barco");
        }
    }

    /**
     * Actualiza el estado del juego cada frame
     * Aquí se actualiza la lógica del juego
     */
    update() {
        // Actualizar controles
        this.inputManager.update();
        
        // Actualizar efectos (burbujas)
        this.effects.update();
        
        // Actualizar cámara para seguir al submarino
        this.updateCamera();
        
        // Actualizar UI según el estado
        this.updateUI();
    }

    /**
     * Actualiza la cámara para seguir suavemente al submarino
     */
    updateCamera() {
        const submarinePos = this.submarine.getPosition();
        
        // Posición deseada de la cámara (detrás y arriba del submarino)
        const targetCameraPos = new BABYLON.Vector3(
            submarinePos.x + CONFIG.CAMERA.OFFSET.x,
            submarinePos.y + CONFIG.CAMERA.OFFSET.y,
            submarinePos.z + CONFIG.CAMERA.OFFSET.z
        );
        
        // Interpolar suavemente hacia la posición deseada
        this.camera.position = BABYLON.Vector3.Lerp(
            this.camera.position,
            targetCameraPos,
            CONFIG.CAMERA.FOLLOW_SPEED
        );
        
        // Apuntar hacia el submarino
        this.camera.setTarget(submarinePos);
    }

    /**
     * Actualiza la UI según el estado actual del juego
     */
    updateUI() {
        const submarinePos = this.submarine.getPosition();
        const hasDiver = this.submarine.hasDiver();
        
        // Verificar si hay un buzo cerca
        let nearDiver = false;
        if (!hasDiver) {
            for (let diver of this.divers) {
                if (!diver.isPickedUp() && !diver.isDelivered()) {
                    const distance = this.collisionManager.getDistance(
                        submarinePos,
                        diver.getPosition()
                    );
                    if (distance <= CONFIG.DIVER.PICKUP_DISTANCE) {
                        nearDiver = true;
                        break;
                    }
                }
            }
        }
        
        // Verificar si está cerca del barco
        const nearShip = this.collisionManager.canDeliverToShip(
            submarinePos,
            this.ship.getPosition()
        );
        
        // Verificar si todos los buzos han sido rescatados
        const allComplete = this.uiManager.isGameComplete();
        
        // Actualizar UI con el estado
        this.uiManager.updateGameState({
            hasPackage: hasDiver,
            nearDiver: nearDiver,
            nearShip: nearShip,
            allComplete: allComplete
        });
    }

    /**
     * Se ejecuta cuando se completa el juego
     */
    onGameComplete() {
        console.log("🏆 ¡JUEGO COMPLETADO!");
        console.log(`   Todos los ${CONFIG.DIVER.COUNT} buzos han sido rescatados`);
        
        // Aquí podrías añadir efectos especiales, música, etc.
    }

    /**
     * Inicia el loop de renderizado
     */
    startGameLoop() {
        this.engine.runRenderLoop(() => {
            if (this.gameRunning) {
                this.update();
            }
            this.scene.render();
        });
        
        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        
        console.log("  ✓ Loop de renderizado iniciado");
    }

    /**
     * Pausa el juego
     */
    pause() {
        this.gameRunning = false;
        console.log("⏸️ Juego pausado");
    }

    /**
     * Reanuda el juego
     */
    resume() {
        this.gameRunning = true;
        console.log("▶️ Juego reanudado");
    }

    /**
     * Debug: Muestra información completa del juego
     */
    debugInfo() {
        console.log(" === DEBUG INFO ===");
        this.submarine.debugInfo();
        this.ship.debugInfo();
        this.ocean.debugInfo();
        this.effects.debugInfo();
        this.uiManager.debugInfo();
        console.log("===================");
    }
}

// ============================================
// INICIALIZACIÓN DEL JUEGO
// ============================================

// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    console.log(" DOM cargado, iniciando juego...");
    
    // Crear instancia del juego
    const game = new Game();
    
    // Hacer el objeto game accesible globalmente para debug
    window.game = game;
    
    console.log(" Tip: Escribe 'game.debugInfo()' en la consola para ver información de debug");
});