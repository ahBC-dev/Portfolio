'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { locales, type Locale } from '@/i18n';

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
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center min-w-[40px] px-2 py-2 text-sm font-bold rounded-full glass hover:bg-white/20 dark:hover:bg-white/10 transition-all uppercase"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
      >
        <span>{locale}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded-xl shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-md bg-white/10 dark:bg-white/5 z-50 overflow-hidden"
          >
            <div className="flex flex-col p-1">
              {locales.map((loc) => (
                <motion.button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-4 py-2 text-xs font-bold transition-all rounded-lg uppercase ${
                    loc === locale
                      ? 'bg-white/20 dark:bg-white/15 text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-white/15 dark:hover:bg-white/10'
                  }`}
                >
                  {loc}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
