// App.jsx
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  useUser,
} from "@clerk/clerk-react";
import { AnimatePresence } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Loading/Landing.jsx";
import NavBar from "./components/Nav/NavBar/NavBar.jsx";
import Shopping from "./components/ShoppingComponent/Shopping.jsx";
import About from "./pages/About/About.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Exhibitions from "./pages/Exhibitions/Exhibition.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";
import Home from "./pages/Home/Home.jsx";
import OriginauxGrands from "./pages/Originaux/OrginauxGrand.jsx";
import OriginauxDetails from "./pages/Originaux/OriginauxDetails/OriginauxDetails.jsx";
import OriginauxMoyens from "./pages/Originaux/OriginauxMoyen.jsx";
import PaymentCancel from "./pages/PaymentCancel/PaymentCancel.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import TiragesDetails from "./pages/Tirages/TiragesDetails/TiragesDetails.jsx";
import TiragesGrands from "./pages/Tirages/TiragesGrands.jsx";
import TiragesMoyens from "./pages/Tirages/TiragesMoyens.jsx";
import useCountStore from "./store/useCountStore.jsx";

function App() {
  const { t } = useTranslation();
  const [showLanding, setShowLanding] = useState(
    !localStorage.getItem("visited")
  );
  const [isVisited, setIsVisited] = useState(false);
  const location = useLocation();

  const isRender = useCountStore((state) => state.isRender);

  useEffect(() => {
    document.title = "Margritt.com";
  }, []);

  useEffect(() => {
    if (localStorage.getItem("visited")) {
      setIsVisited(true);
    }
  }, [isVisited]);

  const handleBeforeUnload = useCallback(() => {
    localStorage.removeItem("visited");
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const count = useCountStore((state) => state.count);
  const startCounting = useCountStore((state) => state.startCounting);

  useEffect(() => {
    startCounting();
  }, [startCounting]);

  const handleRender = useCallback(() => {
    if (count === 100) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem("visited")) {
          setShowLanding(true);
        }
        localStorage.setItem("visited", true);
        setShowLanding(false);
        document.body.style.cursor = "default";
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(handleRender, [handleRender]);

  useEffect(() => {
    if (count === 100) {
      setTimeout(() => {
        if (!localStorage.getItem("visited")) {
          setShowLanding(true);
        }
        localStorage.setItem("visited", true);
        setShowLanding(false);
        document.body.style.cursor = "default";
      }, 1600);
    }
  }, [isRender]);

  const scrollRef = useRef(null);
  const locomotiveScrollInstanceRef = useRef(null);

  useEffect(() => {
    locomotiveScrollInstanceRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      getDirection: true,
    });

    return () => {
      locomotiveScrollInstanceRef.current.destroy();
    };
  }, []);

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <>
      {showLanding && <Landing />}
      {!showLanding && (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <div ref={scrollRef}>
            <AnimatePresence initial={false} mode="wait">
              {location.pathname !== "/payment-success" &&
                location.pathname !== "/payment-cancel" && <NavBar />}
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  index
                  element={<Home isVisited={isVisited} data-scroll />}
                />
                <Route path="/gallery" element={<Gallery data-scroll />} />
                <Route
                  path={`/originals/large-formats`}
                  element={<OriginauxGrands data-scroll />}
                />
                <Route
                  path={`/originals/medium-formats`}
                  element={<OriginauxMoyens data-scroll />}
                />
                <Route
                  path="/originals/:size/:id"
                  element={<OriginauxDetails data-scroll />}
                />
                <Route
                  path={`/prints/large-formats`}
                  element={<TiragesGrands data-scroll />}
                />
                <Route
                  path={`/prints/medium-formats`}
                  element={<TiragesMoyens data-scroll />}
                />
                <Route
                  path="/prints/:size/:id"
                  element={<TiragesDetails data-scroll />}
                />
                <Route
                  path="/exhibitions"
                  element={<Exhibitions data-scroll />}
                />
                <Route path="/info" element={<About data-scroll />} />
                <Route
                  path={`/${t("nav.contact")}`}
                  element={<Contact data-scroll />}
                />
                <Route
                  path="/payment-success"
                  element={<PaymentSuccess data-scroll />}
                />
                <Route
                  path="/payment-cancel"
                  element={<PaymentCancel data-scroll />}
                />
                <Route path="/checkout" element={<Checkout data-scroll />} />
                <Route path="/sign-in" element={<RedirectToSignIn />} />
                <Route
                  path="/admin"
                  element={
                    <SignedIn>
                      <AdminComponent />
                    </SignedIn>
                  }
                />
              </Routes>
            </AnimatePresence>
            <Shopping locomotiveScroll={locomotiveScrollInstanceRef.current} />
          </div>
        </ClerkProvider>
      )}
    </>
  );
}

function AdminComponent() {
  const { user } = useUser();
  if (!user) return <div>Loading...</div>;
  if (user.publicMetadata?.role !== "admin") {
    return <div>Accès refusé. Vous n'êtes pas administrateur.</div>;
  }
  return <Admin />;
}

export default App;
