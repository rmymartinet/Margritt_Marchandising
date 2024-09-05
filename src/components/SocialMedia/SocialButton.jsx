import gsap from "gsap";
import React, { useRef } from "react";
import "./SocialButton.scss";

export const InstagramButton = () => {
  const hoverInstaRef = useRef(null);
  const TitleInstaRef = useRef(null);

  const handleEnterHoverInsta = () => {
    gsap.to(hoverInstaRef.current, {
      duration: 0.7,
      height: "100%",
      ease: "power3.inOut",
    });

    gsap.to(TitleInstaRef.current, {
      duration: 0.7,
      color: "#fff",
      ease: "power3.inOut",
    });

    const instaButtons = gsap.utils.toArray(".social-link");
    instaButtons.forEach((item) => {
      let span = item.querySelector("span");
      let tl = gsap.timeline({ paused: true });
      tl.to(span, {
        duration: 0.2,
        yPercent: -150,
        ease: "power3.inOut",
      });
      tl.set(span, { yPercent: 150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });
      item.addEventListener("mouseenter", () => tl.play(0));
    });
  };

  const handleLeaveHoverInsta = () => {
    gsap.to(hoverInstaRef.current, {
      duration: 0.7,
      height: "0%",
      ease: "power3.inOut",
    });
    gsap.to(TitleInstaRef.current, {
      duration: 0.7,
      color: "#000",
      ease: "power3.inOut",
    });

    const instaButtons = gsap.utils.toArray(".social-link");
    instaButtons.forEach((item) => {
      let span = item.querySelector("span");
      let tl = gsap.timeline({ paused: true });
      tl.to(span, {
        duration: 0.2,
        yPercent: 150,
        ease: "power3.inOut",
      });
      tl.set(span, { yPercent: -150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });
      item.addEventListener("mouseleave", () => tl.play(0));
    });
  };
  return (
    <a
      className="social-link"
      onMouseEnter={() => handleEnterHoverInsta()}
      onMouseLeave={() => handleLeaveHoverInsta()}
      href="https://www.instagram.com/maargriitt/"
    >
      <span ref={TitleInstaRef}>Instagram</span>
      <div ref={hoverInstaRef} className="hover-background"></div>
    </a>
  );
};

export const TiktokButton = () => {
  const hoverTiktokRef = useRef(null);
  const TitleTiktokRef = useRef(null);

  const handleEnterHoverTiktok = () => {
    gsap.to(hoverTiktokRef.current, {
      duration: 0.7,
      height: "100%",
      ease: "power3.inOut",
    });

    gsap.to(TitleTiktokRef.current, {
      duration: 0.7,
      color: "#fff",
      ease: "power3.inOut",
    });

    const tiktokButtons = gsap.utils.toArray(".social-link");
    tiktokButtons.forEach((item) => {
      let span = item.querySelector("span");
      let tl = gsap.timeline({ paused: true });
      tl.to(span, {
        duration: 0.2,
        yPercent: -150,
        ease: "power3.inOut",
      });
      tl.set(span, { yPercent: 150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });
      item.addEventListener("mouseenter", () => tl.play(0));
    });
  };

  const handleLeaveHoverTiktok = () => {
    gsap.to(hoverTiktokRef.current, {
      duration: 0.7,
      height: "0%",
      ease: "power3.inOut",
    });
    gsap.to(TitleTiktokRef.current, {
      duration: 0.7,
      color: "#000",
      ease: "power3.inOut",
    });

    const tiktokButtons = gsap.utils.toArray(".social-link");
    tiktokButtons.forEach((item) => {
      let span = item.querySelector("span");
      let tl = gsap.timeline({ paused: true });
      tl.to(span, {
        duration: 0.2,
        yPercent: 150,
        ease: "power3.inOut",
      });
      tl.set(span, { yPercent: -150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });
      item.addEventListener("mouseleave", () => tl.play(0));
    });
  };
  return (
    <a
      className="social-link"
      onMouseEnter={() => handleEnterHoverTiktok()}
      onMouseLeave={() => handleLeaveHoverTiktok()}
      href="https://www.tiktok.com/@margriitt"
    >
      <span ref={TitleTiktokRef}>TikTok</span>
      <div ref={hoverTiktokRef} className="hover-background"></div>
    </a>
  );
};
