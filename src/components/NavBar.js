import React from "react";
import { NavLink } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";

const NavBar = () => {

  return (
    <AppBar className="bg-white" position="static">
      <Toolbar className="d-flex justify-content-between">
        <div>
          <NavLink exact to="/" className="text-dark">
            <Logo />
          </NavLink>
          <NavLink exact to="/customers" className="ml-3 text-primary">
            Customers
          </NavLink>
          <NavLink exact to="/endpoints" className="ml-3 text-primary">
            Logs
          </NavLink>
        </div>
        <AmplifySignOut buttonText="Logout" /> 
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
