import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MouseTiltCard from '../../components/MouseTiltCard'

gsap.registerPlugin(ScrollTrigger)

const collections = [
  {
    image: '/images/album-cover-3.jpg',
    title: 'Sleep Soundscapes',
    description: 'Gentle sonic environments designed to guide you into deep, restorative sleep.',
  },
  {
    image: '/images/album-cover-4.jpg',
    title: 'Focus & Flow',
    description: 'Minimal ambient textures to support deep concentration and creative work.',
  },
  {
    image: '/images/album-cover-5.jpg',
    title: 'Five Elements',
    description: 'Ancient Eastern elemental wisdom translated into contemporary healing frequencies.',
  },
]

export default function CollectionsPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.cp-header'), {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })

      gsap.from(section.querySelectorAll('.cp-card'), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--soft-mist)', padding: '140px 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div className="cp-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-label" style={{ color: 'var(--lake-blue)', marginBottom: 16 }}>
              COLLECTIONS
            </p>
            <h2
              className="text-heading-m"
              style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)' }}
            >
              Explore Our Sound Worlds
            </h2>
          </div>
          <Link
            to="/music"
            className="text-body-s no-underline flex items-center gap-1 transition-all duration-500 hover:gap-2"
            style={{ color: 'var(--lake-blue)' }}
          >
            View All <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Cards Grid with Mouse Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ perspective: 1200 }}>
          {collections.map((item, index) => (
            <MouseTiltCard
              key={item.title}
              className="cp-card"
              tiltAmount={5}
            >
              <Link
                to="/music"
                className="group no-underline block"
                style={{
                  animation: `float-drift ${8 + index * 2}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <div
                  className="overflow-hidden transition-shadow duration-700"
                  style={{
                    borderRadius: 4,
                    boxShadow: '0 4px 24px rgba(22,35,56,0.04)',
                  }}
                >
                  <div className="overflow-hidden" style={{ borderRadius: 4 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                      style={{ aspectRatio: '4/3' }}
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3
                  className="text-heading-s mt-5 transition-colors duration-500 group-hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--deep-midnight)' }}
                >
                  {item.title}
                </h3>
                <p className="text-body-m mt-2" style={{ color: 'var(--muted-gray)' }}>
                  {item.description}
                </p>
                <span
                  className="text-body-s inline-flex items-center gap-1 mt-4 transition-all duration-500"
                  style={{ color: 'var(--lake-blue)' }}
                >
                  Listen <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </MouseTiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
