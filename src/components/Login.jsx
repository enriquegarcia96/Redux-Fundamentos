import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ingresoUsuarioAcccion } from '../redux/usuarioDuck';//la accion

import { withRouter } from 'react-router-dom'


const Login = ( props ) => {

    const dispatch = useDispatch();

    //--- Llamo a la tienda store y llamo a su propiedades ---//
    const loading = useSelector(store => store.usuario.loading);
    //console.log(loading);

    //--- Llamo a la tienda store y llamo a su propiedades ---//
    const activo = useSelector(store => store.usuario.activo);
    //console.log(activo);


    /** 
     * El useEffect me sirve para dar un seguimiento 
     * de algun dato
     */
    React.useEffect( () => {
        //console.log(activo)

        if (activo) {

            //--- lo mando a la pagina de inicio ---//
            props.history.push('/');
        }
    }, [activo])


    return (
        <div className="mt-5 text-center">
            <h3 className="text-uppercase font-italic">Ingreso con Google</h3>
            <hr/>
            <button 
                className="btn btn-primary text-uppercase fab fa-google "
                onClick={ () => dispatch(ingresoUsuarioAcccion())}
                disabled={loading}
            > Acceder
            </button>
            
        </div>
    )
}

export default withRouter(Login);
