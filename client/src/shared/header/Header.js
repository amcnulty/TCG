import { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './header.sass';
import companyLogo from './images/companyLogo.jpg';

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
                    <NavbarBrand className='p-0' href="/">
                        <img src={companyLogo} alt="Contractors Garage" style={{height: '46px'}}/>
                    </NavbarBrand>
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