/**
 * Level4 - Río Divisor
 * Implementación específica del Nivel 4 (Épica 3)
 * Tema: División y fracciones
 * 
 * E2-HU-08: Integrado con FeedbackSystem
 */
import { Scene, MeshBuilder, Vector3, StandardMaterial, Color3 } from '@babylonjs/core';
import { Level } from './Level';
import { SphereInteractable } from '../interactables/SphereInteractable';
import { DoorMechanism } from '../mechanics/DoorMechanism';
import { FeedbackSystem } from '../core/FeedbackSystem';

export class Level4 extends Level {
    private doorMechanism: DoorMechanism;
    private feedbackSystem: FeedbackSystem;

    constructor(scene: Scene, feedbackSystem: FeedbackSystem) {
        super(scene, 4, 'Río Divisor');
        this.feedbackSystem = feedbackSystem;
        this.doorMechanism = new DoorMechanism(scene, feedbackSystem);
    }

    /**
     * Greyboxing del Nivel 4
     * Crea el pasillo, suelo y la pared que bloquea el camino
     */
    public buildGeometry(): void {
        console.log('Construyendo geometría del Nivel 4...');

        // Suelo
        const ground = MeshBuilder.CreateGround(
            'ground',
            { width: 20, height: 40 },
            this.scene
        );
        const groundMat = new StandardMaterial('groundMat', this.scene);
        groundMat.diffuseColor = Color3.Gray();
        ground.material = groundMat;

        // Pared bloqueante (Glitch Wall)
        const wall = MeshBuilder.CreateBox(
            'glitchWall',
            { width: 10, height: 5, depth: 0.5 },
            this.scene
        );
        wall.position = new Vector3(0, 2.5, 10);
        
        const wallMat = new StandardMaterial('wallMat', this.scene);
        wallMat.diffuseColor = Color3.Red();
        wallMat.alpha = 0.7;
        wall.material = wallMat;

        this.doorMechanism.createDoor(wall);
    }

    /**
     * Configura los puzzles del Nivel 4
     * Coloca las 3 esferas con valores (5, 7, 6) donde 6 es la correcta
     */
    public setupPuzzles(): void {
        console.log('Configurando puzzles del Nivel 4...');

        this.puzzleManager.setupPuzzle('level4_division');

        // Crear las 3 esferas de opción
        const sphere1 = new SphereInteractable(
            'sphere_5',
            5,
            false,
            this.scene,
            new Vector3(-3, 1.5, 8)
        );

        const sphere2 = new SphereInteractable(
            'sphere_7',
            7,
            false,
            this.scene,
            new Vector3(0, 1.5, 8)
        );

        const sphere3 = new SphereInteractable(
            'sphere_6',
            6,
            true, // Esta es la respuesta correcta
            this.scene,
            new Vector3(3, 1.5, 8)
        );

        // Configurar FeedbackSystem en las esferas
        sphere1.setFeedbackSystem(this.feedbackSystem);
        sphere2.setFeedbackSystem(this.feedbackSystem);
        sphere3.setFeedbackSystem(this.feedbackSystem);

        // Suscribir la puerta a las esferas (Observer Pattern)
        sphere1.addObserver(this.doorMechanism);
        sphere2.addObserver(this.doorMechanism);
        sphere3.addObserver(this.doorMechanism);

        // Registrar en el puzzle manager
        this.puzzleManager.registerInteractable(sphere1);
        this.puzzleManager.registerInteractable(sphere2);
        this.puzzleManager.registerInteractable(sphere3);
    }
}
