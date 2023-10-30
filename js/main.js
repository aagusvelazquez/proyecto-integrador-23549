document.getElementById('validar').addEventListener('click', function() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var cant = document.getElementById('cantidad').value;
  var cat = document.getElementById('categoria').value;
  var asistir = document.getElementById('fechaConf');
  var fechaAsiste;
  var resumenTotal;
  
  var nombreRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var nombreValido = nombreRegex.test(nombre);
  var apellidoValido = nombreRegex.test(apellido);
  var emailValido = emailRegex.test(email);

  if (nombreValido && apellidoValido && emailValido && cant) {
    if (cat == 0) {
      cat = "Estudiante";
      resumenTotal = (200*0.2)*cant;
      document.getElementById('totalPagar').value = `$` + resumenTotal;
    } else if (cat == 1) {
      cat = "Trainee";
      resumenTotal = (200*0.5)*cant;
      document.getElementById('totalPagar').value = `$` + resumenTotal;
    } else if (cat == 2) {
      cat = "Junior";
      resumenTotal = (200*0.85)*cant;
      document.getElementById('totalPagar').value = `$` + resumenTotal;
    } else if (cat == 3) {
      cat = "Sin Categoría"
      resumenTotal = 200*cant;
      document.getElementById('totalPagar').value = `$` + resumenTotal;
    }

    if (asistir.value == 0) {
      fechaAsiste = 'Viernes 13 de Octubre';
    } else if (asistir.value == 1) {
      fechaAsiste = 'Sábado 14 de Octubre';
    } else if (asistir.value == 2){
      fechaAsiste = 'Domingo 15 de Octubre';
    }
    document.getElementById('generar-ticket').disabled = false;
    } else {
      Swal.fire(
          'ERROR!',
          'Por favor, introduce datos válidos en todos los campos.',
          'error'
      )
  }
});

document.getElementById('generar-ticket').addEventListener('click', function() {
  const fecha = new Date();
  var hoy = fecha.getDate();
  var mesActual = fecha.getMonth() + 1; 
  var anioActual = fecha.getFullYear();
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var cant = document.getElementById('cantidad').value;
  var cat = document.getElementById('categoria').value;
  var asistir = document.getElementById('fechaConf').value;
  var fechaAsiste;
  var resumenTotal;

  document.getElementById("fechaCompra").textContent = hoy + "/" + mesActual + "/" + anioActual;
  document.getElementById("titularCompra").textContent = nombre + " " + apellido;
  document.getElementById("correoCompra").textContent = email;

  if (cat == 0) {
    cat = "Estudiante";
    resumenTotal = (200*0.2)*cant;
    document.getElementById('totalDeTicket').textContent = `$` + resumenTotal;
    document.getElementById("tipCantCompra").textContent = cat + " x" + cant;
  } else if (cat == 1) {
    cat = "Trainee";
    resumenTotal = (200*0.5)*cant;
    document.getElementById('totalDeTicket').textContent = `$` + resumenTotal;
    document.getElementById("tipCantCompra").textContent = cat + " x" + cant;
  } else if (cat == 2) {
    cat = "Junior";
    resumenTotal = (200*0.85)*cant;
    document.getElementById('totalDeTicket').textContent = `$` + resumenTotal;
    document.getElementById("tipCantCompra").textContent = cat + " x" + cant;
  } else if (cat == 3) {
    cat = "Sin Categoría"
    resumenTotal = 200*cant;
    document.getElementById('totalDeTicket').textContent = `$` + resumenTotal;
    document.getElementById("tipCantCompra").textContent = cat + " x" + cant;
  }

  if (asistir == 0) {
      fechaAsiste = 'Viernes 13 de Octubre';
      document.getElementById('fechaAsiste').textContent = fechaAsiste;
  }else if (asistir == 1) {
      fechaAsiste = 'Sábado 14 de Octubre';
      document.getElementById('fechaAsiste').textContent = fechaAsiste;
  } else if (asistir == 2){
      fechaAsiste = 'Domingo 15 de Octubre';
      document.getElementById('fechaAsiste').textContent = fechaAsiste;
  }
});

document.getElementById('descargarPDF').addEventListener('click', function () {
  var doc = new jsPDF();

  var x = 15;
  var y = 20;
  var tamañoCuadradoHoriz = 110;
  var tamañoCuadradoVert = 85;

  doc.rect(x, y, tamañoCuadradoHoriz, tamañoCuadradoVert);

  doc.setFontSize(20);
  doc.setFont('bold');
  doc.text("Ticket de Compra", 70, 30, null, null, "center");

  var contenido = document.getElementById("contenido").innerHTML;
  doc.fromHTML(contenido, 20, 30);

  doc.setFontSize(16);
  doc.setFont('bold');
  doc.text("¡GRACIAS POR TU COMPRA!", 70, 90, null, null, "center");

  doc.setFontSize(14);
  doc.setFont('bold');
  doc.text("¡Te esperamos!", 70, 98, null, null, "center");

  doc.save('Ticket de Compra - Conf BsAs.pdf');
});