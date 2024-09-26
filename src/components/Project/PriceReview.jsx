import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { awardsReviewsData } from "../../data/data";
import useGSAPAnimation from "./useGSAPAnimation";

export const PriceReviews = () => {
  const awardsReviewRef = useRef(null);

  const priceReviewsDataRef = useRef(
    awardsReviewsData.map(() => React.createRef())
  );
  const { t } = useTranslation();

  useGSAPAnimation(priceReviewsDataRef, awardsReviewRef);

  return (
    <div ref={awardsReviewRef} className="activity-container">
      <div className="infos-container">
        <div className="infos-grid">
          <div className="infos-title">
            <h2>Awards and Press Reviews</h2>
          </div>
          {awardsReviewsData.map((expo, index) => (
            <div
              ref={priceReviewsDataRef.current[index]}
              className={`project${index} ${
                index === awardsReviewsData.length - 1 ? "last-project" : ""
              }`}
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

PriceReviews.displayName = "PriceReviews";
