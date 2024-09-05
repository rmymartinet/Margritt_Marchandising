import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CONTACT_INFO } from "../../data/dataContactInfos";
import Divider from "../Common/Divider";
import InfoItem from "../Common/InfoItem";
import UseLocalTime from "../Common/UseLocalTime";
import SvgName from "../SvgName/SvgName";
import "./Form.scss";

const Form = () => {
  const { scrollYProgress } = useScroll({
    target: "contact-component-container",
    offset: ["start", "end", "end start"],
  });

  const formContainerRef = useRef(null);
  const y = useTransform(scrollYProgress, [0, 0.5], [-500, 0]);

  const dividerInView = useInView(formContainerRef, {
    threshold: 0.5,
  });

  const localTime = UseLocalTime();

  return (
    <motion.section
      style={{ y }}
      className="form-container"
      ref={formContainerRef}
    >
      <div className="hero-content">
        <div className="title">
          <p>Let's discuss</p>
        </div>
        <div className="mail">
          <a href={`mailto: ${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
        </div>
      </div>
      {dividerInView && <Divider className="form-divider" />}
      <div className="infos">
        <InfoItem label="Local Time" value={localTime} className="local-time" />
        <InfoItem
          label="Number"
          value={CONTACT_INFO.number}
          className="number"
        />
        <InfoItem
          label="Instagram"
          value={
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              @maargriitt
            </a>
          }
          className="instagram"
        />
        <InfoItem
          label="TikTok"
          value={
            <a
              href={CONTACT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
            >
              @margriitt
            </a>
          }
          className="tiktok"
        />
      </div>
      <div className="name">
        <SvgName textColor={"white"} />
      </div>
    </motion.section>
  );
};

export default Form;
