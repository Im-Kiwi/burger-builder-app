
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid, ThemeProvider } from '@mui/material'

// ---------- importing from other files ----------------
import './App.css';
import Layout from './Containers/Layout/Layout';
import { mainColors } from './theme/mui-theme'



function App() {
  return (
    <Router>
      <div className="App">
        <Grid container position = 'fixed' sx = {{zIndex : -1, width : '100vw', height : '100vh' }}>
          <Grid xs = {6} item sx = {{backgroundColor : '#f9b826'}}></Grid>
          <Grid xs = {6} item sx = {{backgroundColor : '#110f12'}}></Grid>
        </Grid>
        <ThemeProvider theme = {mainColors}>
          <Layout />
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
