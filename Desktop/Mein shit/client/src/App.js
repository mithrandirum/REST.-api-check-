import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./component/layout/landing";
import Navbar from "./component/layout/navbar";
import Login from "./component/layout/auth/Login";
import Register from "./component/layout/auth/register";
import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import { getProfile } from "./redux/actions/profileActions";
import { useDispatch } from "react-redux";
import { setToken } from "./utils/setAuthToken";
import Profile from "./component/profile/Profile";
import { PrivateRoute } from "./component/routing/privateRoute";
import { ProfileForm } from "./component/profile/create-profile-form";
//import { CreateAccount } from "./component/profile/create-account";
//import { EditProfile } from "./component/profile/edit-profile";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Route component={Navbar} />
      <div className='image'>
        <Route exact path='/' component={Landing} />
      </div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/create-profile' component={ProfileForm} />
        <PrivateRoute path='/profile' component={Profile} />

        {/* <PrivateRoute path='/edit-profile/:userId' component={EditProfile} /> */}
      </Switch>

      {/* <Container></Container> */}
    </Router>
  );
};
export default App;
