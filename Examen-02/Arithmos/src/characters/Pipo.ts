/**
 * Pipo - Personaje mentor del juego
 * Construido con formas geométricas básicas (low poly)
 */
import { Scene, MeshBuilder, Vector3, StandardMaterial, Color3, Mesh } from '@babylonjs/core';

export class Pipo {
    private scene: Scene;
    private root: Mesh;

    constructor(scene: Scene, position: Vector3) {
        this.scene = scene;
        this.root = MeshBuilder.CreateBox('pipoRoot', { size: 0.1 }, scene);
        this.root.position = position;
        this.root.isVisible = false;
        
        this.createPipo();
    }

    /**
     * Crea el personaje Pipo con formas básicas
     */
    private createPipo(): void {
        // Escala más pequeña (0.5x)
        const scale = 0.5;
        
        // Cuerpo (cilindro)
        const body = MeshBuilder.CreateCylinder('pipoBody', { 
            diameter: 0.6 * scale, 
            height: 1.2 * scale
        }, this.scene);
        body.position = new Vector3(0, 0.6 * scale, 0);
        const bodyMat = new StandardMaterial('pipoBodyMat', this.scene);
        bodyMat.diffuseColor = new Color3(0.3, 0.5, 0.9); // Azul
        body.material = bodyMat;
        body.parent = this.root;

        // Cabeza (esfera)
        const head = MeshBuilder.CreateSphere('pipoHead', { 
            diameter: 0.5 * scale
        }, this.scene);
        head.position = new Vector3(0, 1.5 * scale, 0);
        const headMat = new StandardMaterial('pipoHeadMat', this.scene);
        headMat.diffuseColor = new Color3(1, 0.9, 0.7); // Color piel
        head.material = headMat;
        head.parent = this.root;

        // Ojos (esferas pequeñas)
        const leftEye = MeshBuilder.CreateSphere('pipoLeftEye', { 
            diameter: 0.1 * scale
        }, this.scene);
        leftEye.position = new Vector3(-0.1 * scale, 1.55 * scale, 0.2 * scale);
        const eyeMat = new StandardMaterial('pipoEyeMat', this.scene);
        eyeMat.diffuseColor = new Color3(0, 0, 0); // Negro
        leftEye.material = eyeMat;
        leftEye.parent = this.root;

        const rightEye = leftEye.clone('pipoRightEye');
        rightEye.position = new Vector3(0.1 * scale, 1.55 * scale, 0.2 * scale);
        rightEye.parent = this.root;

        // Sombrero (cono + disco)
        const hatCone = MeshBuilder.CreateCylinder('pipoHatCone', { 
            diameterTop: 0.1 * scale,
            diameterBottom: 0.4 * scale,
            height: 0.5 * scale
        }, this.scene);
        hatCone.position = new Vector3(0, 2 * scale, 0);
        const hatMat = new StandardMaterial('pipoHatMat', this.scene);
        hatMat.diffuseColor = new Color3(0.5, 0.2, 0.7); // Púrpura
        hatMat.emissiveColor = new Color3(0.1, 0.05, 0.15);
        hatCone.material = hatMat;
        hatCone.parent = this.root;

        const hatBrim = MeshBuilder.CreateCylinder('pipoHatBrim', { 
            diameter: 0.6 * scale,
            height: 0.05 * scale
        }, this.scene);
        hatBrim.position = new Vector3(0, 1.75 * scale, 0);
        hatBrim.material = hatMat;
        hatBrim.parent = this.root;

        // Brazos (cilindros pequeños)
        const leftArm = MeshBuilder.CreateCylinder('pipoLeftArm', { 
            diameter: 0.15 * scale,
            height: 0.8 * scale
        }, this.scene);
        leftArm.position = new Vector3(-0.4 * scale, 0.8 * scale, 0);
        leftArm.rotation.z = Math.PI / 6;
        leftArm.material = bodyMat;
        leftArm.parent = this.root;

        const rightArm = MeshBuilder.CreateCylinder('pipoRightArm', { 
            diameter: 0.15 * scale,
            height: 0.8 * scale
        }, this.scene);
        rightArm.position = new Vector3(0.4 * scale, 0.8 * scale, 0);
        rightArm.rotation.z = -Math.PI / 6;
        rightArm.material = bodyMat;
        rightArm.parent = this.root;

        // Animación de flotación suave
        this.addFloatingAnimation();
    }

    /**
     * Agrega animación de flotación
     */
    private addFloatingAnimation(): void {
        let time = 0;
        this.scene.registerBeforeRender(() => {
            time += 0.01;
            this.root.position.y += Math.sin(time) * 0.002;
        });
    }

    public getPosition(): Vector3 {
        return this.root.position;
    }

    public dispose(): void {
        this.root.dispose();
    }
}
