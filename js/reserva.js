import "./header.js";

/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */
const formulario = document.querySelector(".formulario-reserva");
const campoFecha = document.getElementById("fecha");
const campoHora = document.getElementById("hora");
const campoNombre = document.getElementById("nombre");
const contenedorMensaje = document.getElementById("mensaje-reserva");

/* =========================================================
   CONFIGURACIÓN HORARIA BARBERÍA
========================================================= */
const HORARIO_INICIO = 9 * 60;   // 09:00
const HORARIO_FIN = 18 * 60 + 30; // 18:30

/* =========================================================
   FECHA MÍNIMA (HOY)
========================================================= */
function obtenerFechaMinima() {
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}

campoFecha.min = obtenerFechaMinima();

/* =========================================================
   UTILIDAD: MOSTRAR ERROR
========================================================= */
function mostrarError(mensaje) {
    alert(mensaje);
    return false;
}

/* =========================================================
   VALIDACIONES
========================================================= */

function validarNombre(nombre) {
    if (nombre.trim().length < 2) {
        return mostrarError("Introduce un nombre válido.");
    }
    return true;
}

function validarFechaYHora(fecha, hora) {
    if (!fecha || !hora) {
        return mostrarError("Debes seleccionar una fecha y una hora.");
    }
    return true;
}

function validarFechaNoPasada(fechaReserva) {
    const ahora = new Date();

    if (fechaReserva <= ahora) {
        return mostrarError("No puedes reservar una fecha u hora anterior a la actual.");
    }
    return true;
}

function validarHorario(horasTotales) {
    if (horasTotales < HORARIO_INICIO || horasTotales > HORARIO_FIN) {
        return mostrarError("La barbería solo atiende de 09:00 a 18:30.");
    }
    return true;
}

function validarIntervalos(hora, minutos) {
    if (minutos !== 0 && minutos !== 30) {
        return mostrarError("Las reservas solo pueden hacerse en intervalos de 30 minutos.");
    }
    return true;
}

function validarDomingo(fechaReserva) {
    if (fechaReserva.getDay() === 0) {
        return mostrarError("La barbería no abre los domingos.");
    }
    return true;
}

/* =========================================================
   SUBMIT FORMULARIO
========================================================= */
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = campoNombre.value;
    const fecha = campoFecha.value;
    const hora = campoHora.value;

    if (!validarNombre(nombre)) return;
    if (!validarFechaYHora(fecha, hora)) return;

    const fechaReserva = new Date(`${fecha}T${hora}`);
    const ahora = new Date();

    if (!validarFechaNoPasada(fechaReserva)) return;

    const [horas, minutos] = hora.split(":").map(Number);
    const totalMinutos = horas * 60 + minutos;

    if (!validarHorario(totalMinutos)) return;
    if (!validarIntervalos(horas, minutos)) return;
    if (!validarDomingo(fechaReserva)) return;

    // Si todo es válido → enviar formulario
    formulario.submit();
});

/* =========================================================
   MENSAJE DE ESTADO (OK / ERROR)
========================================================= */
function mostrarMensajeEstado(status) {
    if (!contenedorMensaje) return;

    const mensajes = {
        ok: { texto: "✅ Reserva realizada correctamente", color: "green" },
        error: { texto: "❌ Error al realizar la reserva", color: "red" }
    };

    const mensaje = mensajes[status];

    if (!mensaje) return;

    contenedorMensaje.textContent = mensaje.texto;
    contenedorMensaje.style.color = mensaje.color;
}

/* Ejecutar mensaje según URL */
const params = new URLSearchParams(window.location.search);
const status = params.get("status");

mostrarMensajeEstado(status);