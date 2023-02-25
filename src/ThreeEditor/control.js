import { editor } from "./index";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

class ThreeControl {
    constructor() {
        this.orbitControl = null;
        this.trackballControl = null;
    }

    update() {
        this.orbitControl && this.orbitControl.update();
        this.trackballControl && this.trackballControl.update();
    }

    setOrbitControl() {
        this.orbitControl = new OrbitControls(
            editor.camera,
            editor.renderer.domElement
        );
        this.orbitControl.update();
    }

    setTrackballControl() {
        this.trackballControl = new TrackballControls(
            editor.camera,
            editor.renderer.domElement
        );
        this.trackballControl.update();
    }
}

export default ThreeControl;

