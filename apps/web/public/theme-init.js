// Apply the preference before CSS paints; storage may be blocked in private contexts.
(() => {
  let preference = 'system';
  try {
    const stored = localStorage.getItem('kivo.theme');
    if (stored === 'light' || stored === 'dark') preference = stored;
  } catch {
    /* System theme still works without storage. */
  }
  const theme =
    preference === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.querySelector('meta[name="theme-color"]').content =
    theme === 'dark' ? '#131416' : '#f3f3f0';
})();
