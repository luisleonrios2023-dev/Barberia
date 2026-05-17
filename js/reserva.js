import "./header.js";

// Seleccionar el formulario
const formulario = document.querySelector(".formulario-reserva");

// Campos
const campoFecha = document.getElementById("fecha");
const campoHora = document.getElementById("hora");
const campoNombre = document.getElementById("nombre");

// Fecha actual
const hoy = new Date();

// Formatear fecha en YYYY-MM-DD
const año = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

const fechaMinima = `${año}-${mes}-${dia}`;

// Evitar seleccionar días anteriores al actual
campoFecha.min = fechaMinima;


// Validación del formulario
formulario.addEventListener("submit", function (evento) {

    // =========================
    // VALIDAR NOMBRE
    // =========================
    const nombre = campoNombre.value.trim();

    // Evita nombres solo con espacios
    if (nombre.length < 2) {

        evento.preventDefault();

        alert("Introduce un nombre válido.");

        return;
    }


    // =========================
    // VALIDAR FECHA Y HORA
    // =========================
    const fechaSeleccionada = campoFecha.value;
    const horaSeleccionada = campoHora.value;

    // Si no hay fecha u hora, detener
    if (!fechaSeleccionada || !horaSeleccionada) {

        evento.preventDefault();

        alert("Debes seleccionar una fecha y una hora.");

        return;
    }

    // Crear fecha completa de la reserva
    const fechaReserva = new Date(`${fechaSeleccionada}T${horaSeleccionada}`);

    // Fecha actual exacta
    const ahora = new Date();

    // Evita reservar horas pasadas del mismo día
    if (fechaReserva <= ahora) {

        evento.preventDefault();

        alert("No puedes reservar una fecha u hora anterior a la actual.");

        return;
    }


    // =========================
    // VALIDAR HORARIO LABORAL
    // =========================
    const [horas, minutos] = horaSeleccionada.split(":").map(Number);

    // Convertir hora a minutos
    const totalMinutos = horas * 60 + minutos;

    // Horario permitido:
    // 09:00 → 540 min
    // 18:00 → 1080 min
    if (totalMinutos < 540 || totalMinutos > 1080) {

        evento.preventDefault();

        alert("La barbería solo atiende de 09:00 a 18:00.");

        return;
    }


    // =========================
    // VALIDAR INTERVALOS DE 30 MIN
    // =========================
    if (minutos !== 0 && minutos !== 30) {

        evento.preventDefault();

        alert("Las reservas solo pueden hacerse en intervalos de 30 minutos.");

        return;
    }


    // =========================
    // VALIDAR DOMINGOS
    // =========================
    const diaSemana = fechaReserva.getDay();

    // Domingo = 0
    if (diaSemana === 0) {

        evento.preventDefault();

        alert("La barbería no abre los domingos.");

        return;
    }

});