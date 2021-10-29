const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card-ropahombre').content
const fragment = document.createDocumentFragment()
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
});

cards.addEventListener('click', e => {
    mostrarArticulo(e)
})


// Traer productos
const fetchData = async () => {
    try {
    const res = await fetch('http://localhost:8080/productos')
    const data = await res.json()
    pintarCards(data)

    }catch (error){
        console.log(error)
    }
}

let pintarCards = data => {
    data.forEach(producto => {
        if(producto.categoria == "Ropahombre"){

            templateCard.querySelector('h5').textContent = producto.nombre;
            templateCard.querySelector('p').textContent = "$" + producto.precio;
            templateCard.querySelector('.p2').textContent = producto.marca
            templateCard.querySelector('img').setAttribute("src", producto.archivo);
            templateCard.querySelector('.btn-dark').dataset.id = producto.id;
            templateCard.querySelector('.btnDescrip').dataset.id = producto.id
            
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

    
  const mostrarArticulo = e =>{
      
      if(e.target.classList.contains('btnDescrip')){
          setBtn(e.target.parentElement)
          
      }
      
  }
 
  const setBtn = objet =>{
    //   console.log(objeto)
      const boton = {
          id: objet.querySelector('.btnDescrip').dataset.id
  
      }
      fetch('http://localhost:8080/productos')
  .then(response => response.json())
  .then(data => {
    
const resultado = data.find( articulos => articulos.id ==  boton.id ); // objeto traído de acuerdo a id, comparado con boton.id previamente
console.log(resultado)

function myFunction () {
    document.getElementById("exampleModalLongTitle").innerHTML = resultado.nombre;
    document.getElementById("modal-body").innerHTML = "Descripción: "  + resultado.descrip + "\n"  + "Marca: " + resultado.marca + "\n" + "Color: "  + resultado.color  + "\n" + "Precio: " + "$" + resultado.precio + "\n" + "Talla: " + resultado.talla + "\n";
    document.querySelector('.img-loca').setAttribute("src", resultado.archivo)
    //  $('#modal-body img-responsive').attr('src', resultado.archivo);
    

   
} myFunction ()
   } )
   
  };

 
    


    
 
    

