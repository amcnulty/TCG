import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

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
                <Marker position={[39.087692, -94.611850]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Directory;