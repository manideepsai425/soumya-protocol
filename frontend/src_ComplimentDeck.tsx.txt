import { useEffect, useState } from "react"
import { api } from "../api/client"

export default function ComplimentDeck() {
  const [compliments, setCompliments] = useState<string[]>([])
  const [hearts, setHearts] = useState<string[]>(["💕"])
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    api
      .getCompliments(3)
      .then((res) => {
        setCompliments(res.compliments)
        setHearts(res.hearts.length ? res.hearts : ["💕"])
        setStatus("ready")
      })
      .catch(() => setStatus("error"))
  }, [])

  if (status === "error") {
    return (
      <p className="text-center font-mono text-xs text-cream/80">
        couldn't reach the protocol — try refreshing
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-4" aria-label="Compliments">
      {status === "loading" &&
        Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="h-16 animate-pulse rounded-3xl border border-white/30 bg-white/15"
          />
        ))}

      {status === "ready" &&
        compliments.map((msg, idx) => (
          <div
            key={msg}
            style={{ animationDelay: `${idx * 180}ms` }}
            className={`opacity-0 animate-fade-up rounded-3xl border border-white/40 bg-white/30 p-5 shadow-[0_10px_30px_rgba(59,11,46,0.2)] backdrop-blur-xl ${
              idx % 2 === 1 ? "ml-6" : "mr-6"
            }`}
          >
            <p className="font-display text-lg leading-snug text-ink">
              <span aria-hidden="true">{hearts[idx % hearts.length]} </span>
              {msg}
            </p>
          </div>
        ))}
    </section>
  )
}
