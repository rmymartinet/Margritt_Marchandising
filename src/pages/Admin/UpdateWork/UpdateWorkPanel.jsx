import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard"; // Composant pour afficher chaque item
import "./UpdateWorkPanel.scss"; // Importation du fichier CSS/SCSS

const UpdateWorkPanel = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:4242/api/originals");
        setItems(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Fonction pour gérer la mise à jour d'un item
  const handleUpdate = async (updatedItem) => {
    try {
      // Créer une copie de updatedItem sans le champ "id"
      const { id, ...updatedItemWithoutId } = updatedItem;

      const response = await axios.put(
        `http://localhost:4242/api/originals/update-stock/${id}`,
        updatedItemWithoutId
      );
      setItems(items.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };
  return (
    <div className="update-items-panel">
      <h2>Modifier des Items</h2>
      {loading && <p>Chargement des données...</p>}
      {error && <p>Erreur: {error.message}</p>}
      <div className="items-container">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} item={item} onEdit={handleUpdate} />
          ))
        ) : (
          <p>Aucun item trouvé.</p> // Un message si `items` est vide ou n'est pas un tableau
        )}
      </div>
    </div>
  );
};

export default UpdateWorkPanel;
