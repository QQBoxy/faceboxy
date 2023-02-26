import * as THREE from "three";
import { control } from "../ThreeEditor/index";

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

        window.addEventListener("resize", function () {
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
        });
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
        control.update();
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
}

export default ThreeEditor;