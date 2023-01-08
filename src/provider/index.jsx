import { useState } from "react";
import { EnvironmentContext } from "../context/index";

export const EnvironmentProvider = ({ children }) => {

    const [environment, setEnvironment] = useState({
        facemeshOptions: {
            flipHorizontal: false,
            maxContinuousChecks: 5,
            detectionConfidence: 0.9,
            maxFaces: 1,
            scoreThreshold: 0.75,
            iouThreshold: 0.3,
        },
        videoWidth: 0,
        videoHeight: 0,
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