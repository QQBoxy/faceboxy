import { useRef, useContext, useState, useEffect } from "react";
import ml5 from "ml5";
import styles from "./Facemesh.module.css";
import { EnvironmentContext } from "../context/index";

function Facemesh() {
    const videoRef = useRef(undefined);
    const { environment, setEnvironment } = useContext(EnvironmentContext);
    const [modelLoading, setModelLoading] = useState(false);

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

    const facemesh = (options, predictionFunc) => {
        return new Promise((resolve, reject) => {
            // ml5 臉部特徵偵測
            const facemesh = ml5.facemesh(videoRef.current, options, resolve);
            // 監聽臉部特徵
            facemesh.on("face", predictionFunc);
        });
    };

    const setup = async () => {
        setModelLoading(true);
        // 取得影片
        await getVideo();
        // 臉部偵測
        const video = videoRef.current;
        await facemesh(environment.facemeshOptions, (result) => {
            // 更新特徵資訊
            setEnvironment({
                ...environment,
                videoWidth: video.videoWidth,
                videoHeight: video.videoHeight,
                predictions: result
            });
        });
        setModelLoading(false);
    };

    useEffect(() => {
        if (videoRef) {
            setup();
        }
    }, [videoRef]);

    return (
        <>
            <video
                className={styles.video}
                autoPlay={true}
                ref={videoRef}
            ></video>
            <div className={styles.modelLoading}>
                {modelLoading && "Model Loading ..."}
            </div>
        </>
    );
}

export default Facemesh;
