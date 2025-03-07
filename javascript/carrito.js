const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    //fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        console.log(carrito)
        pintarCarrito()
    }
})
cards.addEventListener('click', e =>{
    addCarrito (e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const addCarrito = e =>{
    if(e.target.classList.contains('btn-secondary')){
        setCarrito(e.target.parentElement)
    }

    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-secondary').dataset.id,
        title:objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }
carrito[producto.id] = {...producto}
pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-dark').dataset.id = producto.id
        templateCarrito.querySelector('.btn-secondary').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = (producto.cantidad * producto.precio).toFixed(2)

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Tabla resumen
const pintarFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - ¡Comience a comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0).toFixed(2)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}


const btnAccion = e => {
    //Aumenta
    if(e.target.classList.contains('btn-dark')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
        //Disminuye
        if(e.target.classList.contains('btn-secondary')){
            const producto = carrito[e.target.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0){
                delete carrito[e.target.dataset.id]
            }
            pintarCarrito()
        }

        e.stopPropagation()
}