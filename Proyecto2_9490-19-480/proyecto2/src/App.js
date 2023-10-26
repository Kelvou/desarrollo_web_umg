import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';
import Login from './Login/Login';
import Home from './Home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './App.scss';
import Perfil from './Perfil/Perfil';
import Productos from './Productos/Productos';
import ProductoDetalle from './ProductoDetalle/ProductoDetalle';
import ProductosAdmin from './ProductosAdmin/ProductosAdmin';
import ProductoDetalleAdmin from './ProductoDetalleAdmin/ProductoDetalleAdmin';
import ProductosNuevo from './ProductosNuevo/ProductosNuevo';
import Registro from './Registro/Registro';
import ComprasHistorial from './ComprasHistorial/ComprasHistorial';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/compras" element={<ComprasHistorial />} />
          <Route path="/productos/detalle/:identificador" element={<ProductoDetalle />} />
          <Route path="/admin/productos" element={<ProductosAdmin />} />
          <Route path="/admin/productos/detalle/:identificador" element={<ProductoDetalleAdmin />} />
          <Route path="/admin/productos/nuevo" element={<ProductosNuevo />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
};

export default App;