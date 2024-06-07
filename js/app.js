//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

//Delay para que todos los elementos de la página cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
     //Agregar funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(let i=0;i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agregar funcionalidad al botón sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(let i=0;i<botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agregar funcionalidad al botón restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(let i=0;i<botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregar funcionalidad al botón Agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(let i=0; i<botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregar funcionalidad al botón Comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminar todos los elementos del carrito y ocultarlo
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Función que controla el botón al clic de agregar al carrito
function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Función que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '50%';
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controla que el si el item que intenta ingresar se encuentra en el carrito sume la cantidad
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i=0;i < nombresItemsCarrito.length;i++)
        {
        if(nombresItemsCarrito[i].innerText==titulo)
            {   
            let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
            cantidadActual++;    
            //alert("El item ya se encuentra en el carrito, deseas agregar otro?");
            //return;
            }
        }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="100px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="bi bi-dash-lg restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="bi bi-plus-lg sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar" >
                <i class="bi bi-trash2"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregar la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregar la funcionalidad restar cantidad del nuevo item
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregar la funcionalidad sumar cantidad del nuevo item
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizar total
    actualizarTotalCarrito();
}
//Aumentar en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Restar en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Eliminar el item seleccionado del carrito
function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizar el total del carrito
    actualizarTotalCarrito();

    //función que controla si hay elementos en el carrito
    //Si no hay oculto el carrito
    ocultarCarrito();
}
//Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        let items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizar el total de Carrito
function actualizarTotalCarrito(){
    //seleccionar el contenedor carrito
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    //recorrer cada elemento del carrito para actualizar el total
    for(let i=0; i< carritoItems.length;i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitar el simbolo peso y el punto de miles.
        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = (Math.round(total * 100)/100);

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}



const productos = [
    
    {
        id: "590774",
        titulo: "falda corta dorada",
        imagen: ".img/falda_corta_dorada.png",
        precio: 23999,
        precioItemAnt: 29999,
        sku:590774

    },
    {
        id: "591721",
        titulo: "pantalón cargo verde",
        imagen: ".img/jean_bota_Amp_verde.png",
        precio: 83999,
        sku: 591721
    },
    {
        id: "597326",
        titulo: "chaqueta animal print",
        imagen: ".img/chaqueta_animal_print.png",
        precio: 95000,
        sku: 597326
    },
    {
        id: "597489",
        titulo: "Chaqueta denim azul medio",
        imagen: "img/chaqueta_jean_azul_medio.png",
        precio: 88000,
        sku: 597489
    },
    {
        id: "596403",
        titulo: "jean bota amplia azul",
        imagen: ".img/jean_bota_amplia.png",
        precio: 79000,
        sku: 596403
    },
   {
        id: "593867",
        titulo: "vestido largo marfil",
        imagen: "./img/vestido_largo_marfil.png",
        precio: 75500,
        sku: 593867
    },
    {
        id: "599010",
        titulo: "vestido corto denim azul",
        imagen: "./img/vestido_corto_jean_2.png",
        precio: 71900,
        sku: 599010
    },
    {
        id: "597651",
        titulo: "vestido largo multicolor",
        imagen: "./img/vestido_largo_multicolor.png",
        precio: 79800,
        sku: 597651
    },
    {
        id: "597654",
        titulo: "conjunto croptop - pantalón lila",
        imagen: "./img/conjunto_croptop_pantalon.png",
        precio: 75800,
        sku: 597654
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        precio: 1000,
        sku: 59
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        precio: 1000,
        sku: 91
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        precio: 1000,
        sku: 17
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        precio: 1000,
        sku: 72
    },
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        precio: 1000,
        sku: 21
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        precio: 1000,
        sku: 1
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        precio: 1000,
        sku: 5
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        precio: 1000,
        sku: 9
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        precio: 1000,
        sku: 7
    }
];

const contenedorItems=document.querySelector("#contenedorItems");




function cargarItems ()
{ 
    productos.forEach(productos => {

        let div= document.createElement("div");
        div.classList.add("productos");
        div.innerHTML= `
            <img class="img-item" src="${productos.imagen}" alt="${productos.titulo}" class="img-item">
            <span class="titulo-item">"${productos.titulo}"</span>
                <div class="precio_items">
                    <p class="precio-item"> $${productos.precio}</p>
                    <p class="precio-item-ant"> $${productos.precioItemAnt}}</p>
                </div>
                <h4 id="item-info-sku">
                <strong><em>${productos.sku}</em></strong>
            </h4>
            <button class="boton-item" id="${productos.id}">Añadir al Carrito</button>
            `;

            contenedorProductos.append(div);
        }
    )
}

cargarItems ();