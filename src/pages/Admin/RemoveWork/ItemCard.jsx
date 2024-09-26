import React from "react";

const ItemCard = ({ item, onRemove }) => {
  return (
    <div className="item-card">
      <img src={item.imageUrls[0]} alt={item.title} className="item-image" />
      <div className="item-info">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p>
          <strong>Prix :</strong> {item.price} €
        </p>
        <p>
          <strong>Stock :</strong> {item.stock}
        </p>
        <button onClick={() => onRemove(item.id)} className="remove-button">
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
