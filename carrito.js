let carrito = [];
let metodoSeleccionado = null;

// ELEMENTOS
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const metodosPago = document.getElementById("metodosPago");
const formularioPago = document.getElementById("formularioPago");
const carritoBox = document.getElementById("carrito");

// MOSTRAR / OCULTAR CARRITO
function toggleCarrito() {
    carritoBox.classList.toggle("activo");
}

// AGREGAR AL CARRITO
function agregarCarrito(nombre, idTalla, idColor, precio) {
    const talla = document.getElementById(idTalla).value;
    const color = document.getElementById(idColor).value;

    if (!talla || !color) {
        alert("Selecciona talla y color");
        return;
    }

    carrito.push({ nombre, talla, color, precio });
    actualizarCarrito();
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} (${item.talla}, ${item.color})
            <span>$${item.precio}</span>
        `;
        listaCarrito.appendChild(li);
    });

    // DESCUENTO 10% SI 3 O MÁS PRENDAS
    if (carrito.length >= 3) {
        total = total * 0.9;
    }

    totalSpan.textContent = total.toFixed(0);

    // MOSTRAR MÉTODOS DE PAGO SOLO SI HAY PRODUCTOS
    metodosPago.style.display = carrito.length > 0 ? "block" : "none";
}

// VACIAR CARRITO
function vaciarCarrito() {
    carrito = [];
    listaCarrito.innerHTML = `<li class="vacio">No hay productos aún</li>`;
    totalSpan.textContent = "0";
    metodosPago.style.display = "none";
    formularioPago.style.display = "none";
}

// PAGO POR INSTAGRAM
function pagarInstagram() {
    const mensaje = encodeURIComponent(
        "Hola, quiero comprar estas prendas:\n" +
        carrito.map(p => `- ${p.nombre} (${p.talla}, ${p.color})`).join("\n") +
        `\nTotal: $${totalSpan.textContent} MXN`
    );

    window.open(
        "https://www.instagram.com/jams_elite_sport?igsh=dWNxeDRmeWt2MHo3",
        "_blank"
    );
}

// MOSTRAR FORMULARIO PARA HSBC / OXXO
function mostrarFormulario(metodo) {
    metodoSeleccionado = metodo;
    formularioPago.style.display = "block";
}

// FINALIZAR PAGO (MOSTRAR DATOS)
function finalizarPago() {
    const nombre = document.getElementById("nombre").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const correo = document.getElementById("correo").value;

    if (!nombre || !whatsapp || !correo) {
        alert("Completa todos los datos");
        return;
    }

    let datosPago = "";

    if (metodoSeleccionado === "hsbc") {
        datosPago = `
BANCO: HSBC
CUENTA: 4213 1661 6283 2285
NOMBRE: Alejandro Molina 
        `;
    }

    if (metodoSeleccionado === "oxxo") {
        datosPago = `
PAGO EN OXXO
REFERENCIA: 4213 1661 6283 2285
        `;
    }

    alert(
        `Gracias por tu compra ${nombre} 💛\n\n` +
        `Total a pagar: $${totalSpan.textContent} MXN\n\n` +
        datosPago +
        `\n\nEnvía tu comprobante por Instagram.`
    );
}
