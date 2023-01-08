import React, { useRef, useContext, useState, useEffect } from "react";
import ThreeEditor from "../ThreeEditor/index";
import styles from "./FaceCanvas.module.css";
import { EnvironmentContext } from "../context/index";

function FaceCanvas() {
    const canvasRef = useRef(undefined);
    const { environment } = useContext(EnvironmentContext);
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
        if (environment) {
            if (environment.predictions.length > 0) {
                setPos({
                    x: parseInt(320 - environment?.predictions[0]?.scaledMesh[0][0], 10),
                    y: parseInt(320 - environment?.predictions[0]?.scaledMesh[0][1], 10),
                    z: parseInt(environment?.predictions[0]?.scaledMesh[0][2], 10),
                });
                ThreeEditor.updatePredictions(environment);
                ThreeEditor.updateSphere("sphere");
            }
        }
    }, [environment]);

    return (
        <>
            <div ref={canvasRef} id="container" className={styles.container}></div>
            <div>{`(scaledMesh[0] x: ${pos.x}, y: ${pos.y}, z: ${pos.z})`}</div>

        </>
    );
}

export default FaceCanvas;
