import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Datos from '../Datos/Datos';
import AvisoLogin from '../AvisoLogin/AvisoLogin';
import SelectorCategorias from '../SelectorCategorias/SelectorCategorias';

function Productos() {
    const { state, rol, token } = useAuth();
    const [productosInfo, setProductosInfo] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://proyecto1-kelvin-and-lester.onrender.com/api/productos", requestOptions)
            .then(response => response.json())
            .then(data => {
                setProductosInfo(data);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, [rol, token]);

    const allCategories = [...new Set(productosInfo.flatMap((producto) => producto.categorias))];

    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            {
                state.isAuthenticated ? (
                    <div className="container">
                        <br />
                        <div>
                            <h3>Selecciona una categoría:</h3>
                            <SelectorCategorias
                                categories={[...allCategories]}
                                selectedCategory={selectedCategory}
                                onChange={handleSelectCategory}
                            />
                        </div>
                        <br />
                        <h1>Lista de Productos</h1>
                        <br />
                        <div className="row">
                            {productosInfo
                                .filter((producto) => {
                                    if (selectedCategory === 'Todos') {
                                        return true;
                                    }
                                    return producto.categorias.includes(selectedCategory);
                                })
                                .map((producto) => (
                                    <Datos key={producto.identificador} identificador={producto.identificador} nombre={producto.nombre} marca={producto.marca} imagen={producto.imagen} categorias={producto.categorias.slice(0, 3)} />
                                ))}
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                ) : (
                    <AvisoLogin />
                )}
        </>
    );
}

export default Productos;
