import React, { useRef, useContext, useState, useEffect } from "react";
import { editor, control, model, helper, face } from "../ThreeEditor/index";
import styles from "./FaceCanvas.module.css";
import { EnvironmentContext } from "../context/index";

function FaceCanvas() {
    const canvasRef = useRef(undefined);
    const { video, predictions } = useContext(EnvironmentContext);

    useEffect(() => {
        if (canvasRef) {
            if (editor.container) return;
            editor.init(canvasRef.current);
            control.setOrbitControl();
            model.addMultiSphere("sphere", 468);
            helper.addAxesHelper();
            // helper.addDatGUI();
            editor.animate();
        }
    }, [canvasRef]);

    useEffect(() => {
        if (predictions) {
            if (predictions.length > 0) {
                face.updatePredictions(predictions);
                model.updateMultiSphere("sphere", 468);
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
