import { useState } from 'react';
import { Tag } from './Tag.jsx';
import { GeniusSidebar } from './GeniusSidebar.jsx';
import {
  ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, PlusIcon,
  SearchIcon, BellIcon, ActivityIcon, SparklesIcon,
} from './icons.jsx';

// ── Icons used only in this file ────────────────────────────────────────────

function ChevronRightSmall() {
  return (
    <svg className="w-3 h-3 text-[#99a0ae]" viewBox="0 0 12 12" fill="none">
      <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#525866]" viewBox="0 0 14 14" fill="none">
      <path d="M1.5 7A5.5 5.5 0 0 1 12.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M12.5 7A5.5 5.5 0 0 1 1.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M10.5 3L12.5 5L10.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 11L1.5 9L3.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg className="w-4 h-4 text-[#525866]" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckCircleFilled({ green = true }) {
  return green ? (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#00c951" />
      <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#cacfd8" strokeWidth="1" />
      <circle cx="7" cy="7" r="3" fill="#cacfd8" />
    </svg>
  );
}

function AppWindowIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#525866]" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 5H12.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="4" cy="3.5" r="0.75" fill="currentColor" />
      <circle cx="6.5" cy="3.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#525866]" viewBox="0 0 14 14" fill="none">
      <path d="M3.5 2H10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3.5 5H10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3.5 2V12L7 9.5L10.5 12V2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Small reusable building blocks ──────────────────────────────────────────

function KeyValue({ label, value, valueClass = 'text-[#2b303b]', link = false }) {
  return (
    <div className="flex flex-col gap-1">
      <p className={`text-[14px] font-semibold leading-5 whitespace-nowrap ${link ? 'text-blue-600' : valueClass}`}>{value}</p>
      <p className="text-[14px] font-normal text-[#717784] leading-5 whitespace-nowrap">{label}</p>
    </div>
  );
}

function CardHeader({ icon: Icon, title, rightSlot }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#fcfcfd] border-b border-[#e1e4ea]">
      <div className="flex items-center gap-2">
        <div className="flex items-center pt-0.5">
          <Icon />
        </div>
        <span className="text-[16px] font-semibold text-[#222530] leading-6">{title}</span>
      </div>
      {rightSlot}
    </div>
  );
}

// ── Timeline ────────────────────────────────────────────────────────────────

function TimelineStep({ title, time, events, completed, last = false }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
        <CheckCircleFilled green={completed} />
        {!last && (
          <div className={`w-px flex-1 min-h-[60px] ${completed ? 'bg-[#00c951]' : 'bg-[#cacfd8]'}`} />
        )}
      </div>
      <div className="flex-1 pb-8 min-w-0">
        <div className="flex items-center justify-between mb-3 whitespace-nowrap">
          <p className="text-[14px] font-medium text-[#2b303b] leading-5">{title}</p>
          <p className="text-[12px] text-[#99a0ae] leading-[18px]">{time}</p>
        </div>
        <div className="flex flex-col gap-4">
          {events.map((ev, i) => (
            <div key={i} className="flex flex-col gap-0.5 pr-2">
              <p className="text-[14px] font-medium text-[#717784] leading-5 truncate">
                {ev.label} <span className="text-[12px] text-[#99a0ae]">| {ev.time}</span>
              </p>
              <p className="text-[12px] text-[#99a0ae] leading-[18px]">{ev.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Accordion row ────────────────────────────────────────────────────────────

function AccordionRow({ title, value }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#eceff3] last:border-0">
      <button
        className="flex w-full items-center justify-between px-4 py-5 hover:bg-[#fcfcfd] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[14px] font-medium text-[#2b303b]">{title}</span>
        <ChevronDownIcon className={`w-3.5 h-3.5 text-[#525866] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-[14px] text-[#717784]">{value}</div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

const TABS = ['Payment', 'Refund', 'Dispute', 'Additional Info'];
const TAB_MENU = ['Payment Details', 'EMI Info', 'Auth', 'Surcharge'];

export function OrderDetail({ order, onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const [geniusOpen, setGeniusOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
      <GeniusSidebar open={geniusOpen} onClose={() => setGeniusOpen(false)} order={order} />
      {/* Topbar */}
      <div className="flex items-center justify-between px-8 h-[68px] border-b border-[#e1e4ea] bg-white shrink-0">
        <div className="flex items-center gap-2 w-[350px] h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white">
          <SearchIcon className="w-4 h-4 text-[#99a0ae] shrink-0" />
          <span className="text-sm text-[#99a0ae] flex-1">Search</span>
          <span className="text-xs text-[#99a0ae] shrink-0">⌘ + K</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <BellIcon className="w-4 h-4 text-[#525866]" />
          </button>
          <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <ActivityIcon className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <SparklesIcon className="w-3 h-3 text-[#525866]" />
            <span className="text-sm font-medium text-[#2b303b]">Genius</span>
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-10 py-5 flex flex-col gap-6">

          {/* Breadcrumb + title */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-[12px] text-[#99a0ae]">
              <button onClick={onBack} className="hover:text-[#525866] transition-colors">Order Management</button>
              <ChevronRightSmall />
              <span className="text-[#525866] font-medium">Order Detail</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-[24px] font-semibold text-[#222530] leading-8">Order Detail</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white text-[12px] font-medium text-[#525866]">
                  <span>Order ID</span>
                  <ChevronDownIcon className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 h-8 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white text-[12px] font-medium text-[#525866]">
                  <SearchIcon className="w-3 h-3 text-[#99a0ae]" />
                  <span>ID-55668484</span>
                </div>
                <button className="flex items-center justify-center w-8 h-8 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
                  <DotsIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-6 items-start">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6 flex-1 min-w-0">

              {/* Hero card */}
              <div className="border border-[#e1e4ea] rounded-xl bg-white overflow-hidden">
                <div className="flex items-stretch h-[256px] p-1.5 gap-0">
                  {/* Gray panel */}
                  <div className="w-[42%] bg-[#f2f4f8] rounded-[10px] flex flex-col justify-between overflow-hidden">
                    <div className="flex flex-col gap-2.5 px-6 pt-6">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M3 6L5 8L9 4" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[20px] font-semibold text-[#222530] leading-[26px] whitespace-nowrap">We've Got Your Back</p>
                      </div>
                      <p className="text-[14px] text-[#2b303b] leading-5">
                        This order is successful. We used Juspay's Silent Retry &amp; SR V2 Routing feature to make this successful.
                      </p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-[#e1e4ea]">
                      <p className="text-[14px] font-medium text-[#525866]">Want to know more about this order?</p>
                      <button
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setGeniusOpen(true)}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_5px_2px_#e9e7ff]"
                          style={{ background: 'linear-gradient(140deg, #9747ff 41%, #1b85ff 116%)' }}>
                          <SparklesIcon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-[14px] font-semibold text-[#525866]">Ask Genius</span>
                      </button>
                    </div>
                  </div>

                  {/* Right info */}
                  <div className="flex-1 flex flex-col justify-center gap-6 px-4 py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[20px] font-semibold text-[#2b303b] leading-[26px]">ID -55668484</span>
                        <Tag text="Success" color="success" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 border border-[#e1e4ea] rounded-[8px] text-[12px] text-[#525866]">
                        <RefreshIcon />
                        <span>Last Updated 12 mins ago</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[14px]">
                        <span className="text-[#717784]">Order Amount</span>
                        <span className="font-semibold text-[#2b303b]">₹144.00</span>
                      </div>
                      <div className="flex items-center justify-between text-[14px]">
                        <span className="text-[#717784]">Payment Received</span>
                        <span className="font-semibold text-[#2b303b]">₹131.00</span>
                      </div>
                      <div className="flex items-center justify-between text-[14px]">
                        <span className="text-[#717784]">Created On:</span>
                        <span className="font-semibold text-[#2b303b]">Feb 23, 2025 | 12:23:22 PM</span>
                      </div>
                    </div>
                    <div className="border-t border-[#eceff3] pt-3 flex justify-end">
                      <button className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700">
                        View Full Breakup <ChevronRightSmall />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="flex items-center justify-between px-3 py-2.5 bg-[#fcfcfd] border-t border-[#eceff3] text-[14px]">
                  <span className="font-medium text-[#525866]">This order is successfully fulfilled</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[#222530]">FUL-4783478-8830</span>
                    <span className="text-[#717784]">Feb 23, 2025 | 12:23:22 PM</span>
                  </div>
                </div>
              </div>

              {/* Retries banner */}
              <div className="flex items-center justify-between px-4 py-3 border border-[#e1e4ea] border-l-4 border-l-[#00c951] rounded-xl bg-[#fcfcfd] shadow-xs">
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-medium text-[#222530]">Retries Attempts made</p>
                  <p className="text-[14px] text-[#717784]">The following Juspay features were employed to ensure that this order was successfully completed</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 border border-[#e1e4ea] rounded-[8px] text-[14px] font-medium text-[#525866]">Silent Retry</span>
                  <span className="px-3 py-1 border border-[#e1e4ea] rounded-[8px] text-[14px] font-medium text-[#525866]">SR V2 Routing</span>
                </div>
              </div>

              {/* Two info cards */}
              <div className="flex gap-6">
                {/* Overview card */}
                <div className="flex-1 border border-[#e1e4ea] rounded-xl bg-white shadow-xs overflow-hidden">
                  <CardHeader
                    icon={AppWindowIcon}
                    title="Overview (1/3)"
                    rightSlot={
                      <div className="flex items-center gap-1 pt-1.5">
                        <button className="flex items-center justify-center w-3.5 h-3.5 hover:text-[#2b303b]">
                          <ArrowLeftIcon className="w-3 h-3 text-[#99a0ae]" />
                        </button>
                        <button className="flex items-center justify-center w-3.5 h-3.5 hover:text-[#2b303b]">
                          <ArrowRightIcon className="w-3 h-3 text-[#99a0ae]" />
                        </button>
                      </div>
                    }
                  />
                  <div className="p-4 flex flex-col gap-8">
                    <div className="flex gap-8 flex-wrap">
                      <KeyValue label="Customer ID" value="f36dgQW453" link />
                      <KeyValue label="Gateway Ref. ID" value="1asd64AS54lhss5uhg3" />
                    </div>
                    <div className="flex gap-8 flex-wrap">
                      <KeyValue label="Gateway" value="PhonePe" />
                      <KeyValue label="Merchant" value="bms" />
                    </div>
                  </div>
                </div>

                {/* Refund card */}
                <div className="flex-1 border border-[#e1e4ea] rounded-xl bg-white shadow-xs overflow-hidden">
                  <CardHeader
                    icon={CurrencyIcon}
                    title="Refund Summary"
                    rightSlot={
                      <button className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700">
                        <PlusIcon className="w-3.5 h-3.5" /> New Refund
                      </button>
                    }
                  />
                  <div className="p-4 flex flex-col justify-between h-[calc(100%-48px)]">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold text-[#2b303b]">₹7999</span>
                          <Tag text="Success" color="success" size="xs" />
                        </div>
                        <p className="text-[14px] text-[#717784]">initiated on Mar 14, 2025</p>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-[14px] font-semibold text-[#2b303b]">ARN</span>
                        <p className="text-[14px] text-[#717784]">241gsdgk45426sssA35ad</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4">
                      View Details <ChevronRightSmall />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs section */}
              <div className="border border-[#e1e4ea] rounded-xl bg-white shadow-xs overflow-hidden">
                {/* Tab bar */}
                <div className="flex border-b border-[#e1e4ea]">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`px-5 py-3 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                        activeTab === i
                          ? 'text-blue-600 border-blue-600'
                          : 'text-[#717784] border-transparent hover:text-[#525866]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex">
                  {/* Left menu */}
                  <div className="w-[235px] border-r border-[#eceff3] p-2 flex flex-col gap-1">
                    {TAB_MENU.map((item, i) => (
                      <button
                        key={item}
                        onClick={() => setActiveMenu(i)}
                        className={`w-full text-left px-3 py-2 text-[14px] rounded-[6px] transition-colors ${
                          activeMenu === i
                            ? 'bg-[#f2f4f8] font-medium text-[#2b303b]'
                            : 'text-[#525866] hover:bg-[#fcfcfd]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Right accordion */}
                  <div className="flex-1">
                    <AccordionRow title="Transaction ID" value="TXN-8473628-9274B" />
                    <AccordionRow title="Payment Method" value="UPI / PhonePe" />
                    <AccordionRow title="Gateway Response Code" value="00 — Success" />
                    <AccordionRow title="Bank Reference Number" value="423876234876" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Timeline */}
            <div className="w-[466px] shrink-0 flex flex-col gap-3">
              <h2 className="text-[18px] font-semibold text-[#2b303b] leading-6">Order Timeline</h2>
              <div className="bg-white pt-2 pb-4 flex flex-col gap-2">
                <TimelineStep
                  title="Order Created"
                  time="12:23:21 PM"
                  completed
                  events={[
                    { label: 'Transaction Created', time: '12:23:21 PM', desc: 'Geddit initiated txn' },
                    { label: 'Gateway Selected', time: '12:23:21 PM', desc: 'Pinelabs chosen as the preferred gateway based on Gateway Score :89' },
                  ]}
                />
                <TimelineStep
                  title="Payment Initiated"
                  time="12:23:21 PM"
                  completed
                  events={[
                    { label: 'Pay/Start Triggered', time: '12:23:21 PM', desc: 'Sub information about this step' },
                  ]}
                />
                <TimelineStep
                  title="Order Status Check"
                  time="12:23:21 PM"
                  completed={false}
                  events={[
                    { label: 'Status Check With PG', time: '12:23:21 PM', desc: 'PG approved the transaction' },
                    { label: 'PG Webhook Received', time: '12:23:21 PM', desc: 'Information about this, maybe the webhook ID or event name can be added here' },
                  ]}
                />
                <TimelineStep
                  title="Merchant Informed"
                  time="12:23:21 PM"
                  completed={false}
                  last
                  events={[
                    { label: 'Webhook Informed', time: '12:23:21 PM', desc: 'Failure reason can be mentioned here' },
                  ]}
                />
                <div className="flex justify-end mt-2">
                  <button className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700">
                    Go To Detailed View <ChevronRightSmall />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
