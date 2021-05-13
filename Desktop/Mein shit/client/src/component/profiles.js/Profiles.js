import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../redux/actions/profileActions";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";

const Profiles = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch, getProfiles]);

  const profileState = useSelector((state) => state.profileReducer);

  return (
    <Fragment>
      <Spinner />
      <Fragment>
        <h1 className='mt-4 ml-4'>Members</h1>
        <h2 className='mt-4 ml-4'>
          <i className='fas fa-monument'></i> Browse and connect with Members
        </h2>
        <div className='flex'>
          {!profileState.loading &&
          profileState.profiles !== null &&
          profileState.profiles.length > 0 ? (
            profileState.profiles.map((profile) => (
              <ProfileItem
                className='profile-item'
                profile={profile}
                key={profile._id}
              />
            ))
          ) : (
            <h4>No profiles found...</h4>
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Profiles;
