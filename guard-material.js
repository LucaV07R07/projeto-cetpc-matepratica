function checkAuth() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        // Se o usuário não estiver logado, redirecione-o para a página de login
        window.location.href = "../cadastro.html";
      }
    });
  }
  
  // Chame a função de verificação de autenticação na página que você deseja restringir o acesso
  checkAuth();
  
  
  
  
  
  