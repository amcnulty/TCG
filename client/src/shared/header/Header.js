import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import './header.sass';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return path === props.location.pathname ? 'active': '';
    }

    return (
        <div className='Header'>
            <div className="backgroundContainer row position-absolute">
                <div className="whiteSection col-12 col-md-7 col-lg-8"></div>
                <div className="darkSection d-none d-md-block col-md-5 col-lg-4 gunMetalBackground"></div>
            </div>
            <div className="container">
                <Navbar light expand="md" className='justify-content-between'>
                    <NavbarBrand className='p-0' tag={Link} to='/'>
                        <CompanyLogo/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={toggle} tag={Link} to="/" className={isActive('/')}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={toggle} tag={Link} to="/directory" className={isActive('/directory')}>Locations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={toggle} tag={Link} to="/development-services" className={isActive('/development-services')}>List With Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;