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
  const activeIndexRef = useRef(0)
  const queuedSwitchRef = useRef(0)
  const isTransitioningRef = useRef(true)
  const transitionPhaseRef = useRef('enter')
  const idleMaskTlRef = useRef(null)
  const idleRestartCallRef = useRef(null)
  const quickFnsRef = useRef(null)
  const readyIndexSetRef = useRef(new Set())
  const enterRunRef = useRef(0)
  const dragStateRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  })

  useLayoutEffect(() => {
    const maskTargets = [helmetRef.current, parallaxRef.current, washRef.current].filter(Boolean)
    if (maskTargets.length > 0) {
      gsap.set(maskTargets, { transformOrigin: '50% 50%' })
    }

    if (
      helmetRef.current &&
      copyRef.current &&
      footerRef.current &&
      menuRef.current &&
      dotsRef.current &&
      cardRef.current &&
      washRef.current &&
      parallaxRef.current
    ) {
      quickFnsRef.current = {
        helmetX: gsap.quickTo(helmetRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        helmetRotate: gsap.quickTo(helmetRef.current, 'rotate', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        helmetScale: gsap.quickTo(helmetRef.current, 'scale', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        copyX: gsap.quickTo(copyRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        footerX: gsap.quickTo(footerRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        menuX: gsap.quickTo(menuRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        dotsX: gsap.quickTo(dotsRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        cardRotate: gsap.quickTo(cardRef.current, 'rotate', { duration: 0.14, ease: 'power2.out' }),
        cardScale: gsap.quickTo(cardRef.current, 'scale', { duration: 0.14, ease: 'power2.out' }),
        washAlpha: gsap.quickTo(washRef.current, 'autoAlpha', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        washScale: gsap.quickTo(washRef.current, 'scale', { duration: 0.14, ease: 'power2.out' }),
        parallaxX: gsap.quickTo(parallaxRef.current, 'x', { duration: 0.32, ease: 'power2.out' }),
        parallaxY: gsap.quickTo(parallaxRef.current, 'y', { duration: 0.32, ease: 'power2.out' }),
        parallaxRotate: gsap.quickTo(parallaxRef.current, 'rotate', {
          duration: 0.32,
          ease: 'power2.out',
        }),
      }
    }
  }, [])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const decodeImage = (image) => {
    if (typeof image.decode === 'function') {
      return image.decode().catch(() => {})
    }

    if (image.complete) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const onDone = () => {
        image.removeEventListener('load', onDone)
        image.removeEventListener('error', onDone)
        resolve()
      }
      image.addEventListener('load', onDone)
      image.addEventListener('error', onDone)
    })
  }

  useEffect(() => {
    const preload = helmets.map((helmet) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = helmet.image
      return image
    })
    preload.forEach((image, index) => {
      decodeImage(image).finally(() => {
        readyIndexSetRef.current.add(index)
      })
    })

    return () => {
      preload.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      enterRunRef.current += 1
      timelineRef.current?.kill()
      idleMaskTlRef.current?.kill()
      idleRestartCallRef.current?.kill()
      quickFnsRef.current = null
    }
  }, [])

  const killMotionTweens = () => {
    const targets = [
      helmetRef.current,
      copyRef.current,
      footerRef.current,
      menuRef.current,
      dotsRef.current,
      cardRef.current,
      washRef.current,
      parallaxRef.current,
    ].filter(Boolean)
    if (targets.length > 0) {
      gsap.killTweensOf(targets)
    }
  }

  const clearIdleRestart = () => {
    idleRestartCallRef.current?.kill()
    idleRestartCallRef.current = null
  }

  const ensureHelmetReady = (index) => {
    if (readyIndexSetRef.current.has(index)) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = helmets[index].image
      decodeImage(image).finally(() => {
        readyIndexSetRef.current.add(index)
        resolve()
      })
    })
  }

  const setBaseVisualState = () => {
    if (helmetRef.current) {
      gsap.set(helmetRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        autoAlpha: 1,
        force3D: false,
      })
    }

    const copyTargets = [copyRef.current, footerRef.current, menuRef.current, dotsRef.current].filter(
      Boolean,
    )
    if (copyTargets.length > 0) {
      gsap.set(copyTargets, { x: 0, y: 0, autoAlpha: 1, force3D: false })
    }

    if (cardRef.current) {
      gsap.set(cardRef.current, { rotate: 0, scale: 1, force3D: false })
    }
    if (washRef.current) {
      gsap.set(washRef.current, { autoAlpha: 0, scale: 1 })
    }
    if (parallaxRef.current) {
      gsap.set(parallaxRef.current, { x: 0, y: 0, rotate: 0, force3D: false })
    }
  }

  const stopIdleMaskAnimation = (settle = true) => {
    clearIdleRestart()
    idleMaskTlRef.current?.kill()
    idleMaskTlRef.current = null

    if (!settle || !helmetRef.current) {
      return
    }

    gsap.to(helmetRef.current, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const startIdleMaskAnimation = (delay = 0.18) => {
    clearIdleRestart()

    if (!helmetRef.current || isTransitioningRef.current || dragStateRef.current.active) {
      return
    }

    idleRestartCallRef.current = gsap.delayedCall(delay, () => {
      if (!helmetRef.current || isTransitioningRef.current || dragStateRef.current.active) {
        return
      }

      idleMaskTlRef.current?.kill()
      idleMaskTlRef.current = gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: { ease: 'sine.inOut' },
        })
        .to(
          helmetRef.current,
          {
            y: -7,
            rotate: 0.95,
            scale: 1.014,
            duration: 2.3,
          },
          0,
        )
        .to(
          washRef.current,
          {
            autoAlpha: 0.18,
            scale: 1.06,
            duration: 2.3,
          },
          0,
        )

      idleRestartCallRef.current = null
    })
  }

  const resetDragVisuals = (duration = 0.32, resumeIdle = false) => {
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

    if (resumeIdle) {
      startIdleMaskAnimation(Math.max(0.08, duration * 0.45))
    }
  }

  const processSwitchQueue = (seedOptions = {}) => {
    if (isTransitioningRef.current || queuedSwitchRef.current === 0) {
      return
    }

    const direction = queuedSwitchRef.current
    queuedSwitchRef.current = 0
    runExitTransition(direction, seedOptions)
  }

  const requestRapidAdvance = () => {
    const tl = timelineRef.current
    if (!tl) {
      return
    }

    const currentScale = typeof tl.timeScale === 'function' ? tl.timeScale() : 1
    if (transitionPhaseRef.current === 'enter') {
      if (tl.progress() < 0.68) {
        tl.progress(0.68, false)
      }
      if (tl.progress() > 0.9) {
        tl.progress(1, false)
        return
      }
      tl.timeScale(Math.max(currentScale, 2.1))
      return
    }

    if (tl.progress() > 0.82) {
      tl.progress(1, false)
      return
    }
    tl.timeScale(Math.max(currentScale, 2.2))
  }

  const playEnterAnimation = (direction, onDone) => {
    const rapidMode = queuedSwitchRef.current !== 0
    const cardInDuration = rapidMode ? 0.42 : 0.72
    const helmetInDuration = rapidMode ? 0.5 : 0.86
    const copyInDuration = rapidMode ? 0.42 : 0.66

    transitionPhaseRef.current = 'enter'
    killMotionTweens()
    timelineRef.current?.kill()
    setBaseVisualState()

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', overwrite: 'auto', lazy: false, force3D: false },
      onComplete: () => {
        isTransitioningRef.current = false
        transitionPhaseRef.current = 'idle'
        startIdleMaskAnimation()
        onDone?.()
      },
    })

    tl.fromTo(
      cardRef.current,
      { rotate: direction * 0.34, scale: 0.992 },
      { rotate: 0, scale: 1, duration: cardInDuration, ease: 'sine.out' },
      0,
    )
      .fromTo(
        helmetRef.current,
        {
          autoAlpha: 0.001,
          x: direction * 170,
          y: 10,
          scale: 1.05,
          rotate: direction * 1.8,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: helmetInDuration,
          ease: 'power3.out',
        },
        rapidMode ? 0 : 0.03,
      )
      .fromTo(
        [copyRef.current, footerRef.current],
        { autoAlpha: 0, x: direction * 40, y: 10 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: copyInDuration,
          stagger: rapidMode ? 0.04 : 0.07,
          ease: 'power3.out',
        },
        rapidMode ? 0.08 : 0.16,
      )
      .fromTo(
        [menuRef.current, dotsRef.current],
        { autoAlpha: 0, x: direction * 18 },
        { autoAlpha: 1, x: 0, duration: rapidMode ? 0.32 : 0.56, stagger: 0.05 },
        rapidMode ? 0.08 : 0.16,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.82 },
        {
          autoAlpha: rapidMode ? 0.28 : 0.38,
          scale: rapidMode ? 1.04 : 1.08,
          duration: rapidMode ? 0.24 : 0.46,
          ease: 'sine.out',
        },
        rapidMode ? 0 : 0.06,
      )
      .to(
        washRef.current,
        { autoAlpha: 0, duration: rapidMode ? 0.22 : 0.5, ease: 'sine.in' },
        rapidMode ? 0.14 : 0.3,
      )

    timelineRef.current = tl
  }

  useLayoutEffect(() => {
    const runId = enterRunRef.current + 1
    enterRunRef.current = runId
    isTransitioningRef.current = true
    transitionPhaseRef.current = 'enter-prep'
    stopIdleMaskAnimation(false)
    killMotionTweens()
    timelineRef.current?.kill()

    let cancelled = false
    ensureHelmetReady(activeIndex).finally(() => {
      if (cancelled || enterRunRef.current !== runId) {
        return
      }

      requestAnimationFrame(() => {
        if (cancelled || enterRunRef.current !== runId) {
          return
        }
        playEnterAnimation(directionRef.current, () => {
          processSwitchQueue({ rapid: true })
        })
      })
    })

    return () => {
      cancelled = true
    }
  }, [activeIndex])

  const runExitTransition = (direction, options = {}) => {
    const { fromDrag = false, dragDistance = 0, rapid = false } = options
    const nextIndex = (activeIndexRef.current + direction + helmets.length) % helmets.length
    const nextHelmet = helmets[nextIndex]
    const cardWidth = cardRef.current?.clientWidth ?? 1280
    const dragFactor = Math.min(Math.abs(dragDistance) / 260, 1)
    const exitDuration = fromDrag ? 0.22 : rapid ? 0.18 : 0.26
    const baseExit = Math.max(cardWidth * 0.4, fromDrag ? 240 : rapid ? 290 : 320)
    const exitDistance = baseExit + dragFactor * 90

    killMotionTweens()
    stopIdleMaskAnimation(false)
    directionRef.current = direction
    isTransitioningRef.current = true
    transitionPhaseRef.current = 'exit'
    timelineRef.current?.kill()

    let switched = false
    const commitSwitch = () => {
      if (switched) {
        return
      }
      switched = true
      if (readyIndexSetRef.current.has(nextIndex)) {
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
        return
      }

      ensureHelmetReady(nextIndex).then(() => {
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
      })
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', overwrite: 'auto', lazy: false, force3D: false },
      onComplete: commitSwitch,
    })

    tl.to(
      helmetRef.current,
      {
        autoAlpha: 0.001,
        x: -direction * exitDistance,
        y: -6,
        scale: 0.93,
        rotate: -direction * 2.2,
        duration: exitDuration,
        ease: 'power2.in',
      },
      0,
    )
      .to(
        [copyRef.current, footerRef.current],
        {
          autoAlpha: 0.26,
          x: -direction * 36,
          y: -2,
          duration: exitDuration * 0.88,
          stagger: 0.04,
          ease: 'sine.in',
        },
        0.03,
      )
      .to(
        [menuRef.current, dotsRef.current],
        {
          autoAlpha: 0.2,
          x: -direction * 11,
          duration: exitDuration * 0.84,
          ease: 'sine.in',
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
          rotate: direction * 0.22,
          scale: 0.994,
          duration: exitDuration,
          ease: 'sine.inOut',
        },
        0,
      )
      .to(
        stageRef.current,
        {
          '--stage-glow-a': nextHelmet.stageGlowA,
          '--stage-glow-b': nextHelmet.stageGlowB,
          duration: exitDuration,
          ease: 'sine.inOut',
        },
        0,
      )
      .to(
        parallaxRef.current,
        {
          x: 0,
          y: 0,
          rotate: 0,
          duration: exitDuration * 0.82,
          ease: 'sine.inOut',
        },
        0,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.86 },
        {
          autoAlpha: 0.44,
          scale: 1.36,
          duration: exitDuration * 0.8,
          ease: 'sine.out',
        },
        0,
      )
      .to(
        washRef.current,
        { autoAlpha: 0, duration: exitDuration * 0.52, ease: 'sine.in' },
        exitDuration * 0.34,
      )

    timelineRef.current = tl
  }

  const switchHelmet = (direction, options = {}) => {
    const normalizedDirection = direction < 0 ? -1 : 1

    if (options.fromDrag) {
      queuedSwitchRef.current = normalizedDirection
      if (isTransitioningRef.current) {
        requestRapidAdvance()
        return
      }
      processSwitchQueue({
        fromDrag: true,
        dragDistance: options.dragDistance ?? 0,
      })
      return
    }

    if (isTransitioningRef.current) {
      queuedSwitchRef.current = normalizedDirection
      requestRapidAdvance()
      return
    }

    queuedSwitchRef.current = normalizedDirection
    processSwitchQueue()
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
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
  }, [])

  const handlePointerDown = (event) => {
    if (isTransitioningRef.current) {
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

    stopIdleMaskAnimation(false)
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
    if (
      !dragState.active ||
      dragState.pointerId !== event.pointerId ||
      isTransitioningRef.current
    ) {
      return
    }

    dragState.deltaX = event.clientX - dragState.startX
    dragState.deltaY = event.clientY - dragState.startY

    const dragX = dragState.deltaX
    const intensity = Math.min(Math.abs(dragX) / 220, 1)
    const quick = quickFnsRef.current
    if (quick) {
      quick.helmetX(dragX * 0.45)
      quick.helmetRotate(dragX * 0.016)
      quick.helmetScale(1 + intensity * 0.045)
      quick.copyX(dragX * 0.16)
      quick.footerX(dragX * 0.16)
      quick.menuX(dragX * 0.11)
      quick.dotsX(dragX * 0.11)
      quick.cardRotate(dragX * 0.008)
      quick.cardScale(1 - Math.min(Math.abs(dragX) / 1700, 0.018))
      quick.washAlpha(intensity * 0.48)
      quick.washScale(0.94 + intensity * 0.95)
      return
    }

    gsap.to(helmetRef.current, {
      x: dragX * 0.45,
      rotate: dragX * 0.016,
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

    resetDragVisuals(0.32, true)
  }

  const handleCardMouseMove = (event) => {
    if (isTransitioningRef.current || dragStateRef.current.active) {
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
    const quick = quickFnsRef.current
    if (quick) {
      quick.parallaxX(offsetX)
      quick.parallaxY(offsetY)
      quick.parallaxRotate(xRatio * 2)
      return
    }

    gsap.to(parallaxRef.current, {
      x: offsetX,
      y: offsetY,
      rotate: xRatio * 2,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handleCardMouseLeave = () => {
    if (dragStateRef.current.active) {
      return
    }

    const quick = quickFnsRef.current
    if (quick) {
      quick.parallaxX(0)
      quick.parallaxY(0)
      quick.parallaxRotate(0)
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
            <img
              ref={helmetRef}
              src={activeHelmet.image}
              alt={activeHelmet.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable="false"
            />
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
