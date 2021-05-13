import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { ComentItem } from "./ComentItem";
import { addPost } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getPost } from "../../redux/actions/postActions";

export const Post = ({ post: { text, image, likes, comments, _id } }) => {
  const [openComment, setOpenComment] = useState(false);
  const yes = [1, 1, 1, 1, 1, 1, 1, 1];
  const dispatch = useDispatch();

  return (
    <>
      <div className='ccc'>
        <div className='container-post'>
          <img
            className='image-post'
            src={image && process.env.PUBLIC_URL + `/postImage/${image}`}
          ></img>
          <div className='inner-section'>
            <h2 className='title'>this the title</h2>
            <p>{text}</p>
            <Link
              className='link-button'
              to={`post/${_id}`}
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(getPost(_id))}
            >
              browse Post
            </Link>
          </div>

          <div className='like-comment'>
            <div className='comment'>
              <form onSumbit={() => console.log("yes")}>
                <textarea className='input-post' placeholder='add comment' />
                <Button className='mb-5 ml-2'>add comment</Button>
              </form>
            </div>
            <div className='like'>
              <i class='far fa-thumbs-up'>
                {" "}
                <bold>{likes.length === 0 ? null : likes.length}</bold>
              </i>

              <i class='far fa-thumbs-down'>
                {" "}
                <bold></bold>
              </i>
              <p>created in 20/02/1992</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setOpenComment(!openComment)}>discusion</Button>

        {/* <div className='comment-section'>
          { openComment &&  <ul>
            {yes.map((el, index) => (
              <li key={index}>
                <ComentItem el={el} />
              </li>
            ))}
          </ul> }
        </div> */}
      </div>
    </>
  );
};
