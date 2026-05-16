import { useEffect, useRef } from 'react'

interface FogLayer {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

export default function AtmosphericFog() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const layers: FogLayer[] = []

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

    const createLayers = () => {
      layers.length = 0
      const count = 12
      for (let i = 0; i < count; i++) {
        layers.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7 + h * 0.15,
          radius: 150 + Math.random() * 300,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.05,
          opacity: 0.015 + Math.random() * 0.025,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.003 + Math.random() * 0.005,
        })
      }
    }

    resize()
    createLayers()
    window.addEventListener('resize', () => {
      resize()
      createLayers()
    })

    let time = 0
    const draw = () => {
      time += 1
      ctx.clearRect(0, 0, w, h)

      // Draw soft light reflections - subtle shimmer
      for (let i = 0; i < 4; i++) {
        const lx = w * (0.2 + i * 0.2) + Math.sin(time * 0.002 + i) * 30
        const ly = h * (0.3 + Math.sin(time * 0.001 + i * 2) * 0.1)
        const gradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, 200)
        gradient.addColorStop(0, `rgba(148, 196, 232, ${0.02 + Math.sin(time * 0.003 + i) * 0.01})`)
        gradient.addColorStop(1, 'rgba(148, 196, 232, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      // Draw fog layers
      for (const layer of layers) {
        layer.x += layer.vx
        layer.y += layer.vy
        layer.pulse += layer.pulseSpeed

        // Wrap around
        if (layer.x < -layer.radius) layer.x = w + layer.radius
        if (layer.x > w + layer.radius) layer.x = -layer.radius
        if (layer.y < -layer.radius) layer.y = h + layer.radius
        if (layer.y > h + layer.radius) layer.y = -layer.radius

        const breathingOpacity = layer.opacity * (0.7 + 0.3 * Math.sin(layer.pulse))

        const gradient = ctx.createRadialGradient(
          layer.x, layer.y, 0,
          layer.x, layer.y, layer.radius
        )
        gradient.addColorStop(0, `rgba(200, 220, 240, ${breathingOpacity})`)
        gradient.addColorStop(0.5, `rgba(180, 210, 235, ${breathingOpacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(180, 210, 235, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(layer.x, layer.y, layer.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Subtle haze band at bottom
      const hazeGradient = ctx.createLinearGradient(0, h * 0.6, 0, h)
      const hazeOpacity = 0.03 + Math.sin(time * 0.001) * 0.01
      hazeGradient.addColorStop(0, 'rgba(148, 196, 232, 0)')
      hazeGradient.addColorStop(1, `rgba(148, 196, 232, ${hazeOpacity})`)
      ctx.fillStyle = hazeGradient
      ctx.fillRect(0, h * 0.6, w, h * 0.4)

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
