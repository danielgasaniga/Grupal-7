const API_URL = "https://636aca31b10125b78fe4ddd4.mockapi.io";
const endpointPOST = "/users";
const endpointGET_PUT_DELETE = "/users/";

let messageAlertSucces = document.getElementById("messageAlertSucces"); // parrafo que variara segun mensaje de exito en alerta
let messageAlertError = document.getElementById("messageAlertError"); //parrafo que variara segun mensaje de error en alerta

// Funcion alerta de exito
function showAlertSuccess(message) {
  document.getElementById("alert-success").classList.add("show");
  messageAlertSucces.innerHTML = message;
}
// Funcion alerta de error
function showAlertError(message) {
  document.getElementById("alert-danger").classList.add("show");
  messageAlertError.innerHTML = message;
}
// Funcion que mostrara de acuerdo la lista de data de acuerdo a lo que plantee el GET
function showDataList(data) {
  let userExists = false;
  for (let singleData of data) {
    let { name, lastname, id } = singleData;
    if (inputGet1Id.value.length === 0) {
      results.innerHTML += `<p class="mb-3">Nombre: ${name} <br>Apellido: ${lastname} <br> ID: ${id} </p>`;
    } else if (id === inputGet1Id.value) {
      results.innerHTML = `<p class="mb-3">Nombre: ${name} <br>Apellido: ${lastname} <br> ID: ${id} </p>`;
      userExists = true;
    } else if (!userExists) {
      results.innerHTML = `<p> Usuario no encontrado </p>`;
    }
  }
  inputGet1Id.value = "";
}

////////////////////////////////////////////GET/////////////////////////////////////////////////////////
const btnGet1 = document.getElementById("btnGet1");
const results = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");
// Acciones que realiza el boton de get, para traer la funcion showDataList
btnGet1.addEventListener("click", async () => {
  try {
    const response = await fetch(API_URL + endpointGET_PUT_DELETE);
    const data = await response.json();
    showDataList(data);
  } catch (error) {
    showAlertError("Algo no salío bien");
  }
});

////////////////////////////////////// POST /////////////////////////////////////////////////////////
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
// Funcion que deshabilita el boton post de no cumplir con las condiciones
function disableBtnPost() {
  if (inputPostNombre.value.length > 0 && inputPostApellido.value.length > 0) {
    btnPost.disabled = false;
  } else {
    btnPost.disabled = true;
  }
}
// Agrega a newUser como cadena al registro
const addNewUser = async (newUser) => {
  try {
    const response = await fetch(API_URL + endpointPOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
  } catch (error) {
    showAlertError("Algo no salío bien");
  }
};
// Acciones que realiza el boton post, dejar los inputs en blanco mostrar alerta y añadir la variable newUser definida en Add user arriba
function addNewRegister() {
  let newUser = {
    name: inputPostNombre.value,
    lastname: inputPostApellido.value,
  };
  addNewUser(newUser);
  inputPostNombre.value = "";
  inputPostApellido.value = "";
  showAlertSuccess("Usuario registrado exitosamente");
  btnPost.disabled = true;
}

///////////////////////////////////////PUT///////////////////////////////////////////////////
const btnModalPut = document.getElementById("btnPut");
const inputPutId = document.getElementById("inputPutId");
const modal = document.getElementById("dataModal");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnSendChanges = document.getElementById("btnSendChanges");

// Deshabilitar boton de Modificar Put
function disablePutButton() {
  if (inputPutId.value.length > 0) {
    btnModalPut.disabled = false;
  } else {
    btnModalPut.disabled = true;
  }
}

// Evento para que el boton para abrir el modal se lleve a cabo
btnModalPut.addEventListener("click", async () => {
  const idUser = inputPutId.value;
  const response = await fetch(API_URL + endpointGET_PUT_DELETE + idUser);
  const data = await response.json();
  let { id } = data;
  if (id === idUser) {
    modal.classList.add("show");
    const myModal = new bootstrap.Modal("#dataModal", {
      // fuente del codigo https://laracasts.com
      keyboard: false,
    });
    myModal.show();
  } else {
    showAlertError("No existe el usuario");
  }
});

// Deshabilitar boton de guardar cambios sin condiciones requeridas
function disabledButtonSaveChanges() {
  if (inputPutNombre.value.length > 0 && inputPutApellido.value.length > 0) {
    btnSendChanges.disabled = false;
  } else {
    btnSendChanges.disabled = true;
  }
}

// Acciones que realiza el boton de guardar cambios, dejar los inputs en blanco y mostrar alerta
btnSendChanges.addEventListener("click", async () => {
  let update = { name: inputPutNombre.value, lastname: inputPutApellido.value };
  try {
    const response = await fetch(
      API_URL + endpointGET_PUT_DELETE + inputPutId.value,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    const data = await response.json();
    showAlertSuccess("Datos del registro guardados exitosamente");
    btnSendChanges.disabled = true;
    inputPutNombre = "";
    inputPutApellido = "";
  } catch (error) {
    showAlertError("Algo no salío bien");
  }
});

/////////////////////////////DELETE/////////////////////////////////////////////////////////
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
// Deshabilitar boton de Delete
function disableDeleteButton() {
  if (inputDelete.value.length > 0) {
    btnDelete.disabled = false;
  } else {
    btnDelete.disabled = true;
  }
}
// Acciones que realiza el boton de delete, dejar los inputs en blanco y mostrar alerta
btnDelete.addEventListener("click", async () => {
  try {
    const response = await fetch(
      API_URL + endpointGET_PUT_DELETE + inputDelete.value,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      showAlertSuccess("Usuario eliminado");
    } else {
      showAlertError("No existe el usuario");
    }
  } catch (error) {
    showAlertError("Algo no salío bien");
  }
  btnDelete.disabled = true;
  inputDelete.value = "";
});
