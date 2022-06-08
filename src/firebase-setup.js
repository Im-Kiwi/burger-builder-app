// connecting the app to firebase

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};

// initializing the connection to firebase
const app = initializeApp(firebaseConfig);

// connecting firebase database to the react app
export const db = getFirestore()

// connecting the authentication system of firebase to react app
export const auth = getAuth(app);