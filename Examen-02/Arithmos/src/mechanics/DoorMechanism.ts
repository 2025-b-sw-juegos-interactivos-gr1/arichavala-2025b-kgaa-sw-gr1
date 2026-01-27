/**
 * DoorMechanism
 * Controla la animacion de las puertas/obstaculos.
 * Se suscribe al InteractableObject usando el Observer Pattern.
 * 
 * E2-HU-08: Integrado con FeedbackSystem para retroalimentacion visual/auditiva
 * E3-HU-11: Logica de la Pared Glitch - Fragmentacion en partes iguales
 */
import { Mesh, Scene, Animation, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
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
     * Si es correcta (esfera 6), la pared se fragmenta en 4 partes (24 ÷ 6 = 4)
     */
    public onNotify(isCorrect: boolean): void {
        if (isCorrect) {
            console.log('Respuesta correcta! Fragmentando barrera en 4 partes...');
            this.feedbackSystem.showSuccess(this.doorMesh || undefined);
            this.openDoor();
        } else {
            console.log('Respuesta incorrecta. Intentalo de nuevo.');
            this.feedbackSystem.showError(this.doorMesh || undefined);
        }
    }

    /**
     * E3-HU-11: Fragmenta la pared en 4 partes iguales (24 ÷ 6 = 4)
     * Cada fragmento se separa y desaparece
     */
    private openDoor(): void {
        if (this.doorMesh && !this.isOpen) {
            console.log('Fragmentando pared en 4 partes iguales...');
            
            const originalPosition = this.doorMesh.position.clone();
            const material = this.doorMesh.material;
            
            // Crear 4 fragmentos (2x2)
            const fragmentWidth = 10 / 2; // Ancho dividido en 2
            const fragmentHeight = 6 / 2; // Alto dividido en 2
            
            const fragments: Mesh[] = [];
            
            // Fragmento superior izquierdo
            fragments.push(this.createFragment(
                new Vector3(originalPosition.x - fragmentWidth/2, originalPosition.y + fragmentHeight/2, originalPosition.z),
                fragmentWidth, fragmentHeight, material, -1, 1
            ));
            
            // Fragmento superior derecho
            fragments.push(this.createFragment(
                new Vector3(originalPosition.x + fragmentWidth/2, originalPosition.y + fragmentHeight/2, originalPosition.z),
                fragmentWidth, fragmentHeight, material, 1, 1
            ));
            
            // Fragmento inferior izquierdo
            fragments.push(this.createFragment(
                new Vector3(originalPosition.x - fragmentWidth/2, originalPosition.y - fragmentHeight/2, originalPosition.z),
                fragmentWidth, fragmentHeight, material, -1, -1
            ));
            
            // Fragmento inferior derecho
            fragments.push(this.createFragment(
                new Vector3(originalPosition.x + fragmentWidth/2, originalPosition.y - fragmentHeight/2, originalPosition.z),
                fragmentWidth, fragmentHeight, material, 1, -1
            ));
            
            // Eliminar pared original
            this.doorMesh.dispose();
            this.isOpen = true;
            
            // Animar fragmentos separándose
            fragments.forEach((fragment, index) => {
                setTimeout(() => {
                    fragment.dispose();
                }, 1500); // Desaparecer después de 1.5 segundos
            });
            
            console.log('Barrera fragmentada en 4 partes iguales! Camino desbloqueado');
        } else if (this.isOpen) {
            console.log('La puerta ya esta abierta');
        }
    }

    /**
     * Crea un fragmento de la pared y lo anima
     */
    private createFragment(position: Vector3, width: number, height: number, material: any, dirX: number, dirY: number): Mesh {
        const fragment = MeshBuilder.CreateBox(
            'fragment',
            { width: width, height: height, depth: 0.5 },
            this.scene
        );
        
        fragment.position = position;
        fragment.material = material;
        
        // Animar el fragmento moviéndose hacia afuera
        const animation = new Animation(
            'fragmentAnimation',
            'position',
            60,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        
        const keys = [
            { frame: 0, value: position },
            { frame: 60, value: new Vector3(
                position.x + dirX * 3,
                position.y + dirY * 2,
                position.z - 2
            )}
        ];
        
        animation.setKeys(keys);
        fragment.animations.push(animation);
        this.scene.beginAnimation(fragment, 0, 60, false);
        
        // Animar rotación
        const rotationAnimation = new Animation(
            'rotationAnimation',
            'rotation',
            60,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        
        const rotKeys = [
            { frame: 0, value: new Vector3(0, 0, 0) },
            { frame: 60, value: new Vector3(dirY * 1, dirX * 1.5, dirY * dirX * 0.5) }
        ];
        
        rotationAnimation.setKeys(rotKeys);
        fragment.animations.push(rotationAnimation);
        this.scene.beginAnimation(fragment, 0, 60, false);
        
        return fragment;
    }

    /**
     * Verifica si la puerta esta abierta
     */
    public getIsOpen(): boolean {
        return this.isOpen;
    }
}
