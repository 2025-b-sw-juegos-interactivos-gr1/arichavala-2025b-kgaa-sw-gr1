import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;

    constructor() {
        // Obtener el canvas del HTML
        const canvas = document.getElementById("renderCanvas");
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Canvas element not found");
        }
        this.canvas = canvas;
        
        // Crear el motor de Babylon.js
        this.engine = new Engine(this.canvas, true);
        
        // Crear la escena
        this.scene = this.createScene();
        
        // Ocultar pantalla de carga
        this.hideLoadingScreen();
        
        // Iniciar el loop de renderizado
        this.engine.runRenderLoop(() => {
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
        
        // Crear cámara orbital (temporal, para ver el "Hola Mundo")
        const camera = new ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2.5,
            10,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(this.canvas, true);
        
        // Crear luz ambiental
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        
        // Crear el suelo (plano gris)
        const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
        const groundMaterial = new StandardMaterial("groundMat", scene);
        groundMaterial.diffuseColor = new Color3(0.6, 0.6, 0.6); // Gris
        ground.material = groundMaterial;
        
        // Crear una esfera amarilla (representando un objeto interactivo)
        const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        sphere.position.y = 1;
        const sphereMaterial = new StandardMaterial("sphereMat", scene);
        sphereMaterial.diffuseColor = new Color3(1, 0.84, 0); // Amarillo dorado #FFD700
        sphere.material = sphereMaterial;
        
        // Crear un cubo naranja
        const box = MeshBuilder.CreateBox("box", { size: 1.5 }, scene);
        box.position = new Vector3(-3, 0.75, 0);
        const boxMaterial = new StandardMaterial("boxMat", scene);
        boxMaterial.diffuseColor = new Color3(1, 0.65, 0); // Naranja #FFA500
        box.material = boxMaterial;
        
        // Mostrar mensaje en consola
        console.log("🎮 ¡Hola Mundo desde Arithmos!");
        console.log("✨ Babylon.js está funcionando correctamente");
        
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
