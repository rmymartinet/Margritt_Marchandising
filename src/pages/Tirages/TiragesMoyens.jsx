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

const TiragesMoyens = () => {
  let navigate = useNavigate();

  const handleNavigateToDetails = (id) => {
    navigate(`/prints/medium-formats/${id}`);
  };

  const addToCart = useStoreShopping((state) => state.addToCart);
  const setIsClicked = useShoppingIsClickedStore((state) => state.setIsClicked);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: 250,
      quantity: 1,
      stock: item.stock,
      img: item.imageUrls[0],
      format: "medium-formats",
    });
  };

  const { data } = useFilteredData("medium-formats");

  return (
    <Transition>
      <div className="tirages-container">
        <Hero title="medium formats prints" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content">
            <div className="content-right">
              <p>
                The prints are high-quality digital reproductions of my original
                artworks. Each print is a limited edition, numbered, signed by
                the artist, and accompanied by a certificate of authenticity.
                The prints are produced by Les ‘Courts Tirages’.
              </p>
            </div>
            <div className="content-left">
              <p>
                Each print is limited to 30 copies. Check their availability by
                consulting the prints.
              </p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p> Size 50 x 70 cm</p>
            </div>
          </div>
        </HeroSubContent>
        <motion.div className="grid-images-content" exit="exit">
          <div className="img-gallery-container">
            {data.map((imgData, id) => {
              return (
                <motion.div
                  key={id}
                  initial={{ y: 100 }}
                  animate={{
                    y: 0,
                    transition: {
                      duration: 1,
                    },
                  }}
                  exit="exit"
                >
                  <div
                    onClick={() => {
                      handleNavigateToDetails(imgData.id, imgData.format);
                    }}
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
                        <p> {imgData.date}</p>
                      </div>
                      <div className="price">
                        <span>Price: 250.00 €</span>
                      </div>
                    </div>
                    <div className="button-container">
                      <div
                        onClick={() => {
                          handleNavigateToDetails(imgData.id);
                        }}
                        className="infos-button-container"
                      >
                        <span className="infos-button">Learn more</span>
                        <div className="icon">
                          <IoIosArrowForward />
                        </div>
                      </div>
                      <div className="buy-button">
                        <p
                          onClick={() => {
                            handleAddToCart(imgData);
                            setIsClicked(true);
                          }}
                        >
                          Add to cart
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <footer>
        <Circle target={"gallery-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default TiragesMoyens;
