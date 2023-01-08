import { useRef, useContext, useState, useEffect } from "react";
import styles from "./App.module.css";
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
