function cargarCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let divCarrito = document.querySelector(".carrito");
    let totalCompra = 0;

    divCarrito.innerHTML = "";

    if(carrito.length > 0){
        for(let producto of carrito){
            let divDetalle = document.createElement("div");
            divDetalle.className = "detalle";
            
            divDetalle.innerHTML = `
                <div class="prod_carrito">
                    <img src="./imgs/productos/${producto.id}.jpg" alt="${producto.id}">
                    <p>${producto.titulo}</p>
                </div>
                    
                <p>Cantidad: ${producto.cantidad}</p>
                    
                <div class="botones">
                    <button id="btn_agregar">+</button> 
                    <button id="btn_restar">-</button>
                </div>

                <p class="subtotal">Subtotal: $${producto.cantidad * producto.precio}</p>
            `;
            
            totalCompra += producto.cantidad * producto.precio;
            
            divDetalle.querySelector("#btn_agregar").addEventListener("click", () => sumarProducto(carrito, producto));
            divDetalle.querySelector("#btn_restar").addEventListener("click", () => restarProducto(carrito, producto));
            divCarrito.appendChild(divDetalle);
        }

        let pTotal = document.createElement("p");
        pTotal.id = "parrafo_total";
        pTotal.textContent = "Total carrito: $" + totalCompra;
        divCarrito.appendChild(pTotal);

    }else{
        divCarrito.innerHTML = `
            <p id="parrafo_sin_prods">No hay productos para mostrar</p>
        `;
    }
    
}

function sumarProducto(carrito, producto){
    let cantidadProductos = Number (localStorage.getItem("cantidadProductos"));
    
    producto.cantidad++;
    cantidadProductos++;
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantidadProductos", JSON.stringify(cantidadProductos));
    
    actualizarCarrito();
    cargarCarrito();
}

function restarProducto(carrito, producto){
    let cantidadProductos = Number (localStorage.getItem("cantidadProductos"));

    producto.cantidad--;
    cantidadProductos--;

    if(producto.cantidad == 0){
       carrito = carrito.filter(prod => prod !== producto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantidadProductos", JSON.stringify(cantidadProductos));

    actualizarCarrito();
    cargarCarrito();
}

cargarCarrito();
actualizarCarrito();

