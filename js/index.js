function actualizarCarrito(){
    let numeroCarrito = document.querySelector("#numero_carrito");
    numeroCarrito.textContent = Number(localStorage.getItem("cantidadProductos")) || 0; 
}