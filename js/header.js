// Selecciona elementos del header
const icono_menu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".navegacion");

// Comprueba que existen antes de usar
if (icono_menu && menu) {


    icono_menu.addEventListener("click", () => {

        // Activa/desactiva menú
        menu.classList.toggle("activa");

        // Accesibilidad
        const abierto = menu.classList.contains("activa");

        icono_menu.setAttribute("aria-expanded", abierto);

    });

}