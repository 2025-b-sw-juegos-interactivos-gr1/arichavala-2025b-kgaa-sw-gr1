/**
 * DoorMechanism
 * Controla la animacion de las puertas/obstaculos.
 * Se suscribe al InteractableObject usando el Observer Pattern.
 * 
 * E2-HU-08: Integrado con FeedbackSystem para retroalimentacion visual/auditiva
 * E3-HU-11: Logica de la Pared Glitch - Dispose al seleccionar respuesta correcta
 */
import { Mesh, Scene, Animation } from '@babylonjs/core';
import { IObserver } from '../interactables/InteractableObject';
import { FeedbackSystem } from '../core/FeedbackSystem';

export class DoorMechanism implements IObserver {
    private doorMesh: Mesh | null;
    private scene: Scene;
    private isOpen: boolean;
    private feedbackSystem: FeedbackSystem;

    constructor(scene: Scene, feedbackSystem: FeedbackSystem) {
        this.scene = scene;
        this.doorMesh = null;
        this.isOpen = false;
        this.feedbackSystem = feedbackSystem;
    }

    /**
     * Crea la puerta/pared que bloquea el camino
     */
    public createDoor(mesh: Mesh): void {
        this.doorMesh = mesh;
        console.log('Pared Glitch creada y lista para desbloquearse');
    }

    /**
     * Implementacion del Observer Pattern
     * E3-HU-11: Se ejecuta cuando el jugador selecciona una respuesta
     * Si es correcta (esfera 6), la pared desaparece
     */
    public onNotify(isCorrect: boolean): void {
        if (isCorrect) {
            console.log('Respuesta correcta! Abriendo puerta...');
            this.feedbackSystem.showSuccess(this.doorMesh || undefined);
            this.openDoor();
        } else {
            console.log('Respuesta incorrecta. Intentalo de nuevo.');
            this.feedbackSystem.showError(this.doorMesh || undefined);
        }
    }

    /**
     * E3-HU-11: Abre la puerta eliminandola de la escena
     * Logica: Si clic en esfera 6 (correcta) -> Pared.dispose()
     */
    private openDoor(): void {
        if (this.doorMesh && !this.isOpen) {
            console.log('Ejecutando Pared.dispose() - Pared Glitch eliminada');
            
            // Eliminar la pared de la escena
            this.doorMesh.dispose();
            this.isOpen = true;
            
            console.log('Camino desbloqueado! El jugador puede avanzar');
        } else if (this.isOpen) {
            console.log('La puerta ya esta abierta');
        }
    }

    /**
     * Verifica si la puerta esta abierta
     */
    public getIsOpen(): boolean {
        return this.isOpen;
    }
}
