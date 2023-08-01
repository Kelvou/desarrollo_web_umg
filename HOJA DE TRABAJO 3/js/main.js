function soloLetras(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

  function soloNumeros(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      numeros = "0123456789",
      especiales = [8],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (numeros.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

  function correoValidar() {
    var form = document.getElementById("form");
    var email = document.getElementById("correo").value;
    var text = document.getElementById("text");
    var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (email.match(pattern)) {
        text.innerHTML = "Correo válido.";
        text.style.color ="#00ff00";
        form.classList.add("valid");
        form.classList.remove("invalid");
    }
    else {
        text.innerHTML = "Correo inválido";
        text.style.color ="#ff0000";
        form.classList.add("invalid");
        form.classList.remove("valid");
    }
    if (email == "") {
        text.innerHTML = "";
        text.style.color ="#ff0000";
        form.classList.add("invalid");
        form.classList.remove("valid");
    }
}

//document.querySelector('form').addEventListener('submit', e => {e.preventDefault() 
 // const data = Object.fromEntries(new FormData(e.target))
 // alert(JSON.stringify(data))
//})

function mostrar(){
alert("DPI: " + document.getElementById("dpi").value + "\n" + "Nombre: " + document.getElementById("nombres").value + "\n" 
+ "Apellidos: " + document.getElementById("apellidos").value + "\n" + "Fecha Nacimiento: " + document.getElementById("fecha").value + "\n"
+ "Sexo: " + document.getElementById("sexo").value + "\n" + "Correo: " + document.getElementById("correo").value + "\n" + "Motivo de Solicitud: " + document.getElementById("motivo").value + "\n");
}

