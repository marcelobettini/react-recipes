import type { SVGProps } from "react"

export type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-left"
  | "clock"
  | "flame"
  | "users"
  | "star"
  | "search"
  | "leaf"
  | "whisk"
  | "bowl"
  | "spark"
  | "close"
  | "menu"
  | "gauge"

/* Ultra-light, precise line icons (Phosphor-Light styling) drawn on a
   shared 24×24 grid. Strokes scale with font-size via em units. */
const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c2.5 3 4.5 5 4.5 8a4.5 4.5 0 0 1-9 0c0-1.2.4-2.2 1-3 .3 1.1 1 1.8 1.8 2C10.6 8 11 5.4 12 3Z" />
      <path d="M12 21a6 6 0 0 0 6-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.4a5.5 5.5 0 0 1 3 4.1" />
    </>
  ),
  star: (
    <path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8Z" />
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.7-4.7" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-9 0-16 3-16 10a6 6 0 0 0 11 3.3C17.5 14.5 20 9.5 20 4Z" />
      <path d="M4 20c2.5-6 5.5-9 9.5-11" />
    </>
  ),
  whisk: (
    <>
      <path d="M8 3c2 2.5 2.6 6 2.6 9h2.8C13.4 9 14 5.5 16 3" />
      <path d="M12 12v8" />
      <circle cx="12" cy="21" r="1" />
      <path d="M7 6.5h10" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M9 7.5c0-1.5 1-2.5 3-2.5s3 1 3 2.5" />
      <path d="M2.5 11h19" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      <path d="M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18v-5" />
      <path d="m12 13 3-2" />
    </>
  ),
}

type Props = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

export default function Icon({ name, size = 18, strokeWidth = 1.25, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
