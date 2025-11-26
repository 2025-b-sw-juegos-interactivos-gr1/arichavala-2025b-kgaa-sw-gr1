/**
 * OCEAN.JS
 * Clase del ambiente submarino
 * Crea el fondo marino, iluminación, niebla y atmósfera
 */

class Ocean {
    constructor(scene) {
        this.scene = scene;
        
        // Crear todos los elementos del océano
        this.createGround();
        this.createLighting();
        this.createFog();
        this.createWaterSurface();
        this.createSkybox();
        
        console.log("✅ Ocean creado");
    }

    /**
     * Crea el fondo marino
     * Usa BABYLON.MeshBuilder.CreateGround (requisito del profesor)
     */
    createGround() {
        this.ground = BABYLON.MeshBuilder.CreateGround(
            "oceanFloor",
            {
                width: CONFIG.OCEAN.GROUND_SIZE,
                height: CONFIG.OCEAN.GROUND_SIZE,
                subdivisions: 50
            },
            this.scene
        );

        // Posicionar en el fondo
        this.ground.position.y = -15;

        // Material del fondo marino (arena/roca)
        const groundMat = new BABYLON.StandardMaterial("groundMat", this.scene);
        groundMat.diffuseColor = BABYLON.Color3.FromHexString(CONFIG.OCEAN.GROUND_COLOR);
        groundMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        
        // Textura procedural para arena
        groundMat.bumpTexture = new BABYLON.Texture(
            "https://assets.babylonjs.com/textures/rock.png",
            this.scene
        );
        
        this.ground.material = groundMat;

        console.log("  ✓ Fondo marino creado");
    }

    /**
     * Crea la iluminación del océano
     * Usa BABYLON.HemisphericLight (requisito del profesor)
     */
    createLighting() {
        // Luz ambiental (ilumina todo sutilmente)
        this.ambientLight = new BABYLON.HemisphericLight(
            "ambientLight",
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );
        this.ambientLight.intensity = CONFIG.LIGHTING.AMBIENT_INTENSITY;
        this.ambientLight.diffuse = BABYLON.Color3.FromHexString(CONFIG.LIGHTING.AMBIENT_COLOR);
        this.ambientLight.specular = new BABYLON.Color3(0.1, 0.1, 0.1);

        // Luz direccional (simula luz del sol penetrando el agua)
        this.sunLight = new BABYLON.DirectionalLight(
            "sunLight",
            new BABYLON.Vector3(-0.5, -1, 0.5),
            this.scene
        );
        this.sunLight.intensity = 0.5;
        this.sunLight.diffuse = new BABYLON.Color3(0.7, 0.8, 1.0);

        // Luz puntual cerca de la superficie (efecto de brillo)
        this.surfaceLight = new BABYLON.PointLight(
            "surfaceLight",
            new BABYLON.Vector3(0, 3, 0),
            this.scene
        );
        this.surfaceLight.intensity = 0.3;
        this.surfaceLight.diffuse = new BABYLON.Color3(0.5, 0.7, 1.0);
        this.surfaceLight.range = 50;

        console.log("  ✓ Iluminación creada");
    }

    /**
     * Crea la niebla subacuática
     * Da sensación de profundidad y atmósfera
     */
    createFog() {
        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        this.scene.fogStart = CONFIG.OCEAN.FOG_START;
        this.scene.fogEnd = CONFIG.OCEAN.FOG_END;
        this.scene.fogColor = BABYLON.Color3.FromHexString(CONFIG.OCEAN.FOG_COLOR);
        this.scene.fogDensity = 0.02;

        console.log("  ✓ Niebla creada");
    }

    /**
     * Crea la superficie del agua
     * Un plano transparente azul que simula la superficie
     */
    createWaterSurface() {
        this.waterSurface = BABYLON.MeshBuilder.CreateGround(
            "waterSurface",
            {
                width: CONFIG.OCEAN.GROUND_SIZE,
                height: CONFIG.OCEAN.GROUND_SIZE,
                subdivisions: 2
            },
            this.scene
        );

        this.waterSurface.position.y = CONFIG.OCEAN.WATER_LEVEL;

        // Material del agua (azul transparente)
        const waterMat = new BABYLON.StandardMaterial("waterMat", this.scene);
        waterMat.diffuseColor = new BABYLON.Color3(0.1, 0.4, 0.7);
        waterMat.specularColor = new BABYLON.Color3(0.5, 0.7, 1.0);
        waterMat.emissiveColor = new BABYLON.Color3(0, 0.1, 0.2);
        waterMat.alpha = 0.6;
        waterMat.backFaceCulling = false; // Ver desde abajo también

        this.waterSurface.material = waterMat;

        console.log("  ✓ Superficie del agua creada");
    }

    /**
     * Crea un skybox (cielo) submarino
     * Da sensación de inmersión completa
     */
    createSkybox() {
        this.skybox = BABYLON.MeshBuilder.CreateBox(
            "skybox",
            { size: 1000 },
            this.scene
        );

        const skyboxMat = new BABYLON.StandardMaterial("skyboxMat", this.scene);
        skyboxMat.backFaceCulling = false;
        skyboxMat.disableLighting = true;
        skyboxMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMat.specularColor = new BABYLON.Color3(0, 0, 0);
        
        // Color azul oscuro submarino
        skyboxMat.emissiveColor = BABYLON.Color3.FromHexString("#001a33");
        
        this.skybox.material = skyboxMat;
        this.skybox.infiniteDistance = true;

        console.log("  ✓ Skybox creado");
    }

    /**
     * Añade textura de cáusticas (patrón de luz en el fondo)
     * Simula la luz del sol refractada por las olas
     */
    addCaustics() {
        // Crear plano para proyectar cáusticas
        const causticPlane = BABYLON.MeshBuilder.CreateGround(
            "caustics",
            {
                width: CONFIG.OCEAN.GROUND_SIZE,
                height: CONFIG.OCEAN.GROUND_SIZE
            },
            this.scene
        );

        causticPlane.position.y = -14.9; // Justo encima del fondo

        const causticMat = new BABYLON.StandardMaterial("causticMat", this.scene);
        causticMat.diffuseTexture = new BABYLON.Texture(
            "https://assets.babylonjs.com/textures/floor.png",
            this.scene
        );
        causticMat.diffuseTexture.level = 0.3;
        causticMat.alpha = 0.5;
        causticMat.backFaceCulling = false;

        causticPlane.material = causticMat;

        console.log("  ✓ Cáusticas añadidas");
    }

    /**
     * Actualiza el ambiente (llamar en el loop si es necesario)
     * Por ahora no necesita actualización, pero está preparado
     */
    update() {
        // Podríamos animar la superficie del agua aquí
        // Por ejemplo, hacer que suba y baje ligeramente
    }

    /**
     * Cambia la intensidad de la luz (útil para efectos)
     * @param {number} intensity - Nueva intensidad (0-1)
     */
    setLightIntensity(intensity) {
        if (this.ambientLight) {
            this.ambientLight.intensity = intensity * CONFIG.LIGHTING.AMBIENT_INTENSITY;
        }
    }

    /**
     * Cambia la densidad de la niebla
     * @param {number} density - Nueva densidad (0-1)
     */
    setFogDensity(density) {
        this.scene.fogDensity = density;
    }

    /**
     * Debug: Muestra información del océano
     */
    debugInfo() {
        console.log("🌊 Océano:");
        console.log("  Tamaño del fondo:", CONFIG.OCEAN.GROUND_SIZE);
        console.log("  Nivel del agua:", CONFIG.OCEAN.WATER_LEVEL);
        console.log("  Niebla - Start:", CONFIG.OCEAN.FOG_START, "End:", CONFIG.OCEAN.FOG_END);
        console.log("  Intensidad de luz:", this.ambientLight.intensity);
    }
}