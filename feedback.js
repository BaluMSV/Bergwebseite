const feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {
  const toast = document.getElementById("feedback-toast");
  const submitButton = feedbackForm.querySelector(".feedback-submit");
  const nameInput = feedbackForm.querySelector('[name="name"]');
  const emailInput = feedbackForm.querySelector('[name="email"]');
  const commentInput = feedbackForm.querySelector('[name="message"]');
  let toastTimeout;

  const showToast = (message, isSuccess = false) => {
    window.clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.toggle("is-success", isSuccess);
    toast.hidden = false;
    toastTimeout = window.setTimeout(() => {
      toast.hidden = true;
    }, 5000);
  };

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();
    const missingFields = [];

    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("E-Mail-Adresse");
    if (!comment) missingFields.push("Kommentar");

    if (missingFields.length) {
      showToast(`Bitte fülle folgende Felder aus: ${missingFields.join(", ")}.`);
      const firstEmptyField = [nameInput, emailInput, commentInput].find((field) => !field.value.trim());
      firstEmptyField.focus();
      return;
    }

    if (!emailInput.validity.valid) {
      showToast("Bitte gib eine gültige E-Mail-Adresse ein.");
      emailInput.focus();
      return;
    }

    const formData = new FormData(feedbackForm);

    submitButton.disabled = true;
    submitButton.textContent = "Wird gesendet ...";

    try {
      const response = await fetch("send-feedback.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        showToast(result.message || "Die Nachricht konnte nicht versendet werden.");
        return;
      }

      feedbackForm.reset();
      showToast("Danke! Deine Nachricht wurde zum Versand übergeben.", true);
    } catch (error) {
      showToast("Der Versand ist fehlgeschlagen. Bitte versuche es später erneut.");
      console.error("Der Kommentar konnte nicht an den Webserver gesendet werden.", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Abschicken";
    }
  });
}
