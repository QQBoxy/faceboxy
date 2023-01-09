import * as THREE from 'three';

class ThreeEditor {
    constructor() {
        // 預設值
        this.DEFAULT_CAMERA = new THREE.OrthographicCamera(
            -50, 50, 50, -50, -1500, 1500
        );
        this.DEFAULT_CAMERA.name = 'CameraBoxy';
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
        this.videoScale = null;
        this.predictions = [];
    }
    // 初始化
    init(container) {
        const self = this;

        this.container = container;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.renderer.domElement.style.position = 'absolute';

        this.setCamera();

        window.addEventListener('resize', (function () {
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
                    width: self.width / self.videoWidth,
                    height: self.height / self.videoHeight,
                }
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
        requestAnimationFrame(this.animate.bind(this));
        this.orbitControl && this.orbitControl.update();
        this.trackballControl && this.trackballControl.update();
        this.render();
    }
    // 渲染
    render() {
        this.renderer.render(this.scene, this.camera);
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
    // 更新特徵資訊
    updateVideoSize(environment) {
        this.videoWidth = environment.videoWidth;
        this.videoHeight = environment.videoHeight;
        // console.log("Video Size:", this.videoWidth, this.videoHeight);
        this.videoScale = {
            width: this.width / this.videoWidth,
            height: this.height / this.videoHeight,
        };
    }
    // 更新特徵資訊
    updatePredictions(environment) {
        this.predictions = environment.predictions;
    }
}

const threeEditor = new ThreeEditor();
export default threeEditor;