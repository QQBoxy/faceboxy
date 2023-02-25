import * as THREE from "three";
import * as dat from "dat.gui";
import { editor } from "./index";

class ThreeHelper {
    constructor() {
        this.gui = null;
        this.data = {
            width: 0,
            height: 0,
            videoWidth: 0,
            videoHeight: 0,
        };
    }

    addAxesHelper() {
        const axesHelper = new THREE.AxesHelper(100);
        axesHelper.position.z = 1;
        editor.addMesh(axesHelper);
    }

    addDatGUI() {
        this.gui = new dat.GUI();
        this.gui.add(this.data, "width").listen();
        this.gui.add(this.data, "height").listen();
        this.gui.add(this.data, "videoWidth").listen();
        this.gui.add(this.data, "videoHeight").listen();
    }
}

export default ThreeHelper;