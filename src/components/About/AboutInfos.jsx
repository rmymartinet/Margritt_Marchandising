import { useGSAP } from "@gsap/react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { about } from "../../data/dataImages";

const AboutContent = forwardRef((_, ref) => {
  const { t } = useTranslation();
  const rightImg = useRef(null);
  const leftImg = useRef(null);
  const isImgInView = useInView(leftImg, {
    triggerOnce: true,
    threshold: 0.7,
  });

  const imageReveal = (element) => {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "Power3.inOut",
      },
    });

    tl.from(
      element,
      {
        yPercent: -50,
        scale: 1.15,
      },
      0
    ).to(
      element,
      {
        yPercent: 0,
        scale: 1,
      },
      0
    );
  };

  const imagesScaleAnimation = (element) => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(element, {
      scale: 1.15,
      scrollTrigger: {
        trigger: ".right-img",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  };

  useGSAP(() => {
    if (isImgInView) {
      imageReveal(".left-wrapper img");
    }
  }, [isImgInView]);

  useGSAP(() => {
    imagesScaleAnimation(".right-img img");
  });

  /*------------
  Animation left content
  -------------*/

  useGSAP(() => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".left-content",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      if (window.innerWidth > 1200) {
        tl.fromTo(
          ".left-content",
          {
            y: 200,
          },
          {
            duration: 2,
            y: -100,
            ease: "power2.out",
          }
        );
      } else {
        tl.fromTo(
          ".left-content",
          {
            y: 300,
          },
          {
            duration: 2,
            y: -100,
            ease: "power2.out",
          }
        );
      }
    });
  });

  return (
    <div className="about-content" ref={ref}>
      <div className="about-title">
        <p>
          <span>Margritt Martinet</span> is a visual artist from Charente,
          dedicated to her creations, providing a space for her creativity to
          flourish
        </p>
      </div>
      <div ref={rightImg} className="right-img">
        <img src={about.webp.about1} alt="" />
      </div>
      <div className="left-content">
        <div className="left-text">
          <div className="text-1">
            Trained in cabinetmaking at the École Boulle, she obtained a
            bachelor’s degree in Fine Arts from the European School of Art in
            Brittany and a diploma in art therapy from the Faculty of Medicine
            in Poitiers.
          </div>
          <div className="text-2">
            Passionate about fine arts, drawing, and painting, her artistic
            universe, inspired by her travels and maritime family culture, is
            characterized by an imaginary world in constant reconstruction,
            emphasizing movement and visual effects
          </div>
          <div className="text-3">
            Her artistic work transforms reality through the manipulation of
            materials, blending instinct, creative impulse, and constant
            exploration
          </div>
        </div>
        <div ref={leftImg} className="left-img">
          <div className="left-wrapper">
            <img src={about.webp.about2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
});

AboutContent.displayName = "AboutContent";

export default AboutContent;
