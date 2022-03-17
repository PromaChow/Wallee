import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyDepgLgWH6y7aQAEeEe7m5w2CkhIAqBLK4",
  
    authDomain: "firstapp-1852e.firebaseapp.com",
  
    databaseURL: "https://firstapp-1852e-default-rtdb.firebaseio.com",
  
    projectId: "firstapp-1852e",
  
    storageBucket: "firstapp-1852e.appspot.com",
  
    messagingSenderId: "1061687218566",
  
    appId: "1:1061687218566:web:1f0341a377783227315c07"
  
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase;