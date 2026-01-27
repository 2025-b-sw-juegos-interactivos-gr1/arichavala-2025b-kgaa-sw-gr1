/**
 * TriggerZone
 * Sistema de zonas invisibles que detectan cuando el jugador entra
 * E3-HU-12: Zona de Meta para detectar completacion del nivel
 */
import { Mesh, MeshBuilder, Scene, Vector3, AbstractMesh } from '@babylonjs/core';

export class TriggerZone {
    private triggerMesh: Mesh;
    private scene: Scene;
    private hasTriggered: boolean;
    private onEnterCallback: (() => void) | null;

    constructor(
        scene: Scene,
        position: Vector3,
        size: Vector3,
        name: string = 'trigger'
    ) {
        this.scene = scene;
        this.hasTriggered = false;
        this.onEnterCallback = null;
        this.triggerMesh = this.createTriggerBox(position, size, name);
        this.setupCollisionDetection();
    }

    /**
     * Crea la caja invisible del trigger
     */
    private createTriggerBox(position: Vector3, size: Vector3, name: string): Mesh {
        const box = MeshBuilder.CreateBox(
            name,
            { width: size.x, height: size.y, depth: size.z },
            this.scene
        );

        box.position = position;
        box.isVisible = false;
        box.checkCollisions = false;
        box.isPickable = false;

        return box;
    }

    /**
     * Configura la deteccion de colision con el jugador
     */
    private setupCollisionDetection(): void {
        this.scene.registerBeforeRender(() => {
            if (this.hasTriggered) return;

            const camera = this.scene.activeCamera;
            if (!camera) return;

            const playerPosition = camera.position;
            const triggerPosition = this.triggerMesh.position;
            const triggerSize = this.triggerMesh.scaling;

            if (this.isPlayerInside(playerPosition, triggerPosition, triggerSize)) {
                this.trigger();
            }
        });
    }

    /**
     * Verifica si el jugador esta dentro del trigger
     */
    private isPlayerInside(
        playerPos: Vector3,
        triggerPos: Vector3,
        triggerSize: Vector3
    ): boolean {
        const halfWidth = triggerSize.x * 5;
        const halfHeight = triggerSize.y * 3;
        const halfDepth = triggerSize.z * 2;

        return (
            playerPos.x >= triggerPos.x - halfWidth &&
            playerPos.x <= triggerPos.x + halfWidth &&
            playerPos.y >= triggerPos.y - halfHeight &&
            playerPos.y <= triggerPos.y + halfHeight &&
            playerPos.z >= triggerPos.z - halfDepth &&
            playerPos.z <= triggerPos.z + halfDepth
        );
    }

    /**
     * Ejecuta el trigger
     */
    private trigger(): void {
        if (this.hasTriggered) return;

        this.hasTriggered = true;
        console.log('Trigger activado');

        if (this.onEnterCallback) {
            this.onEnterCallback();
        }
    }

    /**
     * Establece el callback que se ejecuta al entrar al trigger
     */
    public onEnter(callback: () => void): void {
        this.onEnterCallback = callback;
    }

    /**
     * Resetea el trigger
     */
    public reset(): void {
        this.hasTriggered = false;
    }

    /**
     * Limpia el trigger
     */
    public dispose(): void {
        this.triggerMesh.dispose();
    }
}
