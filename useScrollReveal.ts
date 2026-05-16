import { useState, useEffect, useRef } from 'react'
import { Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTAButton from '../components/CTAButton'

gsap.registerPlugin(ScrollTrigger)

const albums = [
  {
    cover: '/images/album-cover-1.jpg',
    title: 'Still Water',
    category: 'MEDITATION',
    description: 'Immersive ambient journey through liquid soundscapes and flowing textures.',
    meta: '45 min · 8 tracks',
    filter: 'Meditation',
  },
  {
    cover: '/images/album-cover-2.jpg',
    title: 'Frozen Lake',
    category: 'SLEEP',
    description: 'Crystalline sleep environments with sub-zero frequencies and ice-like textures.',
    meta: '60 min · 12 tracks',
    filter: 'Sleep',
  },
  {
    cover: '/images/album-cover-3.jpg',
    title: 'Oceanic Drift',
    category: 'SLEEP',
    description: 'Gentle coastal rhythms and tidal patterns for deep restorative rest.',
    meta: '52 min · 10 tracks',
    filter: 'Sleep',
  },
  {
    cover: '/images/album-cover-4.jpg',
    title: 'Rain Patterns',
    category: 'FOCUS',
    description: 'Structured rainfall textures designed to enhance concentration and creative flow.',
    meta: '38 min · 6 tracks',
    filter: 'Focus',
  },
  {
    cover: '/images/album-cover-5.jpg',
    title: 'Mountain Mist',
    category: 'MEDITATION',
    description: 'Vast atmospheric compositions inspired by high-altitude stillness and cloud formations.',
    meta: '55 min · 9 tracks',
    filter: 'Meditation',
  },
  {
    cover: '/images/album-cover-6.jpg',
    title: 'Elemental Balance',
    category: 'FIVE ELEMENTS',
    description: 'Ancient Five Elements wisdom translated into contemporary healing sound frequencies.',
    meta: '72 min · 15 tracks',
    filter: 'Five Elements',
  },
]

const filterTabs = ['All', 'Sleep', 'Focus', 'Meditation', 'Five Elements']

const tracks = [
  { number: 1, title: 'Tidal Drift', duration: '08:24' },
  { number: 2, title: 'Subaqueous Light', duration: '12:17' },
  { number: 3, title: 'Distant Shore', duration: '06:42' },
]

export default function Music() {
  const [activeFilter, setActiveFilter] = useState('All')
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const libraryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(heroRef.current!.querySelectorAll('.mh-animate'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.3,
      })

      // Featured section
      gsap.from(featuredRef.current!.querySelector('.feat-image'), {
        opacity: 0,
        x: -30,
        scale: 0.95,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: featuredRef.current!, start: 'top 75%', once: true },
      })

      gsap.from(featuredRef.current!.querySelectorAll('.feat-content'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: featuredRef.current!, start: 'top 75%', once: true },
      })

      // Library entrance
      gsap.from(libraryRef.current!.querySelectorAll('.lib-animate'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: libraryRef.current!, start: 'top 80%', once: true },
      })
    })

    return () => ctx.revert()
  }, [])

  const filteredAlbums = activeFilter === 'All'
    ? albums
    : albums.filter((a) => a.filter === activeFilter)

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ height: '60vh' }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/music-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(22,35,56,0.55)' }}
        />
        <div className="relative" style={{ zIndex: 2, maxWidth: 600, padding: '0 24px' }}>
          <p className="mh-animate text-label" style={{ color: 'var(--light-beach)' }}>
            MUSIC
          </p>
          <h1
            className="mh-animate text-display-l mt-3"
            style={{ color: 'var(--cloud-white)', fontFamily: 'var(--font-heading)' }}
          >
            Sound Worlds
          </h1>
          <p
            className="mh-animate text-body-l mt-4 mx-auto"
            style={{ color: 'rgba(245,250,255,0.8)', maxWidth: 480 }}
          >
            Curated ambient collections for sleep, focus, meditation, and deep listening.
          </p>
        </div>
      </section>

      {/* Featured Playlist */}
      <section
        ref={featuredRef}
        style={{ backgroundColor: 'var(--deep-midnight)', padding: '120px 0' }}
      >
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}
        >
          {/* Album Art */}
          <div className="feat-image">
            <img
              src="/images/album-cover-1.jpg"
              alt="Still Water — Ambient Mix"
              className="w-full"
              style={{ borderRadius: 8, boxShadow: '0 16px 48px rgba(0,0,0,0.3)' }}
            />
          </div>

          {/* Playlist Details */}
          <div>
            <p className="feat-content text-label" style={{ color: 'var(--light-beach)' }}>
              FEATURED COLLECTION
            </p>
            <h2
              className="feat-content text-heading-m mt-3"
              style={{ color: 'var(--cloud-white)', fontFamily: 'var(--font-heading)' }}
            >
              Still Water — Ambient Mix
            </h2>
            <p className="feat-content text-body-m mt-4" style={{ color: 'rgba(245,250,255,0.7)' }}>
              A 45-minute journey through liquid soundscapes. Flowing textures, subaqueous drones, and gentle melodic fragments designed to immerse you in a state of deep calm.
            </p>
            <div className="feat-content mt-8">
              <CTAButton variant="filled">
                <Play size={14} strokeWidth={1.5} className="mr-2" /> Play Collection
              </CTAButton>
            </div>

            {/* Divider */}
            <div
              className="feat-content w-full my-8"
              style={{ height: 1, backgroundColor: 'rgba(245,250,255,0.1)' }}
            />

            {/* Track List */}
            <div className="feat-content">
              {tracks.map((track) => (
                <div
                  key={track.number}
                  className="flex items-center py-3"
                  style={{ borderBottom: '1px solid rgba(245,250,255,0.06)' }}
                >
                  <span
                    className="flex-shrink-0"
                    style={{ width: 32, fontSize: 13, fontWeight: 300, color: 'rgba(245,250,255,0.3)' }}
                  >
                    {track.number}
                  </span>
                  <span className="flex-1 text-sm" style={{ color: 'var(--cloud-white)', fontWeight: 400 }}>
                    {track.title}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,250,255,0.4)' }}>
                    {track.duration}
                  </span>
                  <button className="ml-4 transition-colors duration-300 hover:text-[var(--lake-blue)]" style={{ color: 'rgba(245,250,255,0.5)' }}>
                    <Play size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Library */}
      <section
        ref={libraryRef}
        style={{ backgroundColor: 'var(--soft-mist)', padding: '120px 0' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}>
          {/* Filter Tabs */}
          <div className="lib-animate flex flex-wrap justify-center gap-8 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="text-body-s pb-1 transition-colors duration-300"
                style={{
                  color: activeFilter === tab ? 'var(--lake-blue)' : 'var(--muted-gray)',
                  borderBottom: activeFilter === tab ? '2px solid var(--lake-blue)' : '2px solid transparent',
                  fontWeight: 400,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <div key={album.title} className="lib-animate group cursor-pointer">
                <div className="overflow-hidden" style={{ borderRadius: 0 }}>
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                    style={{ aspectRatio: '1/1' }}
                    loading="lazy"
                  />
                </div>
                <h3
                  className="text-heading-s mt-3 transition-colors duration-300 group-hover:text-[var(--lake-blue)]"
                  style={{ color: 'var(--deep-midnight)' }}
                >
                  {album.title}
                </h3>
                <p className="text-label mt-1" style={{ color: 'var(--lake-blue)' }}>
                  {album.category}
                </p>
                <p className="text-body-s mt-2" style={{ color: 'var(--muted-gray)' }}>
                  {album.description}
                </p>
                <p className="text-body-s mt-2" style={{ color: 'var(--light-beach)' }}>
                  {album.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
