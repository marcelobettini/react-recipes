import { useEffect } from "react"

/**
 * Reveals every [data-reveal] element as it enters the viewport.
 *
 * Uses IntersectionObserver rather than a scroll listener so we never trigger
 * continuous reflows on mobile. Because recipes load asynchronously, a
 * MutationObserver also picks up nodes that mount after the initial scan —
 * otherwise late-arriving cards would stay invisible. Re-runs on `key`
 * (route) changes.
 */
export default function useReveal(key: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    const observe = (node: Element) => {
      if (!(node instanceof HTMLElement)) return
      if (node.matches("[data-reveal]") && !node.classList.contains("is-in")) {
        observer.observe(node)
      }
      node.querySelectorAll("[data-reveal]:not(.is-in)").forEach((child) => observer.observe(child))
    }

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node))

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => observe(node as Element))
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [key])
}
