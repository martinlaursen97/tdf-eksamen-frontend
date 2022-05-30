window.onload = async function load() {
  let url = "http://localhost:8080/api/competitors";
  setParams();
  await loadCompetitors(url);
  await loadPageCountToPagination();
}
