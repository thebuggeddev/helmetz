import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './App.css'

const helmets = [
  {
    id: '01',
    image: '/helmet-1.png',
    alt: 'Adidas Dame 5 Black Panther Helmet',
    titleLine1: 'ADIDAS DAME 5',
    titleLine2: 'BLACK PANTHER HELMET',
    subtitle: 'For adidas Basketball from "Heroes Among Us" pack Dame 5s',
    price: '$98,550.00',
    cartPrice: '$54,800.00',
    stampLeft: '130',
    stampRight: '147',
    cardStart: '#3b1788',
    cardMid: '#5c29bb',
    cardEnd: '#4a1ca8',
    halo: 'rgba(238, 170, 255, 0.5)',
    accent: '#d69fff',
    stageGlowA: 'rgba(96, 53, 214, 0.36)',
    stageGlowB: 'rgba(41, 19, 108, 0.4)',
  },
  {
    id: '02',
    image: '/helmet-2.png',
    alt: 'Red sneaker lion helmet',
    titleLine1: 'SNEAKER MU',
    titleLine2: 'CRIMSON LION HELMET',
    subtitle: 'Sharpened red construction from the sneaker-mask archive',
    price: '$250,990.00',
    cartPrice: '$54,800.00',
    stampLeft: '203',
    stampRight: '200',
    cardStart: '#8a0e2a',
    cardMid: '#be1b45',
    cardEnd: '#7f0c2b',
    halo: 'rgba(255, 178, 129, 0.45)',
    accent: '#ffb88a',
    stageGlowA: 'rgba(184, 36, 84, 0.33)',
    stageGlowB: 'rgba(102, 16, 42, 0.45)',
  },
  {
    id: '03',
    image: '/helmet-3.png',
    alt: 'Blue TW03 helmet',
    titleLine1: 'TW03 SNEAKER',
    titleLine2: 'MASK',
    subtitle: 'The 168th sneaker mask',
    price: '$12,300.00',
    cartPrice: '$54,800.00',
    stampLeft: '130',
    stampRight: '162',
    cardStart: '#0635a4',
    cardMid: '#1a58db',
    cardEnd: '#0a2d84',
    halo: 'rgba(134, 188, 255, 0.44)',
    accent: '#8ebeff',
    stageGlowA: 'rgba(29, 98, 230, 0.3)',
    stageGlowB: 'rgba(12, 53, 146, 0.42)',
  },
  {
    id: '04',
    image: '/helmet-4.png',
    alt: 'Pink chrome sneaker mask',
    titleLine1: 'INFRARED',
    titleLine2: 'CHROME SNEAKER MASK',
    subtitle: 'Rose-metal shell with engineered filtration silhouettes',
    price: '$42,860.00',
    cartPrice: '$54,800.00',
    stampLeft: '071',
    stampRight: '113',
    cardStart: '#7f3277',
    cardMid: '#be4da2',
    cardEnd: '#8a3c7d',
    halo: 'rgba(255, 181, 216, 0.45)',
    accent: '#ffc2e4',
    stageGlowA: 'rgba(199, 75, 176, 0.31)',
    stageGlowB: 'rgba(110, 38, 96, 0.44)',
  },
  {
    id: '05',
    image: '/helmet-5.png',
    alt: 'Green hemp SB gas mask',
    titleLine1: 'HEMP SB',
    titleLine2: 'GAS MASK',
    subtitle: 'Made from 3 sneakers',
    price: '$64,300.00',
    cartPrice: '$54,800.00',
    stampLeft: '220',
    stampRight: '181',
    cardStart: '#197745',
    cardMid: '#2eab5f',
    cardEnd: '#1d6843',
    halo: 'rgba(189, 255, 121, 0.45)',
    accent: '#d0ff91',
    stageGlowA: 'rgba(57, 180, 83, 0.33)',
    stageGlowB: 'rgba(27, 102, 54, 0.44)',
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const activeHelmet = helmets[activeIndex]

  const stageRef = useRef(null)
  const cardRef = useRef(null)
  const holderRef = useRef(null)
  const parallaxRef = useRef(null)
  const menuRef = useRef(null)
  const dotsRef = useRef(null)
  const copyRef = useRef(null)
  const helmetRef = useRef(null)
  const footerRef = useRef(null)
  const washRef = useRef(null)
  const directionRef = useRef(1)
  const timelineRef = useRef(null)
  const dragStateRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  })

  useEffect(() => {
    const preload = helmets.map((helmet) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = helmet.image
      return image
    })

    return () => {
      preload.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  const resetDragVisuals = (duration = 0.32) => {
    gsap.to(helmetRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to([copyRef.current, footerRef.current, menuRef.current, dotsRef.current], {
      x: 0,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(cardRef.current, {
      rotate: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(washRef.current, {
      autoAlpha: 0,
      scale: 1,
      duration: duration * 0.9,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const playEnterAnimation = (direction) => {
    timelineRef.current?.kill()

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setIsAnimating(false)
      },
    })

    tl.fromTo(
      cardRef.current,
      { rotate: direction * 0.6, scale: 0.985 },
      { rotate: 0, scale: 1, duration: 0.82, ease: 'power2.out' },
      0,
    )
      .fromTo(
        helmetRef.current,
        {
          autoAlpha: 0,
          x: direction * 220,
          y: 16,
          scale: 1.22,
          rotate: direction * 14,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.04,
          ease: 'expo.out',
        },
        0.04,
      )
      .fromTo(
        [copyRef.current, footerRef.current],
        { autoAlpha: 0, x: direction * 54, y: 18 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.78,
          stagger: 0.08,
          ease: 'power4.out',
        },
        0.18,
      )
      .fromTo(
        [menuRef.current, dotsRef.current],
        { autoAlpha: 0, x: direction * 24 },
        { autoAlpha: 1, x: 0, duration: 0.58, stagger: 0.05 },
        0.24,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.55 },
        { autoAlpha: 0.68, scale: 1.2, duration: 0.6, ease: 'sine.out' },
        0.08,
      )
      .to(washRef.current, { autoAlpha: 0, duration: 0.46, ease: 'sine.in' }, 0.42)

    timelineRef.current = tl
  }

  useLayoutEffect(() => {
    playEnterAnimation(directionRef.current)

    return () => {
      timelineRef.current?.kill()
    }
  }, [activeIndex])

  const switchHelmet = (direction, options = {}) => {
    if (isAnimating) {
      return
    }

    const { fromDrag = false, dragDistance = 0 } = options
    const nextIndex = (activeIndex + direction + helmets.length) % helmets.length
    const nextHelmet = helmets[nextIndex]
    const dragFactor = Math.min(Math.abs(dragDistance) / 260, 1)
    const exitDuration = fromDrag ? 0.2 : 0.28
    const exitDistance = (fromDrag ? 210 : 250) + dragFactor * 110

    directionRef.current = direction
    setIsAnimating(true)
    timelineRef.current?.kill()

    let switched = false
    const commitSwitch = () => {
      if (switched) {
        return
      }
      switched = true
      setActiveIndex(nextIndex)
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: commitSwitch,
    })

    tl.to(
      helmetRef.current,
      {
        autoAlpha: 0.22,
        x: -direction * exitDistance,
        y: -9,
        scale: 0.88,
        rotate: -direction * 11,
        duration: exitDuration,
        ease: 'power4.in',
      },
      0,
    )
      .to(
        [copyRef.current, footerRef.current],
        {
          autoAlpha: 0.36,
          x: -direction * 48,
          y: -4,
          duration: exitDuration * 0.9,
          stagger: 0.05,
          ease: 'power4.in',
        },
        0.02,
      )
      .to(
        [menuRef.current, dotsRef.current],
        {
          autoAlpha: 0.28,
          x: -direction * 14,
          duration: exitDuration * 0.8,
          ease: 'power4.in',
        },
        0,
      )
      .to(
        cardRef.current,
        {
          '--card-start': nextHelmet.cardStart,
          '--card-mid': nextHelmet.cardMid,
          '--card-end': nextHelmet.cardEnd,
          '--helmet-halo': nextHelmet.halo,
          '--helmet-accent': nextHelmet.accent,
          rotate: direction * 0.44,
          scale: 0.988,
          duration: exitDuration + 0.1,
          ease: 'sine.in',
        },
        0,
      )
      .to(
        stageRef.current,
        {
          '--stage-glow-a': nextHelmet.stageGlowA,
          '--stage-glow-b': nextHelmet.stageGlowB,
          duration: exitDuration + 0.1,
          ease: 'sine.in',
        },
        0,
      )
      .to(
        parallaxRef.current,
        {
          x: 0,
          y: 0,
          rotate: 0,
          duration: exitDuration,
          ease: 'power2.inOut',
        },
        0,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.65 },
        {
          autoAlpha: 0.72,
          scale: 1.68,
          duration: exitDuration + 0.06,
          ease: 'sine.out',
        },
        0,
      )
      .to(
        washRef.current,
        { autoAlpha: 0, duration: exitDuration * 0.82, ease: 'sine.in' },
        exitDuration * 0.45,
      )
      .add(commitSwitch, exitDuration * 0.72)

    timelineRef.current = tl
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isAnimating) {
        return
      }

      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName
        if (
          event.target.isContentEditable ||
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT'
        ) {
          return
        }
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        switchHelmet(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        switchHelmet(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAnimating, activeIndex])

  const handlePointerDown = (event) => {
    if (isAnimating) {
      return
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const dragState = dragStateRef.current
    dragState.active = true
    dragState.pointerId = event.pointerId
    dragState.startX = event.clientX
    dragState.startY = event.clientY
    dragState.deltaX = 0
    dragState.deltaY = 0

    holderRef.current?.setPointerCapture?.(event.pointerId)
    gsap.set(holderRef.current, { cursor: 'grabbing' })
    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.18,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current
    if (!dragState.active || dragState.pointerId !== event.pointerId || isAnimating) {
      return
    }

    dragState.deltaX = event.clientX - dragState.startX
    dragState.deltaY = event.clientY - dragState.startY

    const dragX = dragState.deltaX
    const intensity = Math.min(Math.abs(dragX) / 220, 1)

    gsap.to(helmetRef.current, {
      x: dragX * 0.45,
      rotate: dragX * 0.03,
      scale: 1 + intensity * 0.045,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to([copyRef.current, footerRef.current], {
      x: dragX * 0.16,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to([menuRef.current, dotsRef.current], {
      x: dragX * 0.11,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(cardRef.current, {
      rotate: dragX * 0.008,
      scale: 1 - Math.min(Math.abs(dragX) / 1700, 0.018),
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(washRef.current, {
      autoAlpha: intensity * 0.48,
      scale: 0.94 + intensity * 0.95,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handlePointerEnd = (event) => {
    const dragState = dragStateRef.current
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return
    }

    holderRef.current?.releasePointerCapture?.(event.pointerId)
    gsap.set(holderRef.current, { cursor: 'grab' })

    dragState.active = false
    dragState.pointerId = null

    const shouldSwitch =
      Math.abs(dragState.deltaX) > 86 &&
      Math.abs(dragState.deltaX) > Math.abs(dragState.deltaY) * 1.22

    if (shouldSwitch) {
      switchHelmet(dragState.deltaX < 0 ? 1 : -1, {
        fromDrag: true,
        dragDistance: dragState.deltaX,
      })
      return
    }

    resetDragVisuals()
  }

  const handleCardMouseMove = (event) => {
    if (isAnimating || dragStateRef.current.active) {
      return
    }

    const cardBounds = cardRef.current?.getBoundingClientRect()
    if (!cardBounds) {
      return
    }

    const xRatio = (event.clientX - cardBounds.left) / cardBounds.width - 0.5
    const yRatio = (event.clientY - cardBounds.top) / cardBounds.height - 0.5
    const offsetX = xRatio * 30
    const offsetY = yRatio * 24

    gsap.to(parallaxRef.current, {
      x: offsetX,
      y: offsetY,
      rotate: xRatio * 3.1,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handleCardMouseLeave = () => {
    if (dragStateRef.current.active) {
      return
    }

    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.44,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  return (
    <main
      ref={stageRef}
      className="hero-stage"
      style={{
        '--stage-glow-a': activeHelmet.stageGlowA,
        '--stage-glow-b': activeHelmet.stageGlowB,
      }}
    >
      <section
        ref={cardRef}
        className="hero-card"
        aria-label="Helmet product hero"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          '--card-start': activeHelmet.cardStart,
          '--card-mid': activeHelmet.cardMid,
          '--card-end': activeHelmet.cardEnd,
          '--helmet-halo': activeHelmet.halo,
          '--helmet-accent': activeHelmet.accent,
        }}
      >
        <header className="card-header">
          <span className="brand-mark">xploit</span>
          <span className="share-label">Share Mask</span>

          <div className="card-cart">
            <span>
              Cart <em>3</em>
            </span>
            <strong>{activeHelmet.cartPrice}</strong>
          </div>

          <div className="card-lines" aria-hidden="true">
            <span />
            <span />
          </div>
        </header>

        <aside ref={menuRef} className="card-menu">
          <span>Store</span>
          <span className="active">Sneaker Masks</span>
          <span>NFTs</span>
        </aside>

        <span className="card-stamp card-stamp-left">{activeHelmet.stampLeft}</span>
        <span className="card-stamp card-stamp-right">{activeHelmet.stampRight}</span>

        <div ref={dotsRef} className="card-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <article ref={copyRef} className="card-copy">
          <h1>
            <span>{activeHelmet.titleLine1}</span>
            <span>{activeHelmet.titleLine2}</span>
          </h1>
          <p>{activeHelmet.subtitle}</p>
        </article>

        <figure
          ref={holderRef}
          className="helmet-holder"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
        >
          <div ref={parallaxRef} className="helmet-parallax">
            <img ref={helmetRef} src={activeHelmet.image} alt={activeHelmet.alt} loading="eager" />
          </div>
        </figure>

        <footer ref={footerRef} className="card-footer">
          <span>More info</span>
          <strong>{activeHelmet.price}</strong>
        </footer>

        <span className="plus plus-left" aria-hidden="true" />
        <span className="plus plus-right" aria-hidden="true" />
        <span ref={washRef} className="motion-wash" aria-hidden="true" />

        <nav className="card-controls" aria-label="Helmet navigation">
          <button
            type="button"
            className="nav-btn nav-btn-prev"
            onClick={() => switchHelmet(-1)}
            aria-label="Show previous helmet"
            disabled={isAnimating}
          >
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M14.4 5.2L8.2 12l6.2 6.8" />
              </svg>
            </span>
            <span className="nav-label">Prev</span>
          </button>
          <button
            type="button"
            className="nav-btn nav-btn-next"
            onClick={() => switchHelmet(1)}
            aria-label="Show next helmet"
            disabled={isAnimating}
          >
            <span className="nav-label">Next</span>
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9.6 5.2L15.8 12 9.6 18.8" />
              </svg>
            </span>
          </button>
        </nav>
      </section>
    </main>
  )
}

export default App
