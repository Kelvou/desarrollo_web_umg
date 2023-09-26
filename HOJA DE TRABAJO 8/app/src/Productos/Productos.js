import 'bootstrap/dist/css/bootstrap.min.css';
import './Productos.css'

function Productos(props) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card">
        <img src={props.image} className="card-img-top mx-auto img-fluid" alt={props.name} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">GTQ. {props.price}</p>
          <button className="btn btn-primary btn-custom" onClick={props.onAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productos