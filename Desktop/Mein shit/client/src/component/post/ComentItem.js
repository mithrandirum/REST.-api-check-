import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const ComentItem = ({ comment }) => {
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const postState = useSelector((state) => state.postReducer);

  console.log(comment);
  return (
    <div className='comment-item-Container mt-2'>
      <div className='coment-item-user-image'>
        <img
          src='https://di.phncdn.com/videos/202103/31/385935461/original/(m=eGNdHgaaaa)(mh=ZwytWxHAE7xCzspb)13.jpg'
          className='img-1'
        ></img>
      </div>
      <div className='uerpsuedo'>
        <p>{comment.userPsuedo}</p>
      </div>

      <div className='comment-item-text'>
        <h5>{comment.comment}</h5>
      </div>
    </div>
  );
};
// <i class='far fa-user'></i>
