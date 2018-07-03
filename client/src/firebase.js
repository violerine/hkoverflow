import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAiUq_QenXAbqHFRLfztRrU_BW4ypvzKlI",
    authDomain: "overflow-842bd.firebaseapp.com",
    databaseURL: "https://overflow-842bd.firebaseio.com",
    projectId: "overflow-842bd",
    storageBucket: "overflow-842bd.appspot.com",
    messagingSenderId: "349233452613"
  };

let app = firebase.initializeApp(config);

export const firebaseapp = app

// export const Database = firebase.database()
