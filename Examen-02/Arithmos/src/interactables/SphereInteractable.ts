/**
 * SphereInteractable
 * Implementación concreta de InteractableObject para esferas flotantes
 * Representan las opciones de respuesta en los puzzles
 * 
 * E2-HU-07: Configurado para detectar clics mediante raycast
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
     * Usa metadata para conectar con el InteractionSystem
     */
    private setupInteraction(): void {
        if (this.mesh) {
            // Configurar metadata con callback de interacción
            this.mesh.metadata = {
                onInteract: (mesh: any) => this.onPointerDown()
            };
            
            // Hacer que el mesh sea seleccionable por raycast
            this.mesh.isPickable = true;
            
            // Efecto hover (resaltar al pasar el mouse)
            this.mesh.enablePointerMoveEvents = true;
        }
    }
}
