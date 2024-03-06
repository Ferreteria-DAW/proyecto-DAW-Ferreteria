let slideIndex = 1; // Empezamos con el índice 1 para que coincida con el array de slides (que empieza en 0)
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot"); // Obtenemos todos los puntos
let timer;

function showSlides(n) {
  if (n > slides.length) { slideIndex = 1; }    // Si el índice es mayor que el número de slides, vuelve al primero
  if (n < 1) { slideIndex = slides.length; } // Si el índice es menor que 1, vaya al último slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Oculta todos los slides
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // Remueve la clase "active" de todos los dots
  }
  slides[slideIndex-1].style.display = "block"; // Muestra el slide actual
  dots[slideIndex-1].className += " active"; // Añade la clase "active" al dot actual
  
  clearTimeout(timer); // Limpia el timer actual
  timer = setTimeout(function() { showSlides(slideIndex += 1); }, 4000); // Establece un nuevo timer
}

// Inicializa el slider
showSlides(slideIndex);

// Función para controlar las flechas
function moverSlide(n) {
  clearTimeout(timer); // Para el autoplay
  showSlides(slideIndex += n); // Muestra el slide correspondiente
}

// Puntos de navegación
function currentSlide(n) {
  clearTimeout(timer); // Para el autoplay
  showSlides(slideIndex = n); // Muestra el slide correspondiente
}