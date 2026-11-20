import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

type ThemePreference = 'light' | 'dark' | 'system';

function readPreference(value: string | null | undefined): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system';
}

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const;

export function ThemeSwitch() {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    readPreference(document.documentElement.dataset.themePreference),
  );

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const mobile = matchMedia('(max-width: 1023px)');
    function applyTheme() {
      const theme =
        preference === 'system'
          ? media.matches
            ? 'dark'
            : 'light'
          : preference;
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.themePreference = preference;
      document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]',
      )!.content = getComputedStyle(document.documentElement)
        .getPropertyValue('--canvas')
        .trim();
    }
    function syncStorage(event: StorageEvent) {
      if (event.key === 'kivo.theme' || event.key === null) {
        setPreference(readPreference(event.newValue));
      }
    }
    applyTheme();
    media.addEventListener('change', applyTheme);
    mobile.addEventListener('change', applyTheme);
    window.addEventListener('storage', syncStorage);
    return () => {
      media.removeEventListener('change', applyTheme);
      mobile.removeEventListener('change', applyTheme);
      window.removeEventListener('storage', syncStorage);
    };
  }, [preference]);

  function selectTheme(value: ThemePreference) {
    setPreference(value);
    try {
      localStorage.setItem('kivo.theme', value);
    } catch {
      /* Keep the choice for this visit when storage is unavailable. */
    }
  }

  return (
    <fieldset className="theme-switch">
      <legend className="sr-only">Appearance</legend>
      {options.map(({ value, label, Icon }) => (
        <label key={value} className="theme-option" title={`${label} theme`}>
          <input
            className="sr-only"
            type="radio"
            name="theme"
            value={value}
            checked={preference === value}
            onChange={() => selectTheme(value)}
            aria-label={`${label} theme`}
          />
          <span>
            <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
          </span>
        </label>
      ))}
    </fieldset>
  );
}
