import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingParticles from '../../components/FloatingParticles'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const content = contentRef.current
    const video = videoRef.current

    if (!section || !title || !subtitle || !cta || !scrollIndicator || !content) return

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([video, section.querySelector('.hero-image-overlay')], { opacity: 0 })
      gsap.set(content, { opacity: 0 })

      // Background layers fade in - slower, more cinematic
      gsap.to([video, section.querySelector('.hero-image-overlay')], {
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.2,
      })

      // Content fade in - very soft
      gsap.to(content, {
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: 'power1.inOut',
      })

      // Letter split animation - slow and dreamy
      const letters = title.querySelectorAll('.letter')
      gsap.from(letters, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.05,
        ease: 'expo.out',
        delay: 0.8,
      })

      // Subtitle - soft float up
      gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power2.out',
        delay: 1.6,
      })

      // CTA - gentle reveal
      gsap.from(cta, {
        opacity: 0,
        y: 12,
        duration: 1.2,
        ease: 'power2.out',
        delay: 2.2,
      })

      // Scroll indicator
      gsap.from(scrollIndicator, {
        opacity: 0,
        duration: 1.5,
        delay: 2.8,
      })

      // Scroll-based parallax - very soft
      gsap.to(content, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
      })

      // Background parallax - slower and deeper
      gsap.to([video, section.querySelector('.hero-image-overlay')], {
        y: '-25%',
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Hide scroll indicator on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '8% top',
        onLeave: () => gsap.to(scrollIndicator, { opacity: 0, duration: 0.6 }),
        onEnterBack: () => gsap.to(scrollIndicator, { opacity: 1, duration: 0.6 }),
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const titleText = 'Aether Hush'

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-background.jpg"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Image Overlay Layer */}
      <div
        className="hero-image-overlay absolute inset-0 w-full h-full"
        style={{
          zIndex: 1,
          backgroundImage: 'url(/images/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 2,
          background: 'linear-gradient(180deg, rgba(22,35,56,0.30) 0%, rgba(22,35,56,0.10) 35%, rgba(22,35,56,0.45) 85%, rgba(22,35,56,0.70) 100%)',
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Soft light reflection - cinematic */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          top: '20%',
          left: '-10%',
          width: '120%',
          height: '40%',
          background: 'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(148,196,232,0.04) 0%, transparent 70%)',
          animation: 'mist-drift-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          top: '40%',
          right: '-10%',
          width: '120%',
          height: '40%',
          background: 'radial-gradient(ellipse 50% 30% at 70% 50%, rgba(245,250,255,0.03) 0%, transparent 70%)',
          animation: 'mist-drift-2 25s ease-in-out infinite',
        }}
      />

      {/* Content Layer */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ zIndex: 4 }}
      >
        <div style={{ maxWidth: 800, padding: '0 24px' }}>
          <h1
            ref={titleRef}
            className="text-display-xl text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              textShadow: '0 0 80px rgba(44,130,204,0.2), 0 4px 20px rgba(22,35,56,0.3)',
            }}
          >
            {titleText.split('').map((char, i) => (
              <span key={i} className="letter inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
                {char}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="text-body-l mx-auto mt-6"
            style={{
              color: 'rgba(245,250,255,0.80)',
              maxWidth: 560,
              textShadow: '0 2px 12px rgba(22,35,56,0.3)',
            }}
          >
            Ambient soundscapes inspired by still water, distant light, and spacious calmness.
          </p>

          <div ref={ctaRef} className="mt-12">
            <a
              href="/music"
              className="inline-flex items-center justify-center uppercase tracking-widest text-xs no-underline transition-all duration-500 border border-white/30 text-white/90 bg-transparent px-9 py-3.5 hover:bg-white hover:text-[var(--deep-midnight)] hover:border-white"
              style={{
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.15em',
              }}
            >
              Explore Sounds
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ zIndex: 4, bottom: 48 }}
      >
        <div className="relative" style={{ width: 1, height: 40, backgroundColor: 'rgba(245,250,255,0.25)' }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: 'rgba(245,250,255,0.5)',
              animation: 'scroll-indicator 2.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
