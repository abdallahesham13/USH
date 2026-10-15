export default defineNuxtPlugin(() => {
  const { state } = useAppStore()

  const loadGTM = (gtmId: string) => {
    if (!gtmId) return
    if (document.getElementById("gtm-script")) return

    const script = document.createElement("script")
    script.id = "gtm-script"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(script)

      ; (window as any).dataLayer = (window as any).dataLayer || []
      ; (window as any).dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
  }

  const waitForFullLoad = (gtmId: string) => {
    if (document.readyState === "complete") {
      setTimeout(() => loadGTM(gtmId), 2000)
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => loadGTM(gtmId), 2000)
      })
    }
  }

  watch(
    () => state.value?.marketingTools?.gtm,
    (gtmId) => {
      if (!gtmId) return
      waitForFullLoad(gtmId)
    },
    { immediate: true }
  )
})