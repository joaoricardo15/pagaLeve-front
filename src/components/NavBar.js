import React from "react";
import { NavLink } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";

const NavBar = () => {

  return (
    <AppBar className="bg-white" position="static">
      <Toolbar className="d-flex justify-content-between">
        <NavLink exact to="/" className="text-dark">
          <Logo />
        </NavLink>
        <AmplifySignOut buttonText="Sair" /> 
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
