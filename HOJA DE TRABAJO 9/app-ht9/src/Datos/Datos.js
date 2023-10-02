import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Datos.css';

function Datos(props) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <Link to={`/pokemon/detalle/${props.id}`} className="card-link"> {}
        <div className="card">
          <img src={props.image} className="card-img-top mx-auto img-fluid" alt={props.name} />
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h5 className="card-title">{props.gen}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Datos;
