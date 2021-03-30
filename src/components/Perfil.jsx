import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDuck';


const Perfil = () => {

    //--- Con esto tengo todo el objeto del usuario ---//
    const usuario = useSelector(store => store.usuario.user);
    const loading = useSelector( store => store.usuario.loading )
    //console.log(usuario);

    //tiene de inmediato el nombre del usuario
    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
    const [activarFormulario, setActivarFormulario] = React.useState(false);

    const dispatch = useDispatch();

    const actualizarUsuario =  () => {

        //--- Leo el input ---//
        if (!nombreUsuario.trim()) {
            console.log('Nombre vacio');
            return
        }

        //--- Llama a esta accion de usuarioDuck ---//
        dispatch(actualizarUsuarioAccion(nombreUsuario));
        setActivarFormulario(false);
    }


    const [ error, setError ] = React.useState(false);

    //--- Metodo para guardar imagen --//
    const seleccionarArchivo = (imagen) => {
        console.log(imagen.target.files[0]);

        const imagenCliente = imagen.target.files[0];

        if (imagenCliente === undefined) {
            console.log('No selecciono ninguna imagen!');
            return;
        }

        //--- valido el formato que sea una .pgn o .img ---//
        if (imagenCliente.type === 'image/png' || imagenCliente.type === 'image/JPG' ) {

            dispatch(editarFotoAccion(imagenCliente))

            setError(false);
        }else{
            setError(true);
        }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card border-info" >
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" width="100px" className="img-fluid" />
                    <h5
                        className="card-title text-uppercase font-italic mt-2"
                    ><span  className="fas fa-user"></span> {usuario.displayName}
                    </h5>
                    <p
                        className="card-text font-weight-normal font-weight-bold"
                    ><span className="fas fa-envelope-open-text"></span> {usuario.email}
                    </p>
                    <button
                        className="btn btn-warning fas fa-user-edit "
                        onClick={() => setActivarFormulario(true)}
                    >
                        Editar Nombre   
                    </button>
                    {
                        error &&
                        <div className="alert alert-warning mt-3">
                            Solo Archivos .png o .jpg
                        </div>
                    }
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input"
                            id="inputGroupFile01"
                            style={{display:'none'}}
                            onChange={ e => seleccionarArchivo(e) }
                            disabled={ loading }
                        />
                        <label 
                            className={  loading ? 'btn btn-dark mt-2 disabled fas fa-images ' : 'btn btn-dark mt-2 fas fa-images '}
                            htmlFor="inputGroupFile01"
                            
                        >
                            Cambiar Foto De Perfil
                        </label>

                    </div>
                </div>
                {
                    loading &&
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-dark" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                }
                {
                    activarFormulario &&
                    <div className="card-body">

                        <div className="row justify-content-center">

                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control "
                                        value={ nombreUsuario }
                                        onChange={ guardaLoqueEscriba => setNombreUsuario(guardaLoqueEscriba.target.value) }
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-warning"
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
