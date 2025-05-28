import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import type { SimpleContainer } from "../interfaces";

type Props = {
  contenedor: SimpleContainer;
};

function getLinearColorFromPercentage(percent: number): string {
  percent = Math.max(0, Math.min(100, percent)); // Clamp between 0 and 100

  // Invertimos el porcentaje para que 0 sea rojo y 100 verde
  const inverted = 100 - percent;

  let r: number, g: number, b: number;

  if (inverted <= 50) {
    const ratio = inverted / 50;
    r = 244 + (255 - 244) * ratio;
    g = 67 + (235 - 67) * ratio;
    b = 54 + (59 - 54) * ratio;
  } else {
    const ratio = (inverted - 50) / 50;
    r = 255 + (76 - 255) * ratio;
    g = 235 + (175 - 235) * ratio;
    b = 59 + (80 - 59) * ratio;
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export default function ContainerCard({ contenedor }: Props) {
  const color = getLinearColorFromPercentage(contenedor.percentage);

  return (
    <Card
      sx={{
        width: 200,
        height: 200,
        borderRadius: 4,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          {contenedor.id}
        </Typography>

        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={contenedor.percentage}
            size={100}
            thickness={5}
            sx={{ color }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="src/assets/contenedor.png" alt="Contenedor" width={40} height={40} />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {contenedor.percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
}
