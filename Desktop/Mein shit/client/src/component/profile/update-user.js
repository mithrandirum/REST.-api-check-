import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
// import {
//   createProfile,
//   updateProfile,
// } from "../../redux/actions/profileActions";
import { updateUser } from "../../redux/actions/authActions";
import { deleteProfile } from "../../redux/actions/profileActions";
import { setAlert } from "../../redux/actions/alertActions";
import { check } from "express-validator";

export const UpdateUser = ({ history }) => {
  const alertSate = useSelector((state) => state.alertReducer);
  // const authState = useSelector((state) => state.authReducer);
  // const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const state = {
    psuedo: "",
    email: "",
    password: "",
  };

  const [data, setFormData] = useState(state);

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const { psuedo, email, password } = data;

  const check = (psuedo, email, password) => {
    if (!psuedo || psuedo.length < 3) {
      dispatch(setAlert("psuedo must be at least 3 carachter long", "danger"));
    } else if (!email || !validateEmail(email)) {
      dispatch(setAlert("please a valid email", "danger"));
    } else if (!password || password.length < 6) {
      dispatch(
        setAlert("password must be at least 6 carachter long", "danger")
      );
    }
  };

  const profileId = useParams();

  const submitDelete = () => {
    window.confirm(
      "this actions cannot be undone are you sure you want to preceed?"
    );
    dispatch(deleteProfile(profileId.profileId, history));
    console.log(profileId);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    check(psuedo, email, password);

    dispatch(updateUser(data, history));
  };

  const compo = (
    <div className='west'>
      <h1 className='ml-4 mt-4'>Update Credentials</h1>
      <div className='form-width'>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>

      <Form className='form-width mt-4' onSubmit={(e) => onSubmit(e)}>
        <Form.Group>
          <Form.Group>
            <Form.Label>psuedo</Form.Label>
            <Form.Control
              type='text'
              placeholder='add psuedo...'
              value={psuedo}
              name='psuedo'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>email</Form.Label>
            <Form.Control
              type='text'
              placeholder='add an email...'
              value={email}
              name='email'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              placeholder='password...'
              value={password}
              name='password'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='mt-4'
            size='lg'
            block
          >
            Submit
          </Button>
        </Form.Group>
        <h2>
          <i className='fas fa-user-edit mt-2'> update Profile info{"    "}</i>
          {"  "}
          <Button
            onClick={() => history.push("/update-profile")}
            variant='outline-secondary'
          >
            Update
          </Button>
          {"   "}
        </h2>
        <h2 className='mt-4'>
          <i class='fas fa-user-slash'></i>delete user profile {"    "}
          {"  "}
          <Button onClick={() => submitDelete()} variant='outline-danger'>
            Delete
          </Button>
          {"   "}
        </h2>
      </Form>
    </div>
  );

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return compo;
};
