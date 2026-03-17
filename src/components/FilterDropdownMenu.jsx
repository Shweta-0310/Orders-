import { useState, useEffect, useRef } from 'react';

function SearchIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-[#99a0ae]" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function Checkbox({ checked }) {
  return (
    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
      checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-[#cacfd8]'
    }`}>
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#525866]" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilterDropdownMenu({ icon: Icon, label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function toggle(opt) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  }

  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => { setOpen((v) => !v); setSearch(''); }}
        className={`flex items-center gap-1.5 h-8 px-3.5 border rounded-[10px] shadow-xs text-[12px] font-medium transition-colors whitespace-nowrap ${
          open || selected.length > 0
            ? 'bg-[#f2f4f8] border-[#cacfd8] text-[#2b303b]'
            : 'bg-white border-[#e1e4ea] text-[#525866] hover:bg-[#f2f4f8]'
        }`}
      >
        {Icon && <Icon className="w-3 h-3 shrink-0" />}
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="text-[11px] font-semibold text-white bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {selected.length}
          </span>
        )}
        <ChevronDownIcon />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-[200px] bg-white border border-[#e1e4ea] rounded-[12px] shadow-[0px_4px_16px_2px_rgba(5,5,6,0.10)] z-30 overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#e1e4ea]">
            <SearchIcon />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 text-[13px] text-[#2b303b] placeholder-[#99a0ae] outline-none bg-transparent"
            />
          </div>

          {/* Options */}
          <div className="py-1 max-h-[220px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-3 py-3 text-[13px] text-[#99a0ae] text-center">No results</p>
            )}
            {filtered.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#f2f4f8] text-[#2b303b]'
                      : 'text-[#525866] hover:bg-[#f2f4f8] hover:text-[#2b303b]'
                  }`}
                >
                  <span>{opt}</span>
                  <Checkbox checked={isSelected} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
