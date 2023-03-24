import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export const Map = ({lat, lng}) => {
    return (
        <MapContainer center={[lat, lng]} zoom={6} scrollWheelZoom={false}>{/* cont here */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}