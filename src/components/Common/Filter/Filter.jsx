import "./Filter.scss";

const Filter = ({ setItems, active, setActive }) => {
  const handleClickProgress = () => {
    setActive("progress");
    setItems("project"); // Passe le type de données à charger
  };

  const handleClickGallery = () => {
    setActive("gallery");
    setItems("gallery"); // Passe le type de données à charger
  };

  return (
    <div className="filter-container">
      <div className="filter-button">
        <div
          className={
            active === "gallery" ? "gallery-button-active" : "gallery-button"
          }
        >
          <span onClick={handleClickGallery}>Gallery</span>
        </div>
        <div
          className={
            active === "progress"
              ? "inprogress-button-active"
              : "inprogress-button"
          }
        >
          <span onClick={handleClickProgress}>In progress</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
