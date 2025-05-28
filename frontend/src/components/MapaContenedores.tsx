import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Container } from "../interfaces";

type Props = {
  contenedores: Container[];
};

const iconosContenedores = {
  plastico: new Icon({
    iconUrl: '../assets/contenedor.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  papel: new Icon({
    iconUrl: '../assets/tacho-de-reciclaje.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  vidrio: new Icon({
    iconUrl: '../assets/contenedor.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  }),
  other: new Icon({
    iconUrl: '../assets/contenedor.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
  })
};

export function MapaContenedores({ contenedores }: Props) {
  const [datosNivel, setDatosNivel] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/level')
      .then(res => res.json())
      .then((data: { id: string; porcentajeLlenado: number }[]) => {
        const niveles = Object.fromEntries(data.map(d => [d.id, d.porcentajeLlenado]));
        setDatosNivel(niveles);
      })
      .catch(err => console.error('Error fetching levels:', err));
  }, []);

  return (
    <MapContainer
      center={[40.389554746634346, -3.628289052542359]}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {contenedores.map(c => {
        const icon = iconosContenedores[c.type.toLowerCase() as keyof typeof iconosContenedores] ?? iconosContenedores.plastico;
        const porcentaje = datosNivel[c.id] ?? 0;

        return (
          <Marker key={c.id} position={[c.latitude, c.longitude]} icon={icon}>
            <Popup>
              <Typography variant="subtitle1" fontWeight="bold">
                {c.type}
              </Typography>
              <Typography variant="body2">
                {c.location}
              </Typography>
              <Typography variant="body2">
                {porcentaje}% lleno
              </Typography>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
