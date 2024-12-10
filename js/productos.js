const productos = [
    {id:1, titulo:"Super Montain", precio:1200, desc:""},
    {id:2, titulo:"Ultra Max", precio:1300, desc:""},
    {id:3, titulo:"Mega Bike", precio:1100, desc:""},
    {id:4, titulo:"Ultra Montain", precio:1400, desc:""},
    {id:5, titulo:"Top Speed", precio:1100, desc:""},
    {id:6, titulo:"Ultra Racing", precio:1400, desc:""}
];

function crearProductos(productos){
    let divProductos = document.querySelector(".productos");
    
    for(let producto of productos) {
        let divProducto = document.createElement("div");
        divProducto.className = "producto";

        divProducto.innerHTML = `
            <img src="/imgs/productos/${producto.id}.jpg" alt="${producto.id}"></img>
            <div class="desc_producto">
                <h3>${producto.titulo}</h3>
                <p>Precio lista: $${producto.precio}</p>
                <button>Agregar</button>
                <button>Ver</button>
            </div>
        `;

        divProducto.querySelector("button").addEventListener("click", () => agregarProducto(producto));
        divProductos.appendChild(divProducto);
    }
}

function agregarProducto(producto){
    // Obtiene de localStorage el elemento carrito, sino existe crea un array vacio
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Obtiene de localStorage el elemento cantidadProductos, sino existe crea una variable con valor 0
    let cantidadProductos = Number(localStorage.getItem("cantidadProductos")) || 0;
    
    // Verifico si el nuevo producto se encuentra en el carrito
    let prodEncontrado = carrito.find(prodCarrito => prodCarrito.id === producto.id);

    // Si existe en el carrito aumenta en 1 su cantidad, sino agrega el producto al carrito con cantidad = 1
    if(prodEncontrado){
        prodEncontrado.cantidad++;
    }else{
        carrito.push(producto);
        producto.cantidad = 1;
    }
    
    // Guarda en localStorage el contenido del array carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Suma la variable cantidadProductos y lo guarda en localStorage
    cantidadProductos++;
    localStorage.setItem("cantidadProductos", JSON.stringify(cantidadProductos));

    actualizarCarrito();
}

crearProductos(productos);
actualizarCarrito();