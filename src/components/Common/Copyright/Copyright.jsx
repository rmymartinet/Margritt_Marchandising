import React from "react";
import "./Copyright.scss";

const Copyright = () => {
  const actualYear = new Date().getFullYear();
  return (
    <div className="copyright">
      <p>{`© ${actualYear} by Margritt Martinet.`}</p>
    </div>
  );
};
export default Copyright;
