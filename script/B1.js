const Confirmation = document.getElementById("Confirmation");
const NextPage = document.getElementById("NextPage");
NextPage.addEventListener("change", function () {
  proseguiButton.disabled = !accettoImpegno.checked;
});

Confirmation.addEventListener("click", function () {
  window.location.href = "#";
});
