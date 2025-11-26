/**
 * INPUTMANAGER.JS
 * Sistema de manejo de entrada de teclado
 * Usa scene.onKeyboardObservable para detectar teclas
 */

class InputManager {
    constructor(scene) {
        this.scene = scene;

        if (!this.scene) {
            console.error("❌ ERROR CRÍTICO: InputManager recibió una escena undefined");
            return;
        }

        // Estado de las teclas (presionadas o no)
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
            action: false
        };

        // Callbacks que serán llamados desde main.js
        this.onMoveForward = null;
        this.onMoveBackward = null;
        this.onMoveLeft = null;
        this.onMoveRight = null;
        this.onMoveUp = null;
        this.onMoveDown = null;
        this.onAction = null;

        // Variable para evitar múltiples llamadas del ESPACIO
        this.actionCooldown = false;
        this.cooldownTime = 300; // 300ms entre acciones

        // Inicializar el observable de teclado
        this.setupKeyboardObservable();

        console.log("✅ InputManager inicializado");
    }

    /**
     * Configura el observable de teclado de Babylon.js
     * Este es el REQUISITO del profesor: scene.onKeyboardObservable
     */
    setupKeyboardObservable() {
    // Verificar que scene y los observables existen
    if (!this.scene || !this.scene.onKeyboardObservable) {
        console.error(" ERROR: scene.onKeyboardObservable no está disponible");
        return;
    }

    // Detectar cuando se PRESIONA o SUELTA una tecla
    this.scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            this.handleKeyDown(kbInfo.event.keyCode);
        } else if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
            this.handleKeyUp(kbInfo.event.keyCode);
        }
    });
}

    /**
     * Maneja cuando una tecla es presionada
     * @param {number} keyCode - Código de la tecla
     */
    handleKeyDown(keyCode) {
        switch(keyCode) {
            case CONFIG.KEYS.FORWARD: // W
                this.keys.forward = true;
                break;
            case CONFIG.KEYS.BACKWARD: // S
                this.keys.backward = true;
                break;
            case CONFIG.KEYS.LEFT: // A
                this.keys.left = true;
                break;
            case CONFIG.KEYS.RIGHT: // D
                this.keys.right = true;
                break;
            case CONFIG.KEYS.UP: // Q
                this.keys.up = true;
                break;
            case CONFIG.KEYS.DOWN: // E
                this.keys.down = true;
                break;
            case CONFIG.KEYS.ACTION: // ESPACIO
                if (!this.actionCooldown) {
                    this.keys.action = true;
                    this.triggerAction();
                }
                break;
        }
    }

    /**
     * Maneja cuando una tecla es soltada
     * @param {number} keyCode - Código de la tecla
     */
    handleKeyUp(keyCode) {
        switch(keyCode) {
            case CONFIG.KEYS.FORWARD:
                this.keys.forward = false;
                break;
            case CONFIG.KEYS.BACKWARD:
                this.keys.backward = false;
                break;
            case CONFIG.KEYS.LEFT:
                this.keys.left = false;
                break;
            case CONFIG.KEYS.RIGHT:
                this.keys.right = false;
                break;
            case CONFIG.KEYS.UP:
                this.keys.up = false;
                break;
            case CONFIG.KEYS.DOWN:
                this.keys.down = false;
                break;
            case CONFIG.KEYS.ACTION:
                this.keys.action = false;
                break;
        }
    }

    /**
     * Dispara el evento de acción (ESPACIO)
     * Implementa cooldown para evitar múltiples llamadas
     */
    triggerAction() {
        if (this.onAction && typeof this.onAction === 'function') {
            this.onAction();
            
            // Activar cooldown
            this.actionCooldown = true;
            setTimeout(() => {
                this.actionCooldown = false;
            }, this.cooldownTime);
        }
    }

    /**
     * Actualiza el estado del movimiento
     * Llama a los callbacks apropiados según las teclas presionadas
     * Este método debe ser llamado en el loop de renderizado
     */
    update() {
        // Movimiento hacia adelante/atrás
        if (this.keys.forward && this.onMoveForward) {
            this.onMoveForward();
        }
        if (this.keys.backward && this.onMoveBackward) {
            this.onMoveBackward();
        }

        // Movimiento izquierda/derecha
        if (this.keys.left && this.onMoveLeft) {
            this.onMoveLeft();
        }
        if (this.keys.right && this.onMoveRight) {
            this.onMoveRight();
        }

        // Movimiento arriba/abajo
        if (this.keys.up && this.onMoveUp) {
            this.onMoveUp();
        }
        if (this.keys.down && this.onMoveDown) {
            this.onMoveDown();
        }
    }

    /**
     * Verifica si una tecla específica está presionada
     * @param {string} keyName - Nombre de la tecla
     * @returns {boolean}
     */
    isKeyPressed(keyName) {
        return this.keys[keyName] || false;
    }

    /**
     * Reinicia todos los estados de teclas
     */
    reset() {
        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }

    /**
     * Debug: Muestra el estado de todas las teclas
     */
    debugKeys() {
        console.log("🎮 Estado de teclas:", this.keys);
    }
}