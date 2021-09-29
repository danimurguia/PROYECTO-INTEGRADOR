function agregarItem(item){
  const itemHTML = '<div class="col"> <div class="card h-100">' +
 '<img src="+item.ing+" class="card-img-top" height="250px" alt="image">' +
'<div class="card-body text-center">'+
'<h5 class="card-title"> +item.name+"</h5>' +
'<ul class="list-group list-group-flush" id="ulCards"> <li class="list-group-item"> +item.precio+ </li>'+
'<li class="list-group-item">'+
'<div class="contenedoriconosTarjetas">'+
'<div class="text-center justify-content-center">'+
'<a href="#" target="_blank" class="izquierda"><i class="fas fa-cart-plus fa-2x"></i></a>'+
'<button type="button" class="btn btn-primary">Ver más...</button>'+
'<a href="#" target="_blank" class="derecha"><i class="fas fa-heart fa-2x" ></i></a>'+
'</div></div>'+
'</li></ul>' +
'</div>'+
'</div></div></div>';
const itemsContainer = document.getElementById("listaBikinis");
itemscontainer.innerHTML += itemHTML;
}

addItem({ 'name': 'Mancuernas', 'img': '\Imagenes/productos/1.jpg', 'precio': '450' });
addItem({ 'name': 'Ligas', 'img': '\Imagenes/productos/1.jpg', 'precio': '600' });
addItem({ 'name': 'Polainas', 'img': '\Imagenes/productos/1.jpg', 'precio': '350' });
addItem({ 'name': 'Platillos', 'img': '\Imagenes/productos/1.jpg', 'precio': '250' });
addItem({ 'name': 'Proteína', 'img': '\Imagenes/productos/1.jpg', 'precio': '800' });
addItem({ 'name': 'Palyera Mujer', 'img': '\Imagenes/productos/1.jpg', 'precio': '700' });
addItem({ 'name': 'Playera Hombre', 'img': '\Imagenes/productos/1.jpg', 'precio': '700' });
addItem({ 'name': 'Escaleras', 'img': '\Imagenes/productos/1.jpg', 'precio': '250' });
addItem({ 'name': 'Conos', 'img': '\Imagenes/productos/1.jpg', 'precio': '200' });
addItem({ 'name': 'Sogas', 'img': '\Imagenes/productos/1.jpg', 'precio': '600' });
addItem({ 'name': 'Solbatos', 'img': '\Imagenes/productos/1.jpg', 'precio': '40' });