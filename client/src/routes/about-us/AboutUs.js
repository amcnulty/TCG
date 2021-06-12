import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import './aboutUs.sass';
import pinsImage from './images/pins.png';
import { useHistory } from 'react-router';

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
                        Contractors Garage was created after the advice from a cousin in development and inspiration from Robert Kiyosaki’s book, Rich Dad Poor Dad, to leave the corporate rat race, along with its comforts, to jump into a 100% sales commission career in commercial-industrial real estate brokerage.  Eager to make a few bucks during those initial months, Kevin was happy to accept the meager income from those least desirable leads from the tiniest of entrepreneurs trying to make that jump from their garage or mini storage to a place of their own.  They needed about 500 square feet for about $500 per month.  Problem is… those spaces did not exist in Kansas City.  Filling the trash can full of good leads gone cold, we decided to build our first Contractors Garage in 2009 in the middle of a recession using private funds.  We quickly learned our spaces were recession proof, filling up before construction finished and in a poor economy with not only tenants moving up, but also tenants downsizing in a time when office/flex space was no longer required for some.
                    </p>
                    <p>
                        Though many have since imitated our concept in Kansas City, Contractors Garage is the genuine original brand for small incubator spaces in KC specifically tailored for business owners.  Today, rather than fighting our competition, we chose to help by sharing the brand with others through our new listing service at <a href='/development-services' target='_blank'>ContractorsGarage.com</a>.  If you have a similar property that would benefit from a national brand, your own personalized web page, optional credit card payments, among other features and benefits, we are here to help.
                    </p>
                    <p>
                        Would you also like to leave the rat race and build passive income through commercial real estate investment?  Please see us at <a href='http://www.insightcommercial.net/construction.html'>www.insightcommercial.net/construction</a> for personalized one-on-one consulting.
                    </p>
                </div>
            </div>
            <div className="locationImageSection"></div>
            <div className="descriptionSection gunMetalBackground py-5">
                <div className="container text-center">
                    <CompanyLogo square dark/>
                    <p className='fw-bold'>
                        Contractors Garage offers large functional industrial space designed exclusively for entrepreneurs and hobbyists including but not limited to landscapers, plumbers, electricians, specialty vehicles, or about anyone needing space larger than mini storage but smaller and less expensive than traditional incubator industrial space.
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