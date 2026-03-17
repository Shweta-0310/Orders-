// SVG icon components

export function SearchIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 13.5C6.5 14.328 7.172 15 8 15C8.828 15 9.5 14.328 9.5 13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2.5 11.5H13.5C13.5 11.5 11.5 9.5 11.5 6C11.5 3.515 9.985 1.5 8 1.5C6.015 1.5 4.5 3.515 4.5 6C4.5 9.5 2.5 11.5 2.5 11.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivityIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="1,8 4,4 7,10 10,6 13,8 15,5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L7 5H11L7.5 7.5L9 11L6 8.5L3 11L4.5 7.5L1 5H5L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronSelectorIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 5.5L7 3L10 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8.5L7 11L10 8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 5H11" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 1V3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 1V3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function FilterIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 2H11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3 6H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5 10H7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function StatusIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 2" />
    </svg>
  );
}

export function TypeIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="6.5" y="1.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.5" y="6.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="6.5" y="6.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function PlusIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3V13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3 8H13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11.5L4.5 7L9 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sidebar icons
export function HomeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5.5L7 1.5L12 5.5V12.5H9V8.5H5V12.5H2V5.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 2C7 2 5 4.5 5 7C5 9.5 7 12 7 12" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 2C7 2 9 4.5 9 7C9 9.5 7 12 7 12" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 5H11.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 9H11.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function DatabaseIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="7" cy="3.5" rx="4" ry="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 3.5V7C3 7.828 4.791 8.5 7 8.5C9.209 8.5 11 7.828 11 7V3.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 7V10.5C3 11.328 4.791 12 7 12C9.209 12 11 11.328 11 10.5V7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function UserIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 12.5C2 10.015 4.239 8 7 8C9.761 8 12 10.015 12 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function TrendUpIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="1.5,10 5,6 8,8.5 12.5,3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3H12.5V6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeadphonesIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 8V7C2.5 4.239 4.515 2 7 2C9.485 2 11.5 4.239 11.5 7V8" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.5" y="8" width="2.5" height="3.5" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <rect x="10" y="8" width="2.5" height="3.5" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function CardholderIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="3.5" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 6H12.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function SlidersIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 4.5H12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M1.5 9.5H12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="4" cy="4.5" r="1.25" fill="white" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="10" cy="9.5" r="1.25" fill="white" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function KeyIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="6" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7.5 8L13 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M11 8V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6 1V3M6 9V11M1 6H3M9 6H11M2.636 2.636L4.05 4.05M7.95 7.95L9.364 9.364M9.364 2.636L7.95 4.05M4.05 7.95L2.636 9.364" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function LayoutIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 5.5V12.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
