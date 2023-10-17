document.getElementById("submit").addEventListener("click", function () {
  const selectedRating = document.querySelector('input[name="rating"]:checked');
  const commentInput = document.querySelector('input[type="text"]');

  if (selectedRating) {
    alert("Grazie per averci detto cosa pensi ! ");
    commentInput.value = "";
    const allRadioButtons = document.querySelectorAll('input[name="rating"]');
    allRadioButtons.forEach((radio) => {
      radio.checked = false;
    });
  } else {
    alert("Per favore, seleziona una valutazione prima di inviare il modulo.");
  }
});
