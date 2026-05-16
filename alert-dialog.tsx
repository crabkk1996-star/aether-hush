import { useState, useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import gsap from 'gsap'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerRef.current) {
        gsap.fromTo(
          playerRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.8, ease: 'expo.out', delay: 1.2 }
        )
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Floating drift motion - very subtle, continuous
  useEffect(() => {
    if (!innerRef.current) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(innerRef.current, {
      y: -3,
      duration: 4,
      ease: 'sine.inOut',
    }).to(innerRef.current, {
      y: 2,
      duration: 5,
      ease: 'sine.inOut',
    })
    return () => { tl.kill() }
  }, [])

  const waveformBars = [
    3, 4, 6, 5, 8, 6, 10, 8, 12, 10, 8, 12, 10, 8, 6, 10, 8, 6, 5, 4, 3,
  ]

  return (
    <div
      ref={playerRef}
      className="fixed left-1/2 z-40 opacity-0"
      style={{
        bottom: 20,
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: 560,
        animation: 'player-breathe 8s ease-in-out infinite',
      }}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden"
        style={{
          borderRadius: 24,
          background: 'rgba(148, 196, 232, 0.04)',
          backdropFilter: 'blur(40px) saturate(140%)',
          WebkitBackdropFilter: 'blur(40px) saturate(140%)',
          border: '1px solid rgba(245, 250, 255, 0.06)',
          boxShadow: '0 8px 48px rgba(22, 35, 56, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          padding: '14px 20px',
        }}
      >
        {/* Soft inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(148,196,232,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative flex items-center gap-4">
          {/* Play Button - minimal circle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500"
            style={{
              width: 32,
              height: 32,
              border: '1px solid rgba(245, 250, 255, 0.12)',
              backgroundColor: 'rgba(245, 250, 255, 0.03)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(148, 196, 232, 0.4)'
              e.currentTarget.style.backgroundColor = 'rgba(148, 196, 232, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245, 250, 255, 0.12)'
              e.currentTarget.style.backgroundColor = 'rgba(245, 250, 255, 0.03)'
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={11} strokeWidth={1.2} color="rgba(245,250,255,0.6)" />
            ) : (
              <Play size={11} strokeWidth={1.2} color="rgba(245,250,255,0.6)" fill="rgba(245,250,255,0.6)" />
            )}
          </button>

          {/* Track Info */}
          <div className="flex-shrink-0 min-w-[100px]">
            <p style={{ fontSize: 8, letterSpacing: '0.25em', color: 'var(--light-beach)', fontWeight: 400, textTransform: 'uppercase', opacity: 0.7 }}>
              Now Playing
            </p>
            <p className="mt-0.5" style={{ fontSize: 12, fontWeight: 300, color: 'rgba(245,250,255,0.75)', letterSpacing: '0.02em' }}>
              Still Water — Ambient Mix
            </p>
          </div>

          {/* Minimal Waveform */}
          <div className="flex items-center gap-[2px] flex-1" style={{ height: 18 }}>
            {waveformBars.map((height, i) => (
              <span
                key={i}
                className={`waveform-bar ${isPlaying ? 'playing' : ''}`}
                style={{
                  width: 1.5,
                  height: `${height}px`,
                  borderRadius: 1,
                  background: isPlaying
                    ? 'linear-gradient(to top, rgba(232,212,185,0.35), rgba(148,196,232,0.5))'
                    : 'rgba(245,250,255,0.08)',
                  animationDelay: `${-i * 0.12}s`,
                  animationDuration: `${1.8 + (i % 3) * 0.5}s`,
                  transition: 'background 0.8s ease',
                }}
              />
            ))}
          </div>

          {/* Time */}
          <span className="flex-shrink-0" style={{ fontSize: 10, fontWeight: 300, color: 'rgba(245,250,255,0.35)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}>
            03:24
          </span>

          {/* Tiny progress dot */}
          <div className="flex-shrink-0 relative" style={{ width: 32, height: 2 }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(245,250,255,0.06)',
                borderRadius: 1,
              }}
            />
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: '40%',
                background: 'linear-gradient(90deg, rgba(148,196,232,0.3), rgba(148,196,232,0.6))',
                borderRadius: 1,
                transition: 'width 2s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
