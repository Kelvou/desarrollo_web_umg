import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio/Inicio';
import Datos from './Pokemons/Pokemons';
import Info from './Info/Info';
import Detalle from './Detalle/Detalle';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/pokemon" element={<Datos />} />
          <Route path="/pokemon/detalle/:pokemonId" element={<Detalle />} />
          <Route path="/info" element={<Info />} />
        </Routes>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
