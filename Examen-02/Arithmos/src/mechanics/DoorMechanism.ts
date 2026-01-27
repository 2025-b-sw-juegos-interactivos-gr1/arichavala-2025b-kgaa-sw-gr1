/**
 * DoorMechanism
 * Controla la animación de las puertas/obstáculos.
 * Se suscribe al InteractableObject usando el Observer Pattern.
 */
import { Mesh, Scene, Animation } from '@babylonjs/core';
import { IObserver } from '../interactables/InteractableObject';

export class DoorMechanism implements IObserver {
    private doorMesh: Mesh | null;
    private scene: Scene;
    private isOpen: boolean;

    constructor(scene: Scene) {
        this.scene = scene;
        this.doorMesh = null;
        this.isOpen = false;
    }

    /**
     * Crea la puerta/pared que bloquea el camino
     */
    public createDoor(mesh: Mesh): void {
        this.doorMesh = mesh;
    }

    /**
     * Implementación del Observer Pattern
     * Se ejecuta cuando el jugador selecciona una respuesta
     */
    public onNotify(isCorrect: boolean): void {
        if (isCorrect) {
            console.log('¡Respuesta correcta! Abriendo puerta...');
            this.openDoor();
        } else {
            console.log('Respuesta incorrecta. Inténtalo de nuevo.');
            this.showError();
        }
    }

    /**
     * Abre la puerta (animación o dispose)
     */
    private openDoor(): void {
        if (this.doorMesh && !this.isOpen) {
            // Por ahora simplemente eliminamos la puerta
            // En futuras historias se añadirá animación
            this.doorMesh.dispose();
            this.isOpen = true;
        }
    }

    /**
     * Muestra feedback visual de error
     */
    private showError(): void {
        // Se implementará en futuras historias (shake effect, sonido)
        console.log('Efecto de error visual (pendiente)');
    }
}
