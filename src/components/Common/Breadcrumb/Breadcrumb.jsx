import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={to}>
              <span style={{ margin: "0 5px", opacity: "0.5" }}>/</span>
              {isLast ? (
                ""
              ) : (
                <Link to={to} className="breadcrumb-item">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </span>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
