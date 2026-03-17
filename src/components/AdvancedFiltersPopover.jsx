import { useState, useEffect, useRef } from 'react';
import { SparklesIcon } from './icons.jsx';

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIconSm() {
  return (
    <svg className="w-4 h-4 shrink-0 text-[#99a0ae]" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightSm() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#99a0ae]" viewBox="0 0 12 12" fill="none">
      <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownSm() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-[#525866]" viewBox="0 0 14 14" fill="none">
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxBox({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
        checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-[#cacfd8] hover:border-[#99a0ae]'
      }`}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

export const FILTER_CATEGORIES = [
  {
    label: 'Orders Status',
    options: ['Select All', 'Success', 'New', 'Authentication Failed', 'Authorization Failed', 'Authentication Pending', 'Auto-Refunded', 'Partial Charged', 'Auth Failed', 'Failed'],
  },
  {
    label: 'Order Type',
    options: ['Select All', 'Order Payment', 'Mandate Payment', 'Mandate Register', 'TPV Payment', 'VAN Payment', 'TPV Mandate'],
  },
  {
    label: 'Currency',
    options: ['Select All', 'INR', 'USD', 'EUR', 'GBP', 'AED'],
  },
  { label: 'Customer Email', options: [] },
  { label: 'Phone No.', options: [] },
  { label: 'UDF', options: [] },
];

const SAVED_VIEWS = ['Saved View', 'View 1', 'View 2'];

// Convert { catLabel: ['opt1', 'opt2'] } → { '0:opt1': true, '0:opt2': true }
function ungroupFilters(initial) {
  const out = {};
  Object.entries(initial).forEach(([label, opts]) => {
    const idx = FILTER_CATEGORIES.findIndex((c) => c.label === label);
    if (idx === -1) return;
    opts.forEach((o) => { out[`${idx}:${o}`] = true; });
  });
  return out;
}

// Convert { '0:opt1': true } → { catLabel: ['opt1'] }
function groupChecked(checked) {
  const out = {};
  Object.entries(checked).forEach(([key, val]) => {
    if (!val) return;
    const colonIdx = key.indexOf(':');
    const catIdx = parseInt(key.slice(0, colonIdx));
    const opt = key.slice(colonIdx + 1);
    const label = FILTER_CATEGORIES[catIdx]?.label;
    if (!label) return;
    if (!out[label]) out[label] = [];
    out[label].push(opt);
  });
  return out;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AdvancedFiltersPopover({ onClose, onApply, initialFilters = {} }) {
  const ref = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(() => ungroupFilters(initialFilters));
  const [savedView, setSavedView] = useState('Saved View');
  const [viewDropOpen, setViewDropOpen] = useState(false);

  // Sync initial filters when popover reopens with existing selections
  useEffect(() => {
    setChecked(ungroupFilters(initialFilters));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const category = FILTER_CATEGORIES[activeCategory];
  const options = category.options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  const checkedCount = Object.values(checked).filter(Boolean).length;

  function toggleOption(opt) {
    if (opt === 'Select All') {
      const allChecked = category.options.slice(1).every((o) => checked[`${activeCategory}:${o}`]);
      const next = { ...checked };
      category.options.slice(1).forEach((o) => { next[`${activeCategory}:${o}`] = !allChecked; });
      setChecked(next);
    } else {
      setChecked((prev) => ({ ...prev, [`${activeCategory}:${opt}`]: !prev[`${activeCategory}:${opt}`] }));
    }
  }

  function isChecked(opt) {
    if (opt === 'Select All') {
      return category.options.slice(1).length > 0 &&
        category.options.slice(1).every((o) => checked[`${activeCategory}:${o}`]);
    }
    return !!checked[`${activeCategory}:${opt}`];
  }

  function handleApply() {
    onApply(groupChecked(checked));
    onClose();
  }

  function handleClearAll() {
    setChecked({});
  }

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 w-[511px] bg-white border border-[#e1e4ea] rounded-[12px] shadow-[0px_4px_16px_2px_rgba(5,5,6,0.10)] z-30 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#e1e4ea]">
        <div className="relative">
          <button
            className="flex items-center gap-1.5 h-[34px] px-3 rounded-[8px] text-[13px] font-medium text-[#2b303b] hover:bg-[#f2f4f8] transition-colors"
            onClick={() => setViewDropOpen(!viewDropOpen)}
          >
            <span>{savedView}</span>
            <ChevronDownSm />
          </button>
          {viewDropOpen && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-[#e1e4ea] rounded-[8px] shadow-[0px_3px_12px_rgba(5,5,6,0.08)] w-[140px] py-1 z-50">
              {SAVED_VIEWS.map((v) => (
                <button
                  key={v}
                  className={`w-full text-left px-3 py-1.5 text-[13px] rounded-[4px] hover:bg-[#f2f4f8] transition-colors ${
                    v === savedView ? 'font-semibold text-[#2b303b]' : 'text-[#525866]'
                  }`}
                  onClick={() => { setSavedView(v); setViewDropOpen(false); }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1 rounded-[6px] hover:bg-blue-50">
          Save as View
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center border-b border-[#e1e4ea]">
        <div className="flex items-center gap-2 flex-1 px-3 py-2.5 border-r border-[#e1e4ea]">
          <SearchIconSm />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 text-[14px] text-[#2b303b] placeholder-[#99a0ae] outline-none bg-transparent"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2.5 hover:bg-[#f2f4f8] transition-colors shrink-0">
          <div
            className="w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-[0_0_4px_1.4px_#e9e7ff] shrink-0"
            style={{ background: 'linear-gradient(140deg, #9747ff 41%, #1b85ff 116%)' }}
          >
            <SparklesIcon className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-[13px] font-medium text-[#99a0ae]">Genius AI</span>
        </button>
      </div>

      {/* Two-column body */}
      <div className="flex" style={{ height: '222px' }}>
        {/* Left: categories */}
        <div className="w-[189px] shrink-0 border-r border-[#e1e4ea] flex flex-col overflow-y-auto">
          <p className="px-3 pt-3 pb-1.5 text-[11px] font-semibold text-[#99a0ae] uppercase tracking-wide">Filters</p>
          {FILTER_CATEGORIES.map((cat, i) => {
            const selCount = cat.options.slice(1).filter((o) => checked[`${i}:${o}`]).length;
            return (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(i); setSearch(''); }}
                className={`flex items-center justify-between w-full px-3 py-2 text-[13px] font-medium transition-colors ${
                  activeCategory === i
                    ? 'bg-[#f2f4f8] text-[#2b303b]'
                    : 'text-[#525866] hover:bg-[#fcfcfd] hover:text-[#2b303b]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {cat.label}
                  {selCount > 0 && (
                    <span className="text-[11px] font-semibold text-white bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center leading-none">
                      {selCount}
                    </span>
                  )}
                </span>
                <ChevronRightSm />
              </button>
            );
          })}
        </div>

        {/* Right: checkboxes */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {options.length === 0 && (
            <p className="px-2 py-4 text-[13px] text-[#99a0ae] text-center">No options</p>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className="flex items-center justify-between w-full px-2 py-[7px] rounded-[6px] hover:bg-[#f2f4f8] transition-colors group"
            >
              <span className={`text-[13px] font-medium ${isChecked(opt) ? 'text-[#2b303b]' : 'text-[#525866] group-hover:text-[#2b303b]'}`}>
                {opt}
              </span>
              <CheckboxBox checked={isChecked(opt)} onChange={() => toggleOption(opt)} />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-4 border-t border-[#e1e4ea]">
        <button className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4ea] rounded-[8px] text-[13px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors">
          Advance Filters
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearAll}
            disabled={checkedCount === 0}
            className="flex items-center h-8 px-3 border border-[#e1e4ea] rounded-[8px] text-[13px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            disabled={checkedCount === 0}
            className="flex items-center h-8 px-4 rounded-[8px] text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
