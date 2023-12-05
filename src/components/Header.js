import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFilter } from '../contexts/filterContext';

export const ShowOnLogin = ({ children }) => {
    const { user } = useAuth()
    if (user) {
        return children;
    }
    return null;
};

export const ShowOnLogout = ({ children }) => {
    const { user } = useAuth()
    if (!user) {
        return children;
    }
    return null;
};

export default function Header() {
    const { user, logOut } = useAuth()
    const navigate = useNavigate();
    const {searchTerm, FilterSearchTerm } = useFilter()
    console.log(user)
    console.log(searchTerm)

    const logoutUser = async () => {
        try {
            await logOut()
            toast.success("Logout successful.");
            console.log("Logout successful.")
            navigate("/login");
        } catch (error) {
            console.log(error.message)
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
                            onChange={(event)=>{FilterSearchTerm(event)}}
                        />
                        <Button variant="outline-success"><FaSearch/></Button>
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
                        <span>
                            <Nav.Link as={Link} to="/cart">
                                Cart
                                <FaShoppingCart size={20} />
                                <p>{ }</p>
                            </Nav.Link>
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
