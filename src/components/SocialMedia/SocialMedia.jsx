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
          <h2>Follow my artist's daily life.</h2>
          <div>
            <div className="follower-number">
              <div className="follower-content">
                <span>
                  <p>+ 22,000 </p>
                </span>
                <div className="icon">
                  <FaInstagram />
                </div>
              </div>
              <div className="follower-content">
                <span>
                  <p>+ 77,000 </p>
                </span>
                <div className="icon">
                  <IoLogoTiktok />
                </div>
              </div>
            </div>
            <div className="dividere"></div>
            <div className="follow-me-text">
              <TextContentLinks text="Follow me on" />
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
