import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Routers from "./Routers";
import { Fragment } from "react";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
