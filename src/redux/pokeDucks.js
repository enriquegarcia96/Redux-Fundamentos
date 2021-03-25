//--- Aplicamos la logica en este archivo ---//

import axios from 'axios';

//-----constantes----//
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}


//---- types ----//
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';

//---- reducer ----//
export default function pokeReducer(state = dataInicial, action) {

    switch (action.type) {

        //--- si se preciona el boton de siguiente ---//
        case OBTENER_POKEMONES_EXITO:
            return { ...state,  ...action.payload }
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        default:
            return state
    }    
}


//---- acciones ----//
export const obtenerPokemonesAccion = () => async (dispatch, getState) =>{

    //console.log('getState', getState().pokemones.offset);
    //const offset = getState().pokemones.offset

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);
        console.log(res.data)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}


export const siguientePokemonAccion = () => async (dispatch, getState) => {

    //const offset = getState().pokemones.offset
    //const siguiente = offset + numero

    const next = getState().pokemones.next
    //console.log(next);

    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}


export const anteriorPokemonAccion = () => async (dispatch, getSate) =>{

    const {previous} = getSate().pokemones

    
    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }

}