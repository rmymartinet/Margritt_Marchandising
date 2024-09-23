import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import AddArtworkPanel from "./AddWork/AddArtworkPanel";
import "./Admin.scss";
import RemoveWorkPanel from "./RemoveWork/RemoveWorkPanel";
import UpdateWorkPanel from "./UpdateWork/UpdateWorkPanel";

const Admin = () => {
  const { user } = useUser();

  const [filter, setFilter] = useState("addartwork");

  const isAdmin = user?.publicMetadata?.role === "admin"; // Vérifie si c'est un admin
  return (
    <div>
      {isAdmin ? (
        <div className="authorized-access">
          <h1>
            Bienvenue chère marmitton, ici tu peux ajouter des œuvres, en
            supprimer ou en modifier.
          </h1>

          <div className="filter-button-container">
            <button onClick={() => setFilter("addartwork")}>
              Ajouter une œuvre
            </button>
            <button onClick={() => setFilter("deleteartwork")}>
              Supprimer une œuvre
            </button>
            <button onClick={() => setFilter("updatework")}>Modifier</button>
          </div>
          {filter === "addartwork" && <AddArtworkPanel />}
          {filter === "deleteartwork" && <RemoveWorkPanel />}
          {filter === "updatework" && <UpdateWorkPanel />}
        </div>
      ) : (
        <div className="refused-access">
          <p>Accès refusé. Vous n'êtes pas administrateur.</p>
        </div>
      )}
    </div>
  );
};
export default Admin;
