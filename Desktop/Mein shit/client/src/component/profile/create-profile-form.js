import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";

export const ProfileForm = () => {
  return (
    <div className='west'>
      <Form className='form-width'>
        <h1 className='mt-4'>Add social Links</h1>
        <Form.Group>
          <i class='fab fa-facebook-square'></i>
          <Form.Label>Facebook...</Form.Label>
          <Form.Control type='text' placeholder='add Facebook account url...' />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group>
          <i class='fab fa-instagram'></i>
          <Form.Label>Instargram</Form.Label>
          <Form.Control
            type='text'
            placeholder='add Instagram account url...'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <i class='fab fa-youtube'></i>
          <Form.Label>Youtube</Form.Label>
          <Form.Control type='text' placeholder='add youtube account url...' />
        </Form.Group>
        <Button variant='primary' type='submit' className='mb-4'>
          Submit
        </Button>
        <h1>add an image & discription</h1>
        <Form.Group className='mt-4'>
          <Form.File id='exampleFormControlFile1' label='add an image' />
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
          />
        </InputGroup>
      </Form>
    </div>
  );
};
