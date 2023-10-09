firebase.auth().onAuthStateChanged(function (usuario) {
    if (usuario) {
      // Usuário está conectado
      document.getElementById('div_usuario').style.display = 'block';
      document.getElementById('div_login').style.display = 'none';
    } else {
      // Nenhum usuário está conectado
      document.getElementById('div_usuario').style.display = 'none';
      document.getElementById('div_login').style.display = 'block';
    }
  });
  
  
  function criarConta(){
  
    var emailUsuario = document.getElementById('campo_de_email').value;
    var senhaUsuario = document.getElementById('campo_de_senha').value;
  
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailUsuario, senhaUsuario)
    .then((userCredential) => {
      document.getElementById('aviso_cadastro').innerText = 'Usuário cadastrado com sucesso. Faça login para entrar.';
      document.getElementById('aviso_cadastro').style.display = 'block';
    })
    .catch((error) => {
      var codigoErro = error.code;
      var mensagemErro = error.message;
      window.alert('Erro: ' + mensagemErro)    
    });
  }
  
  function sair() {
    firebase.auth().signOut();
  }
  function entrar() {
    var emailUsuario = document.getElementById('campo_de_email').value;
    var senhaUsuario = document.getElementById('campo_de_senha').value;
    // Método de login de usuários existentes no Firebase
    firebase
    .auth()
    .signInWithEmailAndPassword(emailUsuario, senhaUsuario)
    .then(function (userCredential) {
        // Autenticação bem-sucedida, redirecionar para a página 
        window.location.href = 'matepratica-site.html'; 
       
    })
    .catch(function (error) {
        // Lide com erros aqui
        var codigoErro = error.code;
        var mensagemErro = error.message;
        window.alert('Erro: ' + mensagemErro);

    })
    .finally(function () {
      // Esconder o aviso de cadastro após login
      document.getElementById('aviso_cadastro').style.display = 'none';
    });
       
}