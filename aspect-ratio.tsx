import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  phase: number
  speed: number
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const particles: Particle[] = []
    const PARTICLE_COUNT = 30

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.offsetWidth
      h = parent.offsetHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.1 - Math.random() * 0.3,
          size: 0.5 + Math.random() * 2,
          opacity: 0.05 + Math.random() * 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.01,
        })
      }
    }

    resize()
    init()
    window.addEventListener('resize', () => { resize(); init() })

    let time = 0
    const draw = () => {
      time += 1
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx + Math.sin(time * p.speed + p.phase) * 0.1
        p.y += p.vy
        p.phase += p.speed

        // Wrap
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const flicker = p.opacity * (0.8 + 0.2 * Math.sin(time * 0.02 + p.phase))

        // Soft glow
        if (p.size > 1.2) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
          glow.addColorStop(0, `rgba(245, 250, 255, ${flicker * 0.3})`)
          glow.addColorStop(1, 'rgba(245, 250, 255, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(245, 250, 255, ${flicker})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Very subtle connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(148, 196, 232, ${0.03 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
