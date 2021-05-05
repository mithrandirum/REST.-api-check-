import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
const Profile = ({ history }) => {
  const authState = useSelector((state) => state.authReducer);

  const go = () => {
    history.push("/create-profile");
  };

  const spinner = (
    <div className='center'>
      <Container>
        <Spinner animation='border' className='lg' />
      </Container>
    </div>
  );

  const com = (
    <>
      <div className='profile-container'>
        {authState.user && authState.user.profile ? (
          <>
            <h1 className='welcome'>{`Welcome ${authState.user.psuedo}`}</h1>
            <div className='card'>
              <div className='card-background'>
                <img
                  src='https://lh3.googleusercontent.com/-paS9Qm_3L9E/XGK6C0wkWbI/AAAAAAAAAyg/sqwN0ovgb4oD-8cmkNYhLY67SvWZSAnbQCLcBGAs/h120/askjd.jpg'
                  class='card-image'
                />
              </div>
              <div className='card-info'>
                <h1>Demi Lavato</h1>
                <br />
                <p>
                  Demi Lovato is a Grammy nominated and multi-platinum singer,
                  songwriter, actress.
                </p>
              </div>
              <div class='card-social-icons'>
                <i class='fab fa-instagram'></i>
                <i class='fab fa-youtube'></i>
                <i class='fab fa-facebook-square'></i>
              </div>
            </div>
          </>
        ) : (
          <Redirect to='/create-profile' />
        )}
      </div>
    </>
  );

  return authState.loading ? spinner : com;
};

export default Profile;
