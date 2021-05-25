import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import './footer.sass';

const Footer = () => {
    return (
        <div className='Footer'>
            <div className="container py-5">
                <div className="row py-5">
                    <div className="col-12 text-center pb-5 col-md-4">
                        <CompanyLogo dark/>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <div className="col-6 col-lg-4">
                                <h6>Contractors Garage</h6>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-white-50" tag={Link} to='/'>Home</NavLink></li>
                                    <li><NavLink className="text-white-50" tag={Link} to='/about-us'>About</NavLink></li>
                                    <li><NavLink className="text-white-50" tag={Link} to='/directory'>Locations</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-4">
                                <h6>Company</h6>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-white-50" tag={Link} target='_blank' to={{pathname: 'http://www.insightcommercial.net/construction.html'}}>Development Consulting Services</NavLink></li>
                                    <li><NavLink className="text-white-50" tag={Link} to='/development-services'>List With Us</NavLink></li>
                                    <li><NavLink className="text-white-50" tag={Link} to='/privacy-policy'>Privacy Policy</NavLink></li>
                                    <li><NavLink className="text-white-50" tag={Link} to='/terms-of-service'>Terms of Service</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>Content copyright &copy;{new Date().getFullYear()} Contractors Garage is a tradmarked pending brand. All rights reserved.</div>
            </div>
        </div>
    );
};

export default Footer;