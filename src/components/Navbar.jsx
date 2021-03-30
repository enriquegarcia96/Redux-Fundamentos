import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector }  from 'react-redux';

import {cerrarSesionAccion}  from '../redux/usuarioDuck.js';
import { withRouter } from 'react-router-dom';


const Navbar = ( props ) => {

    const dispatch = useDispatch();
    const activo = useSelector( store => store.usuario.activo )

    //para empujar a la pagina de login
    const cerrarSesion = () => {

        dispatch(cerrarSesionAccion())
        props.history.push('/login')

    }



    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKEMON</Link>
            <div className="d-flex">
                {
                    activo ? (
                        <>
                            <NavLink className="btn btn-outline-info mr-2" to="/" exact>Inicio</NavLink>
                            <NavLink className="btn btn-outline-info mr-2" to="/perfil" exact>Perfil</NavLink>
                            <button 
                                className="btn btn-outline-danger mr-2"
                                onClick={ () =>  cerrarSesion() }
                            >
                            Cerrar Sesión
                            </button>
                        </>
                    ): (
                        <NavLink className="btn btn-outline-info mr-2" to="/login" exact>Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default withRouter (Navbar)
