import './App.css'
import { Typography } from '@mui/material'
import { Container } from './interfaces'
import Contenedor from './components/Contenedor'

function App() {
  

  return (
    <>
      <Typography variant='h4'>Esto es una prueba</Typography>

      <Contenedor contenedor={{ id: "CONT-048", capacity: 109 }}/>

      
    </>
  )
}

export default App
