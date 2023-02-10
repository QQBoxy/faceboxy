import React, { useRef, useContext, useState, useEffect } from "react";
import ml5 from "ml5";
import styles from "./Facemesh.module.css";
import { EnvironmentContext } from "../context/index";

function Facemesh() {
    const videoRef = useRef(undefined);
    const { facemeshOptions, setVideo, setPredictions, setLoadingMask } = useContext(EnvironmentContext);

    // 取得影片
    const getVideo = async () => {
        const video = videoRef.current;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            video.srcObject = stream;
            return new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    video.play();
                    resolve();
                };
            });
        }
    };

    /**
     * facemesh
     * @param {Function} predictionFunc
     * @returns {Promise} callback function
     */
    const facemesh = (predictionFunc) => {
        return new Promise((resolve, reject) => {
            // ml5 臉部特徵偵測
            const facemesh = ml5.facemesh(videoRef.current, facemeshOptions, resolve);
            // 監聽臉部特徵
            facemesh.on("face", predictionFunc);
        });
    };

    const setup = async () => {
        setLoadingMask(true);
        // 取得影片
        await getVideo();
        // 臉部偵測
        const video = videoRef.current;
        await facemesh((result) => {
            // 更新 Video
            setVideo(video);
            // 更新特徵資訊
            setPredictions(result);
        });
        setLoadingMask(false);
    };

    useEffect(() => {
        if (videoRef) {
            setup();
        }
    }, [videoRef]);

    return (
        <>
            <div className={styles.facemesh}>
                <video
                    className={styles.video}
                    autoPlay={true}
                    ref={videoRef}
                ></video>
            </div>
        </>
    );
}

export default Facemesh;
