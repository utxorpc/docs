window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const svc = params.get("service");
  const mtd = params.get("method");

  if (!svc || !mtd) return;

  const svcEl = document.getElementById("grpc-service");
  const mtdEl = document.getElementById("grpc-method");

  if (!svcEl || !mtdEl) return;

  svcEl.value = svc;
  svcEl.dispatchEvent(new Event("change"));

  setTimeout(() => {
    mtdEl.value = mtd;
    mtdEl.dispatchEvent(new Event("change"));
  }, 0);
});