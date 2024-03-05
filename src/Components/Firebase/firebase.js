import firebase from 'firebase/compat/app'; // Update import statement
import 'firebase/compat/auth'; // Update import statement

const app = firebase.initializeApp({
    apiKey: "AIzaSyA2fEdyd37hHm2CVTZMipwYouiSVSRjCss",
    authDomain: "deeptekassignment.firebaseapp.com",
    projectId: "deeptekassignment",
    storageBucket: "deeptekassignment.appspot.com",
    messagingSenderId: "37174419208",
    appId: "1:37174419208:web:b736741be498d58e7e56bd",
    measurementId: "G-B3XPVKJBD0"
})

export const auth = app.auth();
export default app;