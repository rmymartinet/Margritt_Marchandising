import React from "react";
import { InstagramButton, TiktokButton } from "./SocialButton";
import "./TextContentLinks.scss";

const TextContentLinks = ({ text }) => {
  return (
    <div className="follow-me-text">
      <p>
        {text} <InstagramButton /> et <TiktokButton />
      </p>
    </div>
  );
};

export default TextContentLinks;
