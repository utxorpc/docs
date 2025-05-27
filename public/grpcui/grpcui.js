window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const svc = params.get("service");
  const mtd = params.get("method");

  if (!svc || !mtd) return;

  const svcEl = document.getElementById("grpc-service");
  const mtdEl = document.getElementById("grpc-method");

  if (!svcEl || !mtdEl) return;

  const observer = new MutationObserver(() => {
    mtdEl.value = mtd;
    mtdEl.dispatchEvent(new Event("change", { bubbles: true }));
    observer.disconnect();
  });
  observer.observe(mtdEl, { childList: true });

  svcEl.value = svc;
  svcEl.dispatchEvent(new Event("change", { bubbles: true }));
});

$(document).ready(() => {
  const $toggleButton = $("#grpc-descriptions-toggle");
  const $descriptions = $("#grpc-descriptions");

  let descriptionsShown = ($toggleButton.text().trim() === "«");

  $toggleButton.off("click").click(() => {
      if (descriptionsShown) {
          $descriptions.css({
              "background-color": "transparent",
              "padding": "0",
              "border": "none"
          });
          $("#grpc-descriptions pre").hide();
          $toggleButton.text("»");
      } else {
          $descriptions.css({
              "background-color": "",
              "padding": "",
              "border": ""
          });
          $("#grpc-descriptions pre").show();
          $toggleButton.text("«");
      }

      descriptionsShown = !descriptionsShown;

      if (typeof expandDescStorageKey !== 'undefined') {
          localStorage.setItem(expandDescStorageKey, descriptionsShown + "");
      }
  });
});

$(document).ready(() => {
  $('button, div, span').each(function() {
      const $this = $(this);
      const text = $this.text().trim();

      if (text.toUpperCase() === "X" || text === "×") {
          $this.html('<img src="/grpcui/img/delete.svg" alt="x" style="width:24px;height:24px;">');
      }
  });
});

$(document).ready(() => {
    $("button.add").each(function() {
        if ($(this).text().trim() === "+") {
            $(this).html('<img src="/grpcui/img/add.svg" alt="+" style="width:24px;height:24px;">');
        }
    });
});



