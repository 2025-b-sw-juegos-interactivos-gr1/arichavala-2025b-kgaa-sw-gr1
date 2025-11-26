/**
 * SUBMARINE.JS
 * Clase del submarino (jugador)
 * El objeto principal que el usuario controla
 */

class Submarine {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.currentDiver = null; // Buzo que está cargando
        
        // Crear el submarino
        this.createSubmarine();
        
        console.log("✅ Submarine creado");
    }

    /**
     * Crea el mesh 3D del submarino
     * Usa BABYLON.MeshBuilder 
     */
    createSubmarine() {
        // === CUERPO PRINCIPAL ===
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "submarine",
            {
                width: CONFIG.SUBMARINE.SIZE.width,
                height: CONFIG.SUBMARINE.SIZE.height,
                depth: CONFIG.SUBMARINE.SIZE.depth
            },
            this.scene
        );

        // Material amarillo
        const material = new BABYLON.StandardMaterial("submarineMat", this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(CONFIG.SUBMARINE.COLOR);
        material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        this.mesh.material = material;

        // Posición inicial
        this.mesh.position = new BABYLON.Vector3(
            CONFIG.SUBMARINE.START_POSITION.x,
            CONFIG.SUBMARINE.START_POSITION.y,
            CONFIG.SUBMARINE.START_POSITION.z
        );

        // === TORRETA (parte superior) ===
        const tower = BABYLON.MeshBuilder.CreateBox(
            "tower",
            { width: 1, height: 0.8, depth: 1.5 },
            this.scene
        );
        tower.position.y = 0.9;
        tower.parent = this.mesh;
        tower.material = material;

        // === HÉLICE TRASERA ===
        const propeller = BABYLON.MeshBuilder.CreateCylinder(
            "propeller",
            { diameter: 0.8, height: 0.2, tessellation: 8 },
            this.scene
        );
        propeller.position.z = -2.2;
        propeller.position.y = 0;
        propeller.rotation.z = Math.PI / 2;
        propeller.parent = this.mesh;

        // Material de la hélice (más oscuro)
        const propellerMat = new BABYLON.StandardMaterial("propellerMat", this.scene);
        propellerMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        propeller.material = propellerMat;

        // === VENTANAS (detalles) ===
        const window1 = BABYLON.MeshBuilder.CreateSphere(
            "window1",
            { diameter: 0.5 },
            this.scene
        );
        window1.position = new BABYLON.Vector3(1.1, 0.2, 0.5);
        window1.parent = this.mesh;

        const windowMat = new BABYLON.StandardMaterial("windowMat", this.scene);
        windowMat.diffuseColor = new BABYLON.Color3(0.2, 0.5, 0.8);
        windowMat.alpha = 0.7;
        window1.material = windowMat;

        const window2 = window1.clone("window2");
        window2.position = new BABYLON.Vector3(1.1, 0.2, -0.5);
        window2.parent = this.mesh;

        // === ALETAS LATERALES ===
        const finLeft = BABYLON.MeshBuilder.CreateBox(
            "finLeft",
            { width: 0.2, height: 0.4, depth: 1 },
            this.scene
        );
        finLeft.position = new BABYLON.Vector3(-1.2, 0, -0.5);
        finLeft.parent = this.mesh;
        finLeft.material = material;

        const finRight = finLeft.clone("finRight");
        finRight.position.x = 1.2;
        finRight.parent = this.mesh;
    }

    /**
     * Mueve el submarino en una dirección
     * @param {string} direction - 'forward', 'backward', 'left', 'right', 'up', 'down'
     */
    move(direction) {
        switch(direction) {
            case 'forward':
                this.mesh.position.z += CONFIG.SUBMARINE.SPEED;
                break;
            case 'backward':
                this.mesh.position.z -= CONFIG.SUBMARINE.SPEED;
                break;
            case 'left':
                this.mesh.position.x -= CONFIG.SUBMARINE.SPEED;
                break;
            case 'right':
                this.mesh.position.x += CONFIG.SUBMARINE.SPEED;
                break;
            case 'up':
                this.mesh.position.y += CONFIG.SUBMARINE.VERTICAL_SPEED;
                break;
            case 'down':
                this.mesh.position.y -= CONFIG.SUBMARINE.VERTICAL_SPEED;
                break;
        }

        // Limitar la altura (no puede salir del agua ni ir muy profundo)
        if (this.mesh.position.y > 8) {
            this.mesh.position.y = 8;
        }
        if (this.mesh.position.y < -18) {
            this.mesh.position.y = -18;
        }
    }

    /**
     * Recoge un buzo
     * Usa PARENTING 
     * @param {Diver} diver - El buzo a recoger
     */
    pickupDiver(diver) {
        if (this.currentDiver) {
            console.log("⚠️ Ya tienes un buzo");
            return false;
        }

        // Parenting: el buzo se convierte en hijo del submarino
        diver.mesh.parent = this.mesh;
        
        // Posicionar el buzo encima del submarino
        diver.mesh.position = new BABYLON.Vector3(0, 1.5, 0);
        
        // Marcar el buzo como recogido
        diver.pickedUp = true;
        this.currentDiver = diver;

        console.log("✅ Buzo recogido");
        return true;
    }

    /**
     * Suelta el buzo actual
     * Usa PARENTING = null 
     */
    dropDiver() {
        if (!this.currentDiver) {
            console.log("⚠️ No tienes ningún buzo");
            return false;
        }

        // Guardar la posición mundial actual del buzo
        const worldPosition = this.currentDiver.mesh.getAbsolutePosition().clone();

        // Romper el parenting
        this.currentDiver.mesh.parent = null;

        // Establecer la posición mundial
        this.currentDiver.mesh.position = worldPosition;

        // Marcar como entregado (desactivar)
        this.currentDiver.delivered = true;
        this.currentDiver.mesh.setEnabled(false);

        console.log("✅ Buzo entregado");
        
        this.currentDiver = null;
        return true;
    }

    /**
     * Verifica si el submarino tiene un buzo
     * @returns {boolean}
     */
    hasDiver() {
        return this.currentDiver !== null;
    }

    /**
     * Obtiene la posición del submarino
     * @returns {BABYLON.Vector3}
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Obtiene el buzo actual
     * @returns {Diver|null}
     */
    getCurrentDiver() {
        return this.currentDiver;
    }

    /**
     * Debug: Muestra información del submarino
     */
    debugInfo() {
        console.log("🚢 Submarino:");
        console.log("  Posición:", this.mesh.position);
        console.log("  Tiene buzo:", this.hasDiver());
        if (this.currentDiver) {
            console.log("  Buzo actual:", this.currentDiver);
        }
    }
}