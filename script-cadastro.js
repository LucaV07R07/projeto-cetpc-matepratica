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

async function register() {
  try {
    // Get all our input fields
    var email = document.getElementById('email_cad').value;
    var password = document.getElementById('password_cad').value;
    var full_name = document.getElementById('full_name').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email ou Senha mal formatados!');
      return; // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('Preencha o campo "nome" com seu nome completo!');
      return;
    }

    // Move on with Auth
    await auth.createUserWithEmailAndPassword(email, password);

    // Declare user variable
    var user = auth.currentUser;

    // Add this user to Firebase Database
    var database_ref = database.ref();

    // Create User data
    var user_data = {
      email: email,
      full_name: full_name,
      last_login: Date.now()
    };

    // Push to Firebase Database
    await database_ref.child('users/' + user.uid).set(user_data);

    // Done
    alert('User Created!!');
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
  } catch (error) {
    // Firebase will use this to alert of its errors
    var error_message = error.message;
    alert(error_message);
  }
}

// Set up our login function
async function login() {
  try {
    // Get all our input fields
    var email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email ou Senha mal formatados!');
      return; // Don't continue running the code
    }

    await auth.signInWithEmailAndPassword(email, password);

    // Declare user variable
    var user = auth.currentUser;

    // Add this user to Firebase Database
    var database_ref = database.ref();

    // Create User data
    var user_data = {
      last_login: Date.now()
    };

    // Push to Firebase Database
    await database_ref.child('users/' + user.uid).update(user_data);

    // Done
    alert('Usuário logado!');

    window.location.href = "matepratica-site.html";
  } catch (error) {
    // Firebase will use this to alert of its errors
    var error_message = error.message;
    alert(error_message);
  }
}

// Validate Functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  return password.length >= 6;
}

function validate_field(field) {
  return field != null && field.length > 0;
}

async function logout() {
  try {
    await auth.signOut(); // Realiza o logout de forma assíncrona
    window.location.href = "cadastro.html"; // Redireciona para a página de cadastro após o logout
  } catch (error) {
    alert("Erro ao tentar fazer logout");
    console.error("Erro ao fazer logout:", error); 
     
  }
}

var user = auth.currentUser;

async function getUserName(user) {
  if (!user) return "Usuário sem identificação"; // Retorna se o usuário não estiver logado
  const uid = user.uid;
  const usersRef = database.ref('users');
  const userRef = usersRef.child(uid);
  try {
    const snapshot = await userRef.child('full_name').get();
    const displayName = snapshot.val();
    return displayName || "Usuário sem identificação"; // Retorna o nome do usuário ou uma mensagem padrão se não houver nome
  } catch (error) {
    console.error("Erro ao obter o nome do usuário:", error);
    return "Erro ao carregar informações do usuário"; // Retorna uma mensagem de erro em caso de falha
  }
}

// Função para atualizar a div com o nome do usuário
async function updateUserInfo() {
  const userInfoDiv = document.getElementById('div-nome-usuario');
  if (!userInfoDiv) return; // Retorna se a div não existir

  try {
    const user = auth.currentUser;
    if (user) {
      userInfoDiv.style.display = 'block'; // Exibe a div de informações do usuário
      const displayName = await getUserName(user); // Obtém o nome do usuário assincronamente
      userInfoDiv.innerHTML = displayName; // Exibe o nome do usuário na div
    } else {
      userInfoDiv.style.display = 'none'; // Oculta a div se o usuário não estiver logado
    }
  } catch (error) {
    console.error("Erro ao atualizar informações do usuário:", error);
    userInfoDiv.innerHTML = "Erro ao carregar informações do usuário"; // Exibe uma mensagem de erro em caso de falha
  }
}

// Chama a função para atualizar as informações do usuário quando o estado de autenticação mudar
auth.onAuthStateChanged(updateUserInfo);