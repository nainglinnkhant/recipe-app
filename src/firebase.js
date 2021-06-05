import Firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
     apiKey: "AIzaSyCWwIDdAoSa1_Bjv1iE4wWX6WRK9amszJo",
     authDomain: "recipe-app-c5d4e.firebaseapp.com",
     databaseURL: "https://recipe-app-c5d4e-default-rtdb.firebaseio.com",
     projectId: "recipe-app-c5d4e",
     storageBucket: "recipe-app-c5d4e.appspot.com",
     messagingSenderId: "259109162146",
     appId: "1:259109162146:web:8df19113ebab19980e5bfb"
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
export default db;