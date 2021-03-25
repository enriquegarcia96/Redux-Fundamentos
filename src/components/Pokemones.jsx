import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion } from '../redux/pokeDucks';


const Pokemones = () => {

    //--- Dispara la accion ---//
    const dispatch = useDispatch()

    //--- Devuelve el state ---//
    const pokemones = useSelector(store => store.pokemones.array);
    console.log(pokemones);

    return (
        <div>
            Lista de pokemones
            <button onClick={ () => dispatch(obtenerPokemonesAccion()) }>Get pokemones</button>
            <ul>
                {
                    pokemones.map( item => (
                        <li key={item.name} >{item.name}</li>
                    ) )
                }
            </ul>
        </div>
    )
}

export default Pokemones
