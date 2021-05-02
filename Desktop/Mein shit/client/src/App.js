import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./component/layout/landing";
import Navbar from "./component/layout/navbar";
import Container from "react-bootstrap/Container";
import Login from "./component/layout/auth/Login";
import Register from "./component/layout/auth/register";
import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./utils/setAuthToken";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Route component={Navbar} />
      <div className='image'>
        <Route exact path='/' component={Landing} />
      </div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>

      {/* <Container></Container> */}
    </Router>
  );
};
export default App;
