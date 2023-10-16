const firebaseConfig = {
    apiKey: "AIzaSyBjuMluOorfnvb11HFJuLp-AYXQTID7kvQ",
    authDomain: "matepratica-4d1fd.firebaseapp.com",
    databaseURL: "https://matepratica-4d1fd-default-rtdb.firebaseio.com",
    projectId: "matepratica-4d1fd",
    storageBucket: "matepratica-4d1fd.appspot.com",
    messagingSenderId: "304848171845",
    appId: "1:304848171845:web:2ef58cda6335907d0a042c",
    measurementId: "G-1KRZMT2DCR"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
function register () {
  // Get all our input fields
  email = document.getElementById('email_cad').value;
  password = document.getElementById('password_cad').value;
  full_name = document.getElementById('full_name').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser;

    // Add this user to Firebase Database
    var database_ref = database.ref();

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    };

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);

    // DOne
    alert('User Created!!')
    var tela_de_cadastro = document.getElementById("cadastro");
    var tela_de_login = document.getElementById("login");
    tela_de_cadastro.style.display = "none";
    tela_de_login.style.display = "block";
    var linkParaCadastro = document.querySelector('a[href="#paracadastro"]');
    linkParaCadastro.style.display = "none";
    const paragrafoJatemConta = document.querySelector('.link');
    paragrafoJatemConta.style.display = "none";
    var titulo = document.querySelector('h1');
    titulo.innerText = "Você está cadastrado! Faça login e entre no Mateprática!";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code;
    var error_message = error.message;

    alert(error_message);
  })
};

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email_login').value
  password = document.getElementById('password_login').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

    window.location.href = "matepratica-site.html";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}