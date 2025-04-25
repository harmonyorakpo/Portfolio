import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import ScrollUpButton from "../components/ScrollUpButton"; // Import the button

const Home = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="projects">
        <Projects />
      </div>
      
      <div id="skills">
        <Skills />
      </div>
      
      <div id="contact">
        <Contact />
      </div>

      <ScrollUpButton />
    </>
  );
};

export default Home;
