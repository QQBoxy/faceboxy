import * as THREE from "three";
import { editor } from "./index";

class ThreeModel {
    constructor() {

    }
    // 多個球
    addMultiSphere(name, num) {
        for (let n = 0; n < num; n++) {
            const geometry = new THREE.SphereGeometry(2, 8, 8);
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
            if (editor.video) {
                object.position.x = editor.video.videoWidth * 0.5 - pos[0];
                object.position.y = editor.video.videoHeight * 0.5 - pos[1];
            }
        }
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