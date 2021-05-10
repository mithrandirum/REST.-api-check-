import React, { useEffect, useState, useParams } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { getProfile } from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import img from "./image/photo_6097d510a6788705e8104749.jpg";
import { uploadImage } from "./../../redux/actions/profileActions";

const Profile = ({ history }) => {
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch(getProfile());
  }, [getProfile]);

  const dispatch = useDispatch();

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
        onClick={() =>
          history.push(`/edit-profile/${profileState.profile._id}`)
        }
        style={{ fontWeight: "bold" }}
      >
        Edit User Info
      </Button>

      <div className='card'>
        <div className='card-background'>
          <img
            className='card-background'
            src={
              profileState.profile && profileState.profile.image
                ? process.env.PUBLIC_URL +
                  `/image/photo_${
                    profileState.loading && authState.user === null
                      ? null
                      : authState.user._id
                  }.jpg`
                : null
            }
          />
        </div>
        <div className='card-info'>
          <h2 className='mt-2'>
            {profileState.loading ? null : profileState.profile.psuedo}
          </h2>
          <br />
          <h3>
            {profileState.loading ? null : profileState.profile.description}
          </h3>
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
        <Button
          onClick={() => history.push("/update-profile")}
          className='btn-dark mt-4 ml-4'
          style={{ fontWeight: "bold" }}
        >
          Edit Profile{" "}
        </Button>
      </div>
    </>
  );

  if (profileState.profile === null) {
    <Redirect to='/create-profile' />;
  }

  return <>{profileState.loading ? spinner : compo}</>;

  //profileState.loading ? spinner : compo;
};

export default Profile;
