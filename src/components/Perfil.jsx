import React from 'react'

import { useSelector } from 'react-redux';

const Perfil = () => {

    //--- Con esto tengo todo el objeto del usuario ---//
    const usuario = useSelector(store => store.usuario.user);
    //console.log(usuario);

    //tiene de inmediato el nombre del usuario
    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
    const [activarFormulario, setActivarFormulario] = React.useState(false);

    const actualizarUsuario =  () => {

        


    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" width="100px" className="img-fluid" />
                    <h5
                        className="card-title"
                    >Nombre de usuario: {usuario.displayName}
                    </h5>
                    <p
                        className="card-text"
                    >Email: {usuario.email}
                    </p>
                    <button
                        className="btn btn-warning"
                        onClick={() => setActivarFormulario(true)}

                    >
                        Editar Nombre
                    </button>
                </div>
                {
                    activarFormulario &&
                    <div className="card-body">

                        <div className="row justify-content-center">

                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ nombreUsuario }
                                        onChange={ guardaLoqueEscriba => setNombreUsuario(guardaLoqueEscriba.target.value) }
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-dark"
                                            type="button"
                                            onClick={ () => actualizarUsuario() }
                                        >
                                            Actualizar
                                            </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Perfil
