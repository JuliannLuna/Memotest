let puntaje = 0;
let turno = 0;
let timer;
let timeoutCartas;
let $primerCuadro = null;
let tiempo = document.querySelector("#tiempo strong");
const botonJugar = document.querySelector("#boton-jugar");
const $tablero = document.querySelector("#tablero");

bloquearInputUsuario();

botonJugar.onclick = function () {
  reiniciarJuego();
  mezclarCartas();
  agregarBotonReiniciar();
  desbloquearInputUsuario();
};

function mezclarCartas() {
  const $cuadro = document.querySelectorAll(".cuadro");
  const colores = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-lime-500",
  ];
  let coloresRepetidos = colores.concat(colores);
  coloresRepetidos = mezclarArray(coloresRepetidos); //Mezclamos los colores
  $cuadro.forEach(function (cuadro, i) {
    cuadro.classList.add(coloresRepetidos[i]);
  });
}

//Se mezcla el array
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function manejarInputUsuario(e) {
  const $elemento = e.target;
  if (e.target.classList.contains("!bg-gray-400")) {
    e.target.classList.remove("!bg-gray-400");
    manejarClickCuadro($elemento);
  }
}

function bloquearInputUsuario() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function desbloquearInputUsuario() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = manejarInputUsuario;
  });
}

function agregarBotonReiniciar() {
  botonJugar.classList.remove(
    "from-cyan-400",
    "via-cyan-500",
    "to-cyan-600",
    "focus:ring-cyan-300",
    "dark:focus:ring-cyan-800",
  );
  botonJugar.classList.add(
    "from-red-400",
    "via-red-500",
    "to-red-600",
    "focus:ring-red-300",
    "dark:focus:ring-red-800",
  );
  botonJugar.textContent = "Reiniciar";
}

function manejarClickCuadro($cuadroActual) {
  if ($primerCuadro === null) {
    $primerCuadro = $cuadroActual;
    return;
  } else {
    if ($primerCuadro.className !== $cuadroActual.className) {
      bloquearInputUsuario();

      ocultarCuadro($cuadroActual);
      ocultarCuadro($primerCuadro);
      timeoutCartas = setTimeout(function () {
        desbloquearInputUsuario();
      }, 1000);
    } else {
      puntaje++;
      document.querySelector("#puntaje strong").textContent = String(puntaje);
      if (esGanador(puntaje)) {
        mostrarMensajeGanador();
        clearInterval(timer);
      }
    }
    turno++;
    document.querySelector("#turno strong").textContent = String(turno);
  }
  $primerCuadro = null;
}

function ocultarCuadro($cuadro) {
  setTimeout(function () {
    $cuadro.classList.add("!bg-gray-400");
  }, 1000);
}

function esGanador(puntos) {
  if (puntos === 4) {
    return true;
  } else {
    return false;
  }
}

function mostrarMensajeGanador() {
  $tablero.classList.add("hidden");
  document.querySelector("#mensaje-ganador").classList.remove("hidden");
}

function ocultarMensajeGanador() {
  document.querySelector("#mensaje-ganador").classList.add("hidden");
}

function iniciarContador() {
  let contador = 0;
  tiempo.textContent = String(contador);
  timer = setInterval(function () {
    contador++;
    tiempo.textContent = String(contador);
  }, 1000);
}

function reiniciarJuego() {
  clearTimeout(timer);
  $tablero.classList.remove("hidden");
  $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function (cuadro) {
    cuadro.className = "";
    cuadro.classList.add(
      "h-30",
      "cuadro",
      "!bg-gray-400",
      "text-center",
      "content-center",
      "text-white",
      "font-semibold",
    );
  });
  puntaje = 0;
  document.querySelector("#puntaje strong").textContent = String(puntaje);
  turno = 0;
  document.querySelector("#turno strong").textContent = String(turno);

  clearInterval(timer);
  iniciarContador();
  ocultarMensajeGanador();
}
