console.log('[dompatch] loaded')

window.parent.postMessage(
  { type: 'grpcui-ready' },
  window.location.origin
);

window.addEventListener('message', (event) => {
  const { type, service: svc, method: mtd } = event.data || {}
  if (type !== 'grpc-select') return
  console.log('[dompatch] received grpc-select', svc, mtd)

  const svcEl = document.getElementById('grpc-service')
  const mtdEl = document.getElementById('grpc-method')
  if (!svcEl || !mtdEl) {
    console.error('[dompatch] grpcui elements not found!')
    return
  }

  let observer
  if (mtd) {
    observer = new MutationObserver((mutations, obs) => {
      if ([...mtdEl.options].some(o => o.value === mtd)) {
        mtdEl.value = mtd
        mtdEl.dispatchEvent(new Event('change', { bubbles: true }))
        obs.disconnect()
      }
    })
    observer.observe(mtdEl, { childList: true })
  }

  if (svc) {
    if (![...svcEl.options].some(o => o.value === svc)) {
      console.warn(`[dompatch] Service "${svc}" not found; using default.`)
    } else {
      svcEl.value = svc
      svcEl.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  if (mtd && !svc) {
    if ([...mtdEl.options].some(o => o.value === mtd)) {
      mtdEl.value = mtd
      mtdEl.dispatchEvent(new Event('change', { bubbles: true }))
    } else {
      console.warn(`[dompatch] Method "${mtd}" not found; using default.`)
    }
    observer?.disconnect()  
  }
})

$(document).ready(() => {
  $('button, div, span').each(function() {
      const $this = $(this);
      const text = $this.text().trim();

      if (text.toUpperCase() === "X" || text === "×") {
        $this.html('<img src="/grpcui/img/delete.svg" alt="x" style="width:24px;height:24px;">');
      } else if (text === "+"){
        $this.html('<img src="/grpcui/img/add.svg" alt="x" style="width:24px;height:24px;">');
      }
  });
});

$(document).ready(() => {
  $(".grpc-request-table button").each(function() {
      if ($(this).text().trim() === "+") {
          $(this).html('<img src="/grpcui/img/add.svg" alt="+" style="width:24px;height:24px;">');
      } else if ($(this).text().trim().toUpperCase() === "X" || $(this).text().trim() === "×") {
          $(this).html('<img src="/grpcui/img/delete.svg" alt="×" style="width:24px;height:24px;">');
      }
  });
});


$(document).ready(() => {
  const $toggleButton = $("#grpc-descriptions-toggle");
  const $descriptions = $("#grpc-descriptions");

  function setIcon(expanded) {
      if (expanded) {
          $toggleButton.html('<img src="/grpcui/img/arrow-up.svg" alt="collapse" style="width:20px;height:20px;">');
      } else {
          $toggleButton.html('<img src="/grpcui/img/arrow-up.svg" alt="expand" style="width:20px;height:20px;transform: rotate(180deg);">');
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
});



