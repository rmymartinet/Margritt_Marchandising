import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { activityData } from "../../data/data";
import useGSAPAnimation from "./useGSAPAnimation";

export const Activity = () => {
  const activityRef = useRef(null);

  const activityDataRef = useRef(activityData.map(() => React.createRef()));

  const { t } = useTranslation();

  useGSAPAnimation(activityDataRef, activityRef);

  return (
    <div ref={activityRef} className="activity-container">
      <div className="infos-container">
        <div className="infos-grid">
          <div className="infos-title">
            <h2>Art Activities</h2>
          </div>
          {activityData.map((expo, index) => (
            <div
              ref={activityDataRef.current[index]}
              className={`project${index}`}
              key={expo.id}
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

Activity.displayName = "Activity";
