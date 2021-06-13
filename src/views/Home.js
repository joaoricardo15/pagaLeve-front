import React, { Fragment } from "react";
import Customers from "../views/Customers";

const Home = (props) =>
  <Fragment>
    <Customers {...props} />
  </Fragment>;

export default Home;
