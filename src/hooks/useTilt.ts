import { useEffect, useRef } from "react"

/**
 * Pointer-driven 3D tilt. Attaches to a `.tilt` wrapper and writes the
 * rotation + spotlight coordinates as CSS custom properties, which the
 * `.tilt__inner` / `.tilt__spot` styles consume. Movement is throttled to
 * animation frames and expressed only through transform, so it stays cheap.
 */
export default function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(hover: none)").matches) return

    let frame = 0

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`)
        el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`)
        el.style.setProperty("--mx", `${px * 100}%`)
        el.style.setProperty("--my", `${py * 100}%`)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty("--rx", "0deg")
      el.style.setProperty("--ry", "0deg")
    }

    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", handleLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("pointermove", handleMove)
      el.removeEventListener("pointerleave", handleLeave)
    }
  }, [max])

  return ref
}
