export default function HeartGlow() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <div
        className="absolute h-20 w-20 animate-float-heart rounded-full bg-blossom/50 blur-2xl"
        aria-hidden="true"
      />
      <span className="relative animate-float-heart text-6xl drop-shadow-[0_6px_20px_rgba(255,93,162,0.55)]">
        ❤️
      </span>
    </div>
  )
}
