import React, { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AvisoExitoso from '../AvisoExitoso/AvisoExitoso';
import AvisoError from '../AvisoError/AvisoError';
import { useNavigate } from 'react-router-dom';
import './ProductosNuevo.scss'; 
import AvisoLogin from '../AvisoLogin/AvisoLogin';

function ProductosNuevo() {
    const { state, token } = useAuth();
    const navigate = useNavigate();
    const [avisoExitosoMensaje, setAvisoExitosoMensaje] = useState('');
    const [avisoErrorMensaje, setAvisoErrorMensaje] = useState('');
    const [showModalExito, setShowModalExito] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

    const handleShowModalExito = (mensaje) => {
        setAvisoExitosoMensaje(mensaje);
        setShowModalExito(true);
        setTimeout(() => {
            navigate('/admin/productos');
        }, 2500);
    };

    const handleCloseModalExito = () => {
        setShowModalExito(false);
    };

    const handleShowModalError = (mensaje) => {
        setAvisoErrorMensaje(mensaje);
        setShowModalError(true);
    };

    const handleCloseModalError = () => {
        setShowModalError(false);
    };


    const [formData, setFormData] = useState({
        identificador: '',
        nombre: '',
        marca: '',
        disponibilidad: '',
        descuento: '',
        precio: '',
        imagen: '',
        descripcion: '',
        categorias: '',
        habilitado: '',
    });

    // Maneja los cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Actualiza el objeto formData con el nuevo valor
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    // Maneja el clic en el botón
    const crearProducto = () => {
        const contenidoCategorias = formData.categorias.toString();
        const categoriasArray = contenidoCategorias.split(',');
        const categoriasLimpio = categoriasArray.map(categoria => categoria.trim());

        const updatedFields = {};

        for (const key in formData) {
            const value = formData[key];

            updatedFields[key] = !isNaN(value) ? parseInt(value) : value;

        }

        if ("categorias" in formData) {
            updatedFields["categorias"] = categoriasLimpio;
        }

        var myHeaders = new Headers();
        myHeaders.append("authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(updatedFields);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://proyecto1-kelvin-and-lester.onrender.com/api/producto", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    const mensaje = data.error;
                    handleShowModalError();
                    setAvisoErrorMensaje(mensaje);
                    handleShowModalError(mensaje);
                }
                if (!formData.identificador) {
                    const mensaje = 'Todos los campos son requeridos';
                    handleShowModalError();
                    setAvisoErrorMensaje(mensaje);
                    handleShowModalError(mensaje);
                }
                if (data.mensaje) {
                    const mensaje = data.mensaje;
                    handleShowModalExito();
                    setAvisoExitosoMensaje(mensaje);
                    handleShowModalExito(mensaje);
                }
                
            })
            .catch(error => console.log('error', error));
    };


    return (
        <>
            {
                state.isAuthenticated ? (
                    <div className="container">
                        <br />
                        <h1>Ingresa los datos del producto</h1>
                        <div className="product-details-container">
                            <Form>
                                <div className="left-column">
                                    <Form.Group className="mb-3" controlId="identificador">
                                        <Form.Label>Identificador</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="identificador"
                                            placeholder="Identificador"
                                            value={formData.identificador}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="marca">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="marca"
                                            placeholder="Marca"
                                            value={formData.marca}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="disponibilidad">
                                        <Form.Label>Disponibilidad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="disponibilidad"
                                            placeholder="Disponibilidad"
                                            value={formData.disponibilidad}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="descuento">
                                        <Form.Label>Descuento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="descuento"
                                            placeholder="Descuento"
                                            value={formData.descuento}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="right-column">
                                    <Form.Group className="mb-3" controlId="precio">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="precio"
                                            placeholder="Precio"
                                            value={formData.precio}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="imagen">
                                        <Form.Label>Imagen (URL)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="imagen"
                                            placeholder="Imagen"
                                            value={formData.imagen}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="descripcion">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={8}
                                            name="descripcion"
                                            placeholder="Descripcion"
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="right-column2">
                                    <Form.Group className="mb-3" controlId="categorias">
                                        <Form.Label>Categorías (separar por comas)</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            name="categorias"
                                            placeholder="Categorías"
                                            value={formData.categorias}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="habilitado">
                                        <Form.Label>Habilitado (1 = Si // 0 = No)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="habilitado"
                                            placeholder="Habilitado"
                                            value={formData.habilitado}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <br />
                                <Button variant="primary" type="button" onClick={crearProducto}>
                                    Crear
                                </Button>
                            </Form>
                        </div >
                        <br />
                        <br />
                        <AvisoExitoso show={showModalExito} handleClose={handleCloseModalExito} mensaje={avisoExitosoMensaje} mensaje2={'Serás redireccionado...'} />
                        <AvisoError show={showModalError} handleClose={handleCloseModalError} mensaje={avisoErrorMensaje} />
                    </div >
                ) : (
                    <AvisoLogin />
                )}
        </>
    );

}

export default ProductosNuevo;
