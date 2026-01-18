# Multi-Language Support (i18n)

This project supports **English**, **Arabic**, and **Persian (Farsi)** using `next-intl`.

## 📁 Structure

```
my-next-app/
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Locale detection and routing
├── messages/               # Translation files
│   ├── en.json            # English translations
│   ├── ar.json            # Arabic translations (العربية)
│   └── fa.json            # Persian translations (فارسی)
├── app/
│   ├── [locale]/          # Locale-specific routes
│   │   ├── layout.tsx     # Locale-aware layout with RTL support
│   │   └── page.tsx       # Home page
│   └── layout.tsx         # Root layout (exports locale layout)
└── components/
    └── subComponents/
        └── LanguageSwitcher.tsx  # Language switcher component
```

## 🌍 Supported Languages

- **English** (`en`) - Default language, LTR
- **Arabic** (`ar`) - العربية, RTL
- **Persian** (`fa`) - فارسی, RTL

## 🚀 Usage

### Using Translations in Components

#### Server Components

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav');
  
  return <h1>{t('home')}</h1>;
}
```

#### Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('hero');
  
  return <h1>{t('greeting')}</h1>;
}
```

### Language Switcher

Import and use the `LanguageSwitcher` component in your navigation:

```tsx
import LanguageSwitcher from '@/components/subComponents/LanguageSwitcher';

export default function Header() {
  return (
    <header>
      {/* Your header content */}
      <LanguageSwitcher />
    </header>
  );
}
```

### Accessing Current Locale

```tsx
import { useLocale } from 'next-intl';

export default function MyComponent() {
  const locale = useLocale(); // 'en', 'ar', or 'fa'
  
  return <p>Current locale: {locale}</p>;
}
```

### Creating Links Between Pages

```tsx
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const locale = useLocale();
  
  return (
    <nav>
      <Link href={`/${locale}/about`}>About</Link>
      <Link href={`/${locale}/projects`}>Projects</Link>
    </nav>
  );
}
```

## ✏️ Adding New Translations

1. Open the respective language file in `messages/` directory
2. Add your translation key with the value:

```json
{
  "yourSection": {
    "yourKey": "Your translation text"
  }
}
```

3. Update all three language files (`en.json`, `ar.json`, `fa.json`) with the same key structure

## 🔄 RTL Support

Arabic and Persian are automatically set to RTL (right-to-left) in the layout. The `dir` attribute is set based on the current locale:

- English: `dir="ltr"`
- Arabic: `dir="rtl"`
- Persian: `dir="rtl"`

## 🎨 Styling for RTL

Use Tailwind CSS RTL-aware utilities:

```tsx
<div className="mr-4 rtl:ml-4 rtl:mr-0">
  Content
</div>
```

Or use logical properties:

```tsx
<div className="ms-4"> {/* margin-start, works for both LTR and RTL */}
  Content
</div>
```

## 🔗 URL Structure

- Default (English): `/` or `/en`
- Arabic: `/ar`
- Persian: `/fa`

The middleware automatically handles locale detection and routing.

## 📝 Translation File Structure

Each translation file follows this structure:

```json
{
  "nav": { ... },
  "hero": { ... },
  "about": { ... },
  "projects": { ... },
  "techStack": { ... },
  "contact": { ... },
  "common": { ... }
}
```

## 🛠️ Configuration Files

### `i18n.ts`
- Defines available locales
- Sets default locale
- Configures locale names
- Loads translation messages

### `middleware.ts`
- Detects user's preferred language
- Redirects to appropriate locale
- Handles locale routing

### `next.config.ts`
- Integrates `next-intl` plugin
- Configures Next.js for i18n support

## 🌟 Best Practices

1. **Always use translation keys** instead of hardcoded text
2. **Keep translation keys consistent** across all language files
3. **Use namespaces** to organize translations logically
4. **Test RTL layout** when adding new components
5. **Use logical CSS properties** for better RTL support
6. **Provide context** in translation keys for better understanding

## 🐛 Troubleshooting

### Translations not showing
- Check if the translation key exists in all language files
- Verify the namespace matches the one in `useTranslations()`
- Ensure the locale parameter is being passed correctly

### RTL layout issues
- Check if `dir` attribute is properly set in the HTML
- Use Tailwind's RTL utilities or logical properties
- Test in all three languages

### Route not found
- Verify the `[locale]` folder structure is correct
- Check middleware configuration
- Ensure all pages are inside `app/[locale]/` directory
