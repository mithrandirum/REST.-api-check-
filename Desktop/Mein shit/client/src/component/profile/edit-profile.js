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
// import { updateUser } from "../../redux/actions/authActions";

export const EditProfile = ({ history, match }) => {
  const id = useParams();

  const alertSate = useSelector((state) => state.alertReducer);
  // const authState = useSelector((state) => state.authReducer);
  // const profileState = useSelector((state) => state.profileReducer);

  //const dispatch = useDispatch();
  const state = {
    description: "",
    facebook: "",
    instagram: "",
    youtube: "",
  };

  const [data, setFormData] = useState(state);
  const [edit, setEdit] = useState(false);
  const [psuedo, setPsuedo] = useState({ psuedo: "" });
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });
  // const [file, setFile] = useState("");

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const { description, instagram, facebook, youtube } = data;

  const userInfo = {
    psuedo,
    email,
    password,
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch(updateProfile(data));

    // dispatch(updateUser(userInfo, id.userId));

    //setTimeout(() => setEdit(!edit), 2000);
    // console.log(data);
    console.log(userInfo);
    console.log(id.userId);

    // dispatch(uploadImage(file));
  };

  const compo = (
    <div className='west'>
      <h1 className='ml-4 mt-4'>Edit your account</h1>
      <div className='form-width'>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>

      <Form className='form-width' onSubmit={(e) => onSubmit(e)}>
        <h2 className='mt-4 align'>Update Credentials</h2>
        <Form.Group>
          <Form.Label>psuedo...</Form.Label>
          <Form.Control
            type='text'
            placeholder='add psuedo...'
            name='psuedo'
            onChange={(e) => setPsuedo(e.target.value)}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group>
          <i className=''></i>
          <Form.Label>email...</Form.Label>
          <Form.Control
            type='emai'
            placeholder='change email...'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group>
          <i className=''></i>
          <Form.Label>password...</Form.Label>
          <Form.Control
            type='password'
            placeholder='change password...'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

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

          <h2 className='align'>add an image & discription</h2>
          <Form.Group className='mt-4'>
            <Form.File
              id='exampleFormControlFile1'
              label='add a Profile image'
              // value = {file}
              onChange={(e) => console.log(e.target.value)}
            />
          </Form.Group>
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

  return edit ? <Redirect to='/profile' /> : compo;
};
