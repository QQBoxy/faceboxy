import ThreeEditor from "./editor";
import ThreeControl from "./control";
import ThreeModel from "./model";
import ThreeHelper from "./helper";
import ThreeDatGUI from "./datGui";
import ThreeFace from "./face";

const threeEditor = new ThreeEditor();
const threeControl = new ThreeControl();
const threeModel = new ThreeModel();
const threeHelper = new ThreeHelper();
const threeDatGUI = new ThreeDatGUI();
const threeFace = new ThreeFace();

export const editor = threeEditor;
export const control = threeControl;
export const model = threeModel;
export const helper = threeHelper;
export const datGui = threeDatGUI;
export const face = threeFace;