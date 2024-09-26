import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { IoIosResize } from "react-icons/io";
import { Transition } from "../../components/Animations/PageTransition/Transition.jsx";
import Circle from "../../components/Common/Circle.jsx";
import Filter from "../../components/Common/Filter/Filter.jsx";
import Hero from "../../components/Common/Hero/Hero.jsx";
import Form from "../../components/Form/Form.jsx";
import GalleryImagesContainer from "../../components/Galleries/GalleryImagesContainer.jsx";
import InProgressImagesContainer from "../../components/Galleries/InProgressImagesContainer.jsx";
import HeroSubContent from "../../components/Hero/HeroSubContent.jsx";
import TextContentLinks from "../../components/SocialMedia/TextContentLinks.jsx";
import { useGallery } from "../../components/hook/useGalleryData.jsx";
import "./Gallery.scss";

const Gallery = () => {
  const refContainer = useRef(null);
  const [active, setActive] = useState("gallery");
  const [items, setItems] = useState("gallery");
  const { data, error, loading } = useGallery();

  const galleryData = data.filter((item) => item.category === "gallery");
  const projectData = data.filter((item) => item.category === "project");

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading data</p>;
  }

  return (
    <Transition>
      <motion.section ref={refContainer} className="galerie-container">
        <Hero title="Gallery" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content-gallery">
            <div className="content-right">
              <TextContentLinks
                text="
                My gallery features original works as well as the projects I am currently working on. Come follow the progress of my projects on"
              />
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p>Size larger than 2 meters</p>
            </div>
          </div>
        </HeroSubContent>
        <Filter
          active={active}
          setActive={setActive}
          setItems={setItems}
          galleryData={galleryData} // Passez les données ici
          projectData={projectData} // Passez les données ici
        />

        {active === "gallery" && items.length > 0 ? (
          <GalleryImagesContainer item={galleryData} isCursorPointer={true} />
        ) : (
          <InProgressImagesContainer
            item={projectData}
            isCursorPointer={true}
          />
        )}
      </motion.section>
      <footer>
        <Circle target={"galerie-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default Gallery;
