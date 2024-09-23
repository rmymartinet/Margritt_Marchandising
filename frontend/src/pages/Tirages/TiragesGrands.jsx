import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Circle from "../../components/Common/Circle";
import Hero from "../../components/Common/Hero/Hero";
import Form from "../../components/Form/Form";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { useFilteredData } from "../../components/hook/useFilteredData";
import { useShoppingIsClickedStore } from "../../store/useShoppingIsClickedStore";
import { useStoreShopping } from "../../store/useStoreShopping";
import "./Tirages.scss";

const TiragesGrands = () => {
  const navigate = useNavigate();
  const { data } = useFilteredData("large-formats");

  const addToCart = useStoreShopping((state) => state.addToCart);
  const setIsClicked = useShoppingIsClickedStore((state) => state.setIsClicked);

  const handleNavigateToDetails = (id) => {
    navigate(`/prints/large-formats/${id}`);
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: 600,
      quantity: 1,
      stock: item.stock,
      img: item.imageUrls[0],
      format: "large-formats",
    });
    setIsClicked(true);
  };

  return (
    <Transition>
      <div className="tirages-container">
        <Hero title="Large Formats Prints" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content">
            <div className="content-right">
              <p>
                The prints are high-quality digital reproductions of my original
                artworks. Each print, in <span>limited edition</span>, is
                numbered, <span>signed by the artist</span>
                and accompanied by a <span>certificate of authenticity</span>.
                They are produced by Les ‘Courts Tirages’.
              </p>
            </div>
            <div className="content-left">
              <p>
                Each print is limited to 10 copies. Check their availability by
                consulting the prints.
              </p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p>Size 120 x 80 cm</p>
            </div>
          </div>
        </HeroSubContent>

        <motion.div className="grid-images-content">
          <div className="img-gallery-container">
            {data.map((imgData, id) => (
              <motion.div
                key={id}
                initial={{ y: 100 }}
                animate={{ y: 0, transition: { duration: 1 } }}
              >
                <div
                  onClick={() => handleNavigateToDetails(imgData.id)}
                  className="images-container"
                >
                  <picture>
                    <source type="image/webp" srcSet={imgData.imageUrls[0]} />
                    <img
                      loading="lazy"
                      className="img"
                      alt={imgData.alt}
                      src={imgData.imageUrls[0]}
                    />
                  </picture>
                </div>
                <div className="image-content-tirages">
                  <div className="infos-content">
                    <div className="infos">
                      <p>{imgData.title}</p>
                      <span>|</span>
                      <p>{imgData.format}</p>
                      <span>|</span>
                      <p>{imgData.date}</p>
                    </div>
                    <div className="price">
                      <span>Price: 600.00 €</span>
                    </div>
                  </div>
                  <div className="button-container">
                    <div
                      onClick={() => handleNavigateToDetails(imgData.id)}
                      className="infos-button-container"
                    >
                      <span className="infos-button">Learn more</span>
                      <div className="icon">
                        <IoIosArrowForward />
                      </div>
                    </div>
                    <div className="buy-button">
                      <p onClick={() => handleAddToCart(imgData)}>
                        Add to cart
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <footer>
        <Circle target="tirages-container" />
        <Form />
      </footer>
    </Transition>
  );
};

export default TiragesGrands;
