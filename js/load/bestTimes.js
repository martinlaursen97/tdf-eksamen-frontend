window.onload = async function load() {
  let url = "http://localhost:8080/api/stage-line-items/best-times";
  await loadCompetitorsByTime(url);
  await loadPageCountToPagination();
}
