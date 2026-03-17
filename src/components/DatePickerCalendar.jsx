import { useState, useEffect, useRef } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────────

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDisplay(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  return `${d} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

function isSameDay(a, b) {
  return a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(date) {
  return isSameDay(date, new Date());
}

function isBetween(date, a, b) {
  if (!a || !b) return false;
  const t = date.getTime();
  const lo = Math.min(a.getTime(), b.getTime());
  const hi = Math.max(a.getTime(), b.getTime());
  return t > lo && t < hi;
}

function isRangeStart(date, start, end) {
  if (!start) return false;
  if (!end) return isSameDay(date, start);
  return isSameDay(date, start.getTime() < end.getTime() ? start : end);
}

function isRangeEnd(date, start, end) {
  if (!start || !end) return false;
  return isSameDay(date, start.getTime() < end.getTime() ? end : start);
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const days = [];
  for (let i = startOffset - 1; i >= 0; i--)
    days.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
  for (let d = 1; d <= daysInMonth; d++)
    days.push({ date: new Date(year, month, d), current: true });
  while (days.length < 42)
    days.push({ date: new Date(year, month + 1, days.length - startOffset - daysInMonth + 1), current: false });
  return days;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function DatePickerCalendar({ onClose, onApply, initialStart = null, initialEnd = null }) {
  const ref = useRef(null);
  const today = new Date();

  const [viewYear, setViewYear] = useState(initialStart ? initialStart.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialStart ? initialStart.getMonth() : today.getMonth());
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [hovered, setHovered] = useState(null);
  // 'start' = next click sets start, 'end' = next click sets end
  const [phase, setPhase] = useState(initialStart && !initialEnd ? 'end' : 'start');

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  function handleDayClick(date) {
    if (phase === 'start' || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      setPhase('end');
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setPhase('start');
    }
  }

  const days = getCalendarDays(viewYear, viewMonth);
  // effective end for range preview (hover or confirmed)
  const effectiveEnd = endDate || (phase === 'end' ? hovered : null);

  const canApply = startDate != null;

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 w-[320px] bg-white border border-[#e1e4ea] rounded-[12px] shadow-[0px_8px_24px_rgba(5,5,6,0.12)] z-30 overflow-hidden select-none"
    >
      {/* Start / End inputs */}
      <div className="grid grid-cols-2 gap-2 p-4 pb-3">
        {[
          { label: 'Start', date: startDate, active: phase === 'end' && !!startDate },
          { label: 'End', date: endDate, active: false },
        ].map(({ label, date, active }) => (
          <div key={label}>
            <p className="text-[12px] font-medium text-[#525866] mb-1.5">{label}</p>
            <div className={`px-3 py-2 border rounded-[8px] text-[13px] transition-colors ${
              active
                ? 'border-blue-500 text-[#2b303b] bg-blue-50'
                : date
                ? 'border-[#e1e4ea] text-[#2b303b]'
                : 'border-[#e1e4ea] text-[#99a0ae]'
            }`}>
              {date ? formatDisplay(date) : 'Date'}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#e1e4ea]" />

      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <button
          onClick={prevMonth}
          className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#525866] hover:bg-[#f2f4f8] transition-colors"
        >
          <ChevronLeft />
        </button>
        <span className="text-[15px] font-semibold text-[#2b303b]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#525866] hover:bg-[#f2f4f8] transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 px-3 pb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[12px] font-medium text-[#99a0ae] py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-3 pb-3">
        {days.map(({ date, current }, i) => {
          const isStart = isRangeStart(date, startDate, effectiveEnd);
          const isEnd = isRangeEnd(date, startDate, effectiveEnd);
          const inRange = isBetween(date, startDate, effectiveEnd);
          const todayDay = isToday(date);
          const isSelected = isStart || isEnd;

          return (
            <div
              key={i}
              className={`relative flex items-center justify-center ${
                inRange ? 'bg-blue-50' : ''
              } ${isStart && effectiveEnd ? 'rounded-l-full' : ''} ${
                isEnd ? 'rounded-r-full' : ''
              } ${isStart && !effectiveEnd ? 'rounded-full' : ''}`}
            >
              <button
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : current
                    ? 'text-[#2b303b] hover:bg-[#f2f4f8]'
                    : 'text-[#cacfd8] hover:bg-[#f2f4f8]'
                }`}
              >
                {date.getDate()}
                {/* Today dot */}
                {todayDay && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-[#e1e4ea]">
        <button
          onClick={onClose}
          className="h-8 px-4 border border-[#e1e4ea] rounded-[8px] text-[13px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!canApply}
          onClick={() => { onApply(startDate, endDate); onClose(); }}
          className="h-8 px-4 rounded-[8px] text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
