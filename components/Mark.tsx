/** DarkWire's mark: two brackets around a signal dot. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 6H6v36h8" stroke="#E8E8E8" strokeWidth="4" fill="none" />
      <path d="M34 6h8v36h-8" stroke="#E8E8E8" strokeWidth="4" fill="none" />
      <circle cx="24" cy="24" r="6.5" fill="#00D9FF" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <>
      DARK<i>/</i>WIRE
    </>
  );
}
