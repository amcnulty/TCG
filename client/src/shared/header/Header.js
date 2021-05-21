import { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './header.sass';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return path === props.location.pathname ? 'active': '';
    }

    return (
        <div className='Header'>
            <div className="container">
                <Navbar light expand="md" className='justify-content-between'>
                    <NavbarBrand href="/">CG Contractors Garage</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/" className={isActive('/')}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/directory" className={isActive('/directory')}>Locations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/development-services" className={isActive('/development-services')}>List With Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;