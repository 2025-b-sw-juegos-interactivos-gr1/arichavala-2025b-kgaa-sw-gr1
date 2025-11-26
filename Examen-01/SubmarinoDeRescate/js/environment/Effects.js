/**
 * EFFECTS.JS
 * Efectos visuales y decoración del océano
 * Burbujas, rocas, corales y otros elementos decorativos
 */

class Effects {
    constructor(scene) {
        this.scene = scene;
        this.bubbles = [];
        this.rocks = [];
        this.corals = [];
        
        // Crear todos los efectos
        this.createBubbles();
        this.createRocks();
        this.createCorals();
        this.createSeaweed();
        
        console.log("✅ Effects creados");
    }

    /**
     * Crea burbujas que suben hacia la superficie
     * Usa BABYLON.MeshBuilder.CreateSphere (requisito del profesor)
     */
    createBubbles() {
        const bubbleMat = new BABYLON.StandardMaterial("bubbleMat", this.scene);
        bubbleMat.diffuseColor = new BABYLON.Color3(0.8, 0.9, 1.0);
        bubbleMat.specularColor = new BABYLON.Color3(1, 1, 1);
        bubbleMat.alpha = 0.3;

        for (let i = 0; i < CONFIG.EFFECTS.BUBBLES_COUNT; i++) {
            const bubble = BABYLON.MeshBuilder.CreateSphere(
                `bubble${i}`,
                { diameter: Math.random() * 0.3 + 0.2 },
                this.scene
            );

            // Posición aleatoria en el fondo
            bubble.position = new BABYLON.Vector3(
                Math.random() * 100 - 50,
                -15 + Math.random() * 5,
                Math.random() * 100 - 50
            );

            bubble.material = bubbleMat;

            // Guardar velocidad de subida individual
            bubble.riseSpeed = Math.random() * 0.03 + 0.02;

            this.bubbles.push(bubble);
        }

        console.log(`  ✓ ${CONFIG.EFFECTS.BUBBLES_COUNT} burbujas creadas`);
    }

    /**
     * Crea rocas decorativas en el fondo
     * Usa BABYLON.MeshBuilder (requisito del profesor)
     */
    createRocks() {
        const rockMat = new BABYLON.StandardMaterial("rockMat", this.scene);
        rockMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.35);
        rockMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        for (let i = 0; i < CONFIG.EFFECTS.ROCKS_COUNT; i++) {
            // Usar cajas con escala irregular para simular rocas
            const rock = BABYLON.MeshBuilder.CreateBox(
                `rock${i}`,
                { size: 1 },
                this.scene
            );

            // Escala irregular para forma de roca
            rock.scaling = new BABYLON.Vector3(
                Math.random() * 2 + 1,
                Math.random() * 1.5 + 0.5,
                Math.random() * 2 + 1
            );

            // Rotación aleatoria
            rock.rotation = new BABYLON.Vector3(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Posición aleatoria en el fondo
            rock.position = new BABYLON.Vector3(
                Math.random() * 150 - 75,
                -14.5,
                Math.random() * 150 - 75
            );

            rock.material = rockMat;
            this.rocks.push(rock);
        }

        console.log(`  ✓ ${CONFIG.EFFECTS.ROCKS_COUNT} rocas creadas`);
    }

    /**
     * Crea corales decorativos
     * Usa BABYLON.MeshBuilder.CreateCylinder (requisito del profesor)
     */
    createCorals() {
        const coralColors = [
            new BABYLON.Color3(1, 0.4, 0.4),    // Rojo coral
            new BABYLON.Color3(1, 0.6, 0.8),    // Rosa
            new BABYLON.Color3(0.8, 0.4, 0.8),  // Púrpura
            new BABYLON.Color3(1, 0.8, 0.4)     // Naranja
        ];

        for (let i = 0; i < CONFIG.EFFECTS.CORALS_COUNT; i++) {
            // Crear base del coral (cilindro)
            const coral = BABYLON.MeshBuilder.CreateCylinder(
                `coral${i}`,
                {
                    diameterTop: 0.1,
                    diameterBottom: 0.5,
                    height: Math.random() * 2 + 1,
                    tessellation: 6
                },
                this.scene
            );

            // Material con color aleatorio
            const coralMat = new BABYLON.StandardMaterial(`coralMat${i}`, this.scene);
            coralMat.diffuseColor = coralColors[Math.floor(Math.random() * coralColors.length)];
            coralMat.emissiveColor = coralMat.diffuseColor.scale(0.2);
            coral.material = coralMat;

            // Posición aleatoria en el fondo
            coral.position = new BABYLON.Vector3(
                Math.random() * 120 - 60,
                -14,
                Math.random() * 120 - 60
            );

            // Ligera inclinación
            coral.rotation.z = (Math.random() - 0.5) * 0.3;

            // Añadir "ramas" del coral
            this.addCoralBranches(coral, coralMat);

            this.corals.push(coral);
        }

        console.log(`  ✓ ${CONFIG.EFFECTS.CORALS_COUNT} corales creados`);
    }

    /**
     * Añade ramas a un coral
     * @param {BABYLON.Mesh} coral - Coral base
     * @param {BABYLON.StandardMaterial} material - Material del coral
     */
    addCoralBranches(coral, material) {
        const branchCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < branchCount; i++) {
            const branch = BABYLON.MeshBuilder.CreateCylinder(
                `branch${i}`,
                {
                    diameterTop: 0.05,
                    diameterBottom: 0.15,
                    height: Math.random() * 0.8 + 0.4,
                    tessellation: 4
                },
                this.scene
            );

            branch.material = material;
            branch.parent = coral;

            // Posición y rotación relativa al coral principal
            branch.position = new BABYLON.Vector3(
                (Math.random() - 0.5) * 0.3,
                Math.random() * 0.5,
                (Math.random() - 0.5) * 0.3
            );

            branch.rotation = new BABYLON.Vector3(
                (Math.random() - 0.5) * Math.PI / 2,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * Math.PI / 2
            );
        }
    }

    /**
     * Crea algas/plantas marinas
     */
    createSeaweed() {
        const seaweedMat = new BABYLON.StandardMaterial("seaweedMat", this.scene);
        seaweedMat.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.2);
        seaweedMat.emissiveColor = new BABYLON.Color3(0, 0.1, 0);

        for (let i = 0; i < 20; i++) {
            const seaweed = BABYLON.MeshBuilder.CreateCylinder(
                `seaweed${i}`,
                {
                    diameterTop: 0.1,
                    diameterBottom: 0.15,
                    height: Math.random() * 3 + 2,
                    tessellation: 4
                },
                this.scene
            );

            seaweed.material = seaweedMat;

            seaweed.position = new BABYLON.Vector3(
                Math.random() * 140 - 70,
                -13.5,
                Math.random() * 140 - 70
            );

            // Animación de ondulación
            this.createSeaweedAnimation(seaweed);
        }

        console.log("  ✓ Algas creadas");
    }

    /**
     * Crea animación de ondulación para algas
     * @param {BABYLON.Mesh} seaweed - Alga a animar
     */
    createSeaweedAnimation(seaweed) {
        const animation = new BABYLON.Animation(
            "seaweedSway",
            "rotation.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const maxRotation = Math.random() * 0.3 + 0.2;
        const keys = [
            { frame: 0, value: -maxRotation },
            { frame: 30, value: maxRotation },
            { frame: 60, value: -maxRotation }
        ];

        animation.setKeys(keys);
        seaweed.animations.push(animation);
        this.scene.beginAnimation(seaweed, 0, 60, true);
    }

    /**
     * Actualiza los efectos (llamar en el loop de renderizado)
     * Principalmente para animar las burbujas
     */
    update() {
        // Actualizar burbujas
        for (let bubble of this.bubbles) {
            // Subir la burbuja
            bubble.position.y += bubble.riseSpeed;

            // Si llega a la superficie, reiniciar en el fondo
            if (bubble.position.y > 0) {
                bubble.position.y = -15 + Math.random() * 5;
                bubble.position.x = Math.random() * 100 - 50;
                bubble.position.z = Math.random() * 100 - 50;
            }

            // Movimiento lateral suave (deriva)
            bubble.position.x += Math.sin(Date.now() * 0.001 + bubble.position.z) * 0.01;
        }
    }

    /**
     * Pausa/reanuda las animaciones de burbujas
     * @param {boolean} pause - true para pausar, false para reanudar
     */
    pauseBubbles(pause) {
        // Implementar si se necesita pausar el juego
    }

    /**
     * Añade más burbujas en una posición específica
     * Útil para efectos especiales (ej: cuando el submarino se mueve rápido)
     * @param {BABYLON.Vector3} position - Posición donde crear burbujas
     * @param {number} count - Número de burbujas a crear
     */
    addBurstBubbles(position, count = 5) {
        const bubbleMat = new BABYLON.StandardMaterial("burstBubbleMat", this.scene);
        bubbleMat.diffuseColor = new BABYLON.Color3(0.8, 0.9, 1.0);
        bubbleMat.alpha = 0.4;

        for (let i = 0; i < count; i++) {
            const bubble = BABYLON.MeshBuilder.CreateSphere(
                `burstBubble${Date.now()}${i}`,
                { diameter: Math.random() * 0.4 + 0.2 },
                this.scene
            );

            bubble.position = position.clone();
            bubble.position.x += (Math.random() - 0.5) * 2;
            bubble.position.z += (Math.random() - 0.5) * 2;
            bubble.material = bubbleMat;
            bubble.riseSpeed = Math.random() * 0.05 + 0.03;

            // Añadir a la lista de burbujas temporales
            this.bubbles.push(bubble);

            // Eliminar después de un tiempo
            setTimeout(() => {
                bubble.dispose();
                const index = this.bubbles.indexOf(bubble);
                if (index > -1) {
                    this.bubbles.splice(index, 1);
                }
            }, 5000);
        }
    }

    /**
     * Debug: Muestra información de los efectos
     */
    debugInfo() {
        console.log("✨ Efectos:");
        console.log("  Burbujas activas:", this.bubbles.length);
        console.log("  Rocas:", this.rocks.length);
        console.log("  Corales:", this.corals.length);
    }
}