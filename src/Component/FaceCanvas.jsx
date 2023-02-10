import React, { useRef, useContext, useState, useEffect } from "react";
import ThreeEditor from "../ThreeEditor/index";
import styles from "./FaceCanvas.module.css";
import { EnvironmentContext } from "../context/index";

function FaceCanvas() {
    const canvasRef = useRef(undefined);
    const { video, predictions } = useContext(EnvironmentContext);

    useEffect(() => {
        if (canvasRef) {
            if (ThreeEditor.container) return;
            ThreeEditor.init(canvasRef.current);
            ThreeEditor.addMultiSphere("sphere", 468);
            // ThreeEditor.addRectangle("rectangle");
            // ThreeEditor.addHelper();
            ThreeEditor.animate();
        }
    }, [canvasRef]);

    useEffect(() => {
        if (predictions) {
            if (predictions.length > 0) {
                ThreeEditor.updatePredictions(predictions);
                ThreeEditor.updateMultiSphere("sphere", 468);
            }
        }
    }, [predictions]);

    useEffect(() => {
        if (video) {
            if (ThreeEditor.video) return;
            ThreeEditor.addVideo("video", video);
            ThreeEditor.updateVideoSize(video);
        }
    }, [video]);

    return (
        <>
            <div ref={canvasRef} id="container" className={styles.container}></div>
        </>
    );
}

export default FaceCanvas;
