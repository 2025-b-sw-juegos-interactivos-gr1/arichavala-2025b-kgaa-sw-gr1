/**
 * SHIP.JS
 * Clase del barco de rescate (zona de entrega)
 * El lugar donde se deben entregar los buzos rescatados
 */

class Ship {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        
        // Crear el barco
        this.createShip();
        
        console.log("✅ Ship creado");
    }

    /**
     * Crea el mesh 3D del barco
     * Usa BABYLON.MeshBuilder (requisito del profesor)
     */
    createShip() {
        // === CASCO DEL BARCO (cuerpo principal) ===
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "ship",
            {
                width: CONFIG.SHIP.SIZE.width,
                height: CONFIG.SHIP.SIZE.height,
                depth: CONFIG.SHIP.SIZE.depth
            },
            this.scene
        );

        // Posicionar en la superficie
        this.mesh.position = new BABYLON.Vector3(
            CONFIG.SHIP.POSITION.x,
            CONFIG.SHIP.POSITION.y,
            CONFIG.SHIP.POSITION.z
        );

        // Material café (madera)
        const material = new BABYLON.StandardMaterial("shipMat", this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(CONFIG.SHIP.COLOR);
        material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        this.mesh.material = material;

        // === PROA (frente puntiagudo del barco) ===
        const bow = BABYLON.MeshBuilder.CreateBox(
            "bow",
            { width: 6, height: 2, depth: 3 },
            this.scene
        );
        bow.position = new BABYLON.Vector3(0, 0, 9);
        bow.rotation.x = Math.PI / 6; // Inclinación hacia arriba
        bow.parent = this.mesh;
        bow.material = material;

        // === CABINA (estructura superior) ===
        const cabin = BABYLON.MeshBuilder.CreateBox(
            "cabin",
            { width: 5, height: 3, depth: 4 },
            this.scene
        );
        cabin.position = new BABYLON.Vector3(0, 3, -2);
        cabin.parent = this.mesh;

        // Material blanco para la cabina
        const cabinMat = new BABYLON.StandardMaterial("cabinMat", this.scene);
        cabinMat.diffuseColor = new BABYLON.Color3(0.95, 0.95, 0.95);
        cabin.material = cabinMat;

        // === VENTANAS DE LA CABINA ===
        const windowMat = new BABYLON.StandardMaterial("shipWindowMat", this.scene);
        windowMat.diffuseColor = new BABYLON.Color3(0.1, 0.3, 0.5);
        windowMat.alpha = 0.6;

        for (let i = -1; i <= 1; i++) {
            const window = BABYLON.MeshBuilder.CreateBox(
                `window${i}`,
                { width: 1, height: 1, depth: 0.1 },
                this.scene
            );
            window.position = new BABYLON.Vector3(i * 1.5, 3.5, 0.1);
            window.parent = this.mesh;
            window.material = windowMat;
        }

        // === CHIMENEA ===
        const chimney = BABYLON.MeshBuilder.CreateCylinder(
            "chimney",
            { diameter: 1, height: 2.5, tessellation: 8 },
            this.scene
        );
        chimney.position = new BABYLON.Vector3(1.5, 4.5, -3);
        chimney.parent = this.mesh;

        // Material rojo/negro para la chimenea
        const chimneyMat = new BABYLON.StandardMaterial("chimneyMat", this.scene);
        chimneyMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        chimney.material = chimneyMat;

        // === MÁSTIL ===
        const mast = BABYLON.MeshBuilder.CreateCylinder(
            "mast",
            { diameter: 0.3, height: 6, tessellation: 8 },
            this.scene
        );
        mast.position = new BABYLON.Vector3(-2, 4.5, 2);
        mast.parent = this.mesh;

        const mastMat = new BABYLON.StandardMaterial("mastMat", this.scene);
        mastMat.diffuseColor = new BABYLON.Color3(0.4, 0.3, 0.2);
        mast.material = mastMat;

        // === BANDERA ===
        const flag = BABYLON.MeshBuilder.CreateBox(
            "flag",
            { width: 0.1, height: 1.5, depth: 2 },
            this.scene
        );
        flag.position = new BABYLON.Vector3(-2, 7, 3);
        flag.parent = this.mesh;

        const flagMat = new BABYLON.StandardMaterial("flagMat", this.scene);
        flagMat.diffuseColor = new BABYLON.Color3(1, 0, 0); // Rojo
        flagMat.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
        flag.material = flagMat;

        // Animación de la bandera (ondear)
        this.createFlagAnimation(flag);

        // === BARANDAS (detalles) ===
        const railingMat = new BABYLON.StandardMaterial("railingMat", this.scene);
        railingMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);

        // Barandas laterales
        const railingLeft = BABYLON.MeshBuilder.CreateBox(
            "railingLeft",
            { width: 0.2, height: 0.5, depth: 12 },
            this.scene
        );
        railingLeft.position = new BABYLON.Vector3(-4, 2, 1);
        railingLeft.parent = this.mesh;
        railingLeft.material = railingMat;

        const railingRight = railingLeft.clone("railingRight");
        railingRight.position.x = 4;
        railingRight.parent = this.mesh;

        // === ZONA DE ENTREGA VISUAL (área marcada) ===
        this.createDropZone();

        // === ANIMACIÓN DE BALANCEO ===
        this.createRockingAnimation();
    }

    /**
     * Crea la animación de ondeo de la bandera
     * @param {BABYLON.Mesh} flag - Mesh de la bandera
     */
    createFlagAnimation(flag) {
        const animation = new BABYLON.Animation(
            "flagWave",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [
            { frame: 0, value: -0.2 },
            { frame: 15, value: 0.2 },
            { frame: 30, value: -0.2 }
        ];

        animation.setKeys(keys);
        flag.animations.push(animation);
        this.scene.beginAnimation(flag, 0, 30, true);
    }

    /**
     * Crea una animación de balanceo suave del barco
     * Simula el movimiento de las olas
     */
    createRockingAnimation() {
        const rockAnimation = new BABYLON.Animation(
            "shipRock",
            "rotation.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [
            { frame: 0, value: -0.05 },
            { frame: 30, value: 0.05 },
            { frame: 60, value: -0.05 }
        ];

        rockAnimation.setKeys(keys);
        this.mesh.animations.push(rockAnimation);
        this.scene.beginAnimation(this.mesh, 0, 60, true);
    }

    /**
     * Crea un indicador visual de la zona de entrega
     * Un disco brillante en la superficie del agua
     */
    createDropZone() {
        const dropZone = BABYLON.MeshBuilder.CreateCylinder(
            "dropZone",
            {
                diameter: CONFIG.SHIP.DROP_DISTANCE * 2,
                height: 0.2,
                tessellation: 32
            },
            this.scene
        );

        dropZone.position = new BABYLON.Vector3(0, 0, 0);
        dropZone.parent = this.mesh;

        // Material verde brillante transparente
        const dropZoneMat = new BABYLON.StandardMaterial("dropZoneMat", this.scene);
        dropZoneMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
        dropZoneMat.emissiveColor = new BABYLON.Color3(0, 0.3, 0);
        dropZoneMat.alpha = 0.3;
        dropZone.material = dropZoneMat;

        // Animación de pulso
        const pulseAnimation = new BABYLON.Animation(
            "dropZonePulse",
            "scaling",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [
            { frame: 0, value: new BABYLON.Vector3(1, 1, 1) },
            { frame: 15, value: new BABYLON.Vector3(1.1, 1, 1.1) },
            { frame: 30, value: new BABYLON.Vector3(1, 1, 1) }
        ];

        pulseAnimation.setKeys(keys);
        dropZone.animations.push(pulseAnimation);
        this.scene.beginAnimation(dropZone, 0, 30, true);

        this.dropZone = dropZone;
    }

    /**
     * Obtiene la posición del barco
     * @returns {BABYLON.Vector3}
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Verifica si una posición está dentro de la zona de entrega
     * @param {BABYLON.Vector3} position - Posición a verificar
     * @returns {boolean}
     */
    isInDropZone(position) {
        const distance = BABYLON.Vector3.Distance(this.mesh.position, position);
        return distance <= CONFIG.SHIP.DROP_DISTANCE;
    }

    /**
     * Debug: Muestra información del barco
     */
    debugInfo() {
        console.log("🚢 Barco:");
        console.log("  Posición:", this.mesh.position);
        console.log("  Rango de entrega:", CONFIG.SHIP.DROP_DISTANCE);
    }
}