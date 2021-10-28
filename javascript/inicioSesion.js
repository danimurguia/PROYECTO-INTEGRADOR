//Si la fecha expiracion es mayor a nuestra fecha actual es por que aún hay sesión
if(jwtIsActive()){
    document.location.href="/html/paginaPrincipal.html";
}

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);
document.getElementById("btnMostrarContra").addEventListener("click", mostrarContrasena);



//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

//FUNCIONES DE FORMULARIO DE REGISTRO DE USUARIOS EN LOCALSTORAGE

let registros = [];


// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addRegistro = async (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    
    let registro= {
        nombreRegistro: document.getElementById('nombreRegistro').value,
        correoRegistro: document.getElementById('correoRegistro').value,
        contraseñaRegistro: document.getElementById('contraseñaRegistro').value,
        contraseñaRegistro2: document.getElementById('contraseñaRegistro2').value
    }

    
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let correoValido = expReg.test(correoRegistro.value)
    let expReg2 = /^(?=.*[a-z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    let contraseñaValido = expReg2.test(contraseñaRegistro.value)
    
    //saving to localStorage
    if(nombreRegistro.value != "" && correoValido == true  &&contraseñaValido == true && contraseñaRegistro.value == contraseñaRegistro2.value) 
    {
        try {
            const res = await fetch('http://localhost:8080/cliente/sign-in',  {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "nombre": registro.nombreRegistro,
                        "correo": registro.correoRegistro,
                        "contrasenia": registro.contraseñaRegistro
                    }
                ) 
            })
    
            const statusCode = await res.status;
            const result = await res.text() //respuesta del endpoint(jwtToken)
    
            if(statusCode === 200){
                console.log(result)
                Swal.fire(
                    '¡Ya estás registrado!',
                    'Ahora podrás recibir nuestras promociones, descuentos especiales y ¡mucho más!',
                    'success'
                )
                document.querySelector('.formulario__register').reset();// to clear the form for the next entries
            }else{
                console.log(result)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result 
                })
            }
        }catch (error){
            console.log(error)
        }
    
    } else if ( correoValido == false ) {   
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  'Revisa el formato del correo: correo@ejemplo.com' 
        })
        document.getElementById('correoRegistro').value = ''// to clear the input for the next
    } else if ( contraseñaValido == false ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  'Revisa el formato de contraseña: min. 8 caracteres, 1 número, sin espacios' 
        })
        document.getElementById('contraseñaRegistro').value = ''// to clear the form for the next
    } else if (  contraseñaRegistro.value != contraseñaRegistro2.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  'Las contraseñas no coinciden' 
        })
        document.getElementById('contraseñaRegistro2').value = ''// to clear the form for the next
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  'Completa los campos'    
        })
    }
    
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("btnRegistro").addEventListener("click", addRegistro);
});

//FUNCIONES
function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}

function mostrarContrasena(){
    let tipo = document.getElementById("contraseñaRegistro");
    let tipo2 = document.getElementById("contraseñaRegistro2");
    if(tipo.type == "password"){
        tipo.type = "text";
        tipo2.type = "text";
    }else{
        tipo.type = "password";
        tipo2.type = "password";
    }
}

async function logInCliente(){
    let correo = document.getElementById("correoLogIn").value;
    let contrasenia = document.getElementById("contraseniaLogIn").value;
    
    try {
        const res = await fetch('http://localhost:8080/login-cliente',  {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "correo":correo,
                    "contrasenia":contrasenia
                }
            ) 
        })

        const statusCode = await res.status;
        const result = await res.text() //respuesta del endpoint(jwtToken)

        if(statusCode === 200){
            console.log(result)
            localStorage.setItem('jwt-token', result);
            //redirect to index
            document.location.href="/html/paginaPrincipal.html";
        }else{
            localStorage.setItem('jwt-token', "" );
            console.log(result)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result 
            })
        }
    }catch (error){
        console.log(error)
    }
}