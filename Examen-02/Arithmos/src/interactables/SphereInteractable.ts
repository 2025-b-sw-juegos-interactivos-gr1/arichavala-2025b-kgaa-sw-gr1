/**
 * SphereInteractable
 * Implementación concreta de InteractableObject para esferas flotantes
 * Representan las opciones de respuesta en los puzzles
 * 
 * E2-HU-07: Configurado para detectar clics mediante raycast
 * E3-HU-10: Etiquetas con valores numericos
 */
import { MeshBuilder, Scene, Vector3, StandardMaterial, Color3, DynamicTexture } from '@babylonjs/core';
import { InteractableObject } from './InteractableObject';

export class SphereInteractable extends InteractableObject {
    constructor(
        id: string,
        value: number | string,
        isCorrect: boolean,
        scene: Scene,
        position: Vector3
    ) {
        super(id, value, isCorrect);
        this.createMesh(scene, position);
    }

    /**
     * Crea la esfera 3D en la escena
     */
    private createMesh(scene: Scene, position: Vector3): void {
        this.mesh = MeshBuilder.CreateSphere(
            this.id,
            { diameter: 1 },
            scene
        );
        
        this.mesh.position = position;

        // E4-HU-13: Material verde pastel low poly
        const material = new StandardMaterial(`${this.id}_mat`, scene);
        material.diffuseColor = new Color3(0.6, 0.9, 0.7); // Verde menta pastel
        material.specularColor = new Color3(0.8, 1, 0.8); // Reflejo suave
        material.emissiveColor = new Color3(0.05, 0.1, 0.05); // Brillo sutil
        this.mesh.material = material;

        // Crear plano con el numero frente a la esfera
        this.createNumberLabel(scene, position);

        // Configurar interaccion
        this.setupInteraction();
    }

    /**
     * Crea un plano con el numero visible frente a la esfera
     */
    private createNumberLabel(scene: Scene, spherePosition: Vector3): void {
        // Crear plano para el numero
        const plane = MeshBuilder.CreatePlane(
            `${this.id}_label`,
            { width: 0.8, height: 0.8 },
            scene
        );
        
        // Posicionar el plano frente a la esfera (hacia la camara)
        plane.position = new Vector3(
            spherePosition.x,
            spherePosition.y,
            spherePosition.z - 0.55
        );
        
        // Crear textura dinamica con el numero
        const texture = new DynamicTexture(`${this.id}_texture`, 512, scene);
        const ctx = texture.getContext() as CanvasRenderingContext2D;
        
        // Fondo transparente
        ctx.clearRect(0, 0, 512, 512);
        
        // Dibujar el numero
        ctx.font = 'bold 350px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.value.toString(), 256, 256);
        
        texture.update();
        
        // Material para el plano con transparencia
        const planeMat = new StandardMaterial(`${this.id}_label_mat`, scene);
        planeMat.diffuseTexture = texture;
        planeMat.diffuseTexture.hasAlpha = true;
        planeMat.useAlphaFromDiffuseTexture = true;
        planeMat.emissiveColor = new Color3(0.5, 0.5, 0.5);
        planeMat.backFaceCulling = false;
        plane.material = planeMat;
        
        // El plano no debe ser seleccionable (solo la esfera)
        plane.isPickable = false;
    }

    /**
     * Configura el evento de clic en la esfera
     * Usa metadata para conectar con el InteractionSystem
     */
    private setupInteraction(): void {
        if (this.mesh) {
            // Configurar metadata con callback de interacción
            this.mesh.metadata = {
                onInteract: (mesh: any) => this.onPointerDown()
            };
            
            // Hacer que el mesh sea seleccionable por raycast
            this.mesh.isPickable = true;
            
            // Efecto hover (resaltar al pasar el mouse)
            this.mesh.enablePointerMoveEvents = true;
        }
    }
}
