import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { API } from '../../util/API';
import './directory.sass';
import { MapContext } from '../../context/Store';
import { UPDATE_MAP } from '../../context/ActionTypes';

function EventComponent(props) {
    const [state, dispatch] = useContext(MapContext);

    const map = useMapEvents({
        zoomend: (event) => {
            dispatch({type: UPDATE_MAP, payload: {zoom: map.getZoom(), center: [map.getCenter().lat, map.getCenter().lng]}});
        },
        moveend: (event) => {
            dispatch({type: UPDATE_MAP, payload: {zoom: map.getZoom(), center: [map.getCenter().lat, map.getCenter().lng]}});
        }
    });
    
    return null;
}

function Directory(props) {
    
    const [state, dispatch] = useContext(MapContext);
    const { zoom, center } = state;

    const [locations, setLocations] = useState([]);
    const history = useHistory();
    const MAP_ICONS = ['fa-map-signs', 'fa-map-pin', 'fa-map-marker-alt', 'fa-directions', 'fa-road', 'fa-location-arrow', 'fa-map-marked-alt', 'fa-globe-americas'];

    useEffect(() => {
        API.getAllLocations()
        .then(setLocations)
        .catch(Function.prototype);
    }, []);

    return (
        <div className='Directory'>
            <div className="landingSection pt-3">
                <div className="container">
                    <h1 className='fw-light text-uppercase'>LOCATIONS</h1>
                    <p>View our many locations. Interact with the map below and click on map markers to see more information about a specific location.</p>
                </div>
            </div>
            <div className="container pb-5">
                <MapContainer
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={true}
                >
                    <EventComponent/>
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
                    <MarkerClusterGroup>
                    {
                        locations.map(location => (
                            <Marker
                                key={location._id}
                                position={location.coordinates}
                                riseOnHover={true}
                            >
                                <Popup keepInView={true}>
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
                    </MarkerClusterGroup>
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
