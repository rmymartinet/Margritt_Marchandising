import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);

  // Si le chemin contient au moins deux segments, utiliser le premier et le dernier segment
  if (pathnames.length > 1) {
    pathnames = [pathnames[0], pathnames[pathnames.length - 1]];
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* Home */}
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>

        {/* Dynamically display the first and last path segments */}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

// {
//   pathnames.map((value, index) => {
//     const to = index === 1 ? `/tirages/${value}` : `/${value}`;
//     const isLast = index === pathnames.length - 1;

//     return (
//       <span key={to}>
//         {/* Separator */}
//         <span style={{ margin: "0 5px", opacity: "0.5" }}>/</span>

//         {/* Render the breadcrumb with a link for non-last items */}
//         {isLast ? (
//           <span className="breadcrumb-item active">
//             {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
//           </span>
//         ) : (
//           <Link to={to} className="breadcrumb-item">
//             {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
//           </Link>
//         )}
//       </span>
//     );
//   });
// }
