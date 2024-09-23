import React, { useState } from "react";
import "./AddArtworkPanel.scss";

function AddArtworkPanel() {
  const [artwork, setArtwork] = useState({
    id: 0,
    category: "",
    title: "",
    serie: "",
    piece: "",
    dimension: "",
    date: "",
    format: "",
    price: "",
    papier: "",
    stock: "",
    imageUrls: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      if (/^[A-Z]/.test(value)) {
        setArtwork((prev) => ({ ...prev, [name]: value }));
      } else {
        alert("Le titre doit commencer par une lettre majuscule.");
      }
    } else {
      setArtwork((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4242/api/originals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artwork),
      }).then((response) => response.json());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Ajouter des items</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titre de l'œuvre</label>
            <input
              type="text"
              name="title"
              value={artwork.title}
              onChange={handleChange}
              placeholder="Bibulle 10"
              required
            />
          </div>

          <div>
            <label>Date de création</label>
            <input
              type="text"
              name="date"
              value={artwork.date}
              onChange={handleChange}
              placeholder="2021  ou 2021 - 2022"
              required
            />
          </div>

          <div>
            <label>Format</label>
            <input
              type="text"
              name="format"
              value={artwork.format}
              onChange={handleChange}
              placeholder="120 x 80 cm ou 50 x 70 cm"
              required
            />
          </div>

          <div>
            <label>Dimensions</label>
            <input
              type="text"
              name="dimension"
              value={artwork.dimension}
              onChange={handleChange}
              placeholder="large-formats ou medium-formats"
              required
            />
          </div>
          <div>
            <label>Catégorie</label>
            <input
              type="text"
              name="category"
              value={artwork.category}
              onChange={handleChange}
              placeholder="originaux ou gallery"
              required
            />
          </div>
          <div>
            <label>Pièce</label>
            <input
              type="text"
              name="piece"
              value={artwork.piece}
              onChange={handleChange}
              placeholder="1"
              required={artwork.category === "originaux"}
            />
          </div>

          <div>
            <label>Prix</label>
            <input
              type="number"
              name="price"
              value={artwork.price}
              onChange={handleChange}
              required={artwork.category === "originaux"}
            />
          </div>
          <div>
            <label>Stock disponible</label>
            <input
              type="text"
              name="stock"
              value={artwork.stock}
              onChange={handleChange}
              required={artwork.category === "originaux"}
            />
          </div>
          <div>
            <label>Papier</label>
            <input
              type="text"
              name="papier"
              value={artwork.papier}
              onChange={handleChange}
              required={artwork.category === "originaux"}
              placeholder="Lavis Vinci - 300 g ou Fine art cotton smooth bright - 300 g ou autres"
            />
          </div>
          <div>
            <label>URLs des images Cloudinary</label>
            <input
              type="text"
              name="cloudinaryImageUrls"
              value={artwork.cloudinaryImageUrls}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/dnkhbxpji/image/upload/v1726497154/bibulle3-3_srozln.png"
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default AddArtworkPanel;
