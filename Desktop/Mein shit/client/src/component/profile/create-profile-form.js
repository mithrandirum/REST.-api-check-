import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { createProfile, uploadImage } from "../../redux/actions/profileActions";
import { logout } from "../../redux/actions/authActions";

export const ProfileForm = ({ history }) => {
  const alertSate = useSelector((state) => state.alertReducer);
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const state = {
    description: "",
    facebook: "",
    instagram: "",
    youtube: "",
  };

  const [data, setFormData] = useState(state);
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };
  const { description, instagram, facebook, youtube } = data;

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createProfile(data, history));

    // console.log(file);

    //dispatch(uploadImage(file));
  };

  const compo = (
    <div className='west'>
      <h1 className='ml-4 mt-4'>create an account</h1>
      <div className='form-width'>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>

      <Form className='form-width' onSubmit={(e) => onSubmit(e)}>
        <Form.Group>
          <h2 className='mt-4 align'>Add social Links</h2>
          <Form.Group>
            <i className='fab fa-facebook-square'></i>
            <Form.Label>Facebook...</Form.Label>
            <Form.Control
              type='text'
              placeholder='add Facebook account url...'
              value={facebook}
              name='facebook'
              onChange={(e) => onChange(e)}
            />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>

          <Form.Group>
            <i className='fab fa-instagram'></i>
            <Form.Label>Instargram</Form.Label>
            <Form.Control
              type='text'
              placeholder='add Instagram account url...'
              value={instagram}
              name='instagram'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <i className='fab fa-youtube'></i>
            <Form.Label>Youtube</Form.Label>
            <Form.Control
              type='text'
              placeholder='add youtube account url...'
              value={youtube}
              name='youtube'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <h2 className='align'>add a discription</h2>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text style={{ fontSize: "large" }}>
                Add a description
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as='textarea'
              aria-label='With textarea'
              style={{ width: "40vh" }}
              onChange={(e) => onChange(e)}
              name='description'
              value={description}
            />
          </InputGroup>
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
      </Form>
    </div>
  );

  if (authState.isAuthenticated && profileState.profile == !null) {
    <Redirect to='/profile' />;
  }

  return <>{compo}</>;
};
