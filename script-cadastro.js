
window.addEventListener("popstate", function () {
  history.forward();
  this.history.forward();
});
auth.onAuthStateChanged(function (user) {
  if (!user && window.location.pathname !== "/cadastro.html") {
    window.location.href = "cadastro.html";
  }
});
async function register() {
  try {
    // Get all our input fields
    var email = document.getElementById("email_cad").value;
    var password = document.getElementById("password_cad").value;
    var full_name = document.getElementById("full_name").value;

    // Validate input fields
    if (
      validate_email(email) == false ||
      validate_password(password) == false
    ) {
      alert("Email ou Senha mal formatados!");
      return; // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('Preencha o campo "nome" com seu nome completo!');
      return;
    }

    // Create the user in Firebase Authentication
    await auth.createUserWithEmailAndPassword(email, password);
    var user = auth.currentUser;


    // Add this user to Firebase Database
    var database_ref = database.ref();

    // Create User data
    var user_data = {
      email: email,
      full_name: full_name,
      last_login: Date.now(),
    };

    // Push to Firebase Database
    database_ref.child("users/" + user.uid).set(user_data);

    // Done
    alert("User Created!!");
    var tela_de_cadastro = document.getElementById("cadastro");
    var tela_de_login = document.getElementById("login");
    tela_de_cadastro.style.display = "none";
    tela_de_login.style.display = "block";
    var linkParaCadastro = document.querySelector('a[href="#paracadastro"]');
    linkParaCadastro.style.display = "none";
    const paragrafoJatemConta = document.querySelector(".link");
    paragrafoJatemConta.style.display = "none";
    var titulo = document.querySelector("h1");
    titulo.innerText =
      "Você está cadastrado! Faça login e entre no Mateprática!";

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
    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;

    // Validate input fields
    if (
      validate_email(email) == false ||
      validate_password(password) == false
    ) {
      alert("Email ou Senha mal formatados!");
      return; // Don't continue running the code
    }

    // Sign in the user
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Add this user to Firebase Database
    var database_ref = database.ref();

    // Create User data
    var user_data = {
      last_login: Date.now(),
    };

    // Push to Firebase Database
    database_ref.child("users/" + user.uid).update(user_data);

    // Done
    alert("Usuário logado!");
    //direciona o usuario a pagina principal
    window.location.href = "matepratica-site.html";

    // Limpar o histórico de navegação para impedir que o usuário volte à página de login
    history.replaceState({}, document.title, "matepratica-site.html");
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
    auth.signOut(); // Realiza o logout de forma assíncrona
    window.location.replace("cadastro.html"); // Redireciona para a página de cadastro após o logout
  } catch (error) {
    alert("Erro ao tentar fazer logout");
    console.error("Erro ao fazer logout:", error);
  }
}

async function getUserName(user) {
  if (!user) return "Usuário sem identificação"; // Retorna se o usuário não estiver logado
  const uid = user.uid;
  const usersRef = database.ref("users");
  const userRef = usersRef.child(uid);
  try {
    const snapshot = await userRef.child("full_name").get(); // Note o await aqui

    let displayName = snapshot.val();
    if (displayName) {
      // Verifica se o nome tem mais de 20 caracteres e o abrevia se necessário
      if (displayName.length > 20) {
        displayName = displayName.substring(0, 20)+"...";
      }
    } else {
      displayName = "Usuário sem identificação"; // Define o nome padrão se não houver nome
    }
    return displayName;
  } catch (error) {
    console.error("Erro ao obter o nome do usuário:", error);
    return "Erro ao carregar informações do usuário"; // Retorna uma mensagem de erro em caso de falha
  }
}

// Função para atualizar a div com o nome do usuário
async function updateUserInfo(user) {
  const userInfoDiv = document.getElementById("div-nome-usuario");
  if (!userInfoDiv) return; // Retorna se a div não existir

  try {
    if (user) {
      userInfoDiv.style.display = "block"; // Exibe a div de informações do usuário
      const displayName = await getUserName(user); // Obtém o nome do usuário assincronamente
      userInfoDiv.innerHTML = displayName; // Exibe o nome do usuário na div
    } else {
      userInfoDiv.style.display = "none"; // Oculta a div se o usuário não estiver logado
    }
  } catch (error) {
    console.error("Erro ao atualizar informações do usuário:", error);
    userInfoDiv.innerHTML = "Erro ao carregar informações do usuário"; // Exibe uma mensagem de erro em caso de falha
  }
}

// Chama a função para atualizar as informações do usuário quando o estado de autenticação mudar
auth.onAuthStateChanged(updateUserInfo);
