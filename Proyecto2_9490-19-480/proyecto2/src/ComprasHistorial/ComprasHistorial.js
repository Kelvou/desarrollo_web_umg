import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatosCompras from '../DatosCompras/DatosCompras';
import AvisoLogin from '../AvisoLogin/AvisoLogin';
import SelectorCategorias from '../SelectorCategorias/SelectorCategorias';


function ComprasHistorial() {
    const { state, rol, token } = useAuth();
    const [productosInfo, setProductosInfo] = useState([]);
    const [productosInfo2, setProductosInfo2] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://proyecto1-kelvin-and-lester.onrender.com/api/compra", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.productos)) {
                    setProductosInfo(data.productos);
                    setProductosInfo2(data);
                } else {
                    console.error('El campo "productos" no es un arreglo en la respuesta:', data);
                }
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
                        <h1>Historial de compras</h1>
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
                                    <DatosCompras key={producto.identificador} identificador={producto.identificador} nombre={producto.nombre} marca={producto.marca} imagen={producto.imagen} cantidad={producto.cantidad} />
                                ))}

                        </div>
                        <h4>Total histórico de compras: GTQ. {productosInfo2.total} </h4>
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

export default ComprasHistorial;