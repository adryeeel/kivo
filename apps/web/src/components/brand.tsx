export function Brand() {
  return (
    <span className="brand" role="img" aria-label="Kivo">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="currentColor" />
        <path
          d="M12 10v20m4-10 12-10M16 20l12 10"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        kivo<span className="brand-period">.</span>
      </span>
    </span>
  );
}
