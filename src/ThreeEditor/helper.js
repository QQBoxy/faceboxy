import * as THREE from "three";
import { editor } from "./index";

class ThreeHelper {
    constructor() {
    }

    addAxesHelper() {
        const axesHelper = new THREE.AxesHelper(100);
        axesHelper.position.z = 1;
        editor.addMesh(axesHelper);
    }
}

export default ThreeHelper;