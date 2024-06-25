document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlaces();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const video = document.querySelector(".video");

  document.addEventListener("scroll", function () {
    if (video.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const CANTIDAD_IMAGENES = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement("PICTURE");

    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
`;

    //Event Handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
  const imagen = document.createElement("PICTURE");
  imagen.innerHTML = `
    <source srcset="build/img/garelly/${i}.avif" type="image/avif">
    <source srcset="build/img/garelly/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/garelly/${i}.jpg" alt="imagen galeria">
`;

  //generar modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = cerrarModal;

  //boton cerrar imagen
  const cerrarModalBtn = document.createElement("BUTTON");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  //agregar a html
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal?.remove();
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
  }, 500);
}

function resaltarEnlaces() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = e.target.getAttribute("href"); // Obtienes el ID de la sección al que se debe desplazar
      const section = document.querySelector(sectionId); // Usas el ID obtenido para seleccionar la sección

      if (section) {
        section.scrollIntoView({ behavior: "smooth" }); // Desplazas suavemente hasta la sección
      }
    });
  });
}
