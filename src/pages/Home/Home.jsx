import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import videoBic from "../../assets/videos/bicVideo.mp4";
import { Transition } from "../../components/Animations/PageTransition/Transition.jsx";
import {
  LineTransition,
  TitleTransition,
} from "../../components/Animations/TextAnimation.jsx";
import Circle from "../../components/Common/Circle.jsx";
import Form from "../../components/Form/Form.jsx";
import SocialMedia from "../../components/SocialMedia/SocialMedia.jsx";
import "./Home.scss";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const infosOeuvresRefs = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition>
      <section className="home-container">
        <div className="home-content">
          <TitleTransition textClassName="title-content h1" yposition="800" />
          <div className="title-content">
            <div className="title">
              <h1>Margritt</h1>
              <LineTransition textClassName="subtitle" yposition="800" />
              <p className="subtitle">
                No limits, just art. <br />
              </p>
            </div>
          </div>
        </div>
        <div className="bic-container">
          <div className="bic-title">
            <h2>Collaboration with Bic</h2>
          </div>
          <div className="bic-video-container">
            <a href="https://www.instagram.com/p/C7xDlCzo2_P/">
              <video
                ref={videoRef}
                loop
                autoPlay
                muted
                playsInline
                src={videoBic}
              />
            </a>
          </div>
        </div>
        <SocialMedia />
      </section>
      <footer>
        <Circle target={"project-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default Home;
