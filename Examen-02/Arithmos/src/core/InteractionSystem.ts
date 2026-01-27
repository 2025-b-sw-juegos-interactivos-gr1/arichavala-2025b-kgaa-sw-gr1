/**
 * InteractionSystem
 * Sistema de raycast para detectar objetos interactivos mediante clics.
 * E2-HU-07: Sistema de Interacción (Raycast)
 * 
 * Responsable de:
 * - Detectar clics del mouse
 * - Lanzar raycast desde la cámara
 * - Identificar objetos interactivos
 * - Ejecutar la lógica de interacción
 */
import { Scene, PointerEventTypes, PointerInfo } from '@babylonjs/core';

export class InteractionSystem {
    private scene: Scene;
    private isEnabled: boolean;

    constructor(scene: Scene) {
        this.scene = scene;
        this.isEnabled = true;
        this.setupPointerObservable();
    }

    /**
     * Configura el observable de puntero para detectar clics
     */
    private setupPointerObservable(): void {
        this.scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
            if (!this.isEnabled) return;

            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    this.handlePointerDown(pointerInfo);
                    break;
            }
        });
    }

    /**
     * Maneja el evento de clic
     */
    private handlePointerDown(pointerInfo: PointerInfo): void {
        const pickResult = pointerInfo.pickInfo;

        // Verificar si el raycast golpeó algo
        if (pickResult && pickResult.hit && pickResult.pickedMesh) {
            const meshName = pickResult.pickedMesh.name;
            
            console.log(`🎯 Objeto detectado: ${meshName}`);
            
            // El mesh debe tener metadata con el callback de interacción
            const metadata = pickResult.pickedMesh.metadata;
            if (metadata && metadata.onInteract) {
                metadata.onInteract();
            }
        }
    }

    /**
     * Habilita el sistema de interacción
     */
    public enable(): void {
        this.isEnabled = true;
    }

    /**
     * Deshabilita el sistema de interacción
     */
    public disable(): void {
        this.isEnabled = false;
    }

    /**
     * Verifica si el sistema está habilitado
     */
    public getIsEnabled(): boolean {
        return this.isEnabled;
    }
}
