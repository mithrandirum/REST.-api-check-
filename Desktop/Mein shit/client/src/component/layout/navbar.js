import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

const NavbarNav = ({ history }) => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const questLink = (
    <Nav className='mr-auto'>
      <Nav.Link as={Link} to='/register'>
        Register
      </Nav.Link>
      <Nav.Link as={Link} to='/login'>
        Login
      </Nav.Link>
    </Nav>
  );

  const authLinks = (
    <Nav className='mr-auto'>
      <Nav.Link as={Link} to='/members'>
        Members
      </Nav.Link>
      <Nav.Link as={Link} to='/posts'>
        Posts
      </Nav.Link>
      <Nav.Link as={Link} to='/' onClick={() => dispatch(logout(history))}>
        Logout
      </Nav.Link>
    </Nav>
  );

  return (
    <div>
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand
          href='#home'
          className='justify-content-end'
          style={{ width: "80%" }}
        >
          relic_z_hub
        </Navbar.Brand>
        {authState.isAuthenticated ? authLinks : questLink}
      </Navbar>
    </div>
  );
};

export default NavbarNav;
