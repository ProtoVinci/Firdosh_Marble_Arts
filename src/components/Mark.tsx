type MarkProps = {
  className?: string;
};

/**
 * A tiered water feature reduced to three scalloped arcs over a base
 * line — the mark reads as a fountain at favicon size.
 */
export function Mark({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      <path d="M16 3.4c.9 1.2 1.4 2.1 1.4 2.9S16.6 8 16 8s-1.4-.7-1.4-1.7.5-1.7 1.4-2.9Z" />
      <path d="M8.6 11.4c2 1.3 4.6 2 7.4 2s5.4-.7 7.4-2" />
      <path d="M4.8 20.2c3.1 2 7 3 11.2 3s8.1-1 11.2-3" />
      <path d="M3.2 27.4h25.6" />
    </svg>
  );
}