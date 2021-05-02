import { Link } from "react-router-dom";

import React from "react";

const landing = () => (
  <>
    <header id='showcase'>
      <h1>Welcome To Relic's Hub</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis
        ipsum officia numquam expedita ullam.
      </p>
      <Link to='/register' className='button'>
        Sign Up
      </Link>
      <p style={{ marginTop: "2rem" }}>
        <small>already registered ?</small>
      </p>
      <Link to='/login' className='button'>
        Login
      </Link>
    </header>
    <section id='section-a'>
      <p>
        whoever stumbles to this place , where nothing of importance or even
        value is expected to be found in these grooves , this is a mere
        malicious effort to fish for recognition , this site is very simple and
        god he had me on my knees, partly from my computer and partly from my
        dull mind ; the idea in my opinion is not that bad , if taken much
        futher than this primordial conception
      </p>
      <p>
        <small>bless for all</small>
      </p>
    </section>
  </>
);

export default landing;
