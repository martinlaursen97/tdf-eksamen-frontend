window.onload = async function loadCompetitors(){
  let competitors = await fetch("http://localhost:8080/api/competitors").then(res => res.json());

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  competitors.forEach(element => {
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
