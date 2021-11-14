const form = document.getElementById("transactionForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let transactionFormData = new FormData(form);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);
  // si es valido el formulario, se guarda
  if (isValidTransactionForm(transactionObj)) {
    saveTransactionObj(transactionObj);
    insertRowInTransactionTable(transactionObj);
    form.reset();
  } else {
    //Mostrar error
  }
});

function draw_category() {
  let allCategories = [
    "Alquiler",
    "Comida",
    "Diversion",
    "Antojo",
    "Gasto",
    "Transporte",
  ];
  for (let index = 0; index < allCategories.length; index++) {
    insertCategory(allCategories[index]);
  }
}

function insertCategory(categoryName) {
  const selectElement = document.getElementById("transactionCategory");
  let htmlToInsert = `<option> ${categoryName} </option>`;
  selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
}

function isValidTransactionForm(transactionObj) {
  let isValidForm = true;
  if (!transactionObj["transactionType"]) {
    alert("Tu transaction type no es valido, ponele algo");
    isValidForm = false;
  }
  if (!transactionObj["transactionDescription"]) {
    alert("Debes colocar algo en el transaction description");
    isValidForm = false;
  }

  if (!transactionObj["transactionAmount"]) {
    alert("Debes colocar un monto");
    isValidForm = false;
  } else if (transactionObj["transactionAmount"] < 0) {
    alert("No puedes poner numeros negativos");
    isValidForm = false;
  }
  if (!transactionObj["transactionCategory"]) {
    alert("Debes colocar algo en el transaction categori");
    isValidForm = false;
  }
  return isValidForm;
}

document.addEventListener("DOMContentLoaded", function (event) {
  draw_category();
  //Obtiene desde el local storage la informacion de las transaccion
  //let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
  //Obtiene las transacciones desde el servidor
  fetch("http://localhost:3000/transactions")
    .then((res) => res.json())
    .then((data) => mostrarEnPantallaArrayDeTransaccion(data));
});

function mostrarEnPantallaArrayDeTransaccion(transactionObjArr) {
  transactionObjArr.forEach(function (arrayElement) {
    insertRowInTransactionTable(arrayElement);
  });
}

function getTransactionsFromApi() {
  //Llama al backend
  //Obtene las transacciones
  //y guardalas en un array
  const allTransactions = fetch("http://localhost:3000/transactions");
  return allTransactions;
}

function getNewTransactionId() {
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
  return newTransactionId;
}

function convertFormDataToTransactionObj(transactionFormData) {
  let transactionType = transactionFormData.get("transactionType");
  let transactionDescription = transactionFormData.get(
    "transactionDescription"
  );
  let transactionAmount = transactionFormData.get("transactionAmount");
  let transactionCategory = transactionFormData.get("transactionCategory");
  let transactionId = getNewTransactionId();
  return {
    transactionType: transactionType,
    transactionDescription: transactionDescription,
    transactionAmount: transactionAmount,
    transactionCategory: transactionCategory,
    transactionId: transactionId,
  };
}

function insertRowInTransactionTable(transactionObj) {
  let transactionTableRef = document.getElementById("transactionTable");

  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute(
    "data-transaction-id",
    transactionObj["transactionId"]
  );

  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = transactionObj["transactionType"];

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = transactionObj["transactionDescription"];

  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = transactionObj["transactionAmount"];

  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = transactionObj["transactionCategory"];

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event) => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
    deleteTransactionObj(transactionId);
  });
}

function deleteTransactionObj(transactionId) {
  let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
  //Busco el indice / la poscicion de la transacccion que quiero eliminar
  let transactionIndexInArray = transactionObjArr.findIndex(
    (element) => element.transactionId == transactionId
  );
  //Elimino el elemento de esa poscicion
  transactionObjArr.splice(transactionIndexInArray, 1);
  let transactionArrayJSON = JSON.stringify(transactionObjArr);
  localStorage.setItem("transactionData", transactionArrayJSON);
}

function saveTransactionObj(transactionObj) {
  let myTransactionArray =
    JSON.parse(localStorage.getItem("transactionData")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto  mi array de transaccion a json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //Guardo mi array de transaccion en formato JSON en el local storage
  localStorage.setItem("transactionData", transactionArrayJSON);
}
