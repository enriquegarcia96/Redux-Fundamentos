import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const  firebaseConfig = {
    apiKey: "AIzaSyAEP1-yuu0ncAbEtRH_zVreU505K0u9rwQ",
    authDomain: "pokemon-redux-auth-storage.firebaseapp.com",
    projectId: "pokemon-redux-auth-storage",
    storageBucket: "pokemon-redux-auth-storage.appspot.com",
    messagingSenderId: "454571014780",
    appId: "1:454571014780:web:fcf8da8b4253d4458967f9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


export {auth, firebase, db}