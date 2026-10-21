(function () {
  const output = document.getElementById("visitor-counter");
  if (!output) return;

  const STORAGE_KEY = "bahnberge-visited";
  let alreadyCounted = false;

  try {
    alreadyCounted = localStorage.getItem(STORAGE_KEY) === "1";
  } catch (error) {
    alreadyCounted = true;
  }

  fetch("counter.php", { method: alreadyCounted ? "GET" : "POST", cache: "no-store" })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error("counter failed"))))
    .then((data) => {
      if (typeof data.count !== "number") return;
      output.querySelector("[data-count]").textContent = data.count.toLocaleString("de-DE");
      output.hidden = false;
      if (!alreadyCounted) {
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch (error) {
          // Zählung bleibt auch ohne Markierung gültig.
        }
      }
    })
    .catch(() => {});
})();
