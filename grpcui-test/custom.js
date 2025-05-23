window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const svc = params.get("service");
  const mtd = params.get("method");

  if (!svc || !mtd) return;

  const svcEl = document.getElementById("grpc-service");
  const mtdEl = document.getElementById("grpc-method");

  if (!svcEl || !mtdEl) return;

  svcEl.value = svc;
  svcEl.dispatchEvent(new Event("change", { bubbles: true }));

  const obs = new MutationObserver(() => {
    for (const opt of mtdEl.options) {
      if (opt.value === mtd) {
        mtdEl.value = mtd;
        mtdEl.dispatchEvent(new Event("change", { bubbles: true }));
        obs.disconnect();
        break;
      }
    }
  });

  obs.observe(mtdEl, { childList: true });
});