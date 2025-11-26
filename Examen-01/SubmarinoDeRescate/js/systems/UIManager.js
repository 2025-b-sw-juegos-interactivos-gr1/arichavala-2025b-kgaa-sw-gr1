/**
 * UIMANAGER.JS
 * Sistema de manejo de interfaz de usuario (HUD)
 * Actualiza el DOM con información del juego
 */

class UIManager {
    constructor() {
        // Obtener referencias a los elementos del DOM
        this.scoreElement = document.getElementById('score');
        this.statusElement = document.getElementById('status');
        
        // Estado del juego
        this.score = 0;
        this.totalDivers = 0;
        
        console.log("✅ UIManager inicializado");
    }

    /**
     * Inicializa el UI con el número total de buzos
     * @param {number} total - Número total de buzos en el juego
     */
    initialize(total) {
        this.totalDivers = total;
        this.score = 0;
        this.updateScore();
        this.showMessage(CONFIG.MESSAGES.SEARCHING);
    }

    /**
     * Actualiza el contador de buzos rescatados
     */
    updateScore() {
        if (this.scoreElement) {
            this.scoreElement.textContent = `${this.score}/${this.totalDivers}`;
            
            // Animación de pulso cuando cambia el score
            this.scoreElement.classList.add('pulse');
            setTimeout(() => {
                this.scoreElement.classList.remove('pulse');
            }, 500);
        }
    }

    /**
     * Incrementa el score cuando se rescata un buzo
     */
    incrementScore() {
        this.score++;
        this.updateScore();
        
        // Verificar si se completó el juego
        if (this.score >= this.totalDivers) {
            this.showMessage(CONFIG.MESSAGES.ALL_COMPLETE);
        }
    }

    /**
     * Muestra un mensaje en el HUD
     * @param {string} message - Mensaje a mostrar
     */
    showMessage(message) {
        if (this.statusElement) {
            this.statusElement.textContent = message;
        }
    }

    /**
     * Actualiza el estado según la situación del juego
     * @param {Object} gameState - Estado actual del juego
     */
    updateGameState(gameState) {
        const { 
            hasPackage, 
            nearDiver, 
            nearShip, 
            allComplete 
        } = gameState;

        if (allComplete) {
            this.showMessage(CONFIG.MESSAGES.ALL_COMPLETE);
        } else if (hasPackage && nearShip) {
            this.showMessage(CONFIG.MESSAGES.NEAR_SHIP);
        } else if (hasPackage) {
            this.showMessage(CONFIG.MESSAGES.DIVER_PICKED);
        } else if (nearDiver) {
            this.showMessage(CONFIG.MESSAGES.NEAR_DIVER);
        } else {
            this.showMessage(CONFIG.MESSAGES.SEARCHING);
        }
    }

    /**
     * Muestra un mensaje temporal
     * @param {string} message - Mensaje a mostrar
     * @param {number} duration - Duración en milisegundos (default: 2000)
     */
    showTemporaryMessage(message, duration = 2000) {
        this.showMessage(message);
        setTimeout(() => {
            // Volver al mensaje predeterminado después del tiempo
            this.showMessage(CONFIG.MESSAGES.SEARCHING);
        }, duration);
    }

    /**
     * Obtiene el score actual
     * @returns {number}
     */
    getScore() {
        return this.score;
    }

    /**
     * Verifica si todos los buzos han sido rescatados
     * @returns {boolean}
     */
    isGameComplete() {
        return this.score >= this.totalDivers;
    }

    /**
     * Reinicia el UI (útil para reiniciar el juego)
     */
    reset() {
        this.score = 0;
        this.updateScore();
        this.showMessage(CONFIG.MESSAGES.SEARCHING);
    }

    /**
     * Muestra información de debug en consola
     */
    debugInfo() {
        console.log(`📊 UI Estado - Score: ${this.score}/${this.totalDivers}`);
        console.log(`📊 Mensaje actual: ${this.statusElement.textContent}`);
    }

    /**
     * Actualiza el estilo del HUD según el estado
     * @param {string} state - 'normal', 'success', 'warning'
     */
    setStatusStyle(state) {
        if (!this.statusElement) return;

        // Remover clases previas
        this.statusElement.classList.remove('status-normal', 'status-success', 'status-warning');
        
        // Agregar clase según el estado
        switch(state) {
            case 'success':
                this.statusElement.classList.add('status-success');
                break;
            case 'warning':
                this.statusElement.classList.add('status-warning');
                break;
            default:
                this.statusElement.classList.add('status-normal');
        }
    }

    /**
     * Muestra un efecto visual cuando se recoge un buzo
     */
    showPickupEffect() {
        this.showTemporaryMessage(CONFIG.MESSAGES.DIVER_PICKED, 1500);
        this.setStatusStyle('success');
        setTimeout(() => {
            this.setStatusStyle('normal');
        }, 1500);
    }

    /**
     * Muestra un efecto visual cuando se entrega un buzo
     */
    showDeliveryEffect() {
        this.incrementScore();
        this.showTemporaryMessage(CONFIG.MESSAGES.DIVER_DELIVERED, 2000);
        this.setStatusStyle('success');
        setTimeout(() => {
            this.setStatusStyle('normal');
        }, 2000);
    }
}