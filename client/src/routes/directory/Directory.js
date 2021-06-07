import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { API } from '../../util/API';
import './directory.sass';

function EventComponent(props) {
    const map = useMapEvents({
        zoom: (event) => {
            props.setZoom(map.getZoom());
        }
    })
    
    return null;
}

function Directory(props) {
    const [zoom, setZoom] = useState(5);
    const [locations, setLocations] = useState([]);
    const history = useHistory();
    const MAP_ICONS = ['fa-map-signs', 'fa-map-pin', 'fa-map-marker-alt', 'fa-directions', 'fa-road', 'fa-location-arrow', 'fa-map-marked-alt', 'fa-globe-americas'];

    useEffect(() => {
        console.log('getting all locations');
        API.getAllLocations()
        .then(setLocations)
        .catch(Function.prototype);
    }, []);

    return (
        <div className='Directory'>
            <div className="landingSection pt-5">
                <div className="container">
                    <h1 className='fw-light text-uppercase'>LOCATIONS</h1>
                    <p>View our many locations. Interact with the map below and click on map markers to see more information about a specific location.</p>
                </div>
            </div>
            <div className="container py-5">
                <MapContainer
                    center={[39.087692, -97.611850]}
                    zoom={5}
                    scrollWheelZoom={true}
                >
                    <EventComponent setZoom={setZoom}/>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        opacity={zoom <= 7 ? 1 : 0}
                    />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        opacity={zoom > 7 ? 1 : 0}
                    />
                    {
                        locations.map(location => (
                            <Marker
                                key={location._id}
                                position={location.coordinates}
                                riseOnHover={true}
                            >
                                <Popup>
                                    <h6
                                        className='text-nowrap text-truncate'
                                        title={location.name}
                                    >{location.name}</h6>
                                    <address className='mb-0'>
                                        <p
                                            className='text-nowrap text-truncate m-0'
                                            title={location.addressFirstLine}
                                            >
                                            {location.addressFirstLine}
                                        </p>
                                        <p
                                            className='text-nowrap text-truncate m-0'
                                            title={location.addressFirstLine}
                                        >
                                            {location.addressSecondLine}
                                        </p>
                                    </address>
                                    <p>
                                        {location.shortDescription}
                                    </p>
                                    {location.thumbnailImage && <img src={location.thumbnailImage.src} alt={location.thumbnailImage.alt}/>}
                                    <Link className='btn btn-outline-primary mt-3 text-nowrap' to={`/location/${location.slug}`}>View Location <i className="fas fa-arrow-right"></i></Link>
                                        
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
            <div className='listingSection themeBackground py-5 position-relative'>
                <div className="container">
                    <div className="row">
                        <div className="iconContainer position-absolute">
                            {MAP_ICONS.map((name, index) => <i key={index} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 29} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 49} className={`fas ${name}`}></i>)}
                            {MAP_ICONS.map((name, index) => <i key={index + 69} className={`fas ${name}`}></i>)}
                        </div>
                        <div className="col text-center checkUsOutContainer">
                            <h2>Get On The Map</h2>
                            <p className='fst-italic'>List with us to get your location displayed on the map.</p>
                            <button type='button' className="btn btn-primary" onClick={() => history.push('/development-services')}>List With Us</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Directory;