const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");
let form = document.querySelector(".modal-input-field");
let method = "";
let entity = "";
const deleteButton = document.createElement("button");

async function createCompetitor() {
  setMethod("POST");
  setTitle("Create Competitor");
  setEntity("competitor");
  setFormDestination("http://localhost:8080/api/competitors");
  createInput("Firstname", "firstname", "firstName", "text", "");
  createInput("Lastname", "lastname", "lastName", "text", "");
  await createDropdownInput("http://localhost:8080/api/teams", "Team", "team");
  await createDropdownInput("http://localhost:8080/api/countries", "Country", "country");

  createFormEventListener();
  showSubmitBtn();
  openModal();
}

function showSubmitBtn() {
  let submitBtn = document.getElementById("submit");
  submitBtn.style.display = "";
}

function setEntity(e) {
  entity = e;
}

function setTitle(title) {
  modalTitle.textContent = title;
}

function setMethod(method) {
  this.method = method;
}

function setFormDestination(action) {
  form.setAttribute("action", action);
  form.setAttribute("method", this.method);
}

function createInput(inputName, placeHolder, idName, type, value) {
  const title = document.createElement("p");
  const text = document.createTextNode(inputName);
  title.appendChild(text);

  const input = document.createElement("input");
  input.id = idName;
  input.name = idName;
  input.type = type;
  input.placeholder = placeHolder;
  input.setAttribute("required", "");
  if (value !== undefined) {
    input.value = value;
  }
  input.classList.add("js-input");

  form.appendChild(title);
  form.appendChild(input);
}

async function createDropdownInput(url, inputName, idName) {
  const title = document.createElement("p");
  const text = document.createTextNode(inputName);
  title.appendChild(text);

  const entities = await fetchEntities(url);
  const select = document.createElement("select");
  select.id = idName;
  select.name = idName;

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    select.add(new Option(entity.name, entity.id));
  }

  form.appendChild(title);
  form.appendChild(select);
}


function openModal() {
  overlay.style.display = "block";
}

function closeModal() {
  overlay.style.display = "none";
  clearModal();
}

function clearModal() {
  modalTitle.textContent = "";
  deleteButton.remove();

  form.reset();

  while (modalInputField.hasChildNodes()) {
    modalInputField.removeChild(modalInputField.firstChild);
  }
}

async function fetchEntities(url) {
  return await fetch(url).then(response => response.json());
}

function createFormEventListener() {
  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);

    let obj = {};

    switch (entity) {
      case "competitor" : {
        obj.firstName = formData.get("firstName");
        obj.lastName = formData.get("lastName");
        obj.team = {};
        obj.team.id = formData.get("team");
        obj.country = {};
        obj.country.id = formData.get("country");
      }
    }

    const responseData = await postJson(url, JSON.stringify(obj));
  } catch (err) {
    alert(err);
  }
}


async function postJson(url, json) {
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json
  };
  let response = await fetch(url, fetchOptions);

  if (response.ok) {
    location.reload();
  }
}
