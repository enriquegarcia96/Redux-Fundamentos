import {auth, firebase, db} from '../firebase';

//--- Data inicial ---//
const dataInicial = {
    loading: false,
    activo: false
}


//--- types ---//
const LOADING = 'LOADING';
const USUARIO_ERROR = 'USUARIO_ERROR';
const USUARIO_EXITO = 'USUARIO_EXITO';
const CERRAR_SESION = 'CERRAR_SESION';

//--- reducer ---//
export default function usuarioReducer ( state = dataInicial, action ) {
    switch (action.type) {

        case LOADING:
                return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial}
        case USUARIO_EXITO:
            return {...state, loading: false, user: action.payload, activo: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return {...state}    
    }
}


//--- action ---//
export const ingresoUsuarioAcccion = () => async( dispatch ) =>{

    dispatch({
        type: LOADING
    })

    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);
        console.log(res.user);

        //--- creo un objeto del usuario que viene de google --//
        const usuario = {

            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL

        }

        //--- Creo una colecion con el nombre de: usuarios ---//
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get();
        console.log(usuarioDB);
        
        //--- Preguntar si existe ese usuario en la base de datos de Firebase ---//
        if (usuarioDB.exists) {
            
            //--- Cuando existe el usuario en fireStore ---//
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            //--- Lo guardo en el localStorage
            localStorage.setItem('usuario',JSON.stringify(usuarioDB.data()))

        } else {
            //--- No exista el usuario en fireStore ---//
            await db.collection('usuarios').doc(usuario.email).set(usuario);

            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            })
            //--- Lo guardo en el localStorage
            localStorage.setItem('usuario',JSON.stringify(usuario))
        }
    
    } catch (error) {
        console.log(error);

        dispatch({
            type: USUARIO_ERROR
        })

    }
}

//--- si existe un usuario en el localStorage ---//
export const leerUsuarioActivoAccion = () => ( dispatch ) => {

    if (localStorage.getItem('usuario')) {
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }

}

//--- para cerrar sesion ---//
export const cerrarSesionAccion = () => ( dispacth ) => {
    auth.signOut();

   //--- elimino el usuario que quedo guardado en LocalStorage ---//
    localStorage.removeItem('usuario');
    dispacth({
        type: CERRAR_SESION
    })
}