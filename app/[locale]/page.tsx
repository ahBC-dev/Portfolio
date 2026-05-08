'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { FaLinkedin, FaGithub, FaArrowRight, FaExternalLinkAlt, FaApple, FaGooglePlay, FaWhatsapp } from 'react-icons/fa'
import { BsStackOverflow } from 'react-icons/bs'
import { TbBrandFiverr } from 'react-icons/tb'
import { HiOutlineMail, HiOutlineDocumentDownload, HiMenu, HiX } from 'react-icons/hi'
import { MdLightMode, MdDarkMode } from "react-icons/md"

import { FRONTEND, BACKEND, OTHERS, projects } from '@/lib/constants'
import SmoothScroll from '@/components/SmoothScroll'
import LanguageSwitcher from '@/components/subComponents/LanguageSwitcher'
import Hero3D from '@/components/subComponents/Hero3D'
import { useTranslations, useLocale } from '@/components/I18nProvider'

// ========== SCROLL REVEAL ==========
function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode, className?: string, delay?: number, direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  
  const variants = {
    up: { y: 60 },
    left: { x: -60 },
    right: { x: 60 },
    scale: { scale: 0.9 }
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...variants[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, ...variants[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ========== SOCIALS DATA ==========
const SOCIALS = [
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/ahmad-hosseini-gezir/", label: "LinkedIn" },
  { icon: FaGithub, url: "https://github.com/ahBC-dev", label: "GitHub" },
  { icon: BsStackOverflow, url: "https://stackoverflow.com/users/31799574/ahmad-hosseini", label: "Stack Overflow" },
  { icon: TbBrandFiverr, url: "https://www.fiverr.com/hmad_aljaziri/", label: "Fiverr" },
  { icon: FaWhatsapp, url: "https://wa.me/+971526200521", label: "WhatsApp" },
]

// ========== FLOATING SHAPES ==========
function FloatingShapes() {
  return (
    <>
      <motion.div 
        className="floating-shape floating-shape-1"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="floating-shape floating-shape-2"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="floating-shape floating-shape-3"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}

// ========== THEME TOGGLE (inline) ==========
function ThemeToggleButton() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') || 'light'
    setTheme(stored)
    if (stored === 'dark') document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="side-nav-item"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? <MdLightMode className="text-lg" /> : <MdDarkMode className="text-lg" />}
      </motion.div>
    </button>
  )
}

// ========== SIDE NAVIGATION ==========
function SideNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const t = useTranslations()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', icon: 'carbon:home', label: t('nav.home') || 'Home' },
    { id: 'services', icon: 'carbon:application-web', label: t('nav.services') || 'Services' },
    { id: 'about', icon: 'carbon:user-avatar', label: t('nav.about') || 'About' },
    { id: 'skills', icon: 'carbon:code', label: t('nav.skills') || 'Skills' },
    { id: 'projects', icon: 'carbon:portfolio', label: t('nav.projects') || 'Projects' },
    { id: 'contact', icon: 'carbon:email', label: t('nav.contact') || 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, x: -30, y: "-50%" }}
      animate={{ opacity: 1, x: 0, y: "-50%" }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="side-nav hidden lg:flex"
      aria-label="Main navigation"
    >
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`side-nav-item ${activeSection === item.id ? 'active' : ''}`}
          aria-label={item.label}
        >
          <Icon icon={item.icon} className="text-xl" />
          <span className="nav-tooltip">{item.label}</span>
          {activeSection === item.id && (
            <motion.div
              layoutId="navIndicator"
              className="absolute inset-0 rounded-full bg-[var(--accent-glow)] border border-[var(--accent)]/30"
              initial={false}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </a>
      ))}

      <div className="side-nav-divider" />
      
      <ThemeToggleButton />

      <div className="side-nav-divider" />
      
      <div className="side-nav-item p-0">
        <LanguageSwitcher />
      </div>
    </motion.nav>
  )
}

