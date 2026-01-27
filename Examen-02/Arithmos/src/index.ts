/**
 * Arithmos - El Reino de los Números
 * Punto de entrada principal del juego
 * Arquitectura basada en el Capítulo VII del GDD
 */
import { Engine, Scene, HemisphericLight, Vector3, Color3 } from "@babylonjs/core";
import { GameManager } from "./core/GameManager";
import { InteractionSystem } from "./core/InteractionSystem";
import { PlayerController } from "./player/PlayerController";
import { Level4 } from "./levels/Level4";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private gameManager: GameManager;
    private playerController: PlayerController | null;
    private interactionSystem: InteractionSystem | null;

    constructor() {
        // Obtener el canvas del HTML
        const canvas = document.getElementById("renderCanvas");
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Canvas element not found");
        }
        this.canvas = canvas;
        
        // Crear el motor de Babylon.js
        this.engine = new Engine(this.canvas, true);
        
        // Inicializar GameManager (Singleton)
        this.gameManager = GameManager.getInstance();
        this.gameManager.init();
        
        // Crear la escena
        this.scene = this.createScene();
        this.playerController = null;
        this.interactionSystem = null;
        
        // Ocultar pantalla de carga
        this.hideLoadingScreen();
        
        // Iniciar el loop de renderizado
        this.engine.runRenderLoop(() => {
            // Actualizar el controlador del jugador (movimiento WASD)
            if (this.playerController) {
                this.playerController.update();
            }
            
            this.scene.render();
        });
        
        // Manejar el resize de la ventana
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    private createScene(): Scene {
        // Crear la escena
        const scene = new Scene(this.engine);
        scene.clearColor = new Color3(0.53, 0.81, 0.92).toColor4(); // Color cielo #87CEEB
        
        // Crear luz hemisférica
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Crear controlador del jugador (cámara en primera persona)
        this.playerController = new PlayerController(scene);

        // Inicializar sistema de interacción (raycast)
        this.interactionSystem = new InteractionSystem(scene);

        // Cargar Nivel 4 (Épica 3 - Historia de Usuario E3-HU-09 a E3-HU-12)
        const level4 = new Level4(scene);
        level4.buildGeometry();
        level4.setupPuzzles();

        // Cambiar a estado de Gameplay
        this.gameManager.setState('Gameplay');

        console.log('🎮 Arithmos inicializado');
        console.log('📚 Nivel 4: Río Divisor cargado');
        console.log('✨ Arquitectura: Singleton + Observer + State Pattern');
        console.log('🎯 Controles: WASD para movimiento, Mouse para mirar');
        console.log('🖱️ Sistema de Raycast: Clic izquierdo para interactuar');
        
        return scene;
    }

    private hideLoadingScreen(): void {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
            }, 1000);
        }
    }
}

// Iniciar el juego cuando el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
    new Game();
});
