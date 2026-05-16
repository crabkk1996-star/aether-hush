import { useState, useEffect, useRef } from 'react'
import { Clock, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current!.querySelectorAll('.ch-animate'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.3,
      })

      gsap.from(contentRef.current!.querySelector('.cc-form'), {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%', once: true },
      })

      gsap.from(contentRef.current!.querySelector('.cc-info'), {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%', once: true },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputStyle = {
    height: 52,
    backgroundColor: 'transparent',
    border: '1px solid rgba(148,196,232,0.5)',
    padding: '0 16px',
    fontSize: 16,
    fontWeight: 300,
    color: 'var(--muted-gray)',
    outline: 'none',
    width: '100%',
    transition: 'border-color 300ms, box-shadow 300ms',
  }

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ height: '45vh' }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/contact-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(247,250,253,0.85)' }}
        />
        <div className="relative" style={{ zIndex: 2, maxWidth: 600, padding: '0 24px' }}>
          <p className="ch-animate text-label" style={{ color: 'var(--lake-blue)' }}>
            CONTACT
          </p>
          <h1
            className="ch-animate text-display-l mt-3"
            style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)' }}
          >
            We'd Love to Hear from You
          </h1>
          <p
            className="ch-animate text-body-l mt-4 mx-auto"
            style={{ color: 'var(--muted-gray)', maxWidth: 480 }}
          >
            Questions, collaborations, or simply a note — we read every message and respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section
        ref={contentRef}
        style={{ backgroundColor: 'var(--soft-mist)', padding: '120px 0' }}
      >
        <div
          className="mx-auto flex flex-col lg:flex-row gap-16"
          style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}
        >
          {/* Form */}
          <div className="cc-form lg:w-[55%]">
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <p
                  className="text-center text-xl"
                  style={{ color: 'var(--lake-blue)', fontFamily: 'var(--font-heading)', fontWeight: 300 }}
                >
                  Thank you. Your message has been sent and we'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-body-s block mb-1.5" style={{ color: 'var(--deep-midnight)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="focus:border-[var(--lake-blue)]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-body-s block mb-1.5" style={{ color: 'var(--deep-midnight)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="focus:border-[var(--lake-blue)]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-body-s block mb-1.5" style={{ color: 'var(--deep-midnight)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="focus:border-[var(--lake-blue)]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-body-s block mb-1.5" style={{ color: 'var(--deep-midnight)' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us what's on your mind..."
                    className="focus:border-[var(--lake-blue)] resize-none"
                    style={{
                      ...inputStyle,
                      height: 'auto',
                      minHeight: 160,
                      padding: 16,
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[52px] uppercase tracking-widest text-xs transition-colors duration-300 hover:bg-[var(--light-beach)]"
                  style={{
                    backgroundColor: 'var(--lake-blue)',
                    color: 'var(--cloud-white)',
                    fontWeight: 400,
                    border: 'none',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="cc-info lg:w-[45%] flex flex-col gap-12">
            <div>
              <p className="text-label" style={{ color: 'var(--lake-blue)' }}>
                EMAIL
              </p>
              <p className="text-heading-s mt-2" style={{ color: 'var(--deep-midnight)' }}>
                hello@aetherhush.com
              </p>
            </div>

            <div>
              <p className="text-label" style={{ color: 'var(--lake-blue)' }}>
                FOLLOW
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-m no-underline flex items-center gap-2 transition-colors duration-300 hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--muted-gray)' }}
                >
                  YouTube <ExternalLink size={14} strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-m no-underline flex items-center gap-2 transition-colors duration-300 hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--muted-gray)' }}
                >
                  Instagram <ExternalLink size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div
              className="flex items-start gap-3 p-5"
              style={{
                backgroundColor: 'rgba(148,196,232,0.08)',
                borderRadius: 8,
              }}
            >
              <Clock size={16} strokeWidth={1.5} style={{ color: 'var(--lake-blue)', marginTop: 3, flexShrink: 0 }} />
              <p className="text-body-m" style={{ color: 'var(--deep-midnight)' }}>
                We will reply to your message within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
