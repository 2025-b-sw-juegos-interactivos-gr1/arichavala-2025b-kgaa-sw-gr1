/**
 * Level4 - Rio Divisor
 * Implementacion especifica del Nivel 4 (Epica 3)
 * Tema: Division y fracciones
 * 
 * E2-HU-08: Integrado con FeedbackSystem
 * E3-HU-12: Zona de Meta con trigger
 * E4-HU-13: Arte Low Poly - Rio de datos y puente de cristal
 * E4-HU-14: Personaje Pipo y sistema de diálogos
 */
import { Scene, MeshBuilder, Vector3, StandardMaterial, Color3, DynamicTexture, Texture } from '@babylonjs/core';
import { Level } from './Level';
import { SphereInteractable } from '../interactables/SphereInteractable';
import { DoorMechanism } from '../mechanics/DoorMechanism';
import { TriggerZone } from '../mechanics/TriggerZone';
import { FeedbackSystem } from '../core/FeedbackSystem';
import { Pipo } from '../characters/Pipo';
import { DialogueSystem } from '../ui/DialogueSystem';

export class Level4 extends Level {
    private doorMechanism: DoorMechanism;
    private feedbackSystem: FeedbackSystem;
    private goalTrigger: TriggerZone | null;
    private pipo: Pipo | null;
    private dialogueSystem: DialogueSystem;

    constructor(scene: Scene, feedbackSystem: FeedbackSystem) {
        super(scene, 4, 'Rio Divisor');
        this.feedbackSystem = feedbackSystem;
        this.doorMechanism = new DoorMechanism(scene, feedbackSystem);
        this.goalTrigger = null;
        this.pipo = null;
        this.dialogueSystem = new DialogueSystem(scene);
    }

    /**
     * Greyboxing del Nivel 4
     * E3-HU-09: Construccion completa del pasillo lineal
     * E4-HU-13: Puente de cristal sobre rio de datos
     * E4-HU-14: Pipo y diálogo inicial
     */
    public buildGeometry(): void {
        console.log('Construyendo geometria del Nivel 4: Rio Divisor');

        // E4-HU-14: Crear personaje Pipo al lado del camino, cerca de las esferas
        // Pipo está adelante en el camino (Z=2), visible pero no bloqueando
        this.pipo = new Pipo(this.scene, new Vector3(3.5, 1, 2));

        // E4-HU-14: Mostrar diálogo pequeño cerca de Pipo
        setTimeout(() => {
            this.dialogueSystem.showDialogue(
                '¡Hola! Soy Pipo. Para pasar la barrera del 24, haz clic en la esfera con el número que lo divide exactamente.',
                new Vector3(2.5, 2.5, 2) // Junto a Pipo
            );
        }, 1000);

        // E4-HU-14: Iniciar música de fondo
        this.feedbackSystem.startBackgroundMusic();

        // Rio de datos (debajo del puente)
        const river = MeshBuilder.CreateGround(
            'river',
            { width: 12, height: 42 },
            this.scene
        );
        river.position.y = -1; // Debajo del puente
        const riverMat = new StandardMaterial('riverMat', this.scene);
        riverMat.diffuseColor = new Color3(0.1, 0.3, 0.8); // Azul datos
        riverMat.emissiveColor = new Color3(0, 0.1, 0.3); // Brillo azul
        river.material = riverMat;

        // Puente de cristal (suelo transparente)
        const bridge = MeshBuilder.CreateGround(
            'bridge',
            { width: 10, height: 40 },
            this.scene
        );
        const bridgeMat = new StandardMaterial('bridgeMat', this.scene);
        bridgeMat.diffuseColor = new Color3(0.6, 0.8, 1.0); // Azul cristal
        bridgeMat.specularColor = new Color3(1, 1, 1); // Reflejo brillante
        bridgeMat.alpha = 0.4; // Semi-transparente
        bridge.material = bridgeMat;

        // Barandas del puente (paredes laterales más bajas)
        const leftRailing = MeshBuilder.CreateBox(
            'leftRailing',
            { width: 0.3, height: 1.5, depth: 40 },
            this.scene
        );
        leftRailing.position = new Vector3(-5, 0.75, 0);
        const leftRailingMat = new StandardMaterial('leftRailingMat', this.scene);
        leftRailingMat.diffuseColor = new Color3(0.5, 0.7, 0.9);
        leftRailingMat.alpha = 0.6;
        leftRailing.material = leftRailingMat;

        const rightRailing = MeshBuilder.CreateBox(
            'rightRailing',
            { width: 0.3, height: 1.5, depth: 40 },
            this.scene
        );
        rightRailing.position = new Vector3(5, 0.75, 0);
        const rightRailingMat = new StandardMaterial('rightRailingMat', this.scene);
        rightRailingMat.diffuseColor = new Color3(0.5, 0.7, 0.9);
        rightRailingMat.alpha = 0.6;
        rightRailing.material = rightRailingMat;

        // Pared trasera (inicio del puente)
        const backWall = MeshBuilder.CreateBox(
            'backWall',
            { width: 10, height: 4, depth: 0.5 },
            this.scene
        );
        backWall.position = new Vector3(0, 2, -20);
        const backWallMat = new StandardMaterial('backWallMat', this.scene);
        backWallMat.diffuseColor = new Color3(0.4, 0.6, 0.8);
        backWall.material = backWallMat;

        // Pared bloqueante con número 24 (Glitch Wall)
        const glitchWall = MeshBuilder.CreateBox(
            'glitchWall',
            { width: 10, height: 6, depth: 0.5 },
            this.scene
        );
        glitchWall.position = new Vector3(0, 3, 10);
        
        // Material rojo semitransparente
        const glitchWallMat = new StandardMaterial('glitchWallMat', this.scene);
        glitchWallMat.diffuseColor = Color3.Red();
        glitchWallMat.alpha = 0.5;
        glitchWallMat.emissiveColor = new Color3(0.2, 0, 0);
        glitchWall.material = glitchWallMat;

        // Número "24" en la pared
        this.addNumberToWall(glitchWall, 24);

        // Plataforma frente a la pared (para las esferas)
        const platform = MeshBuilder.CreateBox(
            'platform',
            { width: 8, height: 0.3, depth: 4 },
            this.scene
        );
        platform.position = new Vector3(0, 0.15, 7);
        const platformMat = new StandardMaterial('platformMat', this.scene);
        platformMat.diffuseColor = new Color3(0.4, 0.6, 0.8); // Cristal azul
        platformMat.alpha = 0.6;
        platform.material = platformMat;

        this.doorMechanism.createDoor(glitchWall);
        this.createGoalZone();

        console.log('Nivel completado: Puente de cristal sobre río de datos con barrera 24');
    }

