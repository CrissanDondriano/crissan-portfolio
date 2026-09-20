import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";

// Sections
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Portfolio />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
};

export default App;