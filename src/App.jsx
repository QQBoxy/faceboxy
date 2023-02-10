import React from "react";
import Facemesh from "./Component/Facemesh";
import FaceCanvas from "./Component/FaceCanvas";
import LoadingMask from "./Component/LoadingMask";
import { EnvironmentProvider } from "./provider/index";

function App() {

    return (
        <EnvironmentProvider>
            <Facemesh></Facemesh>
            <FaceCanvas></FaceCanvas>
            <LoadingMask></LoadingMask>
        </EnvironmentProvider>
    );
}

export default App;
