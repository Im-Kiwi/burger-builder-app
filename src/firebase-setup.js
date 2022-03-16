// connecting the app to firebase

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCmHDgP1tDKlbArd8pw6eAnSJTAAf1UbQ",
    authDomain: "kiwi-burger-builder-app-b3a20.firebaseapp.com",
    projectId: "kiwi-burger-builder-app-b3a20",
    storageBucket: "kiwi-burger-builder-app-b3a20.appspot.com",
    messagingSenderId: "283702489631",
    appId: "1:283702489631:web:948852573cd5a1ba599b2a",
    measurementId: "G-2R4N75VPYR"
};

// initializing the connection to firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);