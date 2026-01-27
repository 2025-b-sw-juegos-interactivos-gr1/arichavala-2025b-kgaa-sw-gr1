/**
 * PlayerController
 * Gestiona el input del jugador (WASD) y la cámara en primera persona.
 * No contiene lógica de juego, solo física de movimiento.
 */
import { UniversalCamera, Scene, Vector3 } from '@babylonjs/core';

export class PlayerController {
    private camera: UniversalCamera;
    private scene: Scene;
    private moveSpeed: number = 0.5;

    constructor(scene: Scene) {
        this.scene = scene;
        this.camera = this.createCamera();
    }

    /**
     * Crea y configura la cámara en primera persona
     */
    private createCamera(): UniversalCamera {
        const camera = new UniversalCamera(
            'playerCamera',
            new Vector3(0, 1.6, -5),
            this.scene
        );
        
        camera.setTarget(Vector3.Zero());
        camera.attachControl(true);
        
        return camera;
    }

    /**
     * Obtiene la cámara del jugador
     */
    public getCamera(): UniversalCamera {
        return this.camera;
    }

    /**
     * Actualiza la posición del jugador (llamado en el game loop)
     */
    public update(): void {
        // La lógica de movimiento WASD se implementará en las siguientes historias de usuario
    }
}
