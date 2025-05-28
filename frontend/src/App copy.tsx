import './App.css'
/*
import { useEffect, useState } from "react";
import { fetchFilms } from "./api";
import FilmCard from "./components/FilmCard";
import type { FilmDTO } from "./interfaces";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";

export default function App() {
  const [films, setFilms] = useState<FilmDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        const data = await fetchFilms();
        setFilms(data);
      } catch (err) {
        setError((err as Error).message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

return (
  <Container>
    <Typography variant="h4" gutterBottom>
      Películas
    </Typography>

    {loading && <CircularProgress/>}
    {error && <Typography color="error">{error}</Typography>}

    {!loading && !error && (
      <Grid container spacing={2}>
        {films.map((film, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: "flex" , flexDirection: "column"}}>
            <FilmCard film={film} />
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);
}
*/