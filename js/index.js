function actualizarCarrito(){
    let numeroCarrito = document.querySelector("#numero_carrito");
    numeroCarrito.textContent = localStorage.getItem("cantidadProductos") || "0"; 
}

function actualizarLocalStorage(carrito, cantidadProductos){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantidadProductos", JSON.stringify(cantidadProductos));
}

function validarFormulario(event){
    event.preventDefault();

    let nombre = document.getElementById("inp_nombre").value;
    let email = document.getElementById("inp_email").value;
    let mensaje = document.getElementById("txta_mensaje").value;
    let pErrores = document.getElementById("errores");
    
    let errores = "Error al validar el formulario!!!";
    let cantidadErrores = 0;

    // Se verifica que el campo nombre (sin contar los espacios) no este vacio
    if(nombre.trim() === ""){
        errores += "\nNo puede dejar el campo nombre vacio.";
        cantidadErrores++;
    }

    // Se verifica que el campo email (sin contar los espacios) no este vacio
    if(email.trim() === ""){
        errores += "\nNo puede dejar el campo email vacio.";
        cantidadErrores++;
    // Se verifica que el campo email contenga "@" y ".com"    
    }else if(!email.includes("@") || !email.includes(".com")){
        errores += "\nFormato de email invalido.";
        cantidadErrores++;
    }

    // Se verifica que el campo mensaje (sin contar los espacios) no este vacio
    if(mensaje.trim() === ""){
        errores += "\nNo puede dejar el campo mensaje vacio.";
        cantidadErrores++;
    }

    // Si no hubo errores se procede a hacer el envio del formulario
    if(cantidadErrores === 0){
        // Se muestra un mensaje en la página index.html indicando que hubo éxito en la validación del formulario
        pErrores.textContent = "Se ha validado el formulario correctamente!!!";
        pErrores.setAttribute("style", "color: green");
        event.target.submit();
    }
    else{
        // Si hubo 1 o más errores se muestra información sobre el/los error/es en la página index.html (en la sección de contacto)
        pErrores.innerText = errores;
    }
}