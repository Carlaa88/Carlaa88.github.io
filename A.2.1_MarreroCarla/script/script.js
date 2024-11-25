


function cambiar_modo()
{
    const modoActual = document.body.getAttribute ("class");

    if (modoActual === "modo-diurno") {
        document.body.setAttribute("class", "modo-nocturno");
    } else if (modoActual === "modo-nocturno") {
        document.body.setAttribute("class", "modo-diurno");
    } else if (modoActual === "modo-diurno-altoContraste") {
        document.body.setAttribute("class", "modo-nocturno-altoContraste");
    } else if (modoActual === "modo-nocturno-altoContraste") {
        document.body.setAttribute("class", "modo-diurno-altoContraste");
    }
}



function cambiar_contraste()
{
    const modoActual = document.body.getAttribute ("class");

    if(modoActual== "modo-diurno") {
        document.body.setAttribute("class", "modo-diurno-altoContraste");
    } else if (modoActual == "modo-nocturno") {
        document.body.setAttribute("class", "modo-nocturno-altoContraste")
     } else if (modoActual === "modo-diurno-altoContraste") {
    document.body.setAttribute("class", "modo-diurno");
    } else if (modoActual === "modo-nocturno-altoContraste") {
        document.body.setAttribute("class", "modo-nocturno");
    }
}


function desplegar() {
    const contenidoCompleto = document.getElementById("contenidoCompleto");
    const leerMas = document.getElementById("leerMas");
    const leerMenos = document.getElementById("leerMenos");
    
    // Alterna entre mostrar y ocultar el contenido completo
    if (contenidoCompleto.style.display === "none") {
        contenidoCompleto.style.display = "block"; // Muestra el contenido completo
        leerMas.style.display = "none";            // Oculta "Leer más..."
        leerMenos.style.display = "inline";        // Muestra "Leer menos..."
    } else {
        contenidoCompleto.style.display = "none";  // Oculta el contenido completo
        leerMas.style.display = "inline";          // Muestra "Leer más..."
        leerMenos.style.display = "none";          // Oculta "Leer menos..."
    }
}
