import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Transition } from "../../components/Animations/PageTransition/Transition.jsx";
import { TitleTransition } from "../../components/Animations/TextAnimation.jsx";
import Divider from "../../components/Common/Divider.jsx";
import InfoItem from "../../components/Common/InfoItem.jsx";
import SvgName from "../../components/SvgName/SvgName.jsx";
import { CONTACT_INFO } from "../../data/dataContactInfos.js";
import "../Contact/Contact.scss";

const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { t } = useTranslation();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("fr-FR", {
      timeZone: "Europe/Paris",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Transition>
      <motion.section className="contact-container">
        <TitleTransition textClassName="title p" />

        <div className="title">
          <p>{t("contact.title")}</p>
        </div>

        <div className="contact-subtitle">
          <div className="text">
            Interested in a piece from my galleries? Let me know!
          </div>
          <div
            className={isHovered ? "mail" : "mail"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <a href="mailto:margrittmartinet@gmail.com">
              margrittmartinet@gmail.com
            </a>
          </div>
        </div>

        <Divider className="contact-divider" />
        <div className="infos-content">
          <InfoItem label="Local Time" value={time} className="local-time" />
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
          <SvgName textColor="black" />
        </div>
      </motion.section>
    </Transition>
  );
};

export default Contact;
