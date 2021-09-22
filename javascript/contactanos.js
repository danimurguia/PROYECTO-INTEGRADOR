let input = document.getElementById('celular');
input.oninvalid = function(event) {
  event.target.setCustomValidity('Ingrese un numero de 10 dígitos');  
}

function enviarCorreo(){
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let celular = document.getElementById("celular").value;
  let mensaje = document.getElementById("mensaje").value;
  console.log(nombre, correo, celular, mensaje)

  alert(" ");

}

