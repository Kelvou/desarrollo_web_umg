import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio() {
    return (
        <div className='container text-center'>
            <br />
            <h1>Inicio</h1>
            <p>Se estará consumiendo 'PokeAPI'.</p>
            <a href="https://pokeapi.co/">https://pokeapi.co/.</a>
            <br /><br /><br /><br />
            <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' className="mx-auto d-block" alt="Logo de PokeAPI" />

            <p>The RESTful Pokémon API</p>
            <p>Serving over 330,000,000 API calls each month!</p>
            <br /><br />
            <p> All the Pokémon data you'll ever need in one place,
                easily accessible through a modern RESTful API.</p>

        </div>
    );
}

export default Inicio;
