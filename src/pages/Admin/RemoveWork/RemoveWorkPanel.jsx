import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import "./RemoveWorkPanel.scss";

const RemoveWorkPanel = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simuler la récupération des items (ici tu feras un appel API réel)
  useEffect(() => {
    const fetchItems = async () => {
      // Appel API pour récupérer les items
      const fetchedItems = await fetch("/api/originals").then((res) =>
        res.json()
      );
      setItems(fetchedItems);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4242/api/originals");
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fonction pour supprimer un item
  const removeItem = (itemId) => {
    // Filtrer l'item à supprimer localement
    setItems(items.filter((item) => item.id !== itemId));

    // Appel API pour supprimer l'item du serveur (ou gestion de la suppression)
    fetch(`/api/originals/${itemId}`, {
      method: "DELETE",
    }).catch((err) => console.error("Erreur de suppression:", err));
  };

  return (
    <div className="remove-items-panel">
      <h2>Supprimer des Items</h2>
      <div className="items-container">
        {data.map((item) => (
          <ItemCard key={item.id} item={item} onRemove={removeItem} />
        ))}
      </div>
    </div>
  );
};

export default RemoveWorkPanel;
