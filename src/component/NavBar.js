import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Search from './SearchProduct';

function NavBar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <Navbar bg="secondary" variant="secondary">
                <Navbar.Brand href="/getProduct">E-Com</Navbar.Brand>
                <Nav className="me-auto navBar">
                    {auth ?
                        <>
                            <Link to="/getProduct">Product</Link>
                            {/* <Link to="/addProduct">Add Product</Link> */}
                            {/* <Link to="/updateProduct">Update Product</Link> */}
                            <Link onClick={logout} to='/login'>Log Out</Link>
                        </> :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    }
                </Nav>
                {auth ? <Search /> : <></>}
            </Navbar>
        </div>
    )
}

export default NavBar;