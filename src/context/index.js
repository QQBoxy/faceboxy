import { createContext } from "react";

export const EnvironmentContext = createContext({
    facemeshOptions: {
        // 影片是否翻轉
        flipHorizontal: false,
        /**
         * How many frames to go without running the bounding box detector.
         * 當 maxFaces 大於 1 才套用
         * 預設值 5
         */
        maxContinuousChecks: 5,
        /**
         * 拋出預測的閥值
         * 預設值 0.9
         */
        detectionConfidence: 0.9,
        /**
         * 由輸入中能偵測的最大人臉數量
         * 應根據運算效率設定最小值
         * 預設值 10
         */
        maxFaces: 1,
        /**
         * 信心度分數閥值
         * 基於 NMS (Non-Maximum Suppression) 演算法刪除多個可能重複偵測的閥值
         * 預設值 0.75
         */
        scoreThreshold: 0.75,
        /**
         * IOU (Intersection Over Union) 閥值
         * 決定邊界盒是否在非最大抑制中重疊太多
         * 也就是邊界盒如果太近 IOU 值太大就會刪掉一個邊界盒
         * 設定範圍 [0, 1]
         * 預設值 0.3
         */
        iouThreshold: 0.3,
    },
    setFacemeshOptions: null,
    // 影像大小
    video: {
        videoWidth: 0,
        videoHeight: 0,
    },
    setVideo: null,
    // 特徵資訊
    predictions: [],
    setPredictions: null,
});