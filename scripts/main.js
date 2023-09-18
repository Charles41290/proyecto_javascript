import {obtenerProductos, cargarStock } from "./productos.js"

// Si el carrito NO está en el storage lo creo
JSON.parse(localStorage.getItem('carrito')) === null && localStorage.setItem('carrito', JSON.stringify([]));
// traigo el carrito del localStorage
let carrito = JSON.parse(localStorage.getItem('carrito'));
const productosStock = JSON.parse(localStorage.getItem("productos"));
//obtengo el input para la busqueda
const busquedaInput = document.getElementById("busqueda_entrada");

const mostrarConfimacion = () =>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado',
        width:300,
        showConfirmButton: false,
        timer: 1500
      })
};

// funcion para agregar al carrito
const agregarACarrito = (idProductoSeleccionado) =>{
    // obtengo el productoSeleccionado de productosStock
    const productoSeleccionado = productosStock.find((producto) => producto.id === idProductoSeleccionado);
    // descontruyo el objeto productoSeleccionado
    const {id, titulo, autor, precio} = productoSeleccionado;
    // verifico si el producto ya se encuentre en el carrito
    const productoEnCarrito = carrito.find(producto => producto.id === idProductoSeleccionado);

    if(!productoEnCarrito){ // si el producto NO está en el carrito lo agrego
        carrito.push({
            id:id,
            titulo:titulo,
            autor: autor,
            precio: precio,
            cantidad: 1
        })
    } else {// si el producto ya se encuentra en el carrito actualizo la cantidad
        // obtengo la posición en la cual se encuentra el producto
        const indiceProductoCarrito = carrito.findIndex((producto) => producto.id === idProductoSeleccionado);
        // obtengo el producto del carrito y acutalizo la cantidad
        carrito[indiceProductoCarrito].cantidad++;
        
    }
    // actualizo el Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarConfimacion();
}


// funcion para renderizar los productos 
/* const renderizarProductos = async () => {
    const productos = await obtenerProductos();
    const productosDiv = document.getElementById("productos_div");
    //productosDiv.innerHTML = "";
    productos.forEach(producto => {
        const {id, titulo, precio, autor, imagen} = producto;
        let div = document.createElement("div");
        div.innerHTML = `
            <div class="card" style="width: 18rem, margin:5px;">
                <img class="card-img-top" src="${imagen}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text"> ${titulo}</p>
                    <p class="card-text"> ${autor}</p>
                    <p class="card-text"> $${precio}</p>
                    <button id = "btn_agregar_carrito${id}" class = "btn btn-primary">Agregar al carrito</button>
                </div>
            </div>`;
        productosDiv.appendChild(div);
        const btnAgregarCarrito = document.getElementById(`btn_agregar_carrito${id}`);
        btnAgregarCarrito.addEventListener('click', () => agregarACarrito(id));
    });
}; */
const renderizarProductos = (productos) => {
    //const productos = await obtenerProductos();
    const productosDiv = document.getElementById("productos_div");
    productosDiv.innerHTML = "";
    productos.forEach(producto => {
        const {id, titulo, precio, autor, imagen} = producto;
        let div = document.createElement("div");
        div.innerHTML = `
            <div class="card" style="width: 18rem, margin:5px;">
                <img class="card-img-top" src="${imagen}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text"> ${titulo}</p>
                    <p class="card-text"> ${autor}</p>
                    <p class="card-text"> $${precio}</p>
                    <button id = "btn_agregar_carrito${id}" class = "btn btn-primary">Agregar al carrito</button>
                </div>
            </div>`;
        productosDiv.appendChild(div);
        const btnAgregarCarrito = document.getElementById(`btn_agregar_carrito${id}`);
        btnAgregarCarrito.addEventListener('click', () => agregarACarrito(id));
    });
};


// obtengo lo que se escribe en el input de busqueda
busquedaInput.addEventListener("keyup", (e) => {
    const productosBusqueda = productosStock.filter((producto) => producto.titulo.toLowerCase().includes(e.target.value));
    if(e.target.value !== ""){
        renderizarProductos(productosBusqueda);
    }else{
        renderizarProductos(productosStock);
    }
    
} )



const app = () =>{
    cargarStock();
    renderizarProductos(productosStock);
    
}

app();