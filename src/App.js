import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { createMuiTheme } from "@material-ui/core";
import { purple, orange } from '@material-ui/core/colors';
import { ThemeProvider } from "styled-components";
import awsconfig from './aws-exports';
import NavBar from "./components/NavBar";
import InstallCard from "./components/InstallCard";
import history from "./utils/history";
import Home from "./views/Home";
import Customers from "./views/Customers";
import Endpoints from "./views/Endpoints";
import Logs from "./views/Logs";
import "./App.css";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

const App = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

  return (
    <div>
      <InstallCard />
      { authState === AuthState.SignedIn && user ?
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <div className="h-100 bg-light">
              <NavBar style={{ height: 120 }}/>
              <div style={{ height: '100vh', overflowY: 'scroll' }}> 
                <div className="container p-2 p-md-5" style={{ maxWidth: 800 }}>
                  <Switch> 
                    <Route exact path="/" render={props => <Home {...props} />} />
                    <Route path="/customers" render={props => <Customers {...props} />} />
                    <Route path="/endpoints" render={props => <Endpoints {...props} />} />
                    <Route path="/logs" render={props => <Logs {...props} />} />
                  </Switch>
                </div>
              </div>
            </div>
          </Router> 
        </ThemeProvider>
      : <AmplifyAuthenticator>
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          headerText="PagaLeve Customers"
          submitButtonText="Login"
          formFields={[
            {
              type: "username",
              label: "Username",
              placeholder: "Type your username",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Type your password",
              required: true,
            }
          ]}  
        />
        </AmplifyAuthenticator>
      }
    </div>);
}

export default App;
