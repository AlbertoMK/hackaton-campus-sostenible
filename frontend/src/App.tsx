import './App.css';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { MapaContenedores } from './components/MapaContenedores';
import ContainerCard from './components/Contenedor';
import DetailContenedor from './components/DetailContenedor';
import type { Container, ContainerLevel, SimpleContainer, ContainerHistory } from './interfaces';
import { getContainers, getLevels, getHistory } from './api';

function App() {
  const [contenedores, setContenedores] = useState<Container[]>([]);
  const [percentages, setPercentages] = useState<ContainerLevel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<ContainerHistory | null>(null); // Cambiado aquí

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContainers();
        const levels = await getLevels();
        setContenedores(data);
        setPercentages(levels);
      } catch (err) {
        console.error('Error cargando contenedores:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const loadHistory = async () => {
      try {
        const data: ContainerHistory[] = await getHistory(selectedId);
        const found = data.find((h) => h.id === selectedId);
        setHistory(found ?? null);
      } catch (e) {
        setHistory(null);
      }
    };

    loadHistory();
  }, [selectedId]);

  const contenedoresPorTipo: Record<string, SimpleContainer[]> = {};
  contenedores.forEach(c => {
    const tipo = c.type.toLowerCase();
    if (!contenedoresPorTipo[tipo]) contenedoresPorTipo[tipo] = [];
    contenedoresPorTipo[tipo].push(c);
  });

  const selectedContainer = contenedores.find(c => c.id === selectedId);

  // Mostrar vista de detalles si hay uno seleccionado
    if (selectedContainer) {
      return (
        <DetailContenedor
          contenedor={selectedContainer}
          history={history ?? undefined}
          onBack={() => setSelectedId(null)} // 👈 Añadido
        />
      );
    }

  // Vista principal
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
              <div key={c.id} onClick={() => setSelectedId(c.id)} style={{ cursor: 'pointer' }}>
                <ContainerCard
                  contenedor={{
                    id: c.id,
                    type: c.type,
                    percentage: percentages.find(p => p.id === c.id)?.level ?? 0,
                  }}
                />
              </div>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default App;
