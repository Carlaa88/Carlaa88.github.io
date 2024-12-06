// DOM STATIC SELECTOR 
const DOM = {
    nombreUsuario: document.getElementById("nombreUsuario"),
    contrasena: document.getElementById("contrasena"),
    mostrarContrasena: document.getElementById("mostrarContrasena"),
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    telefono: document.getElementById("telefono"),
    codigoPostal: document.getElementById("codigoPostal"),
    dniNie: document.getElementById("DniNie"),
    tipoDocumento: document.getElementById("tipoDocumento"),
    cuentaComo: document.getElementsByName("CuentaComo"),
    anioNacimiento: document.getElementById("AnioNacimiento"),
    aficiones: document.querySelectorAll(".aficiones-flex input[type=checkbox]"),
    publicacionTitulo: document.getElementById("PublicacionTitulo"),
    publicacionDescripcion: document.getElementById("PublicacionDescripcion"),
    contadorTitulo: document.getElementById("contador-titulo"),
    contadorDescripcion: document.getElementById("contador-descripcion"),
    form: document.getElementById("form"),
    contenedorErrores: document.querySelector(".contenedor2"),
};
  
(function(){
    //Aqui-recupera la colección del localStorage y muestralo en la tabla
    DOM.form.addEventListener("submit", enviar);
})()


/*Mostrar contraseña*/ 
document.addEventListener ("change", function() {
    let checkbox = document.getElementById("mostrarContrasena");
    let contrasena = document.getElementById("contrasena");
    contrasena.type = checkbox.checked ? 'text': 'password';
    
})

/* Validación DNI Y NIE*/
document.addEventListener("input", function() {

    const letrasDNI = "T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E".split(",");

    // Obtener el valor del campo de texto dentro del evento
    const DniNie = document.getElementById("DniNie");  // Corregido el error tipográfico
    const dniNieValue = DniNie.value;

    // Obtener el tipo de documento seleccionado dentro del evento
    const tipoDocumento = document.getElementById("tipoDocumento").value;

    // Expresiones regulares para validar el DNI y el NIE
    const regexDni = /^\d{8}[A-Za-z]$/;  // Formato DNI: 8 dígitos seguidos de una letra
    const regexNie = /^[XYZ]\d{7}[A-Za-z]$/;  // Formato NIE: X, Y, o Z seguido de 7 dígitos y una letra

     // Función para validar el DNI
     function validarDNI(dni) {
        const numero = parseInt(dni.slice(0, -1), 10); // Extraer número
        const letra = dni.slice(-1).toUpperCase(); // Extraer letra
        return letrasDNI[numero % 23] === letra; // Validar letra
    }

    // Función para validar el NIE
    function validarNIE(nie) {
        // Sustituir X, Y, Z por 0, 1, 2 respectivamente
        const inicial = nie[0].toUpperCase();
        const numeroConLetra = 
              inicial === 'X' ? '0' + nie.slice(1) : 
              inicial === 'Y' ? '1' + nie.slice(1) : 
              inicial === 'Z' ? '2' + nie.slice(1) : nie;

        return validarDNI(numeroConLetra); // Validar como si fuera DNI
    }

    // Validar DNI o NIE según el tipo seleccionado
    const isValid = tipoDocumento === "DNI" 
        ? regexDni.test(dniNieValue) && validarDNI(dniNieValue)
        : tipoDocumento === "NIE" 
        ? regexNie.test(dniNieValue) && validarNIE(dniNieValue)
        : false;

    // Mostrar u ocultar el mensaje de error
    document.getElementById("error-dni").style.display = isValid ? "none" : "block";
});


/*Generar los años*/
document.addEventListener("DOMContentLoaded", function() {
    const anioSelect = document.getElementById("AnioNacimiento");

    // Rango de años de 1921 a 2010
    for (let year = 1921; year <= 2010; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        anioSelect.appendChild(option);
    }

});

/*Funcionamineto del contador*/
document.addEventListener("DOMContentLoaded", function() {

    // Función para actualizar el contador de caracteres
    function ActualizarContador(ElemtInput, ContadorId, MaxLongitud) {
        // Obtener la longitud actual del texto ingresado
        const LongitudActual = ElemtInput.value.length;
        
        // Obtener el contador de caracteres
        const contador = document.getElementById(ContadorId);
        
        // Actualizar el texto del contador
        contador.textContent = `${LongitudActual}/${MaxLongitud}`;
    }
    
    
    // Función para mostrar u ocultar el mensaje de error
    function mostrarError(campo, spanError, esValido) {
        if (!esValido) {
            campo.classList.add("invalido");
            spanError.style.display = "block";
        } else {
            campo.classList.remove("invalido");
            spanError.style.display = "none";
        }
    }

    // Obtener los elementos del título y la descripción
    const tituloInput = document.getElementById("PublicacionTitulo");
    const descripcionTextarea = document.getElementById("PublicacionDescripcion");

    
    // Verificar si los elementos existen
    if (tituloInput) {
        // Evento para el campo Título
        tituloInput.addEventListener("input", function () {
            // Actualizar el contador
            ActualizarContador(tituloInput, "contador-titulo", 15);

            // Validar que el título tenga entre 4 y 15 caracteres
            const valorTitulo = tituloInput.value.trim();
            const esValidoTitulo = valorTitulo.length >= 4 && valorTitulo.length <= 15;
            const spanErrorTitulo = document.getElementById("error-titulo");

            // Mostrar u ocultar el mensaje de error
            mostrarError(tituloInput, spanErrorTitulo, esValidoTitulo);
        });
    }

    if (descripcionTextarea) {
        // Evento para el campo Descripción
        descripcionTextarea.addEventListener("input", function () {
            // Actualizar el contador
            ActualizarContador(descripcionTextarea, "contador-descripcion", 120);

            // Validar que la descripción tenga entre 4 y 120 caracteres
            const valorDescripcion = descripcionTextarea.value.trim();
            const esValidoDescripcion = valorDescripcion.length >= 4 && valorDescripcion.length <= 120;
            const spanErrorDescripcion = document.getElementById("error-descripcion");

            // Mostrar u ocultar el mensaje de error
            mostrarError(descripcionTextarea, spanErrorDescripcion, esValidoDescripcion);
        });
    }
});


/*Controlar que mínimo se seleccionen dos aficiones */ 
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos todos los checkboxes con la clase .aficion
    const aficionesCheckboxes = document.querySelectorAll('.aficiones-flex input[type=checkbox]'); // Cambié el selector a .aficiones-flex
    const errorSpan = document.getElementById("aficiones-error");

    // Función para validar si al menos dos checkboxes están seleccionados
    function validarAficiones() {
        let contadorSelecciones = 0;
        
        // Recorremos todos los checkboxes
        aficionesCheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                contadorSelecciones++;
            }
        });
        
        // Si se han seleccionado menos de 2 opciones, mostramos el error
        if (contadorSelecciones < 2) {
            errorSpan.style.display = 'block';
        } else {
            errorSpan.style.display = 'none';
        }
    }

    // Añadir un evento de 'change' para cada checkbox
    aficionesCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", validarAficiones);
    });
});

/*Validación para los inputs*/
document.addEventListener("input", function (event) {
    const campo = event.target;
    const id = campo.id;
    const valor = campo.value.trim();
    const spanError = document.querySelector(`#error-${id}`);
    let esValido = true;

    switch (id) {
        case "nombreUsuario":
            esValido = campo.validity.valid; // Se usa el validador nativo
            break;
        case "contrasena":
            esValido = campo.validity.valid; // Valida longitud y patrón
            break;
        case "nombre":
            esValido = campo.validity.valid;
            break;
        case "apellidos":
            esValido = campo.validity.valid;
            break;
        case "telefono":
            const regexTelefono = /^\+34\s?\d{9}$/;
            esValido = regexTelefono.test(valor);
            break;
        case "codigoPostal":
            const regexCodigoPostal = /^38\d{3}$/;
            esValido = regexCodigoPostal.test(valor);
            break;
        default:
            break;
    }

    // Mostrar u ocultar mensaje de error basado en la validez
    if (!esValido) {
        campo.classList.add("invalido");
        spanError.style.display = "block"; // Muestra el `span` (mensaje ya definido en HTML)
    } else {
        campo.classList.remove("invalido");
        spanError.style.display = "none"; // Oculta el `span` si no hay error
    }
});

// Validación específica para "Cuenta Como"
document.querySelectorAll('input[name="CuentaComo"]').forEach(radio => {
    radio.addEventListener("change", function () {
        const radios = document.querySelectorAll('input[name="CuentaComo"]');
        const spanError = document.querySelector("#error-cuentacomo");

        // Verificar si al menos uno está seleccionado
        const esValido = Array.from(radios).some(radio => radio.checked);

        if (!esValido) {
            spanError.style.display = "block"; // Muestra mensaje de error
        } else {
            spanError.style.display = "none"; // Oculta mensaje de error
        }
    });
});

/*Mensajes de validación en el lado derecho*/
function mostrarErroresEnContenedor() {
    // Limpiar cualquier mensaje anterior en el contenedor
    DOM.contenedorErrores.innerHTML = "";

    // Validar y mostrar los mensajes de error de cada campo
    const camposValidos = [
        { campo: DOM.nombreUsuario, nombre: "Nombre de Usuario" },
        { campo: DOM.contrasena, nombre: "Contraseña" },
        { campo: DOM.nombre, nombre: "Nombre" },
        { campo: DOM.apellidos, nombre: "Apellidos" },
        { campo: DOM.telefono, nombre: "Teléfono" },
        { campo: DOM.codigoPostal, nombre: "Código Postal" },
        { campo: DOM.dniNie, nombre: "DNI/NIE" },
        { campo: DOM.anioNacimiento, nombre: "Año de Nacimiento" },
        { campo: DOM.publicacionTitulo, nombre: "Título de Publicación" },
        { campo: DOM.publicacionDescripcion, nombre: "Descripción" },
    ];

    // Recorrer todos los campos y extraer los mensajes de validación
    camposValidos.forEach(({ campo, nombre }) => {
        // Si el campo no es válido, mostrar el mensaje
        if (!campo.validity.valid) {
            const mensaje = campo.validationMessage;

            // Crear un elemento de error para el contenedor
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-item");
            errorDiv.textContent = `${nombre}: ${mensaje}`;
            DOM.contenedorErrores.appendChild(errorDiv); // Añadir al contenedor
        }
    });

    // Validación de aficiones (al menos dos seleccionadas)
    const aficionesSeleccionadas = Array.from(DOM.aficiones).filter(input => input.checked).length;
    if (aficionesSeleccionadas < 2) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-item");
        DOM.contenedorErrores.appendChild(errorDiv); // Añadir al contenedor
    }

    // Validación para "Cuenta Como"
    const cuentaComoSeleccionada = Array.from(DOM.cuentaComo).some(radio => radio.checked);
    if (!cuentaComoSeleccionada) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-item");
        DOM.contenedorErrores.appendChild(errorDiv); // Añadir al contenedor
    }
}

// Llamamos a esta función al final del submit para mostrar los errores
function enviar(e) {
    e.preventDefault(); // Evita el envío del formulario antes de validarlo
    let formIsValid = true;

    // Validación de los campos
    const camposValidos = [
        { campo: DOM.nombreUsuario },
        { campo: DOM.contrasena },
        { campo: DOM.nombre },
        { campo: DOM.apellidos },
        { campo: DOM.telefono },
        { campo: DOM.codigoPostal },
        { campo: DOM.dniNie },
        { campo: DOM.anioNacimiento },
        { campo: DOM.publicacionTitulo },
        { campo: DOM.publicacionDescripcion }
    ];

    // Comprobación de los campos de texto
    camposValidos.forEach(({ campo }) => {
        if (campo.validationMessage) {
            formIsValid = false; // Si hay algún error, formIsValid será false
        }
    });

    // Validación de aficiones (al menos dos seleccionadas)
    const aficionesSeleccionadas = Array.from(DOM.aficiones)
        .filter(input => input.checked)  // Filtra las aficiones seleccionadas
        .map(input => input.value);  // Mapea a los valores seleccionados

    if (aficionesSeleccionadas.length < 2) {
        formIsValid = false;
    }

    // Validación de "Cuenta Como"
    const cuentaComoSeleccionada = Array.from(DOM.cuentaComo).some(radio => radio.checked);
    if (!cuentaComoSeleccionada) {
        formIsValid = false;
    }

    // Si el formulario es válido, agregamos las aficiones seleccionadas al campo oculto
    if (formIsValid) {
        // Coloca las aficiones seleccionadas en el campo oculto
        document.getElementById("aficiones-hidden").value = aficionesSeleccionadas.join(',');

        // Finalmente, enviamos el formulario
        DOM.form.submit();  // Enviar el formulario
    } else {
        mostrarErroresEnContenedor();  // Mostrar los errores en el contenedor
    }
}
