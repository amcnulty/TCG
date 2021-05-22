import { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import './home.sass';
import pinsImage from './images/pins.png';
import img1 from './images/169hwyOlathe.jpeg';
import img2 from './images/overlandParkMain.jpeg';
import img3 from './images/rearloading.jpeg';

function Home(props) {
    const [currentIndex, setCurrentIndex] = useState(2);
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
            />
            <div className="container aboutSection py-5">
                <div className="row py-5">
                    <div className="col-md-6 d-flex justify-content-around order-1 order-md-0">
                        <div className="textSection">
                            <i className="fas fa-city homepageIcon"></i>
                            <h5 className='small pt-4'>INDUSTRIAL STORAGE SPACE</h5>
                            <h2><span className='themeText'>Access</span> Premium Storage Suitable For Commercial Use</h2>
                            <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum libero odit amet repellendus dignissimos voluptate, necessitatibus numquam reprehenderit! Eligendi consequuntur ad blanditiis vero et reprehenderit nihil maiores sed, facilis dignissimos?</p>
                            <ul className='list-unstyled'>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Lorem, ipsum.</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Lorem, ipsum dolor.</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Ipsum dolor sit.</span>
                                </li>
                                <li className='pb-2 d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Esit amet consectetur.</span>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i className="fas fa-check checkIcon"></i>
                                    <span className='ps-3'>Consectetur adipisicing.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 order-0 order-md-1">123123</div>
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
                            <button type='button' className="btn btn-primary">See Locations</button>
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

export default Home;