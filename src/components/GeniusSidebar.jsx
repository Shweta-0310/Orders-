import { useState, useEffect, useRef } from 'react';
import { SparklesIcon } from './icons.jsx';

// ── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIconSm() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M3 6V3H6M10 3H13V6M13 10V13H10M6 13H3V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbUpIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
      <path d="M5 6.5L7 2C7.55 2 8 2.45 8 3V5.5H11.5C12.05 5.5 12.5 5.95 12.5 6.5L11.5 10.5C11.32 11.05 10.82 11.5 10.5 11.5H5V6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 6.5H2V11.5H3.5V6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
      <path d="M9 7.5L7 12C6.45 12 6 11.55 6 11V8.5H2.5C1.95 8.5 1.5 8.05 1.5 7.5L2.5 3.5C2.68 2.95 3.18 2.5 3.5 2.5H9V7.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 7.5H12V2.5H10.5V7.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIconSm() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
      <path d="M1.5 7A5.5 5.5 0 0 1 12.5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12.5 7A5.5 5.5 0 0 1 1.5 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10.5 3L12.5 5L10.5 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 11L1.5 9L3.5 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 7.5L7.5 13.5C6.12 14.88 3.88 14.88 2.5 13.5C1.12 12.12 1.12 9.88 2.5 8.5L9 2C9.83 1.17 11.17 1.17 12 2C12.83 2.83 12.83 4.17 12 5L5.5 11.5C5.22 11.78 4.78 11.78 4.5 11.5C4.22 11.22 4.22 10.78 4.5 10.5L10 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M14 8L2 2L5.5 8L2 14L14 8Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ── Typewriter hook ───────────────────────────────────────────────────────────

function useTypewriter(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!active) return;
    idx.current = 0;
    setDisplayed('');
    setDone(false);
    const timer = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, active]);

  return { displayed, done };
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ANSWER_TEXT =
  `The order #ID-55668484 was created on Feb 23, 2025 at 12:23 PM for ₹144.00 via PhonePe. ` +
  `The initial payment attempt failed due to a gateway timeout at Pinelabs. ` +
  `Juspay's Silent Retry mechanism automatically triggered a second attempt, which also failed. ` +
  `SR V2 Routing then switched the transaction to PhonePe, which successfully processed ₹131.00. ` +
  `The order was fulfilled and a webhook was dispatched to the merchant at 12:23:45 PM. ` +
  `A refund of ₹7999 was later initiated on Mar 14, 2025 and completed successfully.`;

const SUGGESTIONS = [
  'Why was the initial payment attempt routed to Pinelabs?',
  'Show me all orders that used SR V2 Routing this week',
  'What does "Silent Retry" do and when is it triggered?',
];

// ── Component ─────────────────────────────────────────────────────────────────

export function GeniusSidebar({ open, onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const { displayed, done } = useTypewriter(ANSWER_TEXT, 14, startTyping);

  // Start typewriter after slide-in
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setStartTyping(true), 500);
      return () => clearTimeout(t);
    } else {
      setStartTyping(false);
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[475px] max-w-full bg-white border-l border-[#e1e4ea] shadow-[−4px_0_24px_rgba(5,5,6,0.08)] z-50 flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e1e4ea] shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_8px_3px_#e9e7ff]"
              style={{ background: 'linear-gradient(140deg, #9747ff 41%, #1b85ff 116%)' }}
            >
              <SparklesIcon className="w-3 h-3 text-white" />
            </div>
            <span className="text-[16px] font-semibold text-[#222530]">Ask Genius</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded-[8px] text-[#525866] hover:bg-[#f2f4f8] transition-colors">
              <ClockIconSm />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-[8px] text-[#525866] hover:bg-[#f2f4f8] transition-colors">
              <ExpandIcon />
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-[8px] text-[#525866] hover:bg-[#f2f4f8] transition-colors"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

          {/* Auto question */}
          <p className="text-[14px] text-[#99a0ae] font-medium">
            What happened to this Order after Jan 12, 2025?
          </p>

          {/* Answer block */}
          <div className="flex flex-col gap-4">
            {/* Genius avatar + answer */}
            <div className="flex gap-3 items-start">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_6px_2px_#e9e7ff]"
                style={{ background: 'linear-gradient(140deg, #9747ff 41%, #1b85ff 116%)' }}
              >
                <SparklesIcon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-[14px] text-[#2b303b] leading-6">
                  {displayed}
                  {!done && (
                    <span className="inline-block w-0.5 h-4 bg-[#9747ff] ml-0.5 align-middle animate-pulse" />
                  )}
                </p>

                {/* Suggestions — shown after typing done */}
                {done && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#717784] uppercase tracking-wide">Suggestive Queries & Actions</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {SUGGESTIONS.map((s, i) => (
                        <button
                          key={i}
                          className="flex items-center justify-between gap-2 w-full text-left px-3 py-2.5 rounded-[10px] border border-[#e1e4ea] hover:bg-[#f2f4f8] transition-colors group"
                        >
                          <span className="text-[13px] font-medium text-[#525866] group-hover:text-[#2b303b] transition-colors">{s}</span>
                          <ArrowUpRightIcon />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback row */}
                {done && (
                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#99a0ae] hover:text-[#525866] hover:bg-[#f2f4f8] transition-colors">
                      <ThumbUpIcon />
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#99a0ae] hover:text-[#525866] hover:bg-[#f2f4f8] transition-colors">
                      <ThumbDownIcon />
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#99a0ae] hover:text-[#525866] hover:bg-[#f2f4f8] transition-colors">
                      <RefreshIconSm />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer input */}
        <div className="shrink-0 px-4 py-4 border-t border-[#e1e4ea]">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f2f4f8] rounded-[12px]">
            <button className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#99a0ae] hover:text-[#525866] hover:bg-white transition-colors shrink-0">
              <AttachIcon />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Genius about anything..."
              className="flex-1 bg-transparent text-[14px] text-[#2b303b] placeholder-[#99a0ae] outline-none min-w-0"
            />
            <button
              className="flex items-center justify-center w-7 h-7 rounded-[8px] shrink-0 transition-all hover:opacity-85 active:scale-95"
              style={{ background: inputValue.trim() ? 'linear-gradient(140deg, #9747ff 41%, #1b85ff 116%)' : '#cacfd8' }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
