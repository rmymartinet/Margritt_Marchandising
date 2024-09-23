import ShadowText from "./ShadowText";

const ArtistProfiles = () => {
  return (
    <div className="quote-container">
      <div className="quote-title">
        <p>Inspiration</p>
      </div>
      <div className="quote-text">
        <ShadowText
          paragraph="Margritt creates works that pay tribute to her family culture deeply rooted in the maritime world, immersing viewers in an ever-evolving imaginary realm. Her creations explore instinct, creative impulse, and constant artistic inquiry, transforming reality through material work and challenging our visual perspective"
          className="quote-paragraph"
        />
      </div>
    </div>
  );
};

export default ArtistProfiles;
