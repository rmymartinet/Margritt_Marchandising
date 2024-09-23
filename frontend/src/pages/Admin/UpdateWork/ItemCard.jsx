import React, { useState } from "react";

const ItemCard = ({ item, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);
  const [newImage, setNewImage] = useState(null); // Pour stocker la nouvelle image ajoutée

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(updatedItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter une nouvelle image à la liste
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setUpdatedItem((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, newImageUrl],
      }));
      setNewImage(file);
    }
  };

  // Supprimer une image de la liste
  const handleRemoveImage = (index) => {
    setUpdatedItem((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="item-card">
      <div className="item-card-content">
        <div className="item-details">
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Catégorie</label>
              <input
                type="text"
                name="category"
                value={updatedItem.category}
                onChange={handleChange}
                placeholder="Catégorie"
              />
            </div>
          ) : (
            <h3>Categorie : {item.category}</h3>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Titre</label>
              <input
                type="text"
                name="title"
                value={updatedItem.title}
                onChange={handleChange}
                placeholder="Titre"
              />
            </div>
          ) : (
            <h3>Titre : {item.title}</h3>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Série</label>
              <input
                type="text"
                name="serie"
                value={updatedItem.serie}
                onChange={handleChange}
                placeholder="Série"
              />
            </div>
          ) : (
            <h3>Série : {item.serie}</h3>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Pièce</label>
              <input
                type="text"
                name="piece"
                value={updatedItem.piece}
                onChange={handleChange}
                placeholder="Pièce"
              />
            </div>
          ) : (
            <p>Pièce : {item.piece}</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Dimension</label>
              <input
                type="text"
                name="dimension"
                value={updatedItem.dimension}
                onChange={handleChange}
                placeholder="Dimension"
              />
            </div>
          ) : (
            <p>Dimension : {item.dimension}</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Date</label>
              <input
                type="text"
                name="date"
                value={updatedItem.date}
                onChange={handleChange}
                placeholder="Date"
              />
            </div>
          ) : (
            <p>Date : {item.date}</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Format</label>
              <input
                type="text"
                name="format"
                value={updatedItem.format}
                onChange={handleChange}
                placeholder="Format"
              />
            </div>
          ) : (
            <p>Format : {item.format}</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Prix</label>
              <input
                type="text"
                name="price"
                value={updatedItem.price}
                onChange={handleChange}
                placeholder="Prix"
              />
            </div>
          ) : (
            <p>Prix : {item.price} €</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Papier</label>
              <input
                type="text"
                name="papier"
                value={updatedItem.papier}
                onChange={handleChange}
                placeholder="Papier"
              />
            </div>
          ) : (
            <p>Papier : {item.papier}</p>
          )}
          {isEditing ? (
            <div className="label-input-container">
              <label htmlFor="stock">Stock</label>
              <input
                type="text"
                name="stock"
                value={updatedItem.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
          ) : (
            <p>Stock : {item.stock}</p>
          )}

          {/* Images */}
          <div className="item-images">
            {updatedItem.imageUrls.map((url, index) => (
              <div key={index} className="image-container">
                <img src={url} alt={`Image ${index}`} className="thumbnail" />
                {isEditing && (
                  <button onClick={() => handleRemoveImage(index)}>
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Ajouter une nouvelle image */}
          {isEditing && (
            <div>
              <input type="file" onChange={handleAddImage} />
              {newImage && <p>Nouvelle image ajoutée : {newImage.name}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Boutons de sauvegarde ou de modification */}
      {isEditing ? (
        <button onClick={handleSave} className="edit-button">
          Sauvegarder
        </button>
      ) : (
        <button onClick={handleEdit} className="edit-button">
          Modifier
        </button>
      )}
    </div>
  );
};

export default ItemCard;
