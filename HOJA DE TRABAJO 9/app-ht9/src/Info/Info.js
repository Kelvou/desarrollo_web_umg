import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Info() {
    return (
        <div className='container'>
        <br/>
          <div className='container text-center'>
            <br />
            <h1>Información</h1>
            <p>Esta página fue hecha para el curso de desarrollo web - UMG</p>
            <p>La página usa BrowserRouter</p>

            <a href="https://pokeapi.co/">https://pokeapi.co/.</a>
            <br /><br /><br /><br />
            <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' className="mx-auto d-block" alt="Logo de PokeAPI" />
        </div>
        </div>
      );
}

export default Info;