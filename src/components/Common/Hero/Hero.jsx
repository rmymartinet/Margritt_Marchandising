import { TitleTransition } from "../../Animations/TextAnimation";
import Divider from "../Divider";
import "./Hero.scss";

const Hero = ({ title }) => {
  return (
    <>
      <TitleTransition textClassName="hero-title p" />
      <div className="hero">
        <div className="hero-title">
          <p>{title}</p>
        </div>
        <Divider className="divider" />
      </div>
    </>
  );
};

export default Hero;
