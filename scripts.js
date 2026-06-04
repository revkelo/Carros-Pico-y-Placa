// Pico y Placa Bogotá
// Regla: días impares → placas 1-5 restringidas | días pares → placas 6-0 restringidas
// Horario: 6:00–9:00 y 16:00–20:00 en días hábiles (L-V)

const CARROS = [
  { id: 'nissan',  nombre: 'Nissan Frontier',      placa: 'DJW693', ultimoDigito: 3 },
  { id: 'corolla', nombre: 'Toyota Corolla Perla',  placa: 'URU778', ultimoDigito: 6 },
];

const DIAS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function pad(n) { return String(n).padStart(2, '0'); }

function enHorarioRestriccion(hora, min) {
  const minutos = hora * 60 + min;
  return (minutos >= 360 && minutos < 540) || (minutos >= 960 && minutos < 1200);
  // 6:00–9:00 = 360–540 min | 16:00–20:00 = 960–1200 min
}

function esDiaHabil(diaSemana) {
  return diaSemana >= 1 && diaSemana <= 5; // Lunes=1 ... Viernes=5
}

function placasRestringidas(dia) {
  return dia % 2 === 0 ? [6, 7, 8, 9, 0] : [1, 2, 3, 4, 5];
}

function puedeCircular(ultimoDigito, ahora) {
  const dia       = ahora.getDate();
  const diaSemana = ahora.getDay();
  const hora      = ahora.getHours();
  const min       = ahora.getMinutes();

  if (!esDiaHabil(diaSemana)) return true;
  if (!enHorarioRestriccion(hora, min)) return true;

  return !placasRestringidas(dia).includes(ultimoDigito % 10);
}

function renderBadge(elId, puede) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.className = 'status-badge ' + (puede ? 'badge-puede' : 'badge-nopuede');
  el.innerHTML = puede
    ? '<i class="material-icons tiny">check_circle</i> Puede circular'
    : '<i class="material-icons tiny">cancel</i> No puede circular';
}

function renderRegla(ahora) {
  const dia       = ahora.getDate();
  const diaSemana = ahora.getDay();
  const el        = document.getElementById('regla-hoy');
  if (!el) return;

  if (!esDiaHabil(diaSemana)) {
    el.innerHTML = '<strong>Fin de semana</strong> — No hay restricción de pico y placa.';
    return;
  }

  const digitos = placasRestringidas(dia);
  const rango   = dia % 2 === 0 ? '6, 7, 8, 9 y 0' : '1, 2, 3, 4 y 5';
  el.innerHTML  = `Hoy (día <strong>${dia}</strong>) no circulan placas terminadas en <strong>${rango}</strong>.`;
}

function actualizarReloj() {
  const ahora = new Date();

  // Fecha
  const fechaEl = document.getElementById('fecha');
  if (fechaEl) {
    const nombreDia = DIAS_ES[ahora.getDay()];
    const dia       = ahora.getDate();
    const mes       = MESES_ES[ahora.getMonth()];
    const anio      = ahora.getFullYear();
    fechaEl.textContent = `${nombreDia}, ${dia} de ${mes} de ${anio}`;
  }

  // Hora
  const horaEl = document.getElementById('hora');
  if (horaEl) {
    horaEl.textContent = `${pad(ahora.getHours())}:${pad(ahora.getMinutes())}:${pad(ahora.getSeconds())}`;
  }

  // Info restricción
  const infoEl = document.getElementById('restriccion-info');
  if (infoEl) {
    const h = ahora.getHours(), m = ahora.getMinutes();
    const enRestriccion = esDiaHabil(ahora.getDay()) && enHorarioRestriccion(h, m);
    infoEl.textContent = enRestriccion
      ? '⚠ Horario de restricción activo'
      : esDiaHabil(ahora.getDay()) ? 'Fuera del horario de restricción' : 'Sin restricción hoy';
  }

  // Estado de cada carro
  CARROS.forEach(c => {
    renderBadge(c.id + '-badge', puedeCircular(c.ultimoDigito, ahora));
  });

  // Regla
  renderRegla(ahora);
}

// Arrancar
actualizarReloj();
setInterval(actualizarReloj, 1000);
