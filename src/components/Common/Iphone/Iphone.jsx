import { useEffect, useRef } from "react";
import "./Iphone.scss";

const Iphone = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="iphone-container">
      <div className="iphone-frame">
        {/* Silencer */}
        <div className="silencer"></div>

        {/* Volume Up and Down */}
        <div className="volume-up"></div>
        <div className="volume-down"></div>

        {/* Button On */}
        <div className="button-on"></div>

        <div className="iphone-screen">
          <div className="video-content">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              src={videoUrl}
            ></video>
          </div>
          {/* Camera */}
          <div className="camera">
            <div className="camera-lens">
              <div className="camera-inner-lens"></div>
              <div className="camera-dot"></div>
            </div>
            <div className="camera-line"></div>
          </div>

          {/* Battery and Signal */}
          <div className="battery-signal">
            <div className="battery">
              <div className="battery-level"></div>
              <div className="battery-tip"></div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="bottom-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Iphone;
