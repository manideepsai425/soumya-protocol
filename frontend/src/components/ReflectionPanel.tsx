import { useEffect, useState } from "react"
import { api } from "../api/client"

export default function ReflectionPanel() {
  const [reflections, setReflections] = useState<string[]>([])

  useEffect(() => {
    api
      .getReflections()
      .then((res) => setReflections(res.reflections))
      .catch(() => setReflections([]))
  }, [])

  if (reflections.length === 0) return null

  return (
    <section
      aria-label="A quieter thought"
      className="rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur-xl"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/70">
        a quieter thought, no jokes this time
      </p>
      <div className="flex flex-col gap-3">
        {reflections.map((line) => (
          <p key={line} className="font-display text-base leading-relaxed text-cream">
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
