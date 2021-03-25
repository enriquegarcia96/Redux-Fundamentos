import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';// para hacer promesas con redux

import pokeReducer from './pokeDucks';

const rootReducer = combineReducers({
    pokemones: pokeReducer
})

//--- Pregunta si tenemos instalado la extension de redux ----//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) )
    return store;
}
