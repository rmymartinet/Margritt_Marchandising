import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import videoInstagramScroll from "../../assets/videos/instagram_scroll.mp4";
import videoTiktokScroll from "../../assets/videos/tiktok_scroll.mp4";
import Iphone from "../Common/Iphone/Iphone";
import "./SocialMedia.scss";
import TextContentLinks from "./TextContentLinks";

const SocialMedia = () => {
  return (
    <section className="social-media">
      <div className="social-content">
        <div className="social-left">
          <div>
            <h2>Suivez mon quotidien d'artiste.</h2>
          </div>
          <div>
            <div className="follower-number">
              <div className="follower-content">
                <span>
                  <p>+ 20.000 </p>
                </span>
                <div className="icon">
                  <FaInstagram />
                </div>
              </div>
              <div className="follower-content">
                <span>
                  <p>+ 70.000 </p>
                </span>
                <div className="icon">
                  <IoLogoTiktok />
                </div>
              </div>
            </div>
            <div className="dividere"></div>
            <div className="follow-me-text">
              <TextContentLinks text="Suis moi sur" />
            </div>
          </div>
        </div>
        <div className="social-right">
          <div className="iphone-left">
            <Iphone videoUrl={videoInstagramScroll} />
          </div>
          <div className="iphone-right">
            <Iphone videoUrl={videoTiktokScroll} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
