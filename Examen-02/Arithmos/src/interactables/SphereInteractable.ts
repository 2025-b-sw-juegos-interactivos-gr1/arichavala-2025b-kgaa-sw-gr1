/**
 * SphereInteractable
 * Implementación concreta de InteractableObject para esferas flotantes
 * Representan las opciones de respuesta en los puzzles
 */
import { MeshBuilder, Scene, Vector3, StandardMaterial, Color3 } from '@babylonjs/core';
import { InteractableObject } from './InteractableObject';

export class SphereInteractable extends InteractableObject {
    constructor(
        id: string,
        value: number | string,
        isCorrect: boolean,
        scene: Scene,
        position: Vector3
    ) {
        super(id, value, isCorrect);
        this.createMesh(scene, position);
    }

    /**
     * Crea la esfera 3D en la escena
     */
    private createMesh(scene: Scene, position: Vector3): void {
        this.mesh = MeshBuilder.CreateSphere(
            this.id,
            { diameter: 1 },
            scene
        );
        
        this.mesh.position = position;

        // Material básico (se personalizará en la épica de arte)
        const material = new StandardMaterial(`${this.id}_mat`, scene);
        material.diffuseColor = Color3.Yellow();
        this.mesh.material = material;

        // Configurar interacción
        this.setupInteraction();
    }

    /**
     * Configura el evento de clic en la esfera
     */
    private setupInteraction(): void {
        if (this.mesh) {
            this.mesh.actionManager = null; // Se implementará con ActionManager en siguientes historias
        }
    }
}
