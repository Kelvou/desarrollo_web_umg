import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Datos from '../Datos/Datos';

function corregirNombre(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function Pokemons() {
    const [pokemonInfo, setPokemonInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const limit = 50; // Establece la cantidad de Pokémon a obtener
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                };

                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, requestOptions);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json();

                const pokemons = await Promise.all(
                    jsonData.results.map(async (pokemon) => {
                        const pokemonResponse = await fetch(pokemon.url, requestOptions);
                        const pokemonData = await pokemonResponse.json();
                        return {
                            id: pokemonData.id,
                            name: corregirNombre(pokemonData.name),
                            image: pokemonData.sprites.front_default,
                        };
                    })
                );

                setPokemonInfo(pokemons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <br />
            <h1>Lista de Pokémon (Limitado a 50)</h1>
            <br />
            <div className="row">
                {pokemonInfo.map((pokemon) => (
                    <Datos id={pokemon.id} name={pokemon.name} image={pokemon.image} />
                ))}
            </div>
        </div>
    );
}

export default Pokemons;
