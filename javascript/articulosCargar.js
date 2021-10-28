const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card-accesorios').content
const fragment = document.createDocumentFragment()
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
});

// Traer productos
const fetchData = async () => {
    try {
    const res = await fetch('http://192.168.2.101:8080/productos')
    const data = await res.json()
    //console.log(data)
    pintarCards(data)
    }catch (error){
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        if(producto.categoria == "Accesorios"){
            templateCard.querySelector('h5').textContent = producto.nombre;
            templateCard.querySelector('p').textContent = "$" + producto.precio;
            templateCard.querySelector('.p2').textContent = producto.marca
            templateCard.querySelector('img').setAttribute("src", producto.archivo);
            templateCard.querySelector('.btn-dark').dataset.id = producto.id;
            
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
    })
    cards.appendChild(fragment)
}

const addToCart = (element) => {
    if(element.classList.contains('btn-dark')){
        setCarrito(element.parentElement)
    }
};

const setCarrito = objeto => {
    const precio = parseFloat(objeto.querySelector('p').textContent.split("$")[1]);
    const title = objeto.querySelector('h5').textContent;
    const brand = objeto.querySelector('.p2').textContent;
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: `${title} (${brand})`,
        precio: precio,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }
    carrito[producto.id] = {...producto}
    //pintarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
    document.querySelector('.alert span').textContent = `${title} agregado al carrito`
    $('.alert').show();
}
