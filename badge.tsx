import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

interface MouseTiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  tiltAmount?: number
}

export default function MouseTiltCard({ children, className = '', style = {}, tiltAmount = 4 }: MouseTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(card, {
      rotateY: x * tiltAmount,
      rotateX: -y * tiltAmount,
      duration: 0.6,
      ease: 'power2.out',
    })

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(148,196,232,0.06), transparent 60%)`
    }
  }, [tiltAmount])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{ borderRadius: 'inherit', zIndex: 10 }}
      />
      {children}
    </div>
  )
}
