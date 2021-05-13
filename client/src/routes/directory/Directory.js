import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { API } from '../../util/API';

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
        <div>
            Directory Works!
            <MapContainer
                center={[39.087692, -97.611850]}
                zoom={5}
                scrollWheelZoom={true}
                style={{height: '800px'}}
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
                                {location.name} <br /> <Link to={`/location/${location.slug}`}>View Location</Link>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
}

export default Directory;