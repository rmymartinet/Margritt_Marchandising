import useWindow from "../../components/Common/UseWindows.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GeneratePosition = ({ isLoading }) => {
  const { dimension } = useWindow();

  const MOBILE_WIDTH = dimension.width < 498;

  const generateRandomPosition = (numPosition, minWidth, maxWidth) => {
    const position = [];
    const generatedPositions = new Set();

    while (generatedPositions.size < numPosition) {
      const x = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
      const y = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
      const scale = MOBILE_WIDTH
        ? Math.random() * (0.5 - 0.3) + 0.5
        : Math.random() * (1.2 - 0.5) + 0.5;

      if (!generatedPositions.has(x)) {
        position.push({ x, y, scale });
        generatedPositions.add(x, y, scale);
      }
    }

    return position;
  };
  const position = generateRandomPosition(20, -800, 800);
  const mobilePosition = MOBILE_WIDTH && generateRandomPosition(20, -200, 200);

  const OPACITY_DURATION = 3;
  const DELAY_MULTIPLIER = 0.3;
  const POSITION_RANGE = 20;
  const MIN_POSITION = -800;
  const MAX_POSITION = 800;
  const ANIMATION_DURATION = 7;
  const REPEAT_DELAY = 7;

  useGSAP(() => {
    const scrollInfinites = document.querySelectorAll(".scroll-infinite");

    const setElementProperties = (item, position) => {
      gsap.set(item, {
        opacity: 0,
        x: position.x,
        scale: position.scale,
      });
    };

    scrollInfinites.forEach((item, i) => {
      const currentPosition = mobilePosition ? mobilePosition[i] : position[i];
      setElementProperties(item, currentPosition);

      if (!isLoading) {
        gsap.to(item, {
          opacity: 1,
          duration: OPACITY_DURATION,
          delay: DELAY_MULTIPLIER * i,
          onComplete: () => {
            gsap.to(item, {
              onRepeat: () => {
                const newPosition = generateRandomPosition(
                  POSITION_RANGE,
                  MIN_POSITION,
                  MAX_POSITION
                )[i].x;
                gsap.set(item, { x: newPosition });
              },
              y: i % 2 === 0 ? MAX_POSITION : MIN_POSITION,
              duration: ANIMATION_DURATION,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: REPEAT_DELAY,
            });
          },
        });
      }
    });
  }, [isLoading, position, mobilePosition]);
};

export default GeneratePosition;
