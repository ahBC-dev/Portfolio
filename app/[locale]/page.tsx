'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { FaLinkedin, FaGithub, FaArrowRight, FaExternalLinkAlt, FaApple, FaGooglePlay, FaWhatsapp } from 'react-icons/fa'
import { BsStackOverflow } from 'react-icons/bs'
import { TbBrandFiverr } from 'react-icons/tb'
import { HiOutlineMail, HiOutlineDocumentDownload, HiMenu, HiX } from 'react-icons/hi'
import { IoLocationOutline } from 'react-icons/io5'

import { FRONTEND, BACKEND, OTHERS, projects } from '@/lib/constants'
import SmoothScroll from '@/components/SmoothScroll'
import LanguageSwitcher from '@/components/subComponents/LanguageSwitcher'
import { useTranslations, useLocale } from '@/components/I18nProvider'

// ========== ENHANCED SCROLL REVEAL ==========
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

// ========== SOCIAL SIDEBAR ==========
const SOCIALS = [
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/ahmad-hosseini-gezir/", label: "LinkedIn" },
  { icon: FaGithub, url: "https://github.com/ahBC-dev", label: "GitHub" },
  { icon: BsStackOverflow, url: "https://stackoverflow.com/users/31799574/ahmad-hosseini", label: "Stack Overflow" },
  { icon: TbBrandFiverr, url: "https://www.fiverr.com/hmad_aljaziri/", label: "Fiverr" },
  { icon: FaWhatsapp, url: "https://wa.me/+971526200521", label: "WhatsApp" },
]

function SocialSidebar() {
  return (
    <div className="social-sidebar hidden lg:flex">
      {SOCIALS.map((social, i) => (
        <motion.a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={social.label}
        >
          <social.icon className="text-xl" />
        </motion.a>
      ))}
    </div>
  )
}

// ========== FLOATING SHAPES ==========
function FloatingShapes() {
  return (
    <>
      <motion.div 
        className="floating-shape floating-shape-1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="floating-shape floating-shape-2"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="floating-shape floating-shape-3"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  )
}

// ========== NAVIGATION ==========
function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations()

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
    { id: 'services', label: t('nav.services') || 'Services' },
    { id: 'about', label: t('nav.about') || 'About' },
    { id: 'skills', label: t('nav.skills') || 'Skills' },
    { id: 'projects', label: t('nav.projects') || 'Projects' },
    { id: 'contact', label: t('nav.contact') || 'Contact' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-all duration-300 link-underline relative ${
                activeSection === item.id
                  ? 'text-[var(--accent)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          
          {/* Language Switcher in Desktop Nav */}
          <div className="border-l border-white/20 pl-4">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open menu"
      >
        <HiMenu className="text-2xl text-[var(--text-primary)]" />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-primary)] border-l border-[var(--border)] z-[70] overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Close menu"
                >
                  <HiX className="text-xl" />
                </button>

                {/* Logo/Name */}
                <h3 className="text-2xl font-display font-bold gradient-text mb-8 mt-4">Ahmad</h3>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-[var(--accent-glow)] text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Contact Button */}
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

                {/* Social Links */}
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
                  
                  {/* Language Switcher in Mobile Menu */}
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

