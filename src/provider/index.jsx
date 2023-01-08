import { useState } from "react";
import { EnvironmentContext } from "../context/index";

export const EnvironmentProvider = ({ children }) => {

    // const { coordinate, setCoordinate } = useState({ x: 0, y: 0, z: 0 });
    const [environment, setEnvironment] = useState({
        facemeshOptions: {
            flipHorizontal: false,
            maxContinuousChecks: 5,
            detectionConfidence: 0.9,
            maxFaces: 1,
            scoreThreshold: 0.75,
            iouThreshold: 0.3,
        },
        predictions: [],
    });
    const defaultValue = {
        environment,
        setEnvironment
    };
    return (
        <EnvironmentContext.Provider value={defaultValue}>
            {children}
        </EnvironmentContext.Provider>
    );
};