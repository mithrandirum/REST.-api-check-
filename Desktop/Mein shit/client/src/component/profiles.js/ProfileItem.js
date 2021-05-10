import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import placeholder from "./placeholder.jpg";

import Button from "react-bootstrap/Button";

const ProfileItem = ({
  profile: {
    description,
    social: { facebook, youtube, instagram },
    user: { psuedo },
    image,
  },
}) => {
  return (
    <div className='profile-item'>
      <div className='small'>
        <img
          className='image-item'
          src={image && process.env.PUBLIC_URL + `/image/${image}`}
        ></img>
        <h3 className='mt-2' style={{ textAlign: "center" }}>
          {psuedo}
        </h3>
        <p className='item-description'>{description}</p>
      </div>
      <div className='button-icon'>
        <div claaName='icons'>
          <a href={instagram}>
            <i class='fab fa-instagram'></i>
          </a>
          <a href={youtube}>
            <i class='fab fa-youtube'></i>
          </a>
          <a href={facebook}>
            <i class='fab fa-facebook-square'></i>
          </a>
        </div>
        <Button className='ml-3 mt-2'>show posts</Button>
      </div>
    </div>
  );
};

export default ProfileItem;
