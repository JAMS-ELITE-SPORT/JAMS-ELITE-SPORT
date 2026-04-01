let carrito = [];
let metodoSeleccionado = null;

// STOCK POR PRODUCTO (puedes cambiar cantidades)
let stock = {
    "Licra Deportiva": 10,
    "Licra Deportiva Premium": 10,
    "Top Deportivo": 10,
    "Top Deportivo Elite": 10
};

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

    // 🔥 CONTAR CUÁNTAS VECES YA ESTÁ ESA PRENDA
    let cantidad = carrito.filter(item => item.nombre === nombre).length;

    if (cantidad >= 3) {
        alert("Solo puedes agregar máximo 3 piezas de esta prenda");
        return;
    }

    // 🔥 VALIDAR STOCK
    if (stock[nombre] <= 0) {
        alert("Producto agotado ❌");
        return;
    }

    // DESCONTAR STOCK
    stock[nombre]--;

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

        // 🔥 MENSAJE DE STOCK BAJO
        let aviso = "";
        if (stock[item.nombre] <= 3 && stock[item.nombre] > 0) {
            aviso = " 🔥 Últimas piezas";
        }

        if (stock[item.nombre] === 0) {
            aviso = " ❌ Agotado";
        }

        li.innerHTML = `
            ${item.nombre} (${item.talla}, ${item.color}) - $${item.precio}
            <small>${aviso}</small>
        `;

        listaCarrito.appendChild(li);
    });

    // DESCUENTO
    if (carrito.length >= 3) {
        total = total * 0.9;
    }

    totalSpan.textContent = total.toFixed(0);

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

// INSTAGRAM
function pagarInstagram() {
    window.open(
        "https://www.instagram.com/jams_elite_sport?igsh=dWNxeDRmeWt2MHo3",
        "_blank"
    );
}

// FORMULARIO
function mostrarFormulario(metodo) {
    metodoSeleccionado = metodo;
    formularioPago.style.display = "block";
}

// FINALIZAR PAGO
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
        `Total: $${totalSpan.textContent} MXN\n\n` +
        datosPago +
        `\n\nEnvía tu comprobante por Instagram.`
    );
}