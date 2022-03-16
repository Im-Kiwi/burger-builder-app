
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ---------- importing from other files ----------------
import Layout from './Containers/Layout/Layout';
import './App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
