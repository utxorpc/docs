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