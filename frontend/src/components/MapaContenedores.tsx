import { Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Container } from "../interfaces";
import iconPlastic from '../assets/contenedor.png';
import iconPaper from '../assets/tacho-de-reciclaje.png';
import iconGlass from '../assets/papelera-de-reciclaje.png';
import iconOther from '../assets/other.png';
import iconOrganic from '../assets/contenedor-de-basura.png';
import { useEffect } from 'react';

type Props = {
  contenedores: Container[];
};

function MapFix() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map]);

  return null;
}

const iconosContenedores = {
  plastic: new Icon({
    iconUrl: iconPlastic,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  papel: new Icon({
    iconUrl: iconPaper,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  vidrio: new Icon({
    iconUrl: iconGlass,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  other: new Icon({
    iconUrl: iconOther,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  organic: new Icon({
    iconUrl: iconOrganic,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
};

export function MapaContenedores({ contenedores }: Props) {
  return (
    <MapContainer
      center={[40.389554746634346, -3.628289052542359]}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <MapFix />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {contenedores.map(c => {
        const icon = iconosContenedores[
          c.type.toLowerCase() as keyof typeof iconosContenedores
        ] ?? iconosContenedores.other;

        return (
          <Marker key={c.id} position={[c.latitude, c.longitude]} icon={icon}>
            <Popup>
              <Typography variant="subtitle1" fontWeight="bold">
                {c.type}
              </Typography>
              <Typography variant="body2">
                {c.location}
              </Typography>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
