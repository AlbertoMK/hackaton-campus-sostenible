import React from 'react';
import {
  Container as MuiContainer,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import type { Container as ContainerType, ContainerHistory } from '../interfaces';

import { Button } from '@mui/material';

type Props = {
  contenedor: ContainerType;
  history?: ContainerHistory;
  onBack: () => void; // 👈 Nueva prop
};


function calcularFechaEstimada(history?: ContainerHistory): string | null {
  if (!history || history.history.length < 2) return null;

  const sorted = [...history.history].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const deltaPercent = last.levelPercent - first.levelPercent;
  const deltaTime = new Date(last.timestamp).getTime() - new Date(first.timestamp).getTime();

  if (deltaPercent <= 0 || deltaTime <= 0) return null;

  const remainingPercent = 100 - last.levelPercent;
  const ratePerMs = deltaPercent / deltaTime;
  const estimatedMsRemaining = remainingPercent / ratePerMs;
  const estimatedDate = new Date(new Date(last.timestamp).getTime() + estimatedMsRemaining);

  return estimatedDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function DetailContenedor({ contenedor, history, onBack }: Props) {
  const { id, type, center, location, capacity } = contenedor;

  const sparklineData =
    history?.history
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((level) => level.levelPercent) ?? [];

  const fechaEstimada = calcularFechaEstimada(history);

  return (
    <MuiContainer maxWidth="lg" sx={{ mt: 4 }}>
      {/* Botón de volver */}
      <Button variant="contained" color="primary" onClick={onBack} sx={{ mb: 3 }}>
        ← Volver
      </Button>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Información del contenedor */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Detalles del Contenedor
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            ID: {id}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Tipo: {type}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Centro: {center}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Ubicación: {location}
          </Typography>
          <Typography variant="subtitle1">
            Capacidad Máxima: {capacity} litros
          </Typography>
        </Paper>

        {/* Visualización del historial */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, flex: 2 }}>
          <Typography variant="h6" gutterBottom align="center">
            Histórico de llenado
          </Typography>

          <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
            {sparklineData.length > 0 ? (
              <Sparklines data={sparklineData} width={300} height={80} margin={5}>
                <SparklinesLine color="#1976d2" style={{ strokeWidth: 2, fill: "none" }} />
              </Sparklines>
            ) : (
              <Typography color="text.secondary">No hay datos históricos</Typography>
            )}
          </Box>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {fechaEstimada
              ? `Fecha estimada de llenado: ${fechaEstimada}`
              : 'No se puede estimar la fecha de llenado'}
          </Typography>

        </Paper>
      </Box>
    </MuiContainer>
  );
}

