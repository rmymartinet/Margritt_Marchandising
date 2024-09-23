import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { exhibitionData } from "../../data/data";
import { useGSAPAnimation } from "./useGSAPAnimation";

export const Exposition = () => {
  const exhibitionRef = useRef(null);

  const exhibitionDataRef = useRef(exhibitionData.map(() => React.createRef()));
  const { t } = useTranslation();

  useGSAPAnimation(exhibitionDataRef, exhibitionRef);

  return (
    <div ref={exhibitionRef} className="exposition-container">
      <div className="infos-container">
        <div className="infos-grid">
          <div className="infos-title">
            <h2>Exhibitions</h2>
          </div>
          {exhibitionData.map((expo, index) => (
            <div
              ref={exhibitionDataRef.current[index]}
              className={`project${index}`}
              key={index}
            >
              <span>{expo.date}</span>
              <p>{expo.title}</p>
              <p>{expo.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Exposition.displayName = "Exposition";
