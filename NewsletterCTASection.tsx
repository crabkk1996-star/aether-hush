import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AtmosphericFog from '../../components/AtmosphericFog'

gsap.registerPlugin(ScrollTrigger)

export default function BrandStatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const label = section.querySelector('.bs-label')
      const statement = section.querySelector('.bs-statement')
      const divider = section.querySelector('.bs-divider')

      gsap.from(label, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })

      gsap.from(statement, {
        opacity: 0,
        y: 50,
        duration: 1.8,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })

      gsap.from(divider, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.8,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })

      // Video parallax - slow cinematic drift
      gsap.to(videoRef.current, {
        y: '-20%',
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Video fade-in when section enters viewport
      gsap.fromTo(videoRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: 600 }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          zIndex: 0,
          height: '140%',
          top: '-20%',
          opacity: 0,
        }}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/philosophy-boat.jpg"
      >
        <source src="/images/philosophy-boat.mp4" type="video/mp4" />
      </video>

      {/* Photo overlay - same boat scene for unified atmosphere */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 1,
          backgroundImage: 'url(/images/philosophy-boat.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Dark overlay - softer, more atmospheric */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(22,35,56,0.40) 0%, rgba(22,35,56,0.28) 50%, rgba(22,35,56,0.42) 100%)',
          zIndex: 2,
        }}
      />

      {/* Atmospheric Fog Canvas */}
      <AtmosphericFog />

      {/* Additional ambient light layers */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          top: '10%',
          left: '10%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(148,196,232,0.04) 0%, transparent 70%)',
          animation: 'mist-drift-1 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          bottom: '5%',
          right: '5%',
          width: '60%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(245,250,255,0.03) 0%, transparent 70%)',
          animation: 'mist-drift-2 25s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto text-center"
        style={{
          maxWidth: 720,
          padding: '180px clamp(24px, 5vw, 80px)',
          zIndex: 3,
        }}
      >
        <p className="bs-label text-label" style={{ color: 'var(--light-beach)', marginBottom: 32 }}>
          OUR PHILOSOPHY
        </p>
        <p
          className="bs-statement text-heading-m text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.6,
            textShadow: '0 2px 40px rgba(22,35,56,0.5)',
          }}
        >
          In the stillness between notes, we find the space to breathe. Aether Hush weaves ancient Eastern wisdom with contemporary ambient sound — creating sonic landscapes that honor the Five Elements and the quiet rhythm of water. Each composition is an invitation to pause, to listen, and to return to yourself.
        </p>
        <div
          className="bs-divider mx-auto mt-14"
          style={{
            width: 40,
            height: 1,
            backgroundColor: 'rgba(245,250,255,0.3)',
          }}
        />
      </div>
    </section>
  )
}
