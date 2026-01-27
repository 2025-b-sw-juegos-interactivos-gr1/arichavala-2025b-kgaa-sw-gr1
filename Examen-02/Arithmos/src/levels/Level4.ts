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
     * E3-HU-09: Construccion completa del pasillo lineal
     * Crea el pasillo, paredes laterales, suelo y la pared que bloquea el camino
     */
    public buildGeometry(): void {
        console.log('Construyendo geometria del Nivel 4...');

        // Suelo del pasillo (40 unidades de largo x 10 de ancho)
        const ground = MeshBuilder.CreateGround(
            'ground',
            { width: 10, height: 40 },
            this.scene
        );
        const groundMat = new StandardMaterial('groundMat', this.scene);
        groundMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
        ground.material = groundMat;

        // Pared lateral izquierda
        const leftWall = MeshBuilder.CreateBox(
            'leftWall',
            { width: 0.5, height: 6, depth: 40 },
            this.scene
        );
        leftWall.position = new Vector3(-5, 3, 0);
        const leftWallMat = new StandardMaterial('leftWallMat', this.scene);
        leftWallMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
        leftWall.material = leftWallMat;

        // Pared lateral derecha
        const rightWall = MeshBuilder.CreateBox(
            'rightWall',
            { width: 0.5, height: 6, depth: 40 },
            this.scene
        );
        rightWall.position = new Vector3(5, 3, 0);
        const rightWallMat = new StandardMaterial('rightWallMat', this.scene);
        rightWallMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
        rightWall.material = rightWallMat;

        // Pared trasera (detras del jugador)
        const backWall = MeshBuilder.CreateBox(
            'backWall',
            { width: 10, height: 6, depth: 0.5 },
            this.scene
        );
        backWall.position = new Vector3(0, 3, -20);
        const backWallMat = new StandardMaterial('backWallMat', this.scene);
        backWallMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
        backWall.material = backWallMat;

        // Pared bloqueante (Glitch Wall) - Obstaculo principal
        const glitchWall = MeshBuilder.CreateBox(
            'glitchWall',
            { width: 10, height: 6, depth: 0.5 },
            this.scene
        );
        glitchWall.position = new Vector3(0, 3, 10);
        
        const glitchWallMat = new StandardMaterial('glitchWallMat', this.scene);
        glitchWallMat.diffuseColor = Color3.Red();
        glitchWallMat.alpha = 0.6;
        glitchWallMat.emissiveColor = new Color3(0.3, 0, 0);
        glitchWall.material = glitchWallMat;

        // Plataforma elevada frente a la pared (para resaltar las esferas)
        const platform = MeshBuilder.CreateBox(
            'platform',
            { width: 8, height: 0.3, depth: 4 },
            this.scene
        );
        platform.position = new Vector3(0, 0.15, 7);
        const platformMat = new StandardMaterial('platformMat', this.scene);
        platformMat.diffuseColor = new Color3(0.3, 0.3, 0.35);
        platform.material = platformMat;

        this.doorMechanism.createDoor(glitchWall);

        console.log('Greyboxing completado: Pasillo de 40x10 unidades con paredes laterales');
    }

    /**
     * Configura los puzzles del Nivel 4
     * E3-HU-10: Colocar Interactuables
     * Coloca las 3 esferas flotantes frente a la pared con los valores 5, 7 y 6
     * Posicion: Sobre la plataforma elevada, a 2 unidades de altura
     */
    public setupPuzzles(): void {
        console.log('Configurando puzzles del Nivel 4...');

        this.puzzleManager.setupPuzzle('level4_division');

        // Esfera izquierda: Valor 5 (Incorrecta)
        const sphere1 = new SphereInteractable(
            'sphere_5',
            5,
            false,
            this.scene,
            new Vector3(-2.5, 2, 7)
        );

        // Esfera central: Valor 7 (Incorrecta)
        const sphere2 = new SphereInteractable(
            'sphere_7',
            7,
            false,
            this.scene,
            new Vector3(0, 2, 7)
        );

        // Esfera derecha: Valor 6 (Correcta)
        const sphere3 = new SphereInteractable(
            'sphere_6',
            6,
            true,
            this.scene,
            new Vector3(2.5, 2, 7)
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

        console.log('Interactuables posicionados: 3 esferas en Z=7, Y=2 (flotantes sobre plataforma)');
    }
}
