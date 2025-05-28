import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import type { SimpleContainer } from "../interfaces";
import iconPlastic from '../assets/contenedor.png';
import iconPaper from '../assets/tacho-de-reciclaje.png';
import iconGlass from '../assets/papelera-de-reciclaje.png';
import iconOrganic from '../assets/contenedor-de-basura.png';
import iconOther from '../assets/other.png';

function getContainerImage(type: string): string {
  switch (type) {
    case 'plastic':
      return iconPlastic;
    case 'paper':
      return iconPaper;
    case 'glass':
      return iconGlass;
    case 'organic':
      return iconOrganic;
    case 'other':
    default:
      return iconOther;
  }
}

type Props = {
  contenedor: SimpleContainer;
};

function getLinearColorFromPercentage(percent: number): string {
  percent = Math.max(0, Math.min(100, percent));

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
            <img
              src={getContainerImage(contenedor.type)}
              alt={contenedor.type}
              width={40}
              height={40}
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {contenedor.percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
}
