import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Music', path: '/music' },
  { label: 'Blog', path: '/blog' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current!, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footerRef.current!,
          start: 'top 90%',
          once: true,
        },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: 'var(--deep-lake)' }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1280,
          padding: '80px clamp(24px, 5vw, 80px) 0',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div>
            <p
              className="text-heading-m"
              style={{ color: 'rgba(245,250,255,0.8)', lineHeight: 1.4 }}
            >
              Ambient soundscapes inspired by still water, distant light, and spacious calmness.
            </p>
            <p
              className="mt-6 text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 18,
                fontWeight: 300,
                letterSpacing: '0.08em',
              }}
            >
              Aether Hush
            </p>
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-body-s uppercase tracking-widest no-underline transition-colors duration-300 hover:text-[var(--light-beach)]"
                style={{ color: 'var(--cloud-white)', letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--light-beach)' }}>
              CONNECT
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--light-beach)]"
                style={{ color: 'var(--cloud-white)' }}
              >
                YouTube
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--light-beach)]"
                style={{ color: 'var(--cloud-white)' }}
              >
                Instagram
              </a>
              <a
                href="mailto:hello@aetherhush.com"
                className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--light-beach)]"
                style={{ color: 'var(--cloud-white)' }}
              >
                hello@aetherhush.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full mt-12"
          style={{ height: 1, backgroundColor: 'rgba(245,250,255,0.12)' }}
        />

        {/* Copyright */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8"
        >
          <p style={{ color: 'rgba(245,250,255,0.5)', fontSize: 14, fontWeight: 300 }}>
            &copy; 2025 Aether Hush. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--light-beach)]" style={{ color: 'rgba(245,250,255,0.5)', fontWeight: 300 }}>
              Privacy Policy
            </a>
            <a href="#" className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--light-beach)]" style={{ color: 'rgba(245,250,255,0.5)', fontWeight: 300 }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
