// Función para validar el formulario
function validateForm() {
  const name = document.getElementById("name").value;
  const rut = document.getElementById("rut").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const agree = document.getElementById("agree").checked;
  const hashedPassword = hashPassword(password);
  const hashedConfirmPassword = hashPassword(password);

  
  document.getElementById("password").value = hashedPassword;
  document.getElementById("confirm_password").value = hashedConfirmPassword;
  

  const errors = {
      name: "",
      rut: "",
      address: "",
      email: "",
      password: "",
      subject: "",
      agree: ""
  };

  let isValid = true;

  // Validaciones individuales
  if (name === "" || /\d/.test(name)) {
      errors.name = "Ingrese su nombre";
      isValid = false;
  }

  if (rut === "") {
      errors.rut = "Ingrese un rut";
      isValid = false;
  }

  if (address === "") {
      errors.address = "Ingrese un nombre de usuario";
      isValid = false;
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email === "" || !emailRegex.test(email)) {
    errors.email = "Ingrese un email válido";
    isValid = false;
  }

  if (password === "" || password.length < 8) {
      errors.password = "Ingrese una contraseña de al menos 8 caracteres";
      isValid = false;
  }

  if (subject === "") {
      errors.subject = "Por favor seleccione su país";
      isValid = false;
  }

  if (!agree) {
      errors.agree = "Confirme la veracidad de la información ingresada";
      isValid = false;
  }

  // Mostrar mensajes de error
  for (const field in errors) {
      const errorElement = document.getElementById(`${field}-error`);
      errorElement.textContent = errors[field];
  }

  return isValid;
}

// Función para cargar los países en el select
window.onload = function () {
  fetch('https://restcountries.com/v3.1/region/Americas')
      .then(response => response.json())
      .then(data => {
          const selectElement = document.getElementById('subject');
          data.forEach(country => {
              const option = document.createElement('option');
              option.value = country.name.common;
              option.textContent = country.name.common;
              selectElement.appendChild(option);
          });
      })
      .catch(error => console.error('Error al cargar los países:', error));
};

// Función para validar la coincidencia de contraseñas
function validate_password() {
  const password = document.getElementById('password').value;
  const confirm_password = document.getElementById('confirm_password').value;
  const alertElement = document.getElementById('wrong_password_alert');

  if (password === confirm_password && password !== "") {
      alertElement.style.color = 'green';
      alertElement.innerHTML = '🗹 Contraseña correcta';
  } else {
      alertElement.style.color = 'red';
      alertElement.innerHTML = '☒ Contraseña invalida';
  }
}

// Función para manejar el evento de cambio en las contraseñas
document.getElementById('confirm_password').addEventListener('keyup', validate_password);

// Función para validar el RUT
function isNumber(evt) {
  const charCode = evt.which;
  return (charCode >= 48 && charCode <= 57) || charCode === 75;
}

// Función para limpiar el formato del RUT
function clean(rut) {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : '';
}

// Función para formatear el RUT
function format(rut) {
  rut = clean(rut);
  let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
  for (let i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + '.' + result;
  }
  return result;
}

// Función para validar el RUT
function checkRut(rutElement) {
  const rut = rutElement.value;
  if (rut.length <= 1) {
      return false;
  }

  const valor = clean(rut);
  const bodyRut = valor.slice(0, -1);
  const dv = valor.slice(-1).toUpperCase();
  rutElement.value = format(rut);

  if (bodyRut.length < 7) {
      return false;
  }

  let suma = 0;
  let multiplo = 2;

  for (let i = 1; i <= bodyRut.length; i++) {
      const index = multiplo * valor.charAt(bodyRut.length - i);
      suma += index;
      if (multiplo < 7) {
          multiplo += 1;
      } else {
          multiplo = 2;
      }
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? 0 : dvEsperado;
  dvEsperado = dvEsperado === 10 ? "K" : dvEsperado;

  if (dvEsperado != dv) {
      return false;
  } else {
      return true;
  }
}

function hashPassword(password) {
    // Crear un nuevo objeto del tipo CryptoJS.SHA256
    const hash = CryptoJS.SHA256(password);
    // Convertir el hash a una cadena hexadecimal
    const hashString = hash.toString(CryptoJS.enc.Hex);
    return hashString;
}

// Event listener para validar el RUT al escribir
document.getElementById('rut').addEventListener('input', function() {
    const isValidRut = checkRut(this);
    const alerta = document.getElementById('rut-error');
    const mensaje = document.getElementById('rut-message');

    if (isValidRut) {
        alerta.classList.remove('alert-danger');
        alerta.classList.add('alert-success');
        mensaje.innerHTML = 'El RUT ingresado es <strong>CORRECTO</strong>.';
        mensaje.style.color = 'green'; 
    } else {
        alerta.classList.remove('alert-success');
        alerta.classList.add('alert-danger');
        mensaje.innerHTML = 'El RUT ingresado es <strong>INCORRECTO</strong>.';
        mensaje.style.color = 'red'; 
    }
});
  