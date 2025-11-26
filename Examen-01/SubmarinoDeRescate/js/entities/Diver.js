/**
 * DIVER.JS
 * Clase del buzo (paquete a recoger)
 * Los objetos que el submarino debe rescatar
 */

class Diver {
    constructor(scene, position) {
        this.scene = scene;
        this.mesh = null;
        this.pickedUp = false;    // Estado: ¿Ha sido recogido?
        this.delivered = false;   // Estado: ¿Ha sido entregado?
        
        // Crear el buzo en la posición especificada
        this.createDiver(position);
        
        console.log("✅ Diver creado en posición:", position);
    }

    /**
     * Crea el mesh 3D del buzo
     * Usa BABYLON.MeshBuilder (requisito del profesor)
     * @param {BABYLON.Vector3} position - Posición inicial del buzo
     */
    createDiver(position) {
        // === CUERPO PRINCIPAL (cápsula simulada con cilindro) ===
        this.mesh = BABYLON.MeshBuilder.CreateCylinder(
            "diver",
            {
                diameter: CONFIG.DIVER.SIZE * 0.6,
                height: CONFIG.DIVER.SIZE * 1.5,
                tessellation: 8
            },
            this.scene
        );

        // Posicionar el buzo
        this.mesh.position = position.clone();

        // Material naranja (traje de buzo)
        const material = new BABYLON.StandardMaterial("diverMat", this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(CONFIG.DIVER.COLOR);
        material.emissiveColor = new BABYLON.Color3(0.1, 0.05, 0); // Brillo suave
        this.mesh.material = material;

        // === CABEZA ===
        const head = BABYLON.MeshBuilder.CreateSphere(
            "diverHead",
            { diameter: CONFIG.DIVER.SIZE * 0.5 },
            this.scene
        );
        head.position.y = CONFIG.DIVER.SIZE * 0.9;
        head.parent = this.mesh;

        // Material de la cabeza (casco)
        const headMat = new BABYLON.StandardMaterial("headMat", this.scene);
        headMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9); // Gris claro
        headMat.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Reflejo
        head.material = headMat;

        // === TANQUE DE OXÍGENO ===
        const tank = BABYLON.MeshBuilder.CreateCylinder(
            "oxygenTank",
            {
                diameter: CONFIG.DIVER.SIZE * 0.3,
                height: CONFIG.DIVER.SIZE * 0.8,
                tessellation: 8
            },
            this.scene
        );
        tank.position = new BABYLON.Vector3(0, 0.2, -0.4);
        tank.rotation.x = Math.PI / 2;
        tank.parent = this.mesh;

        // Material del tanque (gris metálico)
        const tankMat = new BABYLON.StandardMaterial("tankMat", this.scene);
        tankMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.4);
        tankMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        tank.material = tankMat;

        // === ALETAS (pies) ===
        const flipperLeft = BABYLON.MeshBuilder.CreateBox(
            "flipperLeft",
            { width: 0.3, height: 0.1, depth: 0.6 },
            this.scene
        );
        flipperLeft.position = new BABYLON.Vector3(-0.2, -0.9, 0.2);
        flipperLeft.parent = this.mesh;
        flipperLeft.material = material;

        const flipperRight = flipperLeft.clone("flipperRight");
        flipperRight.position.x = 0.2;
        flipperRight.parent = this.mesh;

        // === ANIMACIÓN DE FLOTACIÓN ===
        this.createFloatingAnimation();

        // === INDICADOR VISUAL (aro brillante) ===
        this.createIndicator();
    }

    /**
     * Crea una animación de flotación suave
     * El buzo sube y baja ligeramente
     */
    createFloatingAnimation() {
        const animation = new BABYLON.Animation(
            "diverFloat",
            "position.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [
            { frame: 0, value: this.mesh.position.y },
            { frame: 30, value: this.mesh.position.y + 0.3 },
            { frame: 60, value: this.mesh.position.y }
        ];

        animation.setKeys(keys);
        this.mesh.animations.push(animation);
        this.scene.beginAnimation(this.mesh, 0, 60, true);
    }

    /**
     * Crea un indicador visual (aro brillante)
     * Para que sea fácil ver dónde están los buzos
     */
    createIndicator() {
        const indicator = BABYLON.MeshBuilder.CreateTorus(
            "diverIndicator",
            {
                diameter: CONFIG.DIVER.SIZE * 1.8,
                thickness: 0.1,
                tessellation: 16
            },
            this.scene
        );

        indicator.position.y = -0.5;
        indicator.rotation.x = Math.PI / 2;
        indicator.parent = this.mesh;

        // Material brillante
        const indicatorMat = new BABYLON.StandardMaterial("indicatorMat", this.scene);
        indicatorMat.emissiveColor = BABYLON.Color3.FromHexString("#00FFFF");
        indicatorMat.alpha = 0.6;
        indicator.material = indicatorMat;

        // Animación de rotación
        const rotationAnimation = new BABYLON.Animation(
            "indicatorRotation",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const rotKeys = [
            { frame: 0, value: 0 },
            { frame: 60, value: Math.PI * 2 }
        ];

        rotationAnimation.setKeys(rotKeys);
        indicator.animations.push(rotationAnimation);
        this.scene.beginAnimation(indicator, 0, 60, true);

        this.indicator = indicator;
    }

    /**
     * Verifica si el buzo ha sido recogido
     * @returns {boolean}
     */
    isPickedUp() {
        return this.pickedUp;
    }

    /**
     * Verifica si el buzo ha sido entregado
     * @returns {boolean}
     */
    isDelivered() {
        return this.delivered;
    }

    /**
     * Obtiene la posición del buzo
     * @returns {BABYLON.Vector3}
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Marca el buzo como recogido
     * Oculta el indicador visual
     */
    markAsPickedUp() {
        this.pickedUp = true;
        if (this.indicator) {
            this.indicator.setEnabled(false);
        }
    }

    /**
     * Marca el buzo como entregado
     * Desactiva el mesh completamente
     */
    markAsDelivered() {
        this.delivered = true;
        this.mesh.setEnabled(false);
    }

    /**
     * Resetea el estado del buzo (útil para reiniciar el juego)
     */
    reset() {
        this.pickedUp = false;
        this.delivered = false;
        this.mesh.setEnabled(true);
        if (this.indicator) {
            this.indicator.setEnabled(true);
        }
    }

    /**
     * Debug: Muestra información del buzo
     */
    debugInfo() {
        console.log("🤿 Buzo:");
        console.log("  Posición:", this.mesh.position);
        console.log("  Recogido:", this.pickedUp);
        console.log("  Entregado:", this.delivered);
    }
}