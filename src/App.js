import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SplashScreen from "./Screens/SplashScreen";
import ProductPage from './components/Product'; // Importa o componente ProductPage
import { ThemeProvider } from 'styled-components';
import Equipe from './Screens/SobreNos/Equipe';
import Missao from './Screens/SobreNos/Missao';
import Parceiros from './Screens/SobreNos/Parceiros';

const theme = {
  fontFamily: 'Montserrat, sans-serif', 
};

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <Router>
          <Header />
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productName/:subProductName?" element={<ProductPage />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/missao" element={<Missao />} />
              <Route path="/parceiros" element={<Parceiros />} />
            </Routes>
          </ThemeProvider>
        </Router>
      )}
    </div>
  );
}

export default App;
