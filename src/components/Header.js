import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { cartSelector } from "../redux/reducers/cartReducer";
import { useDispatch, useSelector } from 'react-redux';
import {
    filterSearchTerm,
    filterSelector,
  } from '../redux/reducers/filterReducer'
import { authSelector, logOutAsync } from '../redux/reducers/authReducer';

export const ShowOnLogin = ({ children }) => {
    const { user } = useSelector(authSelector);
    if (user) {
        return children;
    }
    return null;
};

export const ShowOnLogout = ({ children }) => {
    const { user } = useSelector(authSelector);
    if (!user) {
        return children;
    }
    return null;
};

export default function Header() {
    const navigate = useNavigate();
    const {cartProducts} = useSelector(cartSelector)
    const dispatch = useDispatch()
    const {searchTerm} = useSelector(filterSelector)

    const logoutUser = async () => {
        try {
            await dispatch(logOutAsync())
            toast.success("Logout successful.");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }

    }
    return (
        <Navbar expand="md" data-bs-theme="dark" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="/logo.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                    />{' '}
                    Buy Busy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="d-flex ms-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search Products"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(event) => {dispatch(filterSearchTerm(event.target.value)) }}
                        />
                        <Button variant="outline-success"><FaSearch /></Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <ShowOnLogout>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </ShowOnLogout>
                        <ShowOnLogin>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                        </ShowOnLogin>
                        <span style={{ position: 'relative' }}>
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart size={20} />
                                {cartProducts.length > 0 &&
                                    <span
                                        style={{ position: 'absolute', top: "0", color: "red" }}>
                                        {cartProducts.length}
                                    </span>}
                            </Nav.Link>
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
