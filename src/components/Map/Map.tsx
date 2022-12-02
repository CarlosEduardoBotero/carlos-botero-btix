import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IMap } from "./Map.interface";

const Map: React.FC<IMap> = ({ lat, lng }) => {
  return (
    <div data-testid="leaflet-map">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
