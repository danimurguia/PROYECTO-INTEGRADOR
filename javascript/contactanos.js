var input = document.getElementById('celular');
input.oninvalid = function(event) {
  event.target.setCustomValidity('Ingrese un numero de 10 dígitos');  
}

