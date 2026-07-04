import { useState } from "react"
import BootSequence from "./components/BootSequence"
import HeartGlow from "./components/HeartGlow"
import ComplimentDeck from "./components/ComplimentDeck"
import ReflectionPanel from "./components/ReflectionPanel"
import MessageComposer from "./components/MessageComposer"

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-coral via-blossom to-lilac bg-[length:200%_200%] animate-drift">
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[at_top] from-marigold/35 via-transparent to-transparent"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto flex max-w-xl flex-col gap-10 px-5 pb-24 pt-10">
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}

        {booted && (
          <>
            <section className="flex flex-col items-center gap-5 rounded-[28px] border border-white/40 bg-white/25 p-8 text-center shadow-[0_12px_45px_rgba(59,11,46,0.28)] backdrop-blur-xl">
              <HeartGlow />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
                  protocol v.56 — status: running
                </p>
                <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Hello, Soumya</h1>
                <p className="mt-1 font-mono text-sm text-ink/70">Roll No. 56</p>
              </div>
            </section>

            <ComplimentDeck />
            <ReflectionPanel />
            <MessageComposer />

            <footer className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-cream/80">
              $ status: charming — script complete
            </footer>
          </>
        )}
      </main>
    </div>
  )
}

export default App
