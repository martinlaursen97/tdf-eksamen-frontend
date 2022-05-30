async function deleteCompetitorById(id) {
  let fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };
  let response = await fetch("http://localhost:8080/api/competitors/" + id, fetchOptions);

  if (response.ok) {
    location.reload();
  } else {
    alert(response.message);
  }
}
