import { Transition } from "../../components/Animations/PageTransition/Transition";
import Circle from "../../components/Common/Circle";
import Hero from "../../components/Common/Hero/Hero";
import Form from "../../components/Form/Form";
import Projects from "../Projects/Projects";
import "./Exhibition.scss";

const Exhibitions = () => {
  return (
    <Transition>
      <div className="exhibition-container">
        <Hero title={"Exhibitions"} />
        <Projects />
      </div>
      <footer>
        <Circle target={"exhibition-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default Exhibitions;
