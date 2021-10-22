let input = document.getElementById('celular');
input.oninvalid = function(event) {
  event.target.setCustomValidity('Ingrese un numero de 10 dígitos');  
}

function enviarCorreo(){
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let celular = document.getElementById("celular").value;
  let mensaje = document.getElementById("mensaje").value;

  
  Email.send({
    SecureToken : "178c9477-67d5-48bc-b69a-2058032089f3",
    From : correo,
    To : 'paolapedraza.3007@gmail.com',
    
    Subject : "Mensaje de SporTech",
    Body : "Nombre: "+nombre+"<br>Correo: "+correo+"<br>Telefono: "+celular+"<br>Mensaje: "+mensaje
  }).then( (message) => {
    if(message=="OK"){
      Swal.fire(
        '¡Mensaje enviado!',
        'Nos contactaremos contigo',
        'success'
      ) 
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar mensaje',
        text: 'Vuelve a intentarlo',
        
      })
    }   
  })
}
