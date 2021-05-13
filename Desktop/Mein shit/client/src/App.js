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
import { PrivateProfileRoute } from "./component/routing/privateProfileRoute";
//import { CreateAccount } from "./componen"/profile/create-account";
import { UpdateUser } from "./component/profile/update-user";
import { UpdateProfile } from "./component/profile/update-profile";
import Profiles from "./component/profiles.js/Profiles";
import { Post } from "./component/post/post";
import { ProfileForm } from "./component/profile/create-profile-form";
import { BrowsePost } from "./component/post/BrowsePost";

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
        <Route path='/profiles' component={Profiles} />
        <PrivateRoute path='/create-profile' component={ProfileForm} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/update-profile' component={UpdateProfile} />
        <PrivateRoute path='/post/:postId' component={BrowsePost} />

        <PrivateRoute path='/edit-profile/:profileId' component={UpdateUser} />
      </Switch>

      {/* <Container></Container> */}
    </Router>
  );
};
export default App;