// ========== MOBILE NAVIGATION ==========
function MobileNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') || 'light'
    setTheme(stored)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, mounted])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', icon: 'carbon:home', label: t('nav.home') || 'Home' },
    { id: 'services', icon: 'carbon:application-web', label: t('nav.services') || 'Services' },
    { id: 'about', icon: 'carbon:user-avatar', label: t('nav.about') || 'About' },
    { id: 'skills', icon: 'carbon:code', label: t('nav.skills') || 'Skills' },
    { id: 'projects', icon: 'carbon:portfolio', label: t('nav.projects') || 'Projects' },
    { id: 'contact', icon: 'carbon:email', label: t('nav.contact') || 'Contact' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open menu"
      >
        <HiMenu className="text-2xl text-[var(--text-primary)]" />
      </motion.button>

      {/* Mobile Theme Toggle */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Toggle theme"
        >
          <motion.div key={theme} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.3 }}>
            {theme === 'light' ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
          </motion.div>
        </motion.button>
      )}

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-primary)] border-l border-[var(--border)] z-[70] overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Close menu"
                >
                  <HiX className="text-xl" />
                </button>

                <h3 className="text-2xl font-display font-bold gradient-text mb-8 mt-4">Ahmad</h3>

                <div className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-[var(--accent-glow)] text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <Icon icon={item.icon} className="text-lg" />
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:scale-105 transition-transform"
                >
                  <HiOutlineMail />
                  {t('common.contact') || 'Get in Touch'}
                </motion.a>

                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <p className="text-sm text-[var(--text-muted)] mb-4">{t('common.connectWith') || 'Connect with me'}</p>
                  <div className="flex gap-3 mb-6">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label={social.label}
                      >
                        <social.icon className="text-lg" />
                      </a>
                    ))}
                  </div>
                  
                  <div className="border-t border-[var(--border)] pt-6">
                    <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider">{t('common.language') || 'Language'}</p>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ========== HERO SECTION (Scroll-Driven) ==========
function HeroSection() {
  const t = useTranslations()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Scroll progress ranges for each text element
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 1])
  const greetingY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const greetingScale = useTransform(scrollYProgress, [0.2, 0.35], [1, 0.85])
  
  const roleOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.55], [0, 1, 1, 0.3])
  const roleY = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.55], [80, 0, 0, -60])
  
  const taglineOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0.3])
  const taglineY = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [80, 0, 0, -60])
  
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.5, 0.6], [80, 0])
  const ctaScale = useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1])

  // Scroll indicator fades out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section id="hero" ref={containerRef} className="hero-container">
      <div className="hero-sticky">
        <Hero3D />
        <FloatingShapes />
        
        {/* Particle grid background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* "Hey, I'm Ahmad" - Big Title */}
          <motion.div style={{ y: greetingY, opacity: greetingOpacity, scale: greetingScale }}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter"
            >
              <span className="block text-[var(--text-primary)]">
                {t('hero.greeting') || "Hey, I'm"}
              </span>
              <span className="block gradient-text">
                {t('hero.name') || 'Ahmad'}
              </span>
            </motion.h1>
          </motion.div>

          {/* "I build software" - revealed on scroll */}
          <motion.p
            style={{ opacity: roleOpacity, y: roleY }}
            className="font-heading text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[var(--text-secondary)] mt-6"
          >
            {t('hero.role') || 'I build software'}
          </motion.p>

          {/* Tagline - revealed on more scroll */}
          <motion.p
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="text-[clamp(1rem,2vw,1.35rem)] text-[var(--text-muted)] max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {t('hero.tagline') || 'From simple apps to robust cross-platform systems — engineered with precision.'}
          </motion.p>

          {/* CTA Buttons - final reveal */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <motion.a
              href="https://drive.google.com/file/d/1JV8bOn8-cRNhU_R-3Qutf8IvtY52hsKi/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <HiOutlineDocumentDownload className="text-xl relative z-10" />
              <span className="relative z-10">{t('hero.downloadResume') || 'Download Resume'}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[var(--border)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiOutlineMail className="text-xl" />
              {t('hero.getInTouch') || 'Get in Touch'}
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex justify-center pt-2"
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ========== SERVICES SECTION ==========
function ServicesSection() {
  const t = useTranslations()
  
  const services = [
    {
      icon: "carbon:application-web",
      title: t('services.webTitle') || "Full Stack Websites",
      description: t('services.webDesc') || "End-to-end web applications with modern frameworks, robust backends, and seamless user experiences that drive business growth.",
      gradient: "from-blue-500 to-cyan-500",
      number: "01"
    },
    {
      icon: "carbon:mobile",
      title: t('services.mobileTitle') || "Mobile Applications",
      description: t('services.mobileDesc') || "Cross-platform mobile apps with React Native & Expo, delivering native performance and beautiful interfaces for iOS and Android.",
      gradient: "from-purple-500 to-pink-500",
      number: "02",
      badges: [
        { icon: FaApple, label: "iOS" },
        { icon: FaGooglePlay, label: "Android" }
      ]
    },
    {
      icon: "carbon:api-1",
      title: t('services.apiTitle') || "API Development",
      description: t('services.apiDesc') || "RESTful APIs and backend services with Node.js, ensuring secure, scalable, and well-documented integrations.",
      gradient: "from-green-500 to-emerald-500",
      number: "03"
    }
  ]

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block">
              {t('services.sectionTag') || 'What I Do'}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('services.title') || 'I Build Digital Solutions'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('services.description') || 'From concept to deployment, I create full stack websites, mobile applications, and everything in between.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 0.15} direction="up">
              <motion.div 
                className="service-card group h-full card-shine"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative z-10">
                  {/* Number */}
                  <span className="text-7xl font-display font-bold text-[var(--accent)]/10 absolute -top-2 -left-1 select-none">
                    {service.number}
                  </span>
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-[var(--accent-glow)] flex items-center justify-center mb-6 relative"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon icon={service.icon} className="text-3xl text-[var(--accent)]" />
                  </motion.div>

                  <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4 text-sm">
                    {service.description}
                  </p>

                  {service.badges && (
                    <div className="flex gap-3 mt-4">
                      {service.badges.map((badge) => (
                        <motion.div
                          key={badge.label}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] text-xs font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          <badge.icon className="text-sm" />
                          {badge.label}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ========== ABOUT SECTION ==========
function AboutSection() {
  const t = useTranslations()
  
  const stats = [
    { value: "2+", label: t('about.yearsExp') || 'Years of Experience' },
    { value: "10+", label: t('about.projectsDone') || 'Projects Completed' },
    { value: "20+", label: t('about.techUsed') || 'Technologies Used' },
  ]

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <ScrollReveal direction="left">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] opacity-20 blur-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="relative h-full rounded-3xl overflow-hidden border-2 border-[var(--border)] shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/assets/Pictures/profile-picc1.png"
                  alt="Ahmad Hosseini"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2} direction="right">
            <div>
              <motion.span 
                className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 px-4 py-2 rounded-full bg-[var(--accent-glow)] border border-[var(--accent)]/20"
                whileHover={{ scale: 1.05 }}
              >
                {t('about.sectionTag') || 'About Me'}
              </motion.span>
              
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
                <span className="gradient-text">
                  {t('about.title') || 'Passionate Developer & Problem Solver'}
                </span>
              </h2>
              
              <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
                <p>{t('about.paragraph1') || "I'm a full stack developer with a passion for creating seamless digital experiences."}</p>
                <p>{t('about.paragraph2') || "I specialize in building end-to-end applications using React, Next.js, Node.js."}</p>
                <p>{t('about.paragraph3') || "When I'm not coding, you'll find me exploring new technologies."}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-display font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ========== SKILLS SECTION ==========
function SkillsSection() {
  const t = useTranslations()
  const allSkills = [...FRONTEND, ...BACKEND, ...OTHERS]

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block">
              {t('skills.sectionTag') || 'Tech Stack'}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('skills.title') || 'Tools of the Trade'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('skills.description') || 'A curated collection of technologies I use to build exceptional digital products.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Infinite Marquee */}
        <ScrollReveal>
          <div className="marquee-container py-8 -mx-6">
            <div className="marquee">
              {[...allSkills, ...allSkills].map((skill, i) => (
                <div key={`${skill.name}-${i}`} className="flex items-center gap-3 mx-4 px-5 py-3 rounded-xl glass whitespace-nowrap">
                  {skill.icon.startsWith("/") ? (
                    <Image src={skill.icon} alt={skill.name} width={24} height={24} />
                  ) : (
                    <Icon icon={skill.icon} width={24} height={24} />
                  )}
                  <span className="font-medium text-sm text-[var(--text-primary)]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {allSkills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.03}>
              <motion.div 
                className="skill-badge group"
                whileHover={{ scale: 1.05 }}
              >
                {skill.icon.startsWith("/") ? (
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <Icon
                    icon={skill.icon}
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <span className="font-medium text-sm text-[var(--text-primary)]">{skill.name}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Category Summary */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <ScrollReveal delay={0.1}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:code" className="text-2xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">{t('skills.frontend') || 'Frontend'}</h3>
              <p className="text-xs text-[var(--text-muted)]">{t('skills.frontendDesc') || 'React, Next.js, TypeScript, Tailwind CSS'}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:data-base" className="text-2xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">{t('skills.backend') || 'Backend'}</h3>
              <p className="text-xs text-[var(--text-muted)]">{t('skills.backendDesc') || 'Node.js, MongoDB, PostgreSQL'}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:tools" className="text-2xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">{t('skills.tools') || 'Tools'}</h3>
              <p className="text-xs text-[var(--text-muted)]">{t('skills.toolsDesc') || 'Docker, Git, Vercel, Stripe'}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ========== PROJECTS SECTION ==========
function ProjectsSection() {
  const t = useTranslations()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block">
              {t('projects.sectionTag') || 'Portfolio'}
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('projects.title') || 'Featured Projects'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('projects.description') || 'A selection of projects that showcase my skills and passion for building great products.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, i) => {
            const gridSpans = [
              "lg:col-span-7",
              "lg:col-span-5",
              "lg:col-span-12",
            ]
            
            return (
              <ScrollReveal 
                key={project.title} 
                delay={i * 0.1}
                direction={i === 0 ? 'left' : i === 1 ? 'right' : 'up'}
                className={gridSpans[i]}
              >
                <motion.div 
                  className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden"
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{ scale: hoveredIndex === i ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/20 to-transparent"
                      animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 z-10">
                    {/* Top - Links */}
                    <motion.div 
                      className="flex justify-end gap-3"
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        y: hoveredIndex === i ? 0 : -20,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="text-lg" />
                      </motion.a>
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                    </motion.div>

                    {/* Bottom - Info */}
                    <div>
                      <motion.div
                        animate={{ y: hoveredIndex === i ? 0 : 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <motion.p 
                          className="text-white/90 text-sm md:text-base leading-relaxed mb-4 max-w-2xl"
                          animate={{ opacity: hoveredIndex === i ? 1 : 0.8 }}
                        >
                          {project.description}
                        </motion.p>
                      </motion.div>

                      {/* Tech Stack Tags */}
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        animate={{
                          y: hoveredIndex === i ? 0 : 10,
                          opacity: hoveredIndex === i ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {project.icon.slice(0, 6).map((tech, techIndex) => (
                          <motion.div
                            key={tech.name}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: hoveredIndex === i ? techIndex * 0.05 : 0 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                          >
                            {tech.icon.startsWith("/") ? (
                              <Image src={tech.icon} alt={tech.name} width={16} height={16} />
                            ) : (
                              <Icon icon={tech.icon} width={16} height={16} />
                            )}
                            {tech.name}
                          </motion.div>
                        ))}
                        {project.icon.length > 6 && (
                          <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                            +{project.icon.length - 6} {t('projects.moreTech') || 'more'}
                          </span>
                        )}
                      </motion.div>

                      {/* Border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-[var(--accent)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Project Number */}
                  <motion.div
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-lg"
                    animate={{
                      scale: hoveredIndex === i ? 1.2 : 1,
                      rotate: hoveredIndex === i ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ========== CONTACT SECTION ==========
function ContactSection() {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)
  
  const copyEmail = () => {
    navigator.clipboard.writeText('aahg@ahmadaljaziri.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block">
            {t('contact.sectionTag') || 'Get in Touch'}
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-[var(--text-primary)] mb-6">
            {t('contact.title') || "Let's Work Together"}
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-12">
            {t('contact.description') || "Have a project in mind or just want to chat? I'm always open to discussing new opportunities."}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12">
            {/* Email */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--bg-secondary)]">
                <HiOutlineMail className="text-xl text-[var(--accent)]" />
                <span className="font-medium text-sm">aahg@ahmadaljaziri.com</span>
              </div>
              <motion.button
                onClick={copyEmail}
                className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold text-sm hover:scale-105 transition-transform duration-300"
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (t('contact.emailCopied') || '✓ Copied!') : (t('contact.copyEmail') || 'Copy Email')}
              </motion.button>
            </div>

            {/* Social Links */}
            <p className="text-sm text-[var(--text-muted)] mb-4">{t('contact.orConnect') || 'Or connect with me on'}</p>
            <div className="flex items-center justify-center gap-4">
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 pt-8 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} {t('contact.footer') || 'Ahmad Hosseini.'}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ========== MAIN PAGE ==========
export default function Home() {
  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Smooth scrolling */}
      <SmoothScroll />
      
      {/* Side Navigation (Desktop) */}
      <SideNavigation />
      
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Sections */}
      <HeroSection />
      
      <div className="section-divider max-w-6xl mx-auto" />
      
      <ServicesSection />
      
      <div className="section-divider max-w-6xl mx-auto" />
      
      <AboutSection />
      
      <div className="section-divider max-w-6xl mx-auto" />
      
      <SkillsSection />
      
      <div className="section-divider max-w-6xl mx-auto" />
      
      <ProjectsSection />
      
      <div className="section-divider max-w-6xl mx-auto" />
      
      <ContactSection />
    </main>
  )
}
