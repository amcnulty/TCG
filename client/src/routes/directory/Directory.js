import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        console.log('getting all locations');
        API.getAllLocations()
        .then(setLocations)
        .catch(Function.prototype);
    }, []);

    return (
        <div className='Directory'>
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
                                    {location.thumbnailImageUrl && <img src={location.thumbnailImageUrl} alt={location.name}/>}
                                    <Link className='btn btn-outline-primary mt-3 text-nowrap' to={`/location/${location.slug}`}>View Location <i className="fas fa-arrow-right"></i></Link>
                                        
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </div>
    );
}

export default Directory;