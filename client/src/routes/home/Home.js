import { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';
import { useHistory } from 'react-router-dom';
import 'react-gallery-carousel/dist/index.css';
import './home.sass';
import pinsImage from './images/pins.png';
import img1 from './images/location6.jpg';
import img2 from './images/overlandParkMain.jpeg';
import img3 from './images/169hwyOlathe.jpeg';
import collage from './images/collage.jpg';

function Home(props) {
    const [currentIndex, setCurrentIndex] = useState(2);
    const history = useHistory();
    const MAP_ICONS = ['fa-map-signs', 'fa-map-pin', 'fa-map-marker-alt', 'fa-directions', 'fa-road', 'fa-location-arrow', 'fa-map-marked-alt', 'fa-globe-americas'];
    useEffect(() => {
        setCurrentIndex(0);
    }, []);
    const images = [{
        src: img1
    }, {
        src: img2
    }, {
        src: img3
    }];
    return (
        <div className='Home'>
            <div className='position-relative'>
                <Carousel
                    className='Carousel'
                    images={images}
                    index={currentIndex}
                    isAutoPlaying={true}
                    hasMediaButton={false}
                    hasSizeButton={false}
                    hasIndexBoard={false}
                    hasThumbnails={false}
                    hasDotButtons={'bottom'}
                    shouldSwipeOnMouse={false}
                    hasTransition={false}
                    onIndexChange={({curIndex}) => setCurrentIndex(curIndex)}
                />
                <CarouselOverlay index={currentIndex}/>
            </div>
            <div className="container aboutSection py-md-5">
                <div className="row py-md-5">
                    <div className="col-md-6 d-flex justify-content-around order-1 order-md-0 pb-5 pb-md-0">
                        <div className="textSection">
                            <i className="fas fa-city homepageIcon"></i>
                            <h5 className='small pt-4'>INDUSTRIAL STORAGE SPACE</h5>
                            <h2><span className='themeText'>Access</span> Premium Storage Suitable For Commercial Use</h2>
                            <p className='fst-italic'>Contractors Garage offers large industrial storage space specifically designed for anyone needing space larger and more functional/usable than mini storage, but simpler and less expensive per month than traditional incubator industrial flex space. Users including:</p>
                            <ul className='list-unstyled'>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Entrepreneurs of all types</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Construction Tradesman: Plumbers, Electricians, HVAC Contractors</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Landscapers, Arborists, Hardscaping, Mud Jacking</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Mobile Trucks:  Food, Dog Grooming, Veterinary, Tool</span>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Hobbyists, Car Collectors</span>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>General Contractors</span>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>E-Commerce Resellers</span>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Recreational Vehicles</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 order-0 order-md-1 py-5 py-md-0">
                        <img className='collageImage' src={collage} alt="Designed For Business" />
                    </div>
                </div>
            </div>
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

const CarouselOverlay = (props) => {
    const history = useHistory();
    return (
        <div className="CarouselOverlay position-absolute d-none d-md-block p-3">
            <div className="container-fluid">
                <div className="row text-center justify-content-center">
                    {props.index === 0 && <h4>DESIGNED WITH BUSINESSES IN MIND</h4>}
                    {props.index === 1 && <h4>MULTIPLE CONVENIENT LOCATIONS</h4>}
                    {props.index === 2 && <h4>BRAND YOUR CONTRACTORS GARAGE WITH US</h4>}
                    <span className='divider mt-3'></span>
                </div>
                <div className="row">
                    <div className="col text-center">
                        {props.index === 0 && <button className="btn btn-primary mt-3" onClick={() => history.push('/about-us')}>Learn More</button>}
                        {props.index === 1 && <button className="btn btn-primary mt-3" onClick={() => history.push('/directory')}>See Locations</button>}
                        {props.index === 2 && <button className="btn btn-primary mt-3" onClick={() => history.push('/development-services')}>Brand With Us</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;