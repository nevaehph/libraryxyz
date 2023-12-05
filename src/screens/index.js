import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Screens = (props) => {
  return (
    <>
      <Header />
      <div className="content">
        <div className="bg"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Screens;
