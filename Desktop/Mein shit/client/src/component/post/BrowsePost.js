import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { ComentItem } from "./ComentItem";
import { addPost } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { getPost } from "../../redux/actions/postActions";
import { addComment } from "../../redux/actions/postActions";

export const BrowsePost = ({ history }) => {
  useEffect(() => {
    dispatch(getPost(postId.postId));
  }, [getPost]);

  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");

  const postId = useParams();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, postId.postId, e));
    setComment(" ");
  };

  const text = "";
  const image = "";
  const likes = "";
  const comments = [1, 1, 1, 1, 1, 1, 1];

  const dispatch = useDispatch();

  const postState = useSelector((state) => state.postReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const authState = useSelector((state) => state.authReducer);

  const compo = (
    <>
      <Link
        style={{ marginTop: "50px", lineDecoration: "none" }}
        className='baaack'
        to='/profile'
      >
        back to Profile
      </Link>
      <div className='ccc'>
        <div className='container-post'>
          <img
            className='image-post'
            src={
              !postState.loading &&
              !authState.loading &&
              postState.post[0] !== null &&
              postState.post[0].image.length > 0 ? (
                process.env.PUBLIC_URL +
                `/postImage/${
                  !postState.loading &&
                  !authState.loading &&
                  postState.post[0].image &&
                  postState.post[0] !== null &&
                  postState.post[0].image.length > 0
                    ? postState.post[0].image
                    : "photo_609a83ed28a3ae2f9457954a.jpg"
                }`
              ) : (
                <p>no image</p>
              )
            }
          ></img>
          <div className='inner-section'>
            <h2 className='title'>
              {!postState.loading &&
                !authState.loading &&
                postState.post[0].text}
            </h2>

            <form classname='fuck'>
              <textarea
                className='input-post'
                placeholder='add comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
            <div className='near'>
              <Button onClick={(e) => onSubmit(e)}>add comment</Button>
            </div>

            <div className='like'>
              <i class='far fa-thumbs-up'>
                {" "}
                <bold>
                  {!postState.loading &&
                  !authState.loading &&
                  postState.post[0].likes.length === 0
                    ? null
                    : !postState.loading &&
                      !authState.loading &&
                      postState.post[0].likes.length}
                </bold>
              </i>

              <i class='far fa-thumbs-down'>
                {" "}
                <bold></bold>
              </i>
            </div>
            <p className='created'>created in 20/02/1992</p>
          </div>
        </div>
        <div className='comment-section'>
          <Button
            className='boston'
            onClick={() => setOpenComment(!openComment)}
          >
            discussions{"  "}
            <labal className='jesus'>
              {!postState.loading &&
                !authState.loading &&
                postState.post[0].comments.length}
            </labal>
          </Button>
          <ul>
            {openComment &&
            !postState.loading &&
            !authState.loading &&
            postState.post[0].comments.length > 0
              ? postState.post[0].comments.map((comment) => (
                  <li key={comment._id}>
                    <ComentItem comment={comment} key={comment._id} />
                  </li>
                ))
              : openComment && (
                  <h4 className='boston'>No comments...literally</h4>
                )}
          </ul>
        </div>
      </div>
    </>
  );

  //   return postState.post[0] === null || postState.post[0].length < 0 ? (
  //     <h1>no post found...</h1>
  //   ) : (
  //     compo
  //   );

  return compo;
};
