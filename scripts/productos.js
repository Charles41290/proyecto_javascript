// obtengo los productos almacenados en el archivo libros.json
export const obtenerProductos = async () =>{
    const urlProductos = "data/libros.json"
    let productos;
    try {
        const response = await fetch(urlProductos);
        productos = await response.json();
    } catch (error) {
        console.error(`Archivo ${urlProductos} no encontrado`);
        productos = [];
    }
    return productos;
} 

// función para cargar productos en localStorage
export const cargarStock = async () =>{
    const productos = await obtenerProductos();
    JSON.parse(localStorage.getItem('productos')) || localStorage.setItem('productos', JSON.stringify(productos));
}



