import React, { useRef, useContext, useState, useEffect } from "react";
import ThreeEditor from "../ThreeEditor/index";
import styles from "./FaceCanvas.module.css";
import { EnvironmentContext } from "../context/index";

function FaceCanvas() {
    const canvasRef = useRef(undefined);
    const { video, predictions } = useContext(EnvironmentContext);
    const [pos, setPos] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        if (canvasRef) {
            if (ThreeEditor.container) return;
            ThreeEditor.init(canvasRef.current);
            ThreeEditor.addSphere();
            ThreeEditor.animate();
        }
    }, [canvasRef]);

    useEffect(() => {
        if (predictions) {
            if (predictions.length > 0) {
                ThreeEditor.updatePredictions(predictions);
                const sphere = ThreeEditor.updateSphere("sphere");
                setPos(sphere.position);
            }
        }
    }, [predictions]);

    useEffect(() => {
        if (video) {
            if (ThreeEditor.videoWidth || ThreeEditor.videoHeight) return;
            ThreeEditor.updateVideoSize(video);
        }
    }, [video]);

    return (
        <>
            <div ref={canvasRef} id="container" className={styles.container}></div>
            <div className={styles.coordinate}>{`scaledMesh[0]: (x: ${parseInt(pos.x, 10)}, y: ${parseInt(pos.y, 10)}, z: ${parseInt(pos.z, 10)})`}</div>
        </>
    );
}

export default FaceCanvas;
