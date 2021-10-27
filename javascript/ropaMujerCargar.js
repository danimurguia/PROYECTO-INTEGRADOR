const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card-ropamujer').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {fetchData()
 } )

// Traer productos
const fetchData = async () => {
    try {
    const res = await fetch('http://localhost:8080/productos')
    const data = await res.json()
    //console.log(data)
    pintarCards(data)
    }catch (error){
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        if(producto.categoria == "Ropamujer"){
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('p').textContent =  "$" + producto.precio
        templateCard.querySelector('.p2').textContent = producto.marca
        templateCard.querySelector('img').setAttribute("src", producto.archivo)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        }
    })
    cards.appendChild(fragment)
    }
