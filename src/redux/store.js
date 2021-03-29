import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';// para hacer promesas con redux

import pokeReducer from './pokeDucks';
import usuarioReducer, {leerUsuarioActivoAccion} from './usuarioDuck';


const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuario: usuarioReducer
})

//--- Pregunta si tenemos instalado la extension de redux ----//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) )

    //--- va a leer si existe un usuario en el localStorage ---//
    leerUsuarioActivoAccion()(store.dispatch)
    return store;
}
