import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    cover: '/images/blog-cover-1.jpg',
    category: 'FIVE ELEMENTS SOUND THERAPY',
    title: 'The Water Element: Finding Fluidity Through Sound',
    excerpt: 'Discover how the ancient wisdom of water — adaptive, flowing, and deeply receptive — translates into healing frequencies that calm the nervous system and restore emotional balance. Water teaches us to move with rather than against, to find stillness within motion, and to hold space for whatever arises.',
    date: 'December 15, 2024',
  },
  {
    cover: '/images/blog-cover-2.jpg',
    category: 'SLEEP GUIDE',
    title: 'Botanical Sleep Rituals for Restless Minds',
    excerpt: 'Before electricity, we slept in rhythm with the earth. Explore how ancient botanical wisdom — from lavender fields to chamomile gardens — can be woven into modern bedtime rituals that gently guide the mind toward rest.',
    date: 'November 28, 2024',
  },
  {
    cover: '/images/blog-cover-3.jpg',
    category: 'EMOTIONAL REGULATION',
    title: 'The Practice of Morning Stillness',
    excerpt: 'What happens when the first moments of your day are spent in silence? A meditation on creating intentional morning rituals that set the emotional tone for everything that follows.',
    date: 'November 10, 2024',
  },
  {
    cover: '/images/blog-cover-4.jpg',
    category: 'FIVE ELEMENTS SOUND THERAPY',
    title: 'The Resonance of Ancient Strings: Guqin in Modern Healing',
    excerpt: 'The guqin has been called the instrument of the sages for over three thousand years. Discover how its seven strings and thirteen harmonic markers create frequencies that modern science is only beginning to understand.',
    date: 'October 22, 2024',
  },
  {
    cover: '/images/blog-cover-5.jpg',
    category: 'SLEEP GUIDE',
    title: 'Designing a Bedroom for Deep Rest',
    excerpt: 'Your sleep environment is a sanctuary. From the quality of darkness to the scent in the air, every sensory detail contributes to the depth of your rest. A guide to creating a space that cradles you into sleep.',
    date: 'October 5, 2024',
  },
  {
    cover: '/images/blog-cover-6.jpg',
    category: 'EMOTIONAL REGULATION',
    title: 'Breathing with the Tides',
    excerpt: 'The ocean breathes in cycles measured by the moon. Learn how aligning your own breath with natural tidal rhythms can create profound shifts in nervous system regulation and emotional resilience.',
    date: 'September 18, 2024',
  },
]

const categories = ['Five Elements Sound Therapy', 'Sleep Guide', 'Emotional Regulation']

const latestArticles = articles.slice(0, 3)
const popularArticles = [articles[2], articles[0], articles[4]]

export default function Blog() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current!.querySelectorAll('.bh-animate'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.3,
      })

      gsap.from(contentRef.current!.querySelectorAll('.bc-article'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%', once: true },
      })

      gsap.from(contentRef.current!.querySelector('.bc-sidebar'), {
        opacity: 0,
        x: 20,
        duration: 0.8,
        delay: 0.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%', once: true },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="flex items-center justify-center text-center"
        style={{ height: '50vh', backgroundColor: 'var(--soft-mist)' }}
      >
        <div style={{ maxWidth: 600, padding: '0 24px' }}>
          <p className="bh-animate text-label" style={{ color: 'var(--lake-blue)' }}>
            JOURNAL
          </p>
          <h1
            className="bh-animate text-display-l mt-3"
            style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)' }}
          >
            Stories of Stillness
          </h1>
          <p
            className="bh-animate text-body-l mt-4 mx-auto"
            style={{ color: 'var(--muted-gray)', maxWidth: 480 }}
          >
            Explorations in sound, sleep, and the art of slowing down.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section
        ref={contentRef}
        style={{ backgroundColor: 'var(--soft-mist)', padding: '120px 0' }}
      >
        <div
          className="mx-auto flex flex-col lg:flex-row gap-12"
          style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}
        >
          {/* Main Content */}
          <div className="flex-1 lg:w-[70%]">
            <div className="flex flex-col gap-12">
              {articles.map((article) => (
                <article key={article.title} className="bc-article group">
                  <div className="overflow-hidden" style={{ borderRadius: 8 }}>
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="w-full object-cover transition-transform duration-600 group-hover:scale-[1.02]"
                      style={{ aspectRatio: '16/9' }}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-label mt-5" style={{ color: 'var(--lake-blue)' }}>
                    {article.category}
                  </p>
                  <h2
                    className="mt-2 text-2xl transition-colors duration-300 group-hover:text-[var(--lake-blue)]"
                    style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)', fontWeight: 300 }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-body-m mt-3" style={{ color: 'var(--muted-gray)' }}>
                    {article.excerpt}
                  </p>
                  <p className="text-body-s mt-3" style={{ color: 'var(--light-beach)' }}>
                    {article.date}
                  </p>
                  <Link
                    to="#"
                    className="text-body-s inline-flex items-center gap-1 mt-3 no-underline transition-colors duration-300"
                    style={{ color: 'var(--lake-blue)' }}
                  >
                    Read More <ArrowRight size={12} strokeWidth={1.5} />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bc-sidebar hidden lg:block lg:w-[30%]" style={{ marginLeft: 0 }}>
            {/* Categories */}
            <h3 className="text-heading-s" style={{ color: 'var(--deep-midnight)', marginBottom: 16 }}>
              Categories
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to="#"
                  className="text-body-m no-underline transition-colors duration-300 hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--muted-gray)' }}
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div
              className="my-8"
              style={{ height: 1, backgroundColor: 'rgba(148,196,232,0.2)' }}
            />

            {/* Latest Articles */}
            <h3 className="text-heading-s" style={{ color: 'var(--deep-midnight)', marginBottom: 16 }}>
              Latest Articles
            </h3>
            <div className="flex flex-col gap-3">
              {latestArticles.map((a) => (
                <Link
                  key={a.title}
                  to="#"
                  className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--muted-gray)' }}
                >
                  {a.title}
                </Link>
              ))}
            </div>

            <div
              className="my-8"
              style={{ height: 1, backgroundColor: 'rgba(148,196,232,0.2)' }}
            />

            {/* Popular Articles */}
            <h3 className="text-heading-s" style={{ color: 'var(--deep-midnight)', marginBottom: 16 }}>
              Popular Articles
            </h3>
            <div className="flex flex-col gap-3">
              {popularArticles.map((a) => (
                <Link
                  key={a.title}
                  to="#"
                  className="text-body-s no-underline transition-colors duration-300 hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--muted-gray)' }}
                >
                  {a.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
