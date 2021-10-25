import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
 apiKey: "AIzaSyBJ1INPWq2MDT3agdRspOXxFgnzA0s03yw",
 authDomain: "whatsapp-clone-2b15a.firebaseapp.com",
 projectId: "whatsapp-clone-2b15a",
 storageBucket: "whatsapp-clone-2b15a.appspot.com",
 messagingSenderId: "438425066435",
 appId: "1:438425066435:web:f45ead30a2167cf1ecfb76"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
export {auth, provider}

