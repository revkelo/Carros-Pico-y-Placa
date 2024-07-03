document.addEventListener("DOMContentLoaded", function () {

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
  

    const esPar = dia % 2 === 0;
  

    const nissanPlaca = 3;
    const sanderoPlaca = 8;
  

    const nissanPuedeCircular = !esPar && [1, 2, 3, 4, 5].includes(nissanPlaca);
    const sanderoPuedeCircular = esPar && [6, 7, 8, 9, 0].includes(sanderoPlaca);
  

    document.getElementById("nissan-status").innerText = nissanPuedeCircular ? "Puede circular" : "No puede circular";
    document.getElementById("nissan-status").className = nissanPuedeCircular ? "status puede-circular" : "status no-puede-circular";
    document.getElementById("sandero-status").innerText = sanderoPuedeCircular ? "Puede circular" : "No puede circular";
    document.getElementById("sandero-status").className = sanderoPuedeCircular ? "status puede-circular" : "status no-puede-circular";
  });
  
  function updateDateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // getMonth() is zero-based
    var year = currentTime.getFullYear();
    
    // Formatting the time string
    var timeString = hours + ":" + minutes + ":" + seconds;
    
    // Formatting the date string
    var dateString = day + "/" + month + "/" + year;
    
    // Updating the content in the HTML
    document.getElementById('current-date-time').innerHTML = "Fecha " + dateString + "<br>Hora " + timeString;
  }

  // Update date and time every second
  setInterval(updateDateTime, 1000);