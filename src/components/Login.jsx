import React from 'react'
import { useDispatch } from 'react-redux';
import { ingresoUsuarioAcccion } from '../redux/usuarioDuck';//la accion

const Login = () => {

    const dispatch = useDispatch();


    return (
        <div className="mt-5 text-center">
            <h3 className="text-uppercase font-italic">Ingreso con Google</h3>
            <hr/>
            <button 
                className="btn btn-primary text-uppercase fab fa-google "
                onClick={ () => dispatch(ingresoUsuarioAcccion())}
            > Acceder
            </button>
            
        </div>
    )
}

export default Login
