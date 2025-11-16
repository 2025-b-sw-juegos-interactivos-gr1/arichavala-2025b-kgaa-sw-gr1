window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var scene = createScene(engine, canvas);

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});

function createScene(engine, canvas) {
    var scene = new BABYLON.Scene(engine);

    // Cámara
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -15), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Luz hemisférica
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Suelo con textura de césped
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture("assets/textures/cesped.jpg", scene);
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 8}, scene);
    ground.material = groundMat;

    // Obstáculo: caja con textura de ladrillo
    var obstacleMat = new BABYLON.StandardMaterial("obstacleMat", scene);
    obstacleMat.diffuseTexture = new BABYLON.Texture("assets/textures/ladrillo.jpg", scene);
    var obstacle = BABYLON.MeshBuilder.CreateBox("obstacle", {width: 2, height: 1, depth: 1}, scene);
    obstacle.position = new BABYLON.Vector3(3, 0.5, 0);
    obstacle.material = obstacleMat;

    // Moneda: esfera con textura de mármol
    var coinMat = new BABYLON.StandardMaterial("coinMat", scene);
    coinMat.diffuseTexture = new BABYLON.Texture("assets/textures/marmol.jpg", scene);
    var coin = BABYLON.MeshBuilder.CreateSphere("coin", {diameter: 0.7}, scene);
    coin.position = new BABYLON.Vector3(-2, 1, 0);
    coin.material = coinMat;

    // Cargar modelo de la vaca
    BABYLON.SceneLoader.Append(
        "assets/models/cow/",
        "scene.gltf",
        scene,
        function (scene) {
            var cow = scene.meshes[scene.meshes.length - 1];
            cow.position = new BABYLON.Vector3(0, 0, 0);
        }
    );

    return scene;
}
