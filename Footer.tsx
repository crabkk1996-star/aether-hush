import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  childSelector?: string
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const {
    y = 40,
    duration = 0.8,
    delay = 0,
    stagger = 0.12,
    start = 'top 85%',
    childSelector,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = childSelector ? el.querySelectorAll(childSelector) : el

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [y, duration, delay, stagger, start, childSelector])

  return ref
}
