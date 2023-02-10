import * as THREE from "three";

class ThreeEditor {
    constructor() {
        // 預設值
        this.DEFAULT_CAMERA = new THREE.OrthographicCamera(
            -50, 50, 50, -50, -1500, 1500
        );
        this.DEFAULT_CAMERA.name = "CameraBoxy";
        this.DEFAULT_CAMERA.position.set(0, 0, 1000);

        // 環境參數
        this.container = null;
        this.width = 100; // 元素寬
        this.height = 100; // 元素高
        this.scene = null; // 場景
        this.camera = this.DEFAULT_CAMERA.clone(); // 相機
        this.renderer = null; // 渲染器
        this.light = null; // 光源
        this.orbitControl = null; // 控制
        this.trackballControl = null; // 控制
        this.objects = []; // 物件
        this.timer = null;
        this.video = null;
        this.videoScale = null;
        this.scale = 1.0;
        this.predictions = [];
    }
    // 初始化
    init(container) {
        const self = this;

        this.container = container;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#ffffff");

        this.renderer = new THREE.WebGLRenderer({
            // alpha: true
        });
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.renderer.domElement.style.position = "absolute";

        this.setCamera();

        window.addEventListener("resize", (function () {
            clearTimeout(self.timer);
            self.timer = setTimeout(function () {
                self.width = self.container.offsetWidth;
                self.height = self.container.offsetHeight;
                self.camera.left = -self.width * 0.5;
                self.camera.right = self.width * 0.5;
                self.camera.top = self.height * 0.5;
                self.camera.bottom = -self.height * 0.5;
                self.camera.updateProjectionMatrix();
                self.renderer.setSize(self.width, self.height);
                self.videoScale = {
                    width: self.width / self.video.videoWidth,
                    height: self.height / self.video.videoHeight,
                };
            }, 500);
        }));
    }
    // 設定相機
    setCamera() {
        const { width, height } = this;
        this.camera = new THREE.OrthographicCamera(
            -width * 0.5, width * 0.5, height * 0.5, -height * 0.5, -1500, 1500
        );
        this.camera.position.copy(new THREE.Vector3(0, 0, 1000));
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.scene.add(this.camera);
    }
    // 設定光源
    setLight() {
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        // 點光源
        const pointLight1 = new THREE.PointLight(0xffffff, 0.1, 0);
        const pointLight2 = new THREE.PointLight(0xffffff, 0.1, 0);
        const pointLight3 = new THREE.PointLight(0xffffff, 0.1, 0);
        const pointLight4 = new THREE.PointLight(0xffffff, 0.1, 0);
        const pointLight5 = new THREE.PointLight(0xffffff, 0.3, 0);
        pointLight1.position.set(1000, 1000, 1000);
        pointLight2.position.set(-1000, 1000, 1000);
        pointLight3.position.set(1000, -1000, 1000);
        pointLight4.position.set(-1000, -1000, 1000);
        pointLight5.position.set(0, 0, 1000);
        this.camera.add(pointLight1);
        this.camera.add(pointLight2);
        this.camera.add(pointLight3);
        this.camera.add(pointLight4);
        this.camera.add(pointLight5);
        // 半球光源
        const hemisphereLight = new THREE.HemisphereLight(0x756450, 0x456282, 0.1);
        this.scene.add(hemisphereLight);
    }
    // 動畫
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.orbitControl && this.orbitControl.update();
        this.trackballControl && this.trackballControl.update();
        this.render();
    }
    // 渲染
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    addMesh(mesh) {
        this.scene.add(mesh);
        return mesh;
    }
    getMesh(name) {
        const object = this.scene.getObjectByName(name);
        if (!object) return null;
        return object;
    }
    // 開發工具
    addHelper() {
        const axesHelper = new THREE.AxesHelper(100);
        this.scene.add(axesHelper);
    }
    /**長方框
     * a — b
     * |   |
     * d — c
     */
    addRectangle(name) {
        const material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

        const points = [];
        points.push(new THREE.Vector3(- 10, 10, 0)); // a
        points.push(new THREE.Vector3(10, 10, 0)); // b
        points.push(new THREE.Vector3(10, -10, 0)); // c
        points.push(new THREE.Vector3(-10, -10, 0)); // d

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.LineLoop(geometry, material);
        line.name = name;
        this.scene.add(line);
        return line;
    }
    // 球
    addSphere() {
        const geometry = new THREE.SphereGeometry(15, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.name = "sphere";
        this.scene.add(sphere);
        return sphere;
    }
    // 多個球
    addMultiSphere(name, num) {
        for (let n = 0; n < num; n++) {
            const geometry = new THREE.SphereGeometry(2, 8, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.name = `${name}_${n}`;
            this.scene.add(sphere);
        }
    }
    // 更新球
    updateSphere(name) {
        const object = this.scene.getObjectByName(name);
        if (!object) return null;

        const { scaledMesh } = this.predictions[0];
        const arr = [...scaledMesh[0]];

        arr[0] = this.width * 0.5 - this.videoScale.width * arr[0];
        arr[1] = this.height * 0.5 - this.videoScale.height * arr[1];
        let vector = new THREE.Vector3(...arr);

        object.position.copy(vector);

        return object;
    }
    // 更新多顆球
    updateMultiSphere(name, num) {
        for (let n = 0; n < num; n++) {
            const pos = this.predictions[0].scaledMesh[n];
            const object = this.scene.getObjectByName(`${name}_${n}`);
            if (!object) continue;
            if (this.video) {
                object.position.x = this.video.videoWidth * 0.5 - pos[0];
                object.position.y = this.video.videoHeight * 0.5 - pos[1];
            }
        }
    }
    addVideo(name, video) {
        if (!video) return;
        const geometry = new THREE.PlaneGeometry(video.videoWidth, video.videoHeight);
        const texture = new THREE.VideoTexture(video);
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = - 1;
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        this.scene.add(mesh);
        return mesh;
    }
    // 更新特徵資訊
    updateVideoSize(video) {
        this.video = video;
        this.videoScale = {
            width: this.width / video.videoWidth,
            height: this.height / video.videoHeight,
        };
    }
    // 更新特徵資訊
    updatePredictions(predictions) {
        this.predictions = predictions;
    }
}

const threeEditor = new ThreeEditor();
export default threeEditor;