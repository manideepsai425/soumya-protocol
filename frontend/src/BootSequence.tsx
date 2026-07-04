import { useEffect, useState } from "react"

const BOOT_LINES = [
  "$ python3 soumya_protocol.py",
  "initialising soumya protocol v.56 ...",
  "loading 56 reasons to smile ...",
  "ready.",
]

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((_, index) => {
      const t = setTimeout(
        () => {
          if (!cancelled) setVisibleCount(index + 1)
        },
        320 + index * 420,
      )
      timeouts.push(t)
    })

    const finalTimeout = setTimeout(
      () => {
        if (!cancelled) onComplete()
      },
      320 + BOOT_LINES.length * 420 + 500,
    )
    timeouts.push(finalTimeout)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-1.5 px-6 font-mono text-sm text-cream/90">
      {BOOT_LINES.slice(0, visibleCount).map((line, idx) => (
        <p key={idx} className="tracking-tight">
          {line}
        </p>
      ))}
      <span className="mt-2 inline-block h-4 w-2 animate-pulse bg-cream/70" aria-hidden="true" />
    </div>
  )
}
