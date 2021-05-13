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
import { AddPost } from "./../post/AddPost";
import { getPosts, getUsertPosts } from "../../redux/actions/postActions";
import { Post } from "../post/post";

const Profile = ({ history }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const postState = useSelector((state) => state.postReducer);
  const arr = [1, 1, 1, 1, 1, 111, 1, 1];

  useEffect(async () => {
    await dispatch(getProfile());
    dispatch(getUsertPosts());
    dispatch(getPosts());
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
      <div className='alright'>
        <AddPost show={show} handleClose={handleClose} />
        <h2 style={{ fontWeight: "bold" }} className='welcome'>{`Welcome ${
          authState.user && !authState.loading && authState.user.psuedo
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
        <Button className='btn-success mt-4 ml-4' onClick={handleShow}>
          Add a Post
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
                        ? ""
                        : !profileState.loading &&
                          !authState.loading &&
                          authState.user &&
                          authState.user._id
                    }.jpg`
                  : ""
              }
            />
          </div>
          <div className='card-info'>
            <h2 className='mt-2'>
              {profileState.loading
                ? "user"
                : profileState.profile !== null &&
                  profileState.profile.user.psuedo}
            </h2>
            <br />
            <p>
              {profileState.loading
                ? null
                : profileState.profile !== null &&
                  profileState.profile.description}
            </p>
          </div>
          <div class='card-social-icons'>
            <a
              href={
                profileState.loading
                  ? null
                  : profileState.profile == !null &&
                    profileState.profile.social.instagram
              }
            >
              <i class='fab fa-instagram'></i>
            </a>
            <a
              href={
                profileState.loading
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.youtube
              }
            >
              <i class='fab fa-youtube'></i>
            </a>
            <a
              href={
                profileState.loading
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.facebook
              }
            >
              <i class='fab fa-facebook-square'></i>
            </a>
          </div>
          <Button
            onClick={() => history.push("/update-profile")}
            className='cadre'
            style={{ fontWeight: "bold" }}
          >
            Edit Profile{" "}
          </Button>
        </div>
      </div>
      <ul>
        {!postState.loading &&
        postState.userPosts !== null &&
        postState.userPosts.length > 0 ? (
          postState.userPosts.map((post) => <Post post={post} key={post._id} />)
        ) : (
          <h4>No profiles posts found...</h4>
        )}
      </ul>
    </>
  );

  const go = (
    <div className='a'>
      <Container>
        <h1>you dont have a profile yet </h1>
        <Button
          className='btn-success'
          onClick={() => history.push("/create-profile")}
        >
          create a profile
        </Button>
      </Container>
    </div>
  );

  return profileState.profile ? profileState.loading ? <Spinner /> : compo : go;
};

export default Profile;
