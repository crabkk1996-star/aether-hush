import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NewsletterCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.nl-animate'), {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1A5A8F 0%, #162338 60%, #0f1a2e 100%)',
        padding: '120px 0',
      }}
    >
      {/* Ambient light layers */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-30%',
          left: '-10%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(44,130,204,0.08) 0%, transparent 70%)',
          animation: 'mist-drift-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20%',
          right: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(148,196,232,0.06) 0%, transparent 70%)',
          animation: 'mist-drift-2 18s ease-in-out infinite',
        }}
      />

      <div className="relative mx-auto text-center" style={{ maxWidth: 600, padding: '0 24px', zIndex: 2 }}>
        <h2
          className="nl-animate text-heading-m"
          style={{ color: 'var(--cloud-white)', fontFamily: 'var(--font-heading)' }}
        >
          Join the Quiet
        </h2>
        <p
          className="nl-animate text-body-l mt-5"
          style={{ color: 'rgba(245,250,255,0.65)' }}
        >
          Receive seasonal soundscapes, meditative writings, and early access to new releases.
        </p>

        {submitted ? (
          <p
            className="nl-animate mt-12 text-xl"
            style={{ color: 'var(--light-beach)', fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            Thank you. Welcome to the quiet.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="nl-animate mt-12 flex flex-col sm:flex-row gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 h-[52px] px-6 text-white outline-none transition-all duration-500 focus:border-[var(--light-beach)]"
              style={{
                backgroundColor: 'rgba(245,250,255,0.04)',
                border: '1px solid rgba(148,196,232,0.15)',
                fontSize: 15,
                fontWeight: 300,
                backdropFilter: 'blur(8px)',
              }}
            />
            <button
              type="submit"
              className="h-[52px] px-8 uppercase tracking-widest text-xs transition-all duration-500 hover:bg-[var(--light-beach)]"
              style={{
                backgroundColor: 'var(--lake-blue)',
                color: 'var(--cloud-white)',
                fontWeight: 400,
                letterSpacing: '0.18em',
              }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          className="nl-animate mt-5"
          style={{ fontSize: 12, fontWeight: 300, color: 'rgba(245,250,255,0.3)' }}
        >
          We respect your silence. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
