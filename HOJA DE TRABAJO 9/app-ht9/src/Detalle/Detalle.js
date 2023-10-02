import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Datos from '../Datos/Datos';

function corregirNombre(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Detalle() {
    const { pokemonId } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                };


                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, requestOptions);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json();


                setPokemonInfo(jsonData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pokemonId]); 

    if (!pokemonInfo) {
        return <div className='container'>Cargando datos...</div>;
    }

    return (
        <div className="container">
            <br />
            <h1>Detalles de {corregirNombre(pokemonInfo.name)}</h1>
            <br />
            <h3>Datos Generales</h3>
            <br />
            <ul>
                <li >
                    <strong>Experiencia base: </strong> {pokemonInfo.base_experience}
                </li>
                <li >
                    <strong>Altura: </strong> {pokemonInfo.height} {'dm'}
                </li>
                <li >
                    <strong>Peso: </strong> {pokemonInfo.weight} {'??'}
                </li>
            </ul>
            <br />
            <h3>Habilidades</h3>
            <br />
            <ul>
                {pokemonInfo.abilities.map((ability, index) => (
                    <li>
                        <strong>{corregirNombre(ability.ability.name)}</strong>
                    </li>
                ))}
            </ul>
            <br />
            <h3>Movimientos (limitado a 10)</h3>
            <br />
            <ul>
                {pokemonInfo.moves.slice(0, 10).map((moves, index) => (
                    <li>
                        <strong>{corregirNombre(moves.move.name)}</strong>
                    </li>
                ))}
            </ul>

            <br />
            <h3>Sprites</h3>
            <br />
            <div className="row">
                <Datos id={pokemonInfo.id} gen={'Generación 1'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemonId}.png`} />
                <Datos id={pokemonInfo.id} gen={'Generación 2'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemonId}.png`} />
                <Datos id={pokemonInfo.id} gen={'Generación 3'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${pokemonId}.png`} />
                <Datos id={pokemonInfo.id} gen={'Generación 4'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/${pokemonId}.png`} />
                <Datos id={pokemonInfo.id} gen={'Generación 5'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokemonId}.png`} />
                <Datos id={pokemonInfo.id} gen={'Generación 6'} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/${pokemonId}.png`} />
            </div>

        </div>
    );
}

export default Detalle;
