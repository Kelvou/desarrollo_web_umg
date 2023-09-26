import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carrito from '../Carrito/Carrito';

function CarritoDiseño({ show, onClose, cart, total, onRemoveFromCart }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carrito items={cart} total={total} onRemoveFromCart={onRemoveFromCart} />
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-custom' variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button className='btn-custom' variant="primary" onClick={onClose}>
          Continuar compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CarritoDiseño;