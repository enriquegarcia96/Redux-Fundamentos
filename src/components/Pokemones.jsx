import React from 'react';

import Detalle from './Detalle';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, unPokeDetalleAccion } from '../redux/pokeDucks';


const Pokemones = () => {

    //--- Dispara la accion ---//
    const dispatch = useDispatch()

    //--- Devuelve el state ---//
    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector( store => store.pokemones.previous );

    //--- Para que tire la informacion desde un inicio ---//
    React.useEffect (() => {
        const fetchData = () => {
            dispatch(obtenerPokemonesAccion())
            }
        fetchData()
    }, [dispatch])

    //console.log(pokemones);

    return (
            <div className="row">
                <div className="col-md-6">

                <h3>Lista de pokemones</h3>

                <br/>

                <div className="d-flex justify-content-between">
                    {
                        pokemones.length === 0 &&
                        <button onClick={ () => dispatch(obtenerPokemonesAccion()) } className="btn btn-dark" >Get pokemones</button>

                    }{
                        next && 
                        <button onClick={ () => dispatch(siguientePokemonAccion()) } className="btn btn-dark">Siguiente</button>

                    }
                    {
                        previous &&
                        <button onClick={ () => dispatch(anteriorPokemonAccion()) } className="btn btn-dark" >Anterior</button>
                    }
                </div>


                <ul className="list-group mt-3">
                    {
                        pokemones.map( item => (
                            <li key={item.name} className="list-group-item list-group-item-info text-uppercase font-italic ">
                                {item.name}
                                <button 
                                    className="btn btn-dark btn-sm float-right"
                                    onClick={() => dispatch(unPokeDetalleAccion(item.url))}
                                >
                                    Informacion
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
                <div className="col-md-6">
                    <h4 className="text-muted">Detalle Pokemon</h4>
                    <Detalle />
                </div>
            </div>
    )

}

export default Pokemones
