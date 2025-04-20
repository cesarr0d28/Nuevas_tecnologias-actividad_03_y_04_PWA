const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
  const isMenuVisible = menu.style.display === 'block';
  menu.style.display = isMenuVisible ? 'none' : 'block';
});


// Objeto para almacenar los índices de cada carrusel
const carruseles = {};

function iniciarCarrusel(carouselId, intervalo = 3000) {
    const carrusel = document.getElementById(carouselId);
    const imagenes = carrusel.querySelectorAll("img");
    const btnPrev = carrusel.querySelector(".prev");
    const btnNext = carrusel.querySelector(".next");

    // Inicializar índice para cada carrusel
    carruseles[carouselId] = { index: 0, imagenes };

    // Mostrar imagen activa
    const mostrarImagen = (i) => {
        imagenes.forEach(img => img.classList.remove("active"));
        imagenes[i].classList.add("active");
    };

    // Función avanzar (siguiente imagen)
    const avanzar = () => {
        carruseles[carouselId].index = (carruseles[carouselId].index + 1) % imagenes.length;
        mostrarImagen(carruseles[carouselId].index);
    };

    // Función retroceder (imagen anterior)
    const retroceder = () => {
        carruseles[carouselId].index = (carruseles[carouselId].index - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(carruseles[carouselId].index);
    };

    // Asignar eventos a botones
    btnNext.addEventListener("click", avanzar);
    btnPrev.addEventListener("click", retroceder);

    // Activar cambio automático
    setInterval(avanzar, intervalo);
}

// Iniciar carruseles al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    iniciarCarrusel("carousel1");
    iniciarCarrusel("carousel2");
});

// Array para almacenar las reservas
let reservas = [];

// Capturamos el formulario
document.getElementById("formReserva").addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const cancha = document.getElementById("cancha").value;

  if (nombre && fecha && hora && cancha) {
    reservas.push({ nombre, fecha, hora, cancha });
    alert("Reserva guardada correctamente.");
    document.getElementById("formReserva").reset();
  } else {
    alert("Por favor, complete todos los campos.");
  }
});

// Botón para ver reservas
document.getElementById("btnVerReservas").addEventListener("click", function () {
  const tablaReservas = document.getElementById("tablaReservas").querySelector("tbody");
  const seccionReservas = document.getElementById("reservas");

  // Limpiar contenido previo
  tablaReservas.innerHTML = "";

  // Agregar cada reserva como fila
  reservas.forEach(reserva => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${reserva.nombre}</td>
      <td>${reserva.fecha}</td>
      <td>${reserva.hora}</td>
      <td>${reserva.cancha}</td>
    `;
    tablaReservas.appendChild(fila);
  });

  // Mostrar la sección si hay reservas
  if (reservas.length > 0) {
    seccionReservas.style.display = "block";
  } else {
    alert("Aún no hay reservas registradas.");
  }
});

if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker registrado: ', reg.scope))
    .catch(err => console.error('Error registrando Service Worker: ', err));
});
}

let deferredPrompt; // Variable para el evento

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que el navegador muestre el mensaje de instalación de forma automática
  e.preventDefault();
  deferredPrompt = e; // Guarda el evento para poder dispararlo más tarde
  
  // Muestra el botón para permitir al usuario instalar la PWA
  const installButton = document.createElement('button');
  installButton.innerText = 'Instalar PWA';
  document.body.appendChild(installButton);

  // Al hacer clic en el botón, disparamos la instalación
  installButton.addEventListener('click', () => {
    deferredPrompt.prompt(); // Muestra el cuadro de instalación
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuario aceptó la instalación');
      } else {
        console.log('Usuario rechazó la instalación');
      }
      deferredPrompt = null; // Resetear para que no se vuelva a mostrar
    });
  });
});