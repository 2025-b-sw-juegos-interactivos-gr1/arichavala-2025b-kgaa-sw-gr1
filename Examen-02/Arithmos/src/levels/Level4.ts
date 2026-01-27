/**
 * Level4 - Rio Divisor
 * Implementacion especifica del Nivel 4 (Epica 3)
 * Tema: Division y fracciones
 * 
 * E2-HU-08: Integrado con FeedbackSystem
 * E3-HU-12: Zona de Meta con trigger
 */
import { Scene, MeshBuilder, Vector3, StandardMaterial, Color3 } from '@babylonjs/core';
import { Level } from './Level';
import { SphereInteractable } from '../interactables/SphereInteractable';
import { DoorMechanism } from '../mechanics/DoorMechanism';
import { TriggerZone } from '../mechanics/TriggerZone';
import { FeedbackSystem } from '../core/FeedbackSystem';

export class Level4 extends Level {
    private doorMechanism: DoorMechanism;
    private feedbackSystem: FeedbackSystem;
    private goalTrigger: TriggerZone | null;

    constructor(scene: Scene, feedbackSystem: FeedbackSystem) {
        super(scene, 4, 'Rio Divisor');
        this.feedbackSystem = feedbackSystem;
        this.doorMechanism = new DoorMechanism(scene, feedbackSystem);
        this.goalTrigger = null;
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

        // E3-HU-12: Crear zona de meta (trigger invisible al final del pasillo)
        this.createGoalZone();

        console.log('Greyboxing completado: Pasillo de 40x10 unidades con paredes laterales');
    }

    /**
     * E3-HU-12: Crea la zona de meta al final del pasillo
     * Trigger invisible que detecta cuando el jugador llega al final
     */
    private createGoalZone(): void {
        // Posicion al final del pasillo, despues de la pared
        const goalPosition = new Vector3(0, 2, 15);
        const goalSize = new Vector3(10, 6, 5);

        this.goalTrigger = new TriggerZone(
            this.scene,
            goalPosition,
            goalSize,
            'goalZone'
        );

        // Callback cuando el jugador entra a la zona
        this.goalTrigger.onEnter(() => {
            this.onLevelComplete();
        });

        console.log('Zona de Meta creada en Z=15 (final del pasillo)');
    }

    /**
     * E3-HU-12: Se ejecuta cuando el jugador completa el nivel
     */
    private onLevelComplete(): void {
        console.log('========================================');
        console.log('    NIVEL COMPLETADO');
        console.log('========================================');
        console.log('El jugador alcanzo la zona de meta!');
        console.log('Nivel 4: Rio Divisor - COMPLETADO');
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

    /**
     * Limpia recursos del nivel
     */
    public dispose(): void {
        if (this.goalTrigger) {
            this.goalTrigger.dispose();
        }
        super.dispose();
    }
}
