# Example: Converting Components to Use Translations

This guide shows how to convert your existing components to use the i18n system.

## Example 1: Simple Component with Static Text

### Before:
```tsx
export default function About() {
  return (
    <section>
      <h2>About Me</h2>
      <p>I'm a passionate Full Stack Developer...</p>
    </section>
  );
}
```

### After:
```tsx
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');
  
  return (
    <section>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
    </section>
  );
}
```

## Example 2: Navigation Component

### Before:
```tsx
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  return (
    <nav>
      {NAV_ITEMS.map(item => (
        <a key={item.href} href={item.href}>{item.label}</a>
      ))}
    </nav>
  );
}
```

### After:
```tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const NAV_KEYS = ['home', 'about', 'projects', 'contact'];
const NAV_HREFS = ['/', '/about', '/projects', '/contact'];

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  
  return (
    <nav>
      {NAV_KEYS.map((key, index) => (
        <Link 
          key={key} 
          href={`/${locale}${NAV_HREFS[index]}`}
        >
          {t(key)}
        </Link>
      ))}
    </nav>
  );
}
```

## Example 3: Form Component

### Before:
```tsx
export default function ContactForm() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message" />
      <button>Send Message</button>
    </form>
  );
}
```

### After:
```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  
  return (
    <form>
      <input 
        type="text" 
        placeholder={t('name')} 
        aria-label={t('name')}
      />
      <input 
        type="email" 
        placeholder={t('email')} 
        aria-label={t('email')}
      />
      <textarea 
        placeholder={t('message')} 
        aria-label={t('message')}
      />
      <button type="submit">
        {t('send')}
      </button>
    </form>
  );
}
```

## Example 4: Server Component with Metadata

### Before:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Full Stack Developer',
};

export default function Page() {
  return <div>Content</div>;
}
```

### After:
```tsx
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: t('name'),
    description: t('description'),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  
  return <div>{t('greeting')}</div>;
}
```

## Example 5: Dynamic Content with Variables

### Translation file (messages/en.json):
```json
{
  "projects": {
    "count": "I have {count} projects",
    "viewMore": "View {name}"
  }
}
```

### Component:
```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function Projects() {
  const t = useTranslations('projects');
  const projectCount = 5;
  const projectName = "Portfolio Website";
  
  return (
    <div>
      <p>{t('count', { count: projectCount })}</p>
      <button>{t('viewMore', { name: projectName })}</button>
    </div>
  );
}
```

## Example 6: Conditional Rendering Based on Locale

```tsx
'use client';

import { useLocale } from 'next-intl';

export default function LocaleSpecificComponent() {
  const locale = useLocale();
  const isRTL = locale === 'ar' || locale === 'fa';
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      {/* Content that respects text direction */}
    </div>
  );
}
```

## Quick Checklist for Converting Components

- [ ] Import `useTranslations` from `next-intl`
- [ ] Call `const t = useTranslations('namespace')` in your component
- [ ] Replace all hardcoded text with `t('key')`
- [ ] Add corresponding keys to all language files (en.json, ar.json, fa.json)
- [ ] For links, include locale: `href={\`/\${locale}/path\`}`
- [ ] For server components, use `getTranslations` from `next-intl/server`
- [ ] Test in all three languages (English, Arabic, Persian)
- [ ] Verify RTL layout works correctly for Arabic and Persian

## Common Patterns

### Button with Icon
```tsx
<button>
  <Icon />
  {t('buttonText')}
</button>
```

### Conditional Text
```tsx
{isLoading ? t('loading') : t('submit')}
```

### List Items
```tsx
const items = ['item1', 'item2', 'item3'];
return items.map(key => <li key={key}>{t(key)}</li>);
```

### Error Messages
```tsx
{error && <p className="error">{t('error')}</p>}
```
