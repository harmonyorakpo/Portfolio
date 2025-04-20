import React from "react";
// import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About/>
      <Projects />
      <Skills />
      <Footer />
      <Contact />

      {/* <Outlet /> */}
    </>
  );
};

export default Home;