    /**
     * E4-HU-13: Añade el número 24 a la pared roja
     */
    private addNumberToWall(wall: any, number: number): void {
        const plane = MeshBuilder.CreatePlane(
            'wallNumber',
            { width: 4, height: 4 },
            this.scene
        );
        
        // Posicionar frente a la pared
        plane.position = new Vector3(
            wall.position.x,
            wall.position.y,
            wall.position.z - 0.3
        );
        
        // Crear textura con el número
        const texture = new DynamicTexture('wallNumberTexture', 512, this.scene);
        const ctx = texture.getContext() as CanvasRenderingContext2D;
        
        ctx.clearRect(0, 0, 512, 512);
        ctx.font = 'bold 300px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 8;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(number.toString(), 256, 256);
        ctx.fillText(number.toString(), 256, 256);
        
        texture.update();
        
        const planeMat = new StandardMaterial('wallNumberMat', this.scene);
        planeMat.diffuseTexture = texture;
        planeMat.diffuseTexture.hasAlpha = true;
        planeMat.useAlphaFromDiffuseTexture = true;
        planeMat.emissiveColor = new Color3(0.8, 0.8, 0.8);
        planeMat.backFaceCulling = false;
        plane.material = planeMat;
        
        plane.isPickable = false;
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
        
        // E4-HU-14: Detener música de fondo y reproducir victoria
        this.feedbackSystem.stopBackgroundMusic();
        this.feedbackSystem.playVictorySound();
        
        // E4-HU-14: Mostrar mensaje de victoria en pantalla
        this.showVictoryMessage();
    }

    /**
     * E4-HU-14: Muestra mensaje de victoria en pantalla
     */
    private showVictoryMessage(): void {
        // Crear plano grande frente a la cámara
        const messagePlane = MeshBuilder.CreatePlane(
            'victoryMessage',
            { width: 10, height: 4 },
            this.scene
        );
        
        // Posicionar frente al jugador
        messagePlane.position = new Vector3(0, 2, 18);
        
        // Crear textura con el mensaje
        const texture = new DynamicTexture('victoryTexture', { width: 1024, height: 512 }, this.scene);
        const ctx = texture.getContext() as CanvasRenderingContext2D;
        
        // Fondo degradado púrpura (igual que pantalla de carga)
        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#6B5B95');
        gradient.addColorStop(1, '#8B7BA8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 512);
        
        // Estrellas amarillas decorativas (igual que pantalla de carga)
        this.drawStar(ctx, 140, 90, 5, 35, 15, '#FFC857');
        this.drawStar(ctx, 884, 90, 5, 35, 15, '#FFC857');
        this.drawStar(ctx, 90, 420, 4, 25, 12, '#FFD700');
        this.drawStar(ctx, 934, 420, 4, 25, 12, '#FFD700');
        
        // Texto principal
        ctx.font = 'bold 120px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Sombra suave
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        
        // Texto blanco limpio
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('¡FELICIDADES!', 512, 180);
        
        // Subtexto
        ctx.font = 'bold 55px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Nivel Completado', 512, 310);
        
        // Quitar sombra
        ctx.shadowColor = 'transparent';
        
        texture.update();
        
        // Material del plano
        const planeMat = new StandardMaterial('victoryMat', this.scene);
        planeMat.diffuseTexture = texture;
        planeMat.emissiveColor = new Color3(1, 1, 1);
        planeMat.backFaceCulling = false;
        messagePlane.material = planeMat;
        
        messagePlane.isPickable = false;
        
        console.log('💫 Mensaje de victoria mostrado en pantalla');
    }

    /**
     * Dibuja una estrella en el canvas
     */
    private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string): void {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
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
        // E4-HU-14: Detener música al salir del nivel
        this.feedbackSystem.stopBackgroundMusic();
        
        if (this.pipo) {
            this.pipo.dispose();
        }
        
        if (this.goalTrigger) {
            this.goalTrigger.dispose();
        }
        super.dispose();
    }
}
