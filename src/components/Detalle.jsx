import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {unPokeDetalleAccion} from '../redux/pokeDucks';



const Detalle = () => {


    const dispatch = useDispatch();
    
    React.useEffect (() => {
        const fetchData = () => {
            dispatch(unPokeDetalleAccion())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector( store => store.pokemones.unPokemon );
    //console.log(pokemon);

    return pokemon ?  (
        <div className="card mt-4 text-center  bg-light mb-3 border-dark">
            <div className="card-body text-primary">
                <img src={ pokemon.foto } alt=""  className="card-fluid" />
                <div className="card-title text-uppercase font-weight-bold">{ pokemon.nombre }</div>
                <p className="card-text font-weight-light font-weight-normal">Alto: { pokemon.alto } | Ancho: { pokemon.ancho }</p>
                <p className="card-text font-weight-light font-weight-normal text-info">Aplicación con Redux <p className="text-uppercase font-weight-bold text-dark">Enrique García</p></p>
            </div>
        </div>
    ): null
}

export default Detalle
