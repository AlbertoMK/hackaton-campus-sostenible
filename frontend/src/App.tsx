import './App.css';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { MapaContenedores } from './components/MapaContenedores';
import ContainerCard from './components/Contenedor';
import type { Container, SimpleContainer } from './interfaces';
import { getContainers } from './api';

function App() {
  const [contenedores, setContenedores] = useState<Container[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContainers();
        setContenedores(data);
      } catch (err) {
        console.error('Error cargando contenedores:', err);
      }
    };

    fetchData();
  }, []);

  const contenedoresPorTipo: Record<string, SimpleContainer[]> = {};
  contenedores.forEach(c => {
    const tipo = c.type.toLowerCase();
    if (!contenedoresPorTipo[tipo]) contenedoresPorTipo[tipo] = [];
    contenedoresPorTipo[tipo].push(c);
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mapa de Contenedores
      </Typography>
      
      <MapaContenedores contenedores={contenedores} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Lista de Contenedores
      </Typography>

      {Object.entries(contenedoresPorTipo).map(([tipo, items]) => (
        <Box key={tipo} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
            {tipo}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {items.map(c => (
              <ContainerCard key={c.id} contenedor={{ id: c.id, type: c.type, capacity: c.capacity ?? 0 }} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default App;
