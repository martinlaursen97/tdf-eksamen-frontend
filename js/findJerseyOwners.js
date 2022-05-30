// Displays the competitors with the jersey they own

window.onload = async function display() {
  let yellowCard = document.getElementById("card-yellow");
  let greenCard = document.getElementById("card-green");
  let polkaCard = document.getElementById("card-polka");
  let whiteCard = document.getElementById("card-white");

  let yellowJersey = await getJerseyOwnerByJersey("YELLOW");
  let greenJersey = await getJerseyOwnerByJersey("GREEN");
  let polkaJersey = await getJerseyOwnerByJersey("POLKA");
  let whiteJersey = await getJerseyOwnerByJersey("WHITE");

  yellowCard.innerHTML = generateInnerHTMLString(yellowJersey) +
    "Time: " + yellowJersey.unit + " min";

  greenCard.innerHTML = generateInnerHTMLString(greenJersey) +
    "Sprint points: " + greenJersey.unit;

  polkaCard.innerHTML = generateInnerHTMLString(polkaJersey) +
    "Mountain points: " + polkaJersey.unit;

  whiteCard.innerHTML = generateInnerHTMLString(whiteJersey) +
    "Time: " + whiteJersey.unit + " min (<26)";
}

async function getJerseyOwnerByJersey(jersey) {
  return await fetch("http://localhost:8080/api/stage-line-items/jersey/" + jersey).then(res => res.json());
}

function generateInnerHTMLString(jersey) {
  return "Name: " + jersey.competitor.firstName + " " + jersey.competitor.lastName + "<br>" +
    "Age: " + jersey.competitor.age + "<br>" +
    "Team: " + jersey.competitor.team.name + "<br>" +
    "Country: " + jersey.competitor.country.name + "<br>";
}
