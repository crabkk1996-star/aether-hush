import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MouseTiltCard from '../../components/MouseTiltCard'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    image: '/images/product-guqin.jpg',
    title: 'Guqin',
    category: 'Musical Instruments',
    price: '$1,280',
  },
  {
    image: '/images/product-diffuser.jpg',
    title: 'Ceramic Diffuser',
    category: 'Sleep Essentials',
    price: '$89',
  },
  {
    image: '/images/product-eyemask.jpg',
    title: 'Silk Sleep Mask',
    category: 'Sleep Essentials',
    price: '$45',
  },
  {
    image: '/images/product-essential-oil.jpg',
    title: 'Calm Essential Oil',
    category: 'Emotional Regulation',
    price: '$32',
  },
]

export default function ShopPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.sp-header'), {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })

      gsap.from(section.querySelectorAll('.sp-card'), {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--deep-midnight)', padding: '140px 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div className="sp-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-label" style={{ color: 'var(--light-beach)', marginBottom: 16 }}>
              SHOP
            </p>
            <h2
              className="text-heading-m"
              style={{ color: 'var(--cloud-white)', fontFamily: 'var(--font-heading)' }}
            >
              Curated for Your Practice
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-body-s no-underline flex items-center gap-1 transition-all duration-500 hover:gap-2 hover:text-[var(--light-beach)]"
            style={{ color: 'var(--cloud-white)' }}
          >
            Browse All <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16" style={{ perspective: 1200 }}>
          {products.map((product, index) => (
            <MouseTiltCard
              key={product.title}
              className="sp-card"
              tiltAmount={4}
            >
              <div
                style={{
                  animation: `float-drift ${9 + index}s ease-in-out infinite`,
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                <div
                  className="flex items-center justify-center p-6 transition-all duration-700 group-hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(245,250,255,0.03)',
                    borderRadius: 12,
                    aspectRatio: '1/1',
                    border: '1px solid rgba(245,250,255,0.04)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
                    transition: 'all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(148,196,232,0.08)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.25)'
                    e.currentTarget.style.backgroundColor = 'rgba(245,250,255,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,250,255,0.04)'
                    e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.15)'
                    e.currentTarget.style.backgroundColor = 'rgba(245,250,255,0.03)'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-[80%] max-h-[80%] object-contain"
                    loading="lazy"
                  />
                </div>
                <h3
                  className="text-heading-s mt-5"
                  style={{ color: 'var(--cloud-white)' }}
                >
                  {product.title}
                </h3>
                <p className="text-body-s mt-1" style={{ color: 'var(--muted-gray)' }}>
                  {product.category}
                </p>
                <p className="mt-1" style={{ color: 'var(--lake-blue)', fontSize: 16, fontWeight: 500 }}>
                  {product.price}
                </p>
                <Link to="/shop">
                  <button
                    className="mt-4 px-6 py-2.5 text-[11px] uppercase tracking-widest border transition-all duration-500 hover:bg-[var(--lake-blue)] hover:text-white hover:border-[var(--lake-blue)]"
                    style={{
                      borderColor: 'rgba(245,250,255,0.15)',
                      color: 'rgba(245,250,255,0.7)',
                      backgroundColor: 'transparent',
                      letterSpacing: '0.15em',
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </MouseTiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
