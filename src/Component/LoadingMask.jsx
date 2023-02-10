import React, { useContext } from "react";
import styles from "./LoadingMask.module.css";
import { EnvironmentContext } from "../context/index";

function LoadingMask() {

    const { loadingMask } = useContext(EnvironmentContext);

    return (
        <>
            {loadingMask && (
                <div className={styles.loadingMask}>
                    <span className={styles.loader}></span>
                </div>
            )}
        </>
    );
}

LoadingMask.defaultProps = {
    visible: false,
};

export default LoadingMask;
