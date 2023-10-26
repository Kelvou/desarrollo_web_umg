import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import AvisoExitoso from '../AvisoExitoso/AvisoExitoso';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ProductoDetalle.scss';
import AvisoError from '../AvisoError/AvisoError';
import AvisoLogin from '../AvisoLogin/AvisoLogin';

function ProductoDetalle() {
    const { state, token } = useAuth();
    const { identificador } = useParams();
    const [productoInfo, setProductoInfo] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [avisoExitosoMensaje, setAvisoExitosoMensaje] = useState('');
    const [avisoErrorMensaje, setAvisoErrorMensaje] = useState('');
    const [showModalError, setShowModalError] = useState(false);

    const handleShowModal = (mensaje) => {
        setAvisoExitosoMensaje(mensaje);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModalError = (mensaje) => {
        setAvisoErrorMensaje(mensaje);
        setShowModalError(true);
    };

    const handleCloseModalError = () => {
        setShowModalError(false);
    };

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://proyecto1-kelvin-and-lester.onrender.com/api/producto/${identificador}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProductoInfo(data);
            })
            .catch(error => console.error('Error al obtener detalles del producto:', error));
    }, [identificador, token]);


    const añadirCarrito = async () => {
        if (cantidad > 0) {
            var myHeaders = new Headers();
            myHeaders.append("authorization", token);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "identificador": identificador,
                "cantidad": cantidad,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://proyecto1-kelvin-and-lester.onrender.com/api/carrito", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.mensaje) {
                        const nuevaCantidadDisponible = productoInfo.disponibilidad - cantidad;
                        setProductoInfo({
                            ...productoInfo,
                            disponibilidad: nuevaCantidadDisponible
                        });
                        const mensaje = data.mensaje;
                        setAvisoExitosoMensaje(mensaje);
                        handleShowModal(mensaje);
                    }
                    if (data.error) {
                        const mensaje = data.error;
                        setAvisoErrorMensaje(mensaje);
                        handleShowModalError(mensaje);
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            const mensaje = 'La cantidad no puede ser cero';
            setAvisoErrorMensaje(mensaje);
            handleShowModalError(mensaje);
        }
    };

    return (
        <>
            {
                state.isAuthenticated ? (
                    <div className="container">
                        <br />
                        <h1>Detalles del Producto</h1>
                        <div className="product-details-container">
                            {
                                productoInfo ? (
                                    <>
                                        <img src={productoInfo.imagen} alt={productoInfo.nombre} className="product-image" />
                                        <div className="product-text">
                                            <h2>{productoInfo.nombre}</h2>
                                            <br />
                                            <p><b>Marca:</b> {productoInfo.marca}</p>
                                            <p><b>Descripción:</b> {productoInfo.descripcion}</p>
                                            <p><b>Precio: </b>GTQ. {productoInfo.precioDescuento}
                                                {productoInfo.descuento > 0 && (
                                                    <Stack direction="horizontal" gap={2}>
                                                        <Badge pill bg="success">Ahorra: GTQ. {productoInfo.descuento}</Badge>
                                                    </Stack>
                                                )}
                                            </p>
                                            <p><b>En existencias:</b> {productoInfo.disponibilidad}</p>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="cantidad">
                                                    <Form.Label>Cantidad</Form.Label>
                                                    <div className="col-md-3">
                                                        <Form.Control
                                                            type="number"
                                                            name="cantidad"
                                                            placeholder="Cantidad"
                                                            value={cantidad}
                                                            min='1'
                                                            onChange={(e) => setCantidad(e.target.value)}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Form>
                                            <Button className='btn-custom' variant="primary" type="button" onClick={() => {
                                                añadirCarrito();
                                            }}>
                                                Añadir al carrito
                                            </Button>
                                            <AvisoExitoso show={showModal} handleClose={handleCloseModal} mensaje={avisoExitosoMensaje} />
                                            <AvisoError show={showModalError} handleClose={handleCloseModalError} mensaje={avisoErrorMensaje} />
                                        </div>
                                    </>
                                ) : (
                                    <p></p>
                                )
                            }
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                ) : (
                    <AvisoLogin />
                )
            }
        </>
    );

}

export default ProductoDetalle;
