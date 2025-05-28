import './App.css'
import { Typography } from '@mui/material'
import Contenedor from './components/Contenedor'

function App() {
  

  return (
    <>
      <Typography variant='h4'>Esto es una prueba</Typography>
      <Contenedor contenedor={{ name:'Nombre 1', porcentaje:70 }}/>
    </>
  )
}

export default App
