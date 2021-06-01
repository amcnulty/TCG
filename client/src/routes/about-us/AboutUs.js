import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import HighlightBox from '../../components/highlightBox/HighlightBox';
import './aboutUs.sass';
import testimg from '../../components/companyLogo/squareDarkTransparent.svg';
import locationsImage from './images/locationsImage.png';
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
            <div className="highlightSection themeBackground py-5">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                thumbnail={locationsImage}
                                label='Multiple Locations'
                            />
                        </div>
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                iconName='fas fa-temperature-low'
                                label='Insulated Units'
                            />
                        </div>
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                iconName='fas fa-plug'
                                label='Electric service'
                            />
                        </div>
                    </div>
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
            <div className="highlightSection themeBackground py-5">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                thumbnail={testimg}
                                iconName='fas fa-arrows-alt-h'
                                label='Large drive-in doors'
                            />
                        </div>
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                iconName='fas fa-parking'
                                label='Huge parking lots'
                            />
                        </div>
                        <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
                            <HighlightBox
                                iconName='fas fa-business-time'
                                label='Tailored For Business'
                            />
                        </div>
                    </div>
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