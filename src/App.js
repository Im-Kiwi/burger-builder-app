
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid, ThemeProvider, useMediaQuery } from '@mui/material'

// ---------- importing from other files ----------------
import './App.css';
import Layout from './Containers/Layout/Layout';
import { mainColors } from './theme/mui-theme'



function App() {

  const break_899 = useMediaQuery('(max-width : 899px)')
  console.log(process.env)
  return (
    <Router>
      <div className="App">
        {!break_899 &&
          <Grid container position = 'fixed' sx = {{zIndex : -1, width : '100vw', height : '100vh' }}>
            <Grid xs = {6} item sx = {{backgroundColor : '#f9b826'}}></Grid>
            <Grid xs = {6} item sx = {{backgroundColor : '#110f12'}}></Grid>
          </Grid>      
        }
        <ThemeProvider theme = {mainColors}>
          <Layout />
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
