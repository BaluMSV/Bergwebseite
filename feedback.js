const WEB3FORMS_ACCESS_KEY = "";

const feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {
  const setupNote = document.getElementById("feedback-setup-note");
  const toast = document.getElementById("feedback-toast");
  const submitButton = feedbackForm.querySelector(".feedback-submit");
  const nameInput = feedbackForm.querySelector('[name="name"]');
  const emailInput = feedbackForm.querySelector('[name="email"]');
  const commentInput = feedbackForm.querySelector('[name="message"]');
  let toastTimeout;

  setupNote.hidden = Boolean(WEB3FORMS_ACCESS_KEY);

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

    if (!WEB3FORMS_ACCESS_KEY) {
      showToast("Der Versand ist noch nicht eingerichtet. Der Web3Forms-Schlüssel muss zuerst eingetragen werden.");
      return;
    }

    const formData = new FormData(feedbackForm);
    formData.set("access_key", WEB3FORMS_ACCESS_KEY);
    formData.set("subject", "Neuer Kommentar von Geheime-Webseite.de");
    formData.set("from_name", "Geheime-Webseite.de");
    formData.set("replyto", email);
    formData.set("message", `Kommentar:\n${comment}\n\nName: ${name}\nE-Mail-Adresse: ${email}`);

    submitButton.disabled = true;
    submitButton.textContent = "Wird gesendet ...";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Der E-Mail-Dienst hat die Nachricht nicht angenommen.");
      }

      feedbackForm.reset();
      showToast("Danke! Dein Kommentar wurde erfolgreich abgeschickt.", true);
    } catch (error) {
      showToast(`Der Versand ist fehlgeschlagen: ${error.message} Bitte versuche es später erneut.`);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Abschicken";
    }
  });
}
