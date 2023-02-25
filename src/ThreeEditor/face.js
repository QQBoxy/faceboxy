import * as THREE from "three";
import { editor } from "./index";

class ThreeFace {
    constructor() {

    }
    addVideo(name, video) {
        if (!video) return;
        const geometry = new THREE.PlaneGeometry(video.videoWidth, video.videoHeight);
        const texture = new THREE.VideoTexture(video);
        // 設定貼圖沿 U 軸重複
        texture.wrapS = THREE.RepeatWrapping;
        // 設定 x 為反方向
        texture.repeat.x = - 1;
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        editor.addMesh(mesh);
        return mesh;
    }
    updateVideo(name) {
        const object = editor.getMesh(name);
        if (!object) return null;

        // 大小

        return object;
    }
    // 更新特徵資訊
    updateVideoSize(video) {
        editor.video = video;
        editor.videoScale = {
            width: editor.width / video.videoWidth,
            height: editor.height / video.videoHeight,
        };
    }
    // 更新特徵資訊
    updatePredictions(predictions) {
        editor.predictions = predictions;
    }
}

export default ThreeFace;