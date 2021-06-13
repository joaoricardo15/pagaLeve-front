import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Amplify from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { createMuiTheme } from "@material-ui/core";
import { purple, orange } from '@material-ui/core/colors';
import { ThemeProvider } from "styled-components";
import awsconfig from './aws-exports';
import NavBar from "./components/NavBar";
import history from "./utils/history";
import Home from "./views/Home";
import Endpoints from "./views/Endpoints";
import Logs from "./views/Logs";
import "./App.css";

Amplify.configure(awsconfig);

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

  return authState === AuthState.SignedIn && user ? (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <div className="h-100 bg-light">
            <NavBar style={{ height: 120 }}/>
            <div style={{ height: 'calc(100% - 120px)', overflowY: 'scroll' }}> 
              <div className="container p-2 p-md-5" style={{ maxWidth: 800 }}>
                <Switch> 
                  <Route exact path="/" render={props => <Home {...props} title="Navigate elsewhere" />} />
                  <Route path="/bots" render={props => <Endpoints {...props} title="Navigate elsewhere" />} />
                  <Route path="/logs" render={props => <Logs {...props} title="Navigate elsewhere" />} />
                </Switch>
              </div>
            </div>
          </div>
        </Router> 
      </ThemeProvider>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          headerText="PagaLeve Customers"
          submitButtonText="Login"
          hideSignUp="true"
          formFields={[
            {
              type: "email",
              label: "E-mail",
              placeholder: "Type your e-mail",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Type your password",
              required: true,
            },
          ]}  
        />
      </AmplifyAuthenticator>
  );
}

export default App;
