document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    broadcastReady();
    setupHistoryDeleteIcons();
    prepareTimeoutInput();
    replaceRequestButtons();
    prepareDescriptionToggle();
  }
})

let targetService = null;
let targetMethod = null;

window.addEventListener("message", (e) => {
  if (e.origin !== window.location.origin) return;
  if (e.data?.type === "are-you-ready") broadcastReady();
  if (e.data?.type === "grpc-select") rebuildForm(e.data.service, e.data.method);
});

function broadcastReady() {
  window.parent.postMessage(
    { type: "grpcui-ready" },
    window.location.origin
  );
}

const originalInit = window.initGRPCForm;
let bootArgs = null;

window.initGRPCForm = function (...args) {
  if (!bootArgs) bootArgs = structuredClone(args);
  return originalInit.apply(this, args);
};

function rebuildForm(service, method) {
  if (!bootArgs) return;

  const [services, svcDescs, mtdDescs, ...rest] = structuredClone(bootArgs);
  if (!services[service]) {                     // bad input
    console.warn("[patch] unknown service:", service);
    return;
  }

  const methodList = services[service];
  const idx = methodList.indexOf(method);
  if (idx < 0) {
    console.warn("[patch] unknown method:", method);
    return;
  }
  if (idx > 0) methodList.unshift(methodList.splice(idx, 1)[0]);

  const reordered = { [service]: methodList, ...services };

  $("#grpc-request-metadata-add-row").off("click");

  originalInit.call(window, reordered, svcDescs, mtdDescs, ...rest);

  const svcSel = document.getElementById("grpc-service");
  const mtdSel = document.getElementById("grpc-method");
  if (!svcSel || !mtdSel) return;

  svcSel.value = service;

  mtdSel.innerHTML = "";
  for (const m of methodList) mtdSel.append(new Option(m, m));
  mtdSel.value = method;

  $("#grpc-request-metadata-form tr").not(":first,:last").remove();

  mtdSel.dispatchEvent(new Event("change", { bubbles: true }));

  setupHistoryDeleteIcons();
  prepareTimeoutInput();
  replaceRequestButtons();
  prepareDescriptionToggle();
}

function setupHistoryDeleteIcons() {

  function replaceDeleteButtons() {
    $(".grpc-history-list button").each(function () {
      const buttonText = $(this).text().trim();
      if (buttonText.toUpperCase() === "X" || buttonText === "×") {
        $(this).html('<img src="/grpcui/img/delete.svg" alt="×" style="width:16px;height:16px;">');
      }
    });
  }

  replaceDeleteButtons();

  const observer = new MutationObserver(() => {
    replaceDeleteButtons();
  });

  const targetNode = document.querySelector(".grpc-history-list");
  if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
  }
};


function prepareTimeoutInput() {
  const $timeoutDiv = $("#grpc-request-timeout");

  $timeoutDiv.contents().filter(function () {
    return this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() === 'seconds';
  }).wrap('<span class="seconds-text"></span>');

  $timeoutDiv.find("input").attr("placeholder", "Input");
};


function replaceRequestButtons() {
  function replaceButtons() {
    $(".grpc-request-table button").each(function () {
      const buttonText = $(this).text().trim();
      if (buttonText === "+") {
        $(this).html('<img src="/grpcui/img/add.svg" alt="+" style="width:16px;height:16px;">');
      } else if (buttonText.toUpperCase() === "X" || buttonText === "×") {
        $(this).html('<img src="/grpcui/img/delete.svg" alt="×" style="width:16px;height:16px;">');
      }
    });
  }

  replaceButtons();

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length) {
        replaceButtons();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

function prepareDescriptionToggle() {
  const $toggleButton = $("#grpc-descriptions-toggle");
  const $descriptions = $("#grpc-descriptions");

  function setIcon(expanded) {
    if (expanded) {
      $toggleButton.html('<img src="/grpcui/img/arrow-up.svg" alt="collapse" style="width:16px;height:16px;">');
    } else {
      $toggleButton.html('<img src="/grpcui/img/arrow-up.svg" alt="expand" style="width:16px;height:16px;transform: rotate(180deg);">');
    }
  }

  let descriptionsShown = false;

  setIcon(descriptionsShown);

  $descriptions.css({
    "background-color": "transparent",
    "padding": "0",
    "border": "none"
  });
  $("#grpc-descriptions pre").hide();

  $toggleButton.off("click").click(() => {
    descriptionsShown = !descriptionsShown;

    setIcon(descriptionsShown);

    if (descriptionsShown) {
      $descriptions.css({
        "background-color": "",
        "padding": "",
        "border": ""
      });
      $("#grpc-descriptions pre").show();
    } else {
      $descriptions.css({
        "background-color": "transparent",
        "padding": "0",
        "border": "none"
      });
      $("#grpc-descriptions pre").hide();
    }
  });
};