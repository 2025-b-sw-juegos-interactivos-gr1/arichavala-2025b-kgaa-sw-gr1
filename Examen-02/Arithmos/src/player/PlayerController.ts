/**
 * PlayerController
 * Gestiona el input del jugador (WASD) y la cámara en primera persona.
 * No contiene lógica de juego, solo física de movimiento.
 * 
 * E2-HU-06: Sistema de Movimiento (WASD)
 * - Movimiento en primera persona sin salto
 * - Control con teclas W, A, S, D
 * - Velocidad de movimiento configurable
 */
import { UniversalCamera, Scene, Vector3 } from '@babylonjs/core';

export class PlayerController {
    private camera: UniversalCamera;
    private scene: Scene;
    private moveSpeed: number = 0.1;
    private inputMap: { [key: string]: boolean };

    constructor(scene: Scene) {
        this.scene = scene;
        this.inputMap = {};
        this.camera = this.createCamera();
        this.setupInputControls();
    }

    /**
     * Crea y configura la cámara en primera persona
     */
    private createCamera(): UniversalCamera {
        const camera = new UniversalCamera(
            'playerCamera',
            new Vector3(0, 1.6, -10),
            this.scene
        );
        
        // Configurar la cámara para mirar hacia adelante
        camera.setTarget(new Vector3(0, 1.6, 0));
        
        // Permitir control del mouse para mirar alrededor
        camera.attachControl(true);
        
        // Deshabilitar las teclas de movimiento por defecto de Babylon
        // para implementar el nuestro personalizado
        camera.keysUp = [];
        camera.keysDown = [];
        camera.keysLeft = [];
        camera.keysRight = [];
        
        return camera;
    }

    /**
     * Configura los controles de entrada (WASD)
     */
    private setupInputControls(): void {
        // Detectar cuando se presiona una tecla
        window.addEventListener('keydown', (evt) => {
            this.inputMap[evt.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (evt) => {
            this.inputMap[evt.key.toLowerCase()] = false;
        });
    }

    /**
     * Obtiene la cámara del jugador
     */
    public getCamera(): UniversalCamera {
        return this.camera;
    }

    /**
     * Actualiza la posición del jugador (llamado en el game loop)
     * Implementa el movimiento WASD en primera persona
     */
    public update(): void {
        // Vector de movimiento
        const moveVector = Vector3.Zero();

        // W - Adelante (Forward)
        if (this.inputMap['w']) {
            moveVector.addInPlace(this.camera.getDirection(Vector3.Forward()));
        }

        // S - Atrás (Backward)
        if (this.inputMap['s']) {
            moveVector.addInPlace(this.camera.getDirection(Vector3.Backward()));
        }

        // A - Izquierda (Left)
        if (this.inputMap['a']) {
            moveVector.addInPlace(this.camera.getDirection(Vector3.Left()));
        }

        // D - Derecha (Right)
        if (this.inputMap['d']) {
            moveVector.addInPlace(this.camera.getDirection(Vector3.Right()));
        }

        // Normalizar el vector para mantener velocidad constante en diagonal
        if (moveVector.length() > 0) {
            moveVector.normalize();
            
            // Aplicar velocidad
            moveVector.scaleInPlace(this.moveSpeed);
            
            // Mantener la altura constante (sin salto)
            moveVector.y = 0;
            
            // Mover la cámara
            this.camera.position.addInPlace(moveVector);
        }
    }

    /**
     * Obtiene la velocidad de movimiento
     */
    public getMoveSpeed(): number {
        return this.moveSpeed;
    }

    /**
     * Establece la velocidad de movimiento
     */
    public setMoveSpeed(speed: number): void {
        this.moveSpeed = speed;
    }
}
