'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { locales, localeNames, type Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname
  const getCurrentLocale = (): Locale => {
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}`)) {
        return locale;
      }
    }
    return 'en'; // default
  };

  const locale = getCurrentLocale();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Remove the current locale from the pathname
    let newPathname = pathname;
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}`)) {
        newPathname = pathname.replace(`/${loc}`, '');
        break;
      }
    }

    // Ensure pathname starts with /
    if (!newPathname.startsWith('/')) {
      newPathname = '/' + newPathname;
    }

    // Build the new path with the new locale
    const newPath = `/${newLocale}${newPathname}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Desktop Language Switcher */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full glass hover:bg-white/20 dark:hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{localeNames[locale]}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      {/* Mobile Language Switcher */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Change language"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>{localeNames[locale]}</span>
        </div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 md:left-0 md:right-auto rounded-xl shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-md bg-white/10 dark:bg-white/5 z-50 md:min-w-[140px] overflow-hidden"
          >
            {locales.map((loc, index) => (
              <motion.button
                key={loc}
                onClick={() => switchLocale(loc)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full px-4 py-3 text-sm font-medium text-left transition-all flex items-center justify-between ${
                  loc === locale
                    ? 'bg-white/20 dark:bg-white/15 text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-white/15 dark:hover:bg-white/10'
                }`}
              >
                <span>{localeNames[loc]}</span>
                {loc === locale && (
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
