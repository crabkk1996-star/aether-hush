import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CartContext } from '../App'

gsap.registerPlugin(ScrollTrigger)

const allProducts = [
  {
    image: '/images/product-guqin.jpg',
    title: 'Guqin',
    category: 'Musical Instruments',
    price: '$1,280',
    tab: 'Musical Instruments',
  },
  {
    image: '/images/product-xiao.jpg',
    title: 'Xiao Flute',
    category: 'Musical Instruments',
    price: '$340',
    tab: 'Musical Instruments',
  },
  {
    image: '/images/product-guqin.jpg',
    title: 'Kongling Drum',
    category: 'Musical Instruments',
    price: '$180',
    tab: 'Musical Instruments',
  },
  {
    image: '/images/product-diffuser.jpg',
    title: 'Ceramic Diffuser',
    category: 'Sleep Essentials',
    price: '$89',
    tab: 'Sleep Essentials',
  },
  {
    image: '/images/product-candle.jpg',
    title: 'Flameless Candle Set',
    category: 'Sleep Essentials',
    price: '$45',
    tab: 'Sleep Essentials',
  },
  {
    image: '/images/product-eyemask.jpg',
    title: 'Silk Sleep Mask',
    category: 'Sleep Essentials',
    price: '$45',
    tab: 'Sleep Essentials',
  },
  {
    image: '/images/product-essential-oil.jpg',
    title: 'Calm Essential Oil',
    category: 'Emotional Regulation',
    price: '$32',
    tab: 'Emotional Regulation',
  },
  {
    image: '/images/product-zen-ornament.jpg',
    title: 'Zen Stone Ornament',
    category: 'Emotional Regulation',
    price: '$68',
    tab: 'Emotional Regulation',
  },
  {
    image: '/images/product-essential-oil.jpg',
    title: 'Clarity Mist Spray',
    category: 'Emotional Regulation',
    price: '$28',
    tab: 'Emotional Regulation',
  },
]

const tabs = ['Musical Instruments', 'Sleep Essentials', 'Emotional Regulation']

export default function Shop() {
  const [activeTab, setActiveTab] = useState('Musical Instruments')
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addToCart } = useContext(CartContext)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const filteredProducts = allProducts.filter((p) => p.tab === activeTab)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current!.querySelectorAll('.sh-animate'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.3,
      })

      gsap.from(contentRef.current!.querySelectorAll('.sc-animate'), {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%', once: true },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (id: string) => {
    addToCart()
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="flex items-center justify-center text-center"
        style={{ height: '50vh', backgroundColor: 'var(--soft-mist)' }}
      >
        <div style={{ maxWidth: 600, padding: '0 24px' }}>
          <p className="sh-animate text-label" style={{ color: 'var(--lake-blue)' }}>
            SHOP
          </p>
          <h1
            className="sh-animate text-display-l mt-3"
            style={{ color: 'var(--deep-midnight)', fontFamily: 'var(--font-heading)' }}
          >
            Curated for Your Practice
          </h1>
          <p
            className="sh-animate text-body-l mt-4 mx-auto"
            style={{ color: 'var(--muted-gray)', maxWidth: 520 }}
          >
            Instruments, sleep essentials, and emotional wellness tools — each selected for quality, beauty, and healing presence.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section
        ref={contentRef}
        style={{ backgroundColor: 'var(--soft-mist)', padding: '120px 0' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}>
          {/* Category Tabs */}
          <div className="sc-animate flex flex-wrap justify-center gap-6 sm:gap-12 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-body-s pb-1 transition-colors duration-300"
                style={{
                  color: activeTab === tab ? 'var(--lake-blue)' : 'var(--muted-gray)',
                  borderBottom: activeTab === tab ? '2px solid var(--lake-blue)' : '2px solid transparent',
                  fontWeight: 400,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="sc-animate flex items-center justify-between mb-6">
            <p className="text-body-s" style={{ color: 'var(--muted-gray)' }}>
              Showing {filteredProducts.length} products
            </p>
            <select
              className="text-body-s px-4 py-2 outline-none"
              style={{
                color: 'var(--muted-gray)',
                border: '1px solid rgba(148,196,232,0.3)',
                backgroundColor: 'transparent',
              }}
            >
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const id = `${product.title}-${product.price}`
              const isAdded = addedId === id

              return (
                <div key={id} className="sc-animate group">
                  <div
                    className="flex items-center justify-center p-6 transition-all duration-400 group-hover:-translate-y-1"
                    style={{
                      backgroundColor: '#F5FAFF',
                      borderRadius: 8,
                      aspectRatio: '1/1',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-[80%] max-h-[80%] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-heading-s mt-4" style={{ color: 'var(--deep-midnight)' }}>
                    {product.title}
                  </h3>
                  <p className="text-body-s mt-1" style={{ color: 'var(--muted-gray)' }}>
                    {product.category}
                  </p>
                  <p className="mt-1" style={{ color: 'var(--lake-blue)', fontSize: 16, fontWeight: 500 }}>
                    {product.price}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleAddToCart(id)}
                      className="px-5 py-2 text-[11px] uppercase tracking-widest transition-all duration-300"
                      style={{
                        backgroundColor: isAdded ? 'rgba(34,197,94,0.15)' : 'var(--lake-blue)',
                        color: isAdded ? '#16a34a' : 'var(--cloud-white)',
                        border: 'none',
                        fontWeight: 400,
                      }}
                    >
                      {isAdded ? 'Added \u2713' : 'Add to Cart'}
                    </button>
                    <Link to="/shop">
                      <button
                        className="px-5 py-2 text-[11px] uppercase tracking-widest border transition-all duration-300 hover:bg-[var(--lake-blue)] hover:text-white hover:border-[var(--lake-blue)]"
                        style={{
                          borderColor: 'var(--lake-blue)',
                          color: 'var(--lake-blue)',
                          backgroundColor: 'transparent',
                          fontWeight: 400,
                        }}
                      >
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
