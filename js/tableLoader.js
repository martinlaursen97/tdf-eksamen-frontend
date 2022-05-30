window.onload = async function load() {
  let url = "http://localhost:8080/api/competitors";
  setParams();
  await loadCompetitors(url);
  await loadPageCountToPagination();
}

function setParams() {
  if (getPage() === null) {
    setPage(0);
  }
  if (getSortBy() === null) {z
    setSortBy("id");
  }
  if (getSortDirection() === null) {
    setSortDirection("ASC");
  }
}

async function loadCompetitors(url){
  let competitors = await fetch(url +
    "?page=" + getPage() +
    "&sortBy=" + getSortBy() +
    "&sortDirection=" + getSortDirection())
    .then(res => res.json());

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  competitors.content.forEach(element => {
    let firstName = element.firstName;
    let lastName = element.lastName;
    let country = element.country.name;
    let team = element.team.name;

    let json = JSON.stringify(element);

    let row =
      "<tr>" +
      "<td>" + firstName + "</td>" +
      "<td>" + lastName + "</td>" +
      "<td>" + team + "</td>" +
      "<td>" + country + "</td>" +
      "<td><button class='btn btn-outline-secondary' style='z-index: 0.5' id='update-btn' onclick='updateCompetitor(" + json + ")'>Update</button></td>" +
      "<td><button class='btn btn-outline-danger' style='z-index: 0.5' id='delete-btn' onclick='deleteCompetitorById(" + element.id + ")'>Delete</button></td>" +
      "</tr>";

    table.innerHTML += row;
  })
}

async function loadPageCountToPagination() {
  const response = await fetch("http://localhost:8080/api/competitors")
    .then(res => res.json());

  const pageCount = response.totalPages;
  const pagination = document.getElementById("pagination");

  for (let i = 0; i < pageCount; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item")
    li.value = i;
    li.addEventListener("click", () => {
      setPage(i)
      }
    );

    let a = document.createElement("a");
    a.classList.add("page-link")
    a.href = "#";
    a.innerText = (i + 1);

    li.appendChild(a);
    pagination.appendChild(li);
  }
}

function changeSortDirection() {
  let sortDirection = localStorage.getItem("sortDir");
  switch (sortDirection) {
    case "ASC" : {
      setSortDirection("DESC");
      break;
    }
    case "DESC" : {
      setSortDirection("ASC");
      break;
    }
  }
  location.reload();
}

function getPage() {
  return localStorage.getItem("pageNum");
}

function setPage(page) {
  localStorage.setItem("pageNum", page);
  location.reload();
}

function getSortDirection() {
  return localStorage.getItem("sortDir");
}

function setSortDirection(direction) {
  localStorage.setItem("sortDir", direction);
}

function getSortBy() {
  return localStorage.getItem("sortBy");
}

function setSortBy(sortBy) {
  if (sortBy === localStorage.getItem("sortBy")) {
    changeSortDirection();
  } else {
    localStorage.setItem("sortBy", sortBy);
  }
  location.reload();
}
