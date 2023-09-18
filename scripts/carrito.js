// función para obtener el total de productos y el total a pagar
const obtenerTotales = (carrito) => {
    const totales = document.getElementById("totales");
    totales.innerHTML = "";
    const filaTotales = document.createElement("tr");
    const totalUnidades = carrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    const totalAPagar = carrito.reduce((acu, producto) => acu + producto.cantidad*producto.precio, 0);
    filaTotales.innerHTML = `
        <th><b>Totales</b></th>
        <td>Total de productos: ${totalUnidades}</td>
        <td></td>
        <td>Total a pagar: $${totalAPagar}</td>
    `;
    totales.append(filaTotales);
};

const limpiarCarrito = () =>{
    localStorage.setItem("carrito", JSON.stringify([]));
    renderizarCarrito();
}

const finalizarCompra = () => {
    Swal.fire('Gracias por su compra');
    limpiarCarrito();
};

const agregarACarrito = (id,carrito) => {
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id === id);
    carrito[indiceProductoCarrito].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

const eliminarDeCarrito = (id, carrito) => {
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id === id);
    carrito[indiceProductoCarrito].cantidad--;
    if (carrito[indiceProductoCarrito].cantidad === 0) {
        carrito.splice(indiceProductoCarrito, 1);   
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

const renderizarCarrito = () =>{
    // obtengo el carrito almacenado en el localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const carritoDiv = document.getElementById("carrito_div");
    const botonesDiv = document.getElementById("botones_div");
    // carrito_items corresponde al ID del <tbody>
    const carritoItems = document.getElementById("carrito_items");
    // valido que el carrito tenga elementos
    if (carrito.length === 0) {
        carritoDiv.innerHTML = `
            <h1>No hay productos en el carrito</h1>`;
        const tablaProductos = document.getElementById("tabla_productos");
        tablaProductos.innerHTML = "";
        botonesDiv.innerHTML = `
            <a href = "../index.html">
                <button type="button" class="btn btn-secondary">Volver a la tienda</button>
            </a>`;
    }else{
        carritoItems.innerHTML = "";
        carrito.forEach((producto) => {
            const filaItems = document.createElement("tr");
            const {id, titulo, cantidad, precio} = producto;
            filaItems.innerHTML = `
                <th scope="row">${titulo}</th>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td>${precio*cantidad}</td>
                <td>
                    <button id = 'agregarProducto${id}' class = 'btn btn-success'>+</button>
                    <button id = 'eliminarProducto${id}' class = 'btn btn-danger'>-</button>
                </td>`;
            carritoItems.append(filaItems); 
            const btnAgregar = document.getElementById(`agregarProducto${id}`);  
            const btnEliminar = document.getElementById(`eliminarProducto${id}`);
            btnAgregar.addEventListener("click", () => agregarACarrito(id, carrito));
            btnEliminar.addEventListener("click", () => eliminarDeCarrito(id, carrito));
        });
        obtenerTotales(carrito);
        botonesDiv.innerHTML = `
            <button type="button" class="btn btn-primary" id="btn_finalizar">Finalizar compra</button>
            <a href = "../index.html">
                <button type="button" class="btn btn-secondary">Continuar comprando</button>
            </a>`
        const btnFinalizarCompra = document.getElementById("btn_finalizar");
        btnFinalizarCompra.addEventListener("click", finalizarCompra);
    }
};

renderizarCarrito();