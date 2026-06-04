# Pico y Placa Bogotá

App web que muestra en tiempo real si tus carros pueden circular en Bogotá según la restricción de Pico y Placa. Sin backend, sin instalación — abre `index.html` y listo.

## Carros configurados

| Carro | Placa | Último dígito |
|-------|-------|---------------|
| Nissan Frontier | DJW693 | 3 |
| Toyota Corolla Perla | URU778 | 8 |

## Funcionalidades

- Estado en tiempo real (actualiza cada segundo)
- Detecta si estás dentro del horario de restricción (6:00–9:00 y 16:00–20:00)
- Días hábiles vs fines de semana automático
- Muestra la regla activa del día (qué dígitos no circulan)
- Reloj y fecha en español

## Regla de Pico y Placa

| Día | Placas restringidas |
|-----|---------------------|
| Días impares | terminadas en 1, 2, 3, 4, 5 |
| Días pares | terminadas en 6, 7, 8, 9, 0 |

Aplica en días hábiles (lunes a viernes) en horario de restricción.

## Stack

- HTML5 · CSS3 · JavaScript (vanilla)
- [Materialize CSS](https://materializecss.com/) — Material Design 3
- Google Material Icons · Google Fonts (Roboto)

## Uso

```bash
git clone https://github.com/revkelo/Carros-Pico-y-Placa.git
# Abrir index.html en el navegador
```

También funciona en GitHub Pages.

## Agregar tu propio carro

Editar el array `CARROS` en `scripts.js`:

```js
const CARROS = [
  { id: 'miCarro', nombre: 'Mi Carro', placa: 'ABC123', ultimoDigito: 3 },
];
```

Y agregar la card correspondiente en `index.html`.

