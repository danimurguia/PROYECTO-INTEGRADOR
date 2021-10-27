
let products = [];
var refid;
var data;

const fetchHMData = async () => {
    try {
    const res = await fetch('http://localhost:8080/productos')
    data = await res.json()
    //console.log(data)
    refid=(Object.keys(data).length)+1; //cuenta la cantidad de Keys de los JSON y le suma 
    console.log(refid);
    }catch (error){
        console.log(error)
    }
}

// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addProduct = (ev) => {
    ev.preventDefault();  //to stop the form submitting
   
    let product = {
        archivo: document.getElementById('archivo').value,
        categoria: document.querySelector('input[id="categoria"]:checked')?.value,
        color: document.getElementById('color').value,
        descrip: document.getElementById('descrip').value,
        //hay que agregar el id
        id: (Object.keys(data).length+1),//cuenta la cantidad de Keys de los JSON y le suma 1
        marca: document.getElementById('marca').value,
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        talla: document.querySelector('input[id="talla"]:checked')?.value,
        cantidad: document.getElementById('cantidad').value,
    }

    //compare the input values to the values inside the if conditional
    if (nombre.value, precio.value, marca.value, descrip.value, color.value, talla.value, categoria.value, archivo.value != "") {
        
        console.warn('Producto Agregado al Local Storage', { products });

        fetch('http://localhost:8080/productos', {
        method: 'POST', // or 'PUT'
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
            'Producto Agregado!',
            'Puedes agregar más productos',
            'success'
        )
        document.querySelector('form').reset();// to clear the form for the next entries

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Completa todos los campos',

        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnSubmit').addEventListener('click', fetchHMData());
    document.getElementById('btnSubmit').addEventListener('click', addProduct);
});

    


