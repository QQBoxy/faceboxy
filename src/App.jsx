import React from "react";
import Facemesh from "./Component/Facemesh";
import FaceCanvas from "./Component/FaceCanvas";
import { EnvironmentProvider } from "./provider/index";

function App() {

    return (
        <EnvironmentProvider>
            <Facemesh></Facemesh>
            <FaceCanvas></FaceCanvas>
        </EnvironmentProvider>
    );
}

export default App;
