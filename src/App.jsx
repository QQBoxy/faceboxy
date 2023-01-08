import { useRef, useContext, useState, useEffect } from "react";
import styles from "./App.module.css";
import Facemesh from "./Component/Facemesh";
import FaceCanvas from "./Component/FaceCanvas";
import { EnvironmentProvider } from "./provider/index";

function App() {

    return (
        <EnvironmentProvider>
            <div className={styles.app}>
                <FaceCanvas></FaceCanvas>
            </div>
            <div className={styles.app}>
                <Facemesh></Facemesh>
            </div>
        </EnvironmentProvider>
    );
}

export default App;
