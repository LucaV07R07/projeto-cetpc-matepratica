const firebaseConfig = {
    apiKey: "AIzaSyBjuMluOorfnvb11HFJuLp-AYXQTID7kvQ",
    authDomain: "matepratica-4d1fd.firebaseapp.com",
    databaseURL: "https://matepratica-4d1fd-default-rtdb.firebaseio.com",
    projectId: "matepratica-4d1fd",
    storageBucket: "matepratica-4d1fd.appspot.com",
    messagingSenderId: "304848171845",
    appId: "1:304848171845:web:2ef58cda6335907d0a042c",
    measurementId: "G-1KRZMT2DCR",
  };
  
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const database = firebase.database();
  const user = auth.currentUser;