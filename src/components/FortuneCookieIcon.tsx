export function FortuneCookieIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fortune cookie crescent shape */}
      <path 
        d="M 12 5 Q 8 6 6 9 Q 5 11 5.5 13.5 Q 6 16 8 17.5 Q 9.5 18.5 11 18.2 Q 11.5 14 12 12" 
        fill="currentColor"
        opacity="0.95"
      />
      <path 
        d="M 12 5 Q 16 6 18 9 Q 19 11 18.5 13.5 Q 18 16 16 17.5 Q 14.5 18.5 13 18.2 Q 12.5 14 12 12" 
        fill="currentColor"
        opacity="0.95"
      />
      {/* Inner fold creating the V shape */}
      <path 
        d="M 12 5 Q 11.5 9 12 12 Q 12.5 9 12 5" 
        fill="currentColor"
        opacity="0.7"
      />
      {/* Small opening slot */}
      <ellipse cx="12" cy="11.5" rx="1" ry="0.4" fill="currentColor" opacity="0.5" />
    </svg>
  );
}