const Confirmation = document.getElementById("Confirmation");
const NextPage = document.getElementById("NextPage");
Confirmation.addEventListener("change", function () {
  NextPage.disabled = !Confirmation.checked;
});

NextPage.addEventListener("click", function () {
  window.location.href = "www.google.com";
});
