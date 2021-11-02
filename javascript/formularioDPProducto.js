//if jwt is active && if is a admin jwt 
if(!jwtIsActive() || getRoleJwt()!=="ADMINISTRADOR" ){
    document.location.href="/html/loginAdmin.html";
}
let products = [];
var refid;
var data;
var idData;
var encontrado = false;
var holderNombre;

const fetchHMData = async () => {
    try {
        const res = await fetch('http://localhost:8080/productos')
        data = await res.json()
        //console.log(data)
        refid = (Object.keys(data).length) + 1; //cuenta la cantidad de Keys de los JSON y le suma 
        console.log(refid);
        sessionStorage.setItem('datos', JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
}

//Funcion para buscar el id del producto, idData
const searchProduct = (ev) => {
    ev.preventDefault();
    
    var guardado = sessionStorage.getItem('datos');
    var guardadoParse = JSON.parse(guardado);
    for(var x = 1 ;x<guardadoParse.length;x++){
        if (guardadoParse[x].nombre === document.getElementById('nombreSearch').value) {
            idData = guardadoParse[x].id;
            encontrado = true;
            break;
        }
    }
    if(encontrado == true){
    console.log("el numero de id de tu producto es: " + idData);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops... Producto no encontrado',
            text: 'Revisa que el nombre sea exactamente como el del producto a alterar o borrar',
        })
    }
    
    var urlGEt = 'http://localhost:8080/productos' + '/' + idData;
    fetch(urlGEt)
    .then(response => response.json())
        .then(data => {
            document.getElementById('nombre').placeholder = data.nombre
            document.getElementById('precio').placeholder = data.precio
            document.getElementById('marca').placeholder = data.marca
            document.getElementById('descrip').placeholder = data.descrip
            document.getElementById('color').placeholder = data.color
            document.getElementById('cantidad').placeholder = data.cantidad
            // input.placeholder = data.nombre
        });
            
            // document.getElementById('nombre')[0].Pla placeholder = data.nombre 
            
            


    
}

// example {id:1592304983049, title: 'Deadpool', year: 2015}
const modifyProduct = (ev) => {
    ev.preventDefault();  //to stop the form submitting

    let product = {
        archivo: document.getElementById('archivo').value,
        categoria: document.querySelector('input[id="categoria"]:checked')?.value,
        color: document.getElementById('color').value,
        descrip: document.getElementById('descrip').value,
        marca: document.getElementById('marca').value,
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        talla: document.querySelector('input[id="talla"]:checked')?.value,
        cantidad: document.getElementById('cantidad').value,
    }
        var urlPUT = 'http://localhost:8080/productos' + '/' + idData;
        fetch(urlPUT, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', JSON.stringify(product));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //saving to localStorage
        Swal.fire(
            'Producto Modificado!',
            'Puedes modificar más productos',
            'success'
        )
        document.querySelector('form').reset();// to clear the form for the next entries
}

const deleteProduct = (ev) => {
    ev.preventDefault();  //to stop the form submitting
        var urlPUT = 'http://localhost:8080/productos' + '/' + idData;
        fetch(urlPUT, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
             
        })
            .then(response => response.json())
            .then(data => {
                console.log("Operacion de Eliminado");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //saving to localStorage
        Swal.fire(
            'Producto Eliminado!',
            'Puedes Eliminar más productos',
            'success'
        )
        document.querySelector('form').reset();// to clear the form for the next entries
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnModify').addEventListener('click', fetchHMData());
    document.getElementById('btnModify').addEventListener('click', modifyProduct);
    document.getElementById('btnSearch').addEventListener('click', searchProduct);
    document.getElementById('btnDelete').addEventListener('click', deleteProduct);

});

function logOutAdmin(){
    localStorage.setItem('jwt-token', "");
    document.location.href="/html/loginAdmin.html";
}



