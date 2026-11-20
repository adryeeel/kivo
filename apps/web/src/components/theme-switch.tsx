'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const;

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // oxlint-disable-next-line react/set-state-in-effect -- next-themes needs a mounted gate to keep server and client controls identical.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!resolvedTheme) return;
    const mobile = matchMedia('(max-width: 1023px)');
    function updateChrome() {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (meta)
        meta.content =
          resolvedTheme === 'dark'
            ? mobile.matches
              ? '#1b2823'
              : '#14201c'
            : mobile.matches
              ? '#ffffff'
              : '#ecefe9';
    }
    updateChrome();
    mobile.addEventListener('change', updateChrome);
    return () => mobile.removeEventListener('change', updateChrome);
  }, [resolvedTheme]);

  return (
    <fieldset className="flex rounded-lg border border-line bg-raised p-0.5">
      <legend className="sr-only">Appearance</legend>
      {options.map(({ value, label, Icon }) => (
        <label
          key={value}
          className="relative grid size-11 cursor-pointer place-items-center"
          title={`${label} theme`}
        >
          <input
            className="peer absolute inset-0 size-full cursor-pointer opacity-0"
            type="radio"
            name="theme"
            value={value}
            disabled={!mounted}
            checked={mounted && theme === value}
            onChange={() => setTheme(value)}
            aria-label={`${label} theme`}
          />
          <span className="grid size-8 place-items-center rounded-md border border-transparent text-muted peer-checked:border-line peer-checked:bg-surface peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
          </span>
        </label>
      ))}
    </fieldset>
  );
}
