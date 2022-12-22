import React from "react";
import video from "../../../images/demo-video.mp4";
import styles from "./videomodal.module.scss";

const VideoModal = () => {

  return (
      <div className={styles.container}>
          <video
            src={video}
            type="video/mp4"
            controls
            autoPlay
            muted
          />
      </div>
  );
};

export default VideoModal;
