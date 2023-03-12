import * as THREE from "three";
import { editor } from "./index";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

class ThreeModel {
    constructor() {

    }
    async _STLLoaderAsync(url) {
        return new Promise((resolve, reject) => {
            const loader = new STLLoader();
            loader.load(url, (geometry) => {
                resolve(geometry);
            });
        });
    }
    // 多個球
    addMultiSphere(name, num) {
        for (let n = 0; n < num; n++) {
            const geometry = new THREE.SphereGeometry(1, 8, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.name = `${name}_${n}`;
            editor.addMesh(sphere);
        }
    }
    // 更新多顆球
    updateMultiSphere(name, num) {
        for (let n = 0; n < num; n++) {
            const pos = editor.predictions[0].scaledMesh[n];
            const object = editor.getMesh(`${name}_${n}`);
            if (!object) continue;
            if (!editor.video) return;
            object.position.x = editor.video.videoWidth * 0.5 - pos[0];
            object.position.y = editor.video.videoHeight * 0.5 - pos[1];
        }
    }
    async addSTL(name, url) {
        const geometry = await this._STLLoaderAsync(url);
        geometry.computeBoundingBox();
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        mesh.sourceQuaternion = mesh.quaternion.clone();

        editor.addMesh(mesh);
        return mesh;
    }
    updateSTL(name) {
        const object = editor.getMesh(name);
        if (!object) return null;
        // 上嘴唇點 0, 11, 12, 13
        // 下嘴唇點 14, 15, 16, 17
        const posR = editor.predictions[0].scaledMesh[78]; // 嘴唇右
        const posL = editor.predictions[0].scaledMesh[308]; // 嘴唇左
        if (!editor.video) return;

        // 齒軸線
        const box = object.geometry.boundingBox;
        const sourceLine = [
            new THREE.Vector3(box.min.x, (box.min.y + box.max.y) * 0.5, (box.min.z + box.max.z) * 0.5),
            new THREE.Vector3(box.max.x, (box.min.y + box.max.y) * 0.5, (box.min.z + box.max.z) * 0.5)
        ];
        const v0 = new THREE.Vector3();
        v0.subVectors(sourceLine[0], sourceLine[1]);
        const len0 = v0.length();

        const targetLine = [
            new THREE.Vector3(posL[0], posL[1], 0),
            new THREE.Vector3(posR[0], posR[1], 0)
        ];

        const v1 = new THREE.Vector3();
        v1.subVectors(targetLine[0], targetLine[1]);
        const len1 = v1.length();


        let angle = v0.angleTo(v1);

        if (v0.sub(v1).y > 1) {
            angle *= -1;
        }

        const s = (len1 / len0) * 0.8;

        const q1 = new THREE.Quaternion();
        q1.setFromAxisAngle(new THREE.Vector3(0, 0, -1), angle);
        object.quaternion.copy(object.sourceQuaternion);
        object.quaternion.multiply(q1);

        object.scale.set(s, s, s);

        object.position.x = editor.video.videoWidth * 0.5 - (posL[0] + posR[0]) * 0.5;
        object.position.y = editor.video.videoHeight * 0.5 - (posL[1] + posR[1]) * 0.5;
    }

    addLine(p1, p2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            p1, p2
        ]);
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const line = new THREE.Line(geometry, material);
        editor.addMesh(line);
    }

    tracing(name) {
        const object = editor.getMesh(name);
        if (!object) return null;

        // const q1 = new THREE.Quaternion();

        // q1.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

        // console.log(object.quaternion);

        // object.quaternion.multiply(q1);

        // console.log(object.quaternion);

        // object.updateMatrix();
    }


    // /**長方框
    //  * a — b
    //  * |   |
    //  * d — c
    //  */
    // addRectangle(name) {
    //     const material = new THREE.LineBasicMaterial({
    //         color: 0x0000ff
    //     });

    //     const points = [];
    //     points.push(new THREE.Vector3(- 10, 10, 0)); // a
    //     points.push(new THREE.Vector3(10, 10, 0)); // b
    //     points.push(new THREE.Vector3(10, -10, 0)); // c
    //     points.push(new THREE.Vector3(-10, -10, 0)); // d

    //     const geometry = new THREE.BufferGeometry().setFromPoints(points);

    //     const line = new THREE.LineLoop(geometry, material);
    //     line.name = name;
    //     editor.addMesh(line);
    //     return line;
    // }
    // // 球
    // addSphere() {
    //     const geometry = new THREE.SphereGeometry(15, 32, 16);
    //     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const sphere = new THREE.Mesh(geometry, material);
    //     sphere.name = "sphere";
    //     editor.addMesh(sphere);
    //     return sphere;
    // }
    // // 更新球
    // updateSphere(name) {
    //     const object = editor.getMesh(name);
    //     if (!object) return null;

    //     const { scaledMesh } = editor.predictions[0];
    //     const arr = [...scaledMesh[0]];

    //     arr[0] = editor.width * 0.5 - editor.videoScale.width * arr[0];
    //     arr[1] = editor.height * 0.5 - editor.videoScale.height * arr[1];
    //     let vector = new THREE.Vector3(...arr);

    //     object.position.copy(vector);

    //     return object;
    // }
}

export default ThreeModel;