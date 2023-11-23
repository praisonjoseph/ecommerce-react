import { Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

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

export default function NavbarComponent() {
    const { user, logOut } = useAuth()
    const navigate = useNavigate();
    console.log(user)

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
        <Navbar expand="md" sticky="top" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="/logo.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                    />{' '}
                    Best Buy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
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
                                <p>{}</p>
                            </Nav.Link>
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
