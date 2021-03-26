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
const POKE_INFO_EXITO = 'POKE_INFO_EXITO';

//---- reducer ----//
export default function pokeReducer(state = dataInicial, action) {

    switch (action.type) {

        //--- si se preciona el boton de siguiente ---//
        case OBTENER_POKEMONES_EXITO:
            return { ...state,  ...action.payload }
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state
    }    
}


//---- acciones ----//
//--- para que pinte la imagen en la pagina la 'url'  ---//
export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async ( dispatch ) =>{

    //--- Obtengo la informacion de localStorage ---//
    if (localStorage.getItem(url)) {
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log('Desde localStorage');
        return
    }


    try {
        console.log('Desde la api' );
        const res = await axios.get(url)
        //console.log(res.data)
        dispatch({
            type: POKE_INFO_EXITO,

            //--- traigo lo que necesito de la api ---//
            payload: {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default
            }
        })

        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))

    } catch (error) {
        console.log(error)
    }
}




export const obtenerPokemonesAccion = () => async (dispatch) =>{

    //console.log('getState', getState().pokemones.offset);
    //const offset = getState().pokemones.offset

    //--- getItem: para aceder a una informacion con su key   ---//
    if (localStorage.getItem('offset=0')) {
        console.log('Datos Guardados');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {
        console.log('Datos desde la api');
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`);
        //console.log(res.data)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })

        //--- Lo guardo en el LocalStorage ---//
        //--- seItem es para guardar 'nombreque le doy' ---//
        localStorage.setItem('offset=0', JSON.stringify(res.data));

    } catch (error) {
        console.log(error);
    }
}


export const siguientePokemonAccion = () => async (dispatch, getState) => {

    //const offset = getState().pokemones.offset
    //const siguiente = offset + numero

    const next = getState().pokemones.next
    //console.log(next);

    //--- getItem: para aceder a una informacion con su key   ---//
    if (localStorage.getItem(next)) {
        console.log('Datos guardados');
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        console.log('Datos desde la API');
        const res = await axios.get(next);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })

        //--- Lo guardo en el LocalStorage ---//
        //--- seItem es para guardar 'nombreque le doy' ---//
        localStorage.setItem(next, JSON.stringify(res.data));

    } catch (error) {
        console.log(error);
    }
}


export const anteriorPokemonAccion = () => async (dispatch, getSate) =>{

    const {previous} = getSate().pokemones

    //--- getItem: para aceder a una informacion con su key   ---//
    if (localStorage.getItem(previous)) {
        console.log('Datos Guardados');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }
    
    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        
        //--- Lo guardo en el LocalStorage ---//
        //--- seItem es para guardar 'nombreque le doy' ---//
        localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
        console.log(error);
    }

}