if(jwtIsActive()){
  //ocultar logInIcon
  document.getElementById("logInIcon").setAttribute("hidden", true);
  //mostrar logOutIcon
  document.getElementById("logOutIcon").removeAttribute("hidden");
  //mostrar userName
  document.getElementById("userName").removeAttribute("hidden");
  //set value to userName (call a new function in jwt.js to retrieve username inside jwt)
  document.getElementById("userName").textContent = getUsernameJwt();
}

function logOutUser(){
  localStorage.setItem('jwt-token', "");
    document.location.href="/html/paginaPrincipal.html";
}