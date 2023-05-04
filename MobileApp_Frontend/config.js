import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCw3twh65YldC-Ba0DlQwhTMbb4GlVa47E",
  authDomain: "dbdemo-f68b8.firebaseapp.com",
  projectId: "dbdemo-f68b8",
  storageBucket: "dbdemo-f68b8.appspot.com",
  messagingSenderId: "47818523891",
  appId: "1:47818523891:web:94a5c54d11803c6602a386",
  measurementId: "G-HWDJLG52DK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
