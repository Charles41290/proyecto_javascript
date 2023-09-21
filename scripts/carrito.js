// función para obtener el total de productos y el total a pagar
const obtenerTotales = (carrito) => {
    const totales = document.getElementById("totales");
    totales.innerHTML = "";
    const filaTotales = document.createElement("tr");
    const totalUnidades = carrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    const totalAPagar = carrito.reduce((acu, producto) => acu + producto.cantidad * producto.precio, 0);
    filaTotales.innerHTML = `
        <th><b>Totales</b></th>
        <td>Total de productos: ${totalUnidades}</td>
        <td></td>
        <td>Total a pagar: $${totalAPagar}</td>
    `;
    totales.append(filaTotales);
};

// se ejecuta al finalizar la compra
const limpiarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify([]));
    renderizarCarrito();
}

// se ejecuta al haber presionado el btn de finalizar compra
const finalizarCompra = () => {
    Swal.fire('Gracias por su compra');
    limpiarCarrito();
};

const mostrarNegacion = () => {
    Swal.fire({
        icon: 'error',
        title: 'Disculpe... producto sin stock',
    });
};

// se ejecuta cuando se presiona el boton "+" para agregar productos al carrito
const agregarACarrito = (id, carrito) => {
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id === id);
    const indiceProductosStock = productosStock.findIndex(producto => producto.id === id);
    const hayStock = productosStock[indiceProductosStock].stock > 0 ? true : false;
    // verifico que haya stock 
    if (hayStock) {
        // actualizo la cantidad del producto 
        carrito[indiceProductoCarrito].cantidad++;
        // actualizo el array carrito en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //actualizo el stock del producto
        productosStock[indiceProductosStock].stock--;
        renderizarCarrito();
    } else {
        mostrarNegacion();
    }
    // actualizo el array productos en el localStorage
    localStorage.setItem("productos", JSON.stringify(productosStock));
}

// se ejecuta cuando se presiona el boton "-" para agregar eliminar productos del carrito
const eliminarDeCarrito = (id, carrito) => {
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id === id);
    carrito[indiceProductoCarrito].cantidad--;
    if (carrito[indiceProductoCarrito].cantidad === 0) {
        carrito.splice(indiceProductoCarrito, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// renderiza los productos agregados al carrito
const renderizarCarrito = () => {
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
    } else {
        carritoItems.innerHTML = "";
        carrito.forEach((producto) => {
            const filaItems = document.createElement("tr");
            const { id, titulo, cantidad, precio } = producto;
            filaItems.innerHTML = `
                <th scope="row">${titulo}</th>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td>${precio * cantidad}</td>
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
        // obtengo los totales de productos y el total a pagar y lo agrego al footer de la tabla
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

//obtengo el stock de productos del localStorage
const productosStock = JSON.parse(localStorage.getItem("productos"));

renderizarCarrito();