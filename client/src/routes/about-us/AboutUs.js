import { useHistory } from 'react-router';
import ReactPlayer from 'react-player/file';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import './aboutUs.sass';
import pinsImage from './images/pins.png';

function AboutUs(props) {
    const history = useHistory();
    const MAP_ICONS = ['fa-map-signs', 'fa-map-pin', 'fa-map-marker-alt', 'fa-directions', 'fa-road', 'fa-location-arrow', 'fa-map-marked-alt', 'fa-globe-americas'];
    return (
        <div className='AboutUs'>
            <div className="landingSection py-5">
                <div className="container">
                    <h1 className='fw-light text-uppercase'>ABOUT</h1>
                    <CompanyLogo textOnly/>
                </div>
            </div>
            <div className="storySection py-5">
                <div className="container">
                    <p>
                        After leaving engineering and the corporate rat race in 2005, Kevin started his commercial real estate career focusing his efforts on the industrial market in Kansas City. As the young guy, eager to earn a few bucks as a broker during those initial months, Kevin was happy to accept the meager commissions from the tiniest of entrepreneurs. These small business owners needed 500-1000 square feet, for $500-1000 per month. However, mini storage did not work well and flex space was too expensive. These types of spaces did not exist in Kansas City, and it turns out, the nation. In an effort to stop filling the trash can full of good-leads gone cold, he built his first Contractor Garage&trade; in 2008 in the middle of a recession using private funds. He and his investors quickly learned his spaces were recession proof, filling up before construction was finished during a poor economy.
                    </p>
                    <p>
                        Since 2009, Contractor Garage is the genuine original brand for large bay storage in Kansas City specifically tailored for business owners. Today, we share the brand with others across the nation. You can benefit through instant branding and credibility with your lenders, municipalities, and investors. We are your feasibility study. Be confident you will step into a proven concept on day one without the steep learning curve. Visit <a href='/development-services' target='_blank'>Brand With Us</a> for more information.
                    </p>
                    <p>
                        Would you also like to leave the rat race and build passive income through commercial real estate investment?  Please see us at <a href='http://www.insightcommercial.net/construction.html' target='_blank' rel="noopener noreferrer">www.insightcommercial.net/construction</a> for personalized one-on-one consulting.
                    </p>
                </div>
            </div>
            <div className='videoSection container py-5'>
                <ReactPlayer
                    url='https://res.cloudinary.com/dz54puaeo/video/upload/v1697497123/GARAGEVIDEOS/WhatIsContractors.mp4'
                    controls
                    width='100%'
                    height='auto'
                    config={{
                        file: {
                            attributes: {
                                poster: 'https://res.cloudinary.com/dz54puaeo/image/upload/v1697497853/TCG/poster.jpg'
                            }
                        }
                    }}
                    fallback={
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="locationImageSection"></div>
            <div className="descriptionSection gunMetalBackground py-5">
                <div className="container text-center">
                    <CompanyLogo square dark/>
                    <p className='fw-bold'>
                        Contractor Garage&trade; offers large functional industrial space designed exclusively for entrepreneurs and hobbyists including but not limited to landscapers, plumbers, electricians, specialty vehicles, or about anyone needing space larger than mini storage but smaller and less expensive than traditional incubator industrial space.
                    </p>
                </div>
            </div>
            <div className="parallaxSection"></div>
            <div className='locationsSection themeBackground py-5 position-relative'>
                <div className="container">
                    <div className="row">
                        <div className="iconContainer position-absolute">
                            {MAP_ICONS.map((name, index) => <i key={index} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 29} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 49} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 69} className={`fas ${name}`}></i>)}
                        </div>
                        <div className="col text-center checkUsOutContainer">
                            <h2>Check Us Out</h2>
                            <p className='fst-italic'>We have many locations to serve your needs.</p>
                            <button type='button' className="btn btn-primary" onClick={() => history.push('/directory')}>See Locations</button>
                        </div>
                        <div className="pinsImageContainer position-absolute d-none d-lg-block">
                            <img src={pinsImage} alt="Locations" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;