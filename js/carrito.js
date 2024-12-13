function cargarCarrito(){
    // Obtiene de localStorage el elemento carrito, sino existe crea un array vacio
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let divCarrito = document.querySelector(".carrito");
    let totalCompra = 0;

    divCarrito.innerHTML = "";

    // Se generan en la página pagina_carrito.html los productos agregados al carrito, obteniendolos desde el Local Storage
    if(carrito.length > 0){
        for(let producto of carrito){
            // Se crea un div que contendrá al producto, junto con un subtotal y botones para realizar algunas acciones
            let divDetalle = document.createElement("div");
            divDetalle.className = "detalle";
            
            divDetalle.innerHTML = `
                <div class="prod_carrito">
                    <img src="./imgs/productos/${producto.id}.jpg" alt="${producto.id}">
                    <p>${producto.titulo} - $${producto.precio}</p>
                </div>
                
                <div class="botones">
                    <button class="btn_agregar">+</button> 
                    <p style="display:inline-block;">${producto.cantidad}</p>
                    <button class="btn_restar">-</button>
                </div>

                <p class="subtotal">Subtotal: $${producto.cantidad * producto.precio}</p>

                <span class="material-symbols-outlined icono_eliminar">delete</span>
            `;
            
            // Se calcula el precio total de los productos existentes en el carrito
            totalCompra += producto.cantidad * producto.precio;
            
            // Se agregan eventos a cada botón de cada elemento divDetalle
            divDetalle.querySelector(".btn_agregar").addEventListener("click", () => sumarProducto(carrito, producto));
            divDetalle.querySelector(".btn_restar").addEventListener("click", () => restarProducto(carrito, producto));
            divDetalle.querySelector(".icono_eliminar").addEventListener("click", () => eliminarProducto(carrito, producto));
            
            // Se agrega div (div que muestra a cada producto del carrito) divDetalle al div divCarrito que se encuentra en la página
            // pagina_carrito.html
            divCarrito.appendChild(divDetalle);
        }

        // Se genera un parrafo para mostrar el total, y se lo agrega al div divCarrito
        let pTotal = document.createElement("p");
        pTotal.innerHTML = `<p id="parrafo_total">Total carrito: $${totalCompra}</p>`;
        divCarrito.appendChild(pTotal);

    }else{
        // En caso de no existir productos en el carrito muestra un mensaje en la página
        divCarrito.innerHTML = `
            <p id="parrafo_sin_prods">No hay productos para mostrar</p>
        `;
    }
    
}

function sumarProducto(carrito, producto){
    // Se obtiene cantidad total de productos desde Local Storage
    let cantidadProductos = Number(localStorage.getItem("cantidadProductos")) || 0;
    
    // Aumenta en 1 la cantidad del objeto producto y la cantidad total obtenida del Local Storage 
    producto.cantidad++;
    cantidadProductos++;
    
    // Actualiza los items carrito y cantidadProductos del Local Storage
    actualizarLocalStorage(carrito, cantidadProductos);
    // Actualiza el contador de productos que se visualiza en la parte del header de la página
    actualizarCarrito();
    // Actualiza los productos que se muestran en la página
    cargarCarrito();
}

function restarProducto(carrito, producto){
    // Se obtiene cantidad total de productos desde Local Storage
    let cantidadProductos = Number (localStorage.getItem("cantidadProductos")) || 0;
    
    // Resta en 1 la cantidad del objeto producto y la cantidad total obtenida del Local Storage
    producto.cantidad--;
    cantidadProductos--;
    
    // Si la cantidad del producto es 0, se elimina (usando función filter) del carrito
    if(producto.cantidad == 0){
        carrito = carrito.filter(prod => prod !== producto);
    }
    
    // Actualiza los items carrito y cantidadProductos del Local Storage
    actualizarLocalStorage(carrito, cantidadProductos);
    // Actualiza el contador de productos que se visualiza en la parte del header de la página
    actualizarCarrito();
    // Actualiza los productos que se muestran en la página
    cargarCarrito();
}

function eliminarProducto(carrito, producto){
    // Se obtiene cantidad total de productos desde Local Storage
    let cantidadProductos = Number (localStorage.getItem("cantidadProductos")) || 0;
    
    // Se resta de la cantidad total de productos la cantidad existen del producto que se va a eliminar
    cantidadProductos -= producto.cantidad;
    
    // Se elimina el producto del carrito usando función filter
    carrito = carrito.filter(prod => prod !== producto);
    
    // Actualiza los items carrito y cantidadProductos del Local Storage
    actualizarLocalStorage(carrito, cantidadProductos);
    // Actualiza el contador de productos que se visualiza en la parte del header de la página
    actualizarCarrito();
    // Actualiza los productos que se muestran en la página
    cargarCarrito();
}

cargarCarrito();
actualizarCarrito();

