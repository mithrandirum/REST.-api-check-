import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { getProfile } from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
const Profile = ({ history }) => {
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [getProfile]);

  const spinner = (
    <div className='center'>
      <Container>
        <Spinner animation='border' className='lg' />
      </Container>
    </div>
  );

  const compo = (
    <>
      <h2 style={{ fontWeight: "bold" }} className='welcome'>{`Welcome ${
        authState.user && authState.user.psuedo
      }`}</h2>
      <Button
        className='dark mt-4 ml-4'
        onClick={() => history.push(`/edit-profile/${authState.user._id}`)}
      >
        Edit Account
      </Button>
      <Button className='btn-danger mt-4 ml-4'>Delete Account </Button>
      <div className='card'>
        <div className='card-background'>
          <img
            src='https://lh3.googleusercontent.com/-paS9Qm_3L9E/XGK6C0wkWbI/AAAAAAAAAyg/sqwN0ovgb4oD-8cmkNYhLY67SvWZSAnbQCLcBGAs/h120/askjd.jpg'
            class='card-image'
          />
        </div>
        <div className='card-info'>
          <h1>
            {profileState.loading ? null : profileState.profile.description}
          </h1>
          <br />
          <h1>
            {profileState.loading ? null : profileState.profile.description}
          </h1>
        </div>
        <div class='card-social-icons'>
          <a
            href={
              profileState.loading
                ? null
                : profileState.profile.social.instagram
            }
          >
            <i class='fab fa-instagram'></i>
          </a>
          <a
            href={
              profileState.loading ? null : profileState.profile.social.youtube
            }
          >
            <i class='fab fa-youtube'></i>
          </a>
          <a
            href={
              profileState.loading ? null : profileState.profile.social.facebook
            }
          >
            <i class='fab fa-facebook-square'></i>
          </a>
        </div>
      </div>
    </>
  );

  if (profileState.profile) {
    <Redirect to='/create-profile' />;
  }

  return <>{profileState.loading ? spinner : compo}</>;

  //profileState.loading ? spinner : compo;
};

export default Profile;
