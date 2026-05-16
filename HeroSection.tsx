import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    image: '/images/blog-cover-1.jpg',
    category: 'Five Elements Sound Therapy',
    title: 'The Water Element: Finding Fluidity Through Sound',
    excerpt: 'Discover how the ancient wisdom of water — adaptive, flowing, and deeply receptive — translates into healing frequencies that calm the nervous system and restore emotional balance.',
    date: 'December 15, 2024',
    large: true,
  },
  {
    image: '/images/blog-cover-2.jpg',
    category: 'Sleep Guide',
    title: 'Botanical Sleep Rituals for Restless Minds',
    date: 'November 28, 2024',
    large: false,
  },
  {
    image: '/images/blog-cover-3.jpg',
    category: 'Emotional Regulation',
    title: 'The Practice of Morning Stillness',
    date: 'November 10, 2024',
    large: false,
  },
]

export default function BlogPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.bp-header'), {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })

      gsap.from(section.querySelectorAll('.bp-article'), {
        opacity: 0,
        y: 60,
        duration: 1.4,
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
        <div className="bp-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-label" style={{ color: 'var(--lake-blue)', marginBottom: 16 }}>
              JOURNAL
            </p>
            <h2
              className="text-heading-m"
              style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)' }}
            >
              Stories of Stillness
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-body-s no-underline flex items-center gap-1 transition-all duration-500 hover:gap-2"
            style={{ color: 'var(--lake-blue)' }}
          >
            Read All <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Large Article */}
          <Link
            to="/blog"
            className="bp-article group no-underline block row-span-2"
          >
            <div
              className="overflow-hidden transition-all duration-700"
              style={{ borderRadius: 6 }}
            >
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                style={{ aspectRatio: '16/10' }}
                loading="lazy"
              />
            </div>
            <p className="text-label mt-6" style={{ color: 'var(--lake-blue)' }}>
              {articles[0].category}
            </p>
            <h3
              className="mt-2 text-2xl transition-colors duration-700 group-hover:text-[var(--lake-blue)]"
              style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)', fontWeight: 300, lineHeight: 1.3 }}
            >
              {articles[0].title}
            </h3>
            <p className="text-body-m mt-3" style={{ color: 'var(--muted-gray)' }}>
              {articles[0].excerpt}
            </p>
            <p className="text-body-s mt-4" style={{ color: 'var(--light-beach)' }}>
              {articles[0].date}
            </p>
            <span
              className="text-body-s inline-flex items-center gap-1 mt-4 transition-all duration-500"
              style={{ color: 'var(--lake-blue)' }}
            >
              Read More <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Small Articles */}
          <div className="flex flex-col gap-10">
            {articles.slice(1).map((article) => (
              <Link
                to="/blog"
                key={article.title}
                className="bp-article group no-underline flex gap-5"
              >
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{ borderRadius: 6, width: '38%' }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                    style={{ aspectRatio: '3/2' }}
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-label" style={{ color: 'var(--lake-blue)' }}>
                    {article.category}
                  </p>
                  <h3
                    className="text-heading-s mt-2 transition-colors duration-700 group-hover:text-[var(--lake-blue)]"
                    style={{ color: 'var(--deep-midnight)' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-body-s mt-4" style={{ color: 'var(--light-beach)' }}>
                    {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
