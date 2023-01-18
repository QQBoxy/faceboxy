import React, { useState } from "react";
import { EnvironmentContext } from "../context/index";

const EnvironmentProvider = ({ children }) => {

    const [facemeshOptions, setFacemeshOptions] = useState({
        flipHorizontal: false,
        maxContinuousChecks: 5,
        detectionConfidence: 0.9,
        maxFaces: 1,
        scoreThreshold: 0.75,
        iouThreshold: 0.3,
    });

    const [video, setVideo] = useState({
        videoWidth: 0,
        videoHeight: 0,
    });

    const [predictions, setPredictions] = useState([]);

    const defaultValue = {
        video, setVideo,
        facemeshOptions, setFacemeshOptions,
        predictions, setPredictions,
    };

    return (
        <EnvironmentContext.Provider value={defaultValue}>
            {children}
        </EnvironmentContext.Provider>
    );
};
EnvironmentProvider.propTypes = {
    children: React.Node,
};

export { EnvironmentProvider };