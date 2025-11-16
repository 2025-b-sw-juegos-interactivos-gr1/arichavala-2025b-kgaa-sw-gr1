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

    // Cámara orbital (permite rotar 360 grados)
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 3, 30, new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 10;  // Zoom mínimo
    camera.upperRadiusLimit = 50;  // Zoom máximo
    camera.lowerBetaLimit = 0.1;   // Límite inferior (no ir debajo del suelo)
    camera.upperBetaLimit = Math.PI / 2.1; // Límite superior

    // Luz hemisférica y direccional
    var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.7;
    var dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(10, 20, 10);
    dirLight.intensity = 0.8;

    // Suelo de césped
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture("assets/textures/grass.jpg", scene);
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 40, height: 30}, scene);
    ground.material = groundMat;

    // Camino de tierra
    var roadMat = new BABYLON.StandardMaterial("roadMat", scene);
    roadMat.diffuseTexture = new BABYLON.Texture("assets/textures/lodo.jpg", scene);
    var road = BABYLON.MeshBuilder.CreateGround("road", {width: 30, height: 5}, scene);
    road.position.y = 0.02;
    road.position.z = 0;
    road.material = roadMat;

    // Casa sencilla: cubo y techo triangular
    var houseMat = new BABYLON.StandardMaterial("houseMat", scene);
    houseMat.diffuseTexture = new BABYLON.Texture("assets/textures/madera.jpg", scene);
    var house = BABYLON.MeshBuilder.CreateBox("house", {width: 4, height: 4, depth: 4}, scene);
    house.position = new BABYLON.Vector3(0, 2, 10);
    house.material = houseMat;
    var roofMat = new BABYLON.StandardMaterial("roofMat", scene);
    roofMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1); // Rojo
    var roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameterTop: 0, diameterBottom: 5.5, height: 3, tessellation: 4}, scene);
    roof.position = new BABYLON.Vector3(0, 5.5, 10);
    roof.rotation.y = Math.PI / 4; // Rotación de 45 grados para alinear con la casa
    roof.material = roofMat;

    // Árboles solo fuera del camino
    var treePositions = [
        [-15, -10], [15, -10], [-15, 10], [15, 10], [-15, 15], [15, 15], [-15, -15], [15, -15]
    ];
    treePositions.forEach(function(pos) {
        var trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", {diameter: 0.6, height: 3}, scene);
        trunk.position = new BABYLON.Vector3(pos[0], 1.5, pos[1]);
        var trunkMat = new BABYLON.StandardMaterial("trunkMat", scene);
        trunkMat.diffuseTexture = new BABYLON.Texture("assets/textures/madera.jpg", scene);
        trunk.material = trunkMat;
        var leaves = BABYLON.MeshBuilder.CreateSphere("leaves", {diameter: 3}, scene);
        leaves.position = new BABYLON.Vector3(pos[0], 4, pos[1]);
        var leavesMat = new BABYLON.StandardMaterial("leavesMat", scene);
        leavesMat.diffuseColor = new BABYLON.Color3(0.2, 0.8, 0.2);
        leaves.material = leavesMat;
    });

    // Cercas
    var fenceMat = new BABYLON.StandardMaterial("fenceMat", scene);
    fenceMat.diffuseTexture = new BABYLON.Texture("assets/textures/madera.jpg", scene);
    for (var i = -18; i <= 18; i += 3) {
        var fence = BABYLON.MeshBuilder.CreateBox("fence", {width: 2.5, height: 0.3, depth: 0.3}, scene);
        fence.position = new BABYLON.Vector3(i, 0.15, -7);
        fence.material = fenceMat;
    }
    for (var i = -7; i <= 7; i += 3) {
        var fence2 = BABYLON.MeshBuilder.CreateBox("fence2", {width: 0.3, height: 0.3, depth: 10}, scene);
        fence2.position = new BABYLON.Vector3(-18, 0.15, i);
        fence2.material = fenceMat;
    }

    // Cartel
    var sign = BABYLON.MeshBuilder.CreateBox("sign", {width: 3, height: 1.5, depth: 0.2}, scene);
    sign.position = new BABYLON.Vector3(-15, 1, -7);
    sign.material = fenceMat;
    var signPost = BABYLON.MeshBuilder.CreateCylinder("signPost", {diameter: 0.2, height: 2}, scene);
    signPost.position = new BABYLON.Vector3(-15, 0, -7);
    signPost.material = fenceMat;

    // Monedas con textura de oro
    var coinMat = new BABYLON.StandardMaterial("coinMat", scene);
    coinMat.diffuseTexture = new BABYLON.Texture("assets/textures/oro.jpg", scene);
    for (var i = -10; i <= 10; i += 5) {
        var coin = BABYLON.MeshBuilder.CreateSphere("coin", {diameter: 0.7}, scene);
        coin.position = new BABYLON.Vector3(i, 0.35, 0);
        coin.material = coinMat;
    }

    // Charcos (discos marrones)
    var mudMat = new BABYLON.StandardMaterial("mudMat", scene);
    mudMat.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);
    for (var i = -8; i <= 8; i += 8) {
        var mud = BABYLON.MeshBuilder.CreateDisc("mud", {radius: 1}, scene);
        mud.position = new BABYLON.Vector3(i, 0.03, 0);
        mud.rotation.x = Math.PI / 2;
        mud.material = mudMat;
    }

    // Cargar modelo de la vaca y animar salto
    BABYLON.SceneLoader.Append(
        "assets/models/cow/",
        "scene.gltf",
        scene,
        function (loadedScene) {
            var cow = loadedScene.meshes[loadedScene.meshes.length - 1];
            cow.position = new BABYLON.Vector3(0, 0, 0);
            cow.scaling = new BABYLON.Vector3(2, 2, 2);
            // Animación de salto
            var jumpAnim = new BABYLON.Animation("jumpAnim", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            var keys = [];
            keys.push({ frame: 0, value: 0 });
            keys.push({ frame: 10, value: 4 });
            keys.push({ frame: 20, value: 0 });
            jumpAnim.setKeys(keys);
            cow.animations = [jumpAnim];
            loadedScene.beginAnimation(cow, 0, 20, true);
        }
    );

    return scene;
}
