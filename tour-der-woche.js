(() => {
  "use strict";

  const weeklyLink = document.querySelector("[data-weekly-summit]");
  const summits = window.BahnbergeData?.summits;
  if (!weeklyLink || !Array.isArray(summits) || summits.length === 0) return;

  const today = new Date();
  const currentMonday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const daysSinceMonday = (currentMonday.getUTCDay() + 6) % 7;
  currentMonday.setUTCDate(currentMonday.getUTCDate() - daysSinceMonday);
  const weekIndex = Math.floor(currentMonday.getTime() / 604800000);
  const summit = summits[weekIndex % summits.length];

  weeklyLink.href = summit.page;
  weeklyLink.setAttribute("aria-label", `Tour der Woche: ${summit.name}`);
})();
