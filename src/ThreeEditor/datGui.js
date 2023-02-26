// import * as THREE from "three";
import * as dat from "dat.gui";
// import { editor } from "./index";

class ThreeDatGUI {
    constructor() {
        this.gui = null;
        this.data = {
            width: 0,
        };
    }

    addDatGUI() {
        this.gui = new dat.GUI();
        this.gui.add(this.data, "width").listen();
    }
}

export default ThreeDatGUI;