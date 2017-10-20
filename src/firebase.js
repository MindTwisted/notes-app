import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCw9D6nP91ab6-g-2PUfUYwZFnoqTyz4DY",
    authDomain: "notes-app-7de70.firebaseapp.com",
    databaseURL: "https://notes-app-7de70.firebaseio.com",
    projectId: "notes-app-7de70",
    storageBucket: "notes-app-7de70.appspot.com",
    messagingSenderId: "163664851807"
};

const fire = firebase.initializeApp(config);

export default fire;
