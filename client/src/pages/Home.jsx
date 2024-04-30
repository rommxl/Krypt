import React from "react";
import { Navbar, Footer } from "../components";
import { Fragment } from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <Fragment>
      <div className="min-h-screen">
          <Navbar />
          <Hero />
          <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
