import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Capabilities from "./pages/Capabilities";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

// Home Page
const MainPage = () => {
  return (
    <main className="main">
      <Home />
      <Portfolio />
      <About />
      <Contact />
    </main>
  );
};

// About Page
const AboutPage = () => {
  return (
    <main className="main">
      <About isFullPage={true} />
      <Capabilities />
      <Experience />
      <Contact />
    </main>
  );
};

// Portfolio Page
const PortfolioPage = () => {
  return (
    <main className="main">
      <Portfolio isFullPage={true} />
      <Contact />
    </main>
  );
};

// Contact Page - Full contact section
const ContactPage = () => {
  return (
    <main className="main">
      <Contact isFullPage={true} />
    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <ScrollUp />
    </Router>
  );
};

export default App;
