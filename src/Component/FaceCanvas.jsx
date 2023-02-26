import React, { useRef, useContext, useState, useEffect } from "react";
import { editor, control, model, helper, datGui, face } from "../ThreeEditor/index";
import styles from "./FaceCanvas.module.css";
import { EnvironmentContext } from "../context/index";
// import stlUrl from "../assets/SphereD2Binary.stl?url";
import stlUrl from "../assets/Anterior_Teeth.stl?url";

function FaceCanvas() {
    const canvasRef = useRef(undefined);
    const { video, predictions } = useContext(EnvironmentContext);

    useEffect(() => {
        if (canvasRef) {
            if (editor.container) return;
            editor.init(canvasRef.current);
            editor.setLight();
            control.setOrbitControl();
            model.addMultiSphere("sphere", 468);
            model.addSTL("stl", stlUrl);
            helper.addAxesHelper();
            // datGui.addDatGUI();
            editor.animate();
        }
    }, [canvasRef]);

    useEffect(() => {
        if (predictions) {
            if (predictions.length > 0) {
                face.updatePredictions(predictions);
                model.updateMultiSphere("sphere", 468);
                model.updateSTL("stl");
            }
        }
    }, [predictions]);

    useEffect(() => {
        if (video) {
            if (editor.video) return;
            face.addVideo("video", video);
            face.updateVideoSize(video);
        }
    }, [video]);

    return (
        <>
            <div ref={canvasRef} id="container" className={styles.container}></div>
        </>
    );
}

export default FaceCanvas;
