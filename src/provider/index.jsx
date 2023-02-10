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
    const [video, setVideo] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [loadingMask, setLoadingMask] = useState(false);

    const defaultValue = {
        video, setVideo,
        facemeshOptions, setFacemeshOptions,
        predictions, setPredictions,
        loadingMask, setLoadingMask,
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