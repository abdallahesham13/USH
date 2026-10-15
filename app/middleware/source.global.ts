// middleware/source.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query._source) return

  if (from?.query?._source) {
    return navigateTo(
      {
        path: to.path,
        query: { ...to.query, _source: from.query._source },
      },
      { replace: true }
    )
  }
})