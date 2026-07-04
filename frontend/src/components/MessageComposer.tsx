import { useState } from "react"
import { api } from "../api/client"

export default function MessageComposer() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed) {
      setError("Type something first — can't send a blank message.")
      return
    }
    setSending(true)
    setError(null)
    try {
      const res = await api.sendMessage(trimmed)
      setResult(res.formatted)
      setText("")
    } catch {
      setError("Couldn't reach the server. Try again in a moment.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      aria-label="Send a custom message"
      className="rounded-3xl border border-white/40 bg-white/30 p-6 backdrop-blur-xl"
    >
      <label htmlFor="custom-message" className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">
        send her a custom message
      </label>
      <textarea
        id="custom-message"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
        placeholder="Type your message for Soumya..."
        className="mt-3 w-full rounded-2xl border border-white/50 bg-white/70 p-3 font-[var(--font-body)] text-ink placeholder:text-ink/40 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={sending}
        className="mt-3 w-full rounded-full bg-ink px-5 py-3 font-display text-base text-cream transition hover:bg-ink/90 disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send"}
      </button>

      {error && <p className="mt-3 font-mono text-xs text-ink/80">{error}</p>}

      {result && (
        <div className="mt-4 rounded-2xl border border-white/50 bg-white/50 p-4">
          <p className="font-display text-ink">{result}</p>
        </div>
      )}
    </section>
  )
}
