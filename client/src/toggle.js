/*var toggle = document.getElementById('boton-container');

function toggleMenu() {
  toggle.classList.toggle('active');
}

export default toggleMenu;*/

let toggle = document.getElementById('boton-container');

function toggleMenu() {
  if (toggle) {
    toggle.classList.toggle('active');
  }
}

export default toggleMenu;