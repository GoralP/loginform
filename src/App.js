import React from "react";
// import { Router } from "@reach/router";
import Home from "./view/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Dashboard } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