// ========== HERO SECTION ==========
function HeroSection() {
  const t = useTranslations()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingShapes />
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Small intro with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <motion.div 
            className="w-3 h-3 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-[var(--text-muted)]">{t('hero.availability') || 'Available for opportunities'}</span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight"
          >
            <motion.span 
              className="block text-[var(--text-primary)]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t('hero.greeting') || "Hey, I'm"}
            </motion.span>
            <motion.span 
              className="block gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t('hero.name') || 'Ahmad'}
            </motion.span>
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-[clamp(1.25rem,3vw,2rem)] font-semibold text-[var(--text-secondary)] mb-4"
        >
          {t('hero.role') || 'I do Full Stack Development'}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-12"
        >
          {t('hero.description') || 'Crafting exceptional digital experiences with modern technologies.'}
          {' '}<span className="inline-flex items-center gap-1 text-[var(--accent)]"><IoLocationOutline /> {t('hero.location') || 'UAE'}</span>
        </motion.p>

        {/* CTA Buttons with enhanced hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
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

        {/* Mobile Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex lg:hidden items-center justify-center gap-4 mt-12"
        >
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="text-xl" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "carbon:mobile",
      title: t('services.mobileTitle') || "Mobile Applications",
      description: t('services.mobileDesc') || "Cross-platform mobile apps with React Native & Expo, delivering native performance and beautiful interfaces for iOS and Android.",
      gradient: "from-purple-500 to-pink-500",
      badges: [
        { icon: FaApple, label: "iOS" },
        { icon: FaGooglePlay, label: "Android" }
      ]
    },
    {
      icon: "carbon:api-1",
      title: t('services.apiTitle') || "API Development",
      description: t('services.apiDesc') || "RESTful APIs and backend services with Node.js, ensuring secure, scalable, and well-documented integrations.",
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.span 
              className="text-sm font-semibold tracking-wider uppercase text-[var(--accent)] mb-4 block"
              whileHover={{ scale: 1.05 }}
            >
              {t('services.sectionTag') || 'What I Do'}
            </motion.span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('services.title') || 'I Build Digital Solutions'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('services.description') || 'From concept to deployment, I create full stack websites, mobile applications, and everything in between to bring your ideas to life.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.15} direction="up">
              <motion.div 
                className="group glass rounded-3xl p-8 h-full relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Icon with glow effect */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-[var(--accent-glow)] flex items-center justify-center mb-6 relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon icon={service.icon} className="text-4xl text-[var(--accent)]" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[var(--accent)]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* App store badges for mobile */}
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
              </motion.div>
            </ScrollReveal>
          ))}
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
            <span className="text-sm font-semibold tracking-wider uppercase text-[var(--accent)] mb-4 block">{t('skills.sectionTag') || 'Tech Stack'}</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('skills.title') || 'Tools of the Trade'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('skills.description') || 'A curated collection of technologies I use to build exceptional digital products.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {allSkills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.03}>
              <div className="skill-badge group">
                {skill.icon.startsWith("/") ? (
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={28}
                    height={28}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <Icon
                    icon={skill.icon}
                    width={28}
                    height={28}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <ScrollReveal delay={0.1}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:code" className="text-3xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-2">{t('skills.frontend') || 'Frontend'}</h3>
              <p className="text-sm text-[var(--text-muted)]">{t('skills.frontendDesc') || 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion'}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:data-base" className="text-3xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-2">{t('skills.backend') || 'Backend'}</h3>
              <p className="text-sm text-[var(--text-muted)]">{t('skills.backendDesc') || 'Node.js, MongoDB, PostgreSQL, REST APIs'}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-glow)] mb-4">
                <Icon icon="carbon:tools" className="text-3xl text-[var(--accent)]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-2">{t('skills.tools') || 'Tools'}</h3>
              <p className="text-sm text-[var(--text-muted)]">{t('skills.toolsDesc') || 'Docker, Git, Vercel, Stripe, Authentication'}</p>
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
            <motion.span 
              className="text-sm font-semibold tracking-wider uppercase text-[var(--accent)] mb-4 block"
              whileHover={{ scale: 1.05 }}
            >
              {t('projects.sectionTag') || 'Portfolio'}
            </motion.span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--text-primary)] mb-6">
              {t('projects.title') || 'Featured Projects'}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('projects.description') || 'A selection of projects that showcase my skills and passion for building great products.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Unique Bento-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, i) => {
            // Different sizes for visual interest
            const gridSpans = [
              "lg:col-span-7", // Silversed - Large
              "lg:col-span-5", // SilMark - Medium  
              "lg:col-span-12", // Portfolio - Full width
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
                  {/* Background Image with Parallax */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        scale: hoveredIndex === i ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/20 to-transparent"
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 z-10">
                    {/* Top Section - Links */}
                    <motion.div 
                      className="flex justify-end gap-3"
                      initial={{ opacity: 0, y: -20 }}
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

                    {/* Bottom Section - Info */}
                    <div>
                      <motion.div
                        animate={{
                          y: hoveredIndex === i ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <motion.p 
                          className="text-white/90 text-sm md:text-base leading-relaxed mb-4 max-w-2xl"
                          animate={{
                            opacity: hoveredIndex === i ? 1 : 0.8,
                          }}
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
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
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
                            +{project.icon.length - 6} more
                          </span>
                        )}
                      </motion.div>

                      {/* Animated Border on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-[var(--accent)]"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredIndex === i ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Project Number/Badge */}
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
  
  const copyEmail = () => {
    navigator.clipboard.writeText('aahg@ahmadaljaziri.com')
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <span className="text-sm font-semibold tracking-wider uppercase text-[var(--accent)] mb-4 block">{t('contact.sectionTag') || 'Get in Touch'}</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-[var(--text-primary)] mb-6">
            {t('contact.title') || "Let's Work Together"}
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-12">
            {t('contact.description') || "Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas."}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--bg-secondary)]">
                <HiOutlineMail className="text-xl text-[var(--accent)]" />
                <span className="font-medium">aahg@ahmadaljaziri.com</span>
              </div>
              <button
                onClick={copyEmail}
                className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold hover:scale-105 transition-transform duration-300"
              >
                {t('contact.copyEmail') || 'Copy Email'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
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

// ========== ABOUT SECTION ==========
function AboutSection() {
  const t = useTranslations()
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])
  
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Floating Card Effect */}
              <motion.div 
                className="relative w-full aspect-square max-w-md mx-auto"
                style={{ scale, rotate }}
              >
                {/* Animated Gradient Ring */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] opacity-20 blur-2xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Profile Image Container */}
                <motion.div 
                  className="relative h-full rounded-3xl overflow-hidden border-2 border-[var(--border)] shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/assets/Pictures/profile-picc1.png"
                    alt="Ahmad Hosseini"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay Gradient on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            <div>
              {/* Section Tag */}
              <motion.span 
                className="inline-block text-sm font-semibold tracking-wider uppercase text-[var(--accent)] mb-4 px-4 py-2 rounded-full bg-[var(--accent-glow)] border border-[var(--accent)]/20"
                whileHover={{ scale: 1.05 }}
              >
                {t('about.sectionTag') || 'About Me'}
              </motion.span>
              
              {/* Title with Gradient */}
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
                <span className="gradient-text">
                  {t('about.title') || 'Passionate Developer & Problem Solver'}
                </span>
              </h2>
              
              {/* Description */}
              <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t('about.paragraph1') || "I'm a full stack developer based in the United Arab Emirates with a passion for creating seamless digital experiences. My journey in development started with curiosity and has evolved into a deep expertise in modern web technologies."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t('about.paragraph2') || "I specialize in building end-to-end applications using React, Next.js, Node.js, and various databases. I believe in writing clean, maintainable code that not only works but scales."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t('about.paragraph3') || "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or helping fellow developers on Stack Overflow."}
                </motion.p>
              </div>

              {/* Info Cards */}
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.div 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-[var(--border)]"
                  whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <IoLocationOutline className="text-lg text-[var(--accent)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{t('about.location') || 'United Arab Emirates'}</span>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ========== MAIN PAGE ==========
export default function Home() {
  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Smooth scrolling for anchor links */}
      <SmoothScroll />
      
      {/* Navigation */}
      <Navigation />

      
      {/* Fixed Social Sidebar */}
      <SocialSidebar />

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
