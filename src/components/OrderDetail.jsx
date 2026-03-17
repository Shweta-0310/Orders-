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
      <p className={`text-[14px] font-semibold leading-5 whitespace-nowrap ${link ? 'text-blue-600 hover:underline cursor-pointer' : valueClass}`}>{value}</p>
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


// ── Tab section icons ─────────────────────────────────────────────────────────

function IconTransaction() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#525866]" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 1.5H9.5M2.5 4H9.5M2.5 1.5V10.5L6 8.5L9.5 10.5V1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRefunds() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#525866]" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 6A4.5 4.5 0 0 1 10.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10.5 6A4.5 4.5 0 0 1 1.5 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8.5 2.5L10.5 4L8.5 5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9.5L1.5 8L3.5 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCustomer() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#525866]" viewBox="0 0 12 12" fill="none">
      <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 10C1.5 8.067 3.067 6.5 5 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7.5 8L9 9.5L11 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUDF() {
  return (
    <svg className="w-3 h-3 shrink-0 text-[#525866]" viewBox="0 0 12 12" fill="none">
      <path d="M1 6C2 4 3 2 4 6C5 10 6 2 7 6C8 10 9 4 11 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg className="w-3 h-3 text-blue-500" viewBox="0 0 12 12" fill="none">
      <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Transaction row ───────────────────────────────────────────────────────────

function TransactionRow({ id, status, date, attempts, gateway }) {
  return (
    <div className="flex items-start justify-between px-6 py-4 border-b border-[#eceff3] hover:bg-[#fcfcfd] transition-colors cursor-pointer group last:border-0">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-semibold text-[#222530] leading-6 truncate">{id}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-medium bg-red-50 text-red-600 whitespace-nowrap">{status}</span>
        </div>
        <span className="text-[13px] text-[#525866]">{date} | {attempts}</span>
      </div>
      <div className="flex items-center gap-2.5 shrink-0 ml-4 mt-0.5">
        {/* PG | Razorpay split tag */}
        <div className="flex items-center h-[22px]">
          <span className="flex items-center px-2 h-full text-[11px] font-semibold text-[#717784] bg-[#f2f4f8] border border-[#e1e4ea] rounded-l-[6px] border-r-0 whitespace-nowrap">PG</span>
          <div className="flex items-center gap-1 px-2 h-full text-[11px] font-medium text-[#525866] bg-white border border-[#e1e4ea] rounded-r-[6px] whitespace-nowrap">
            <IconPencil />
            <span>{gateway}</span>
          </div>
        </div>
        <ChevronRightSmall />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

const TABS = ['Order', 'Offers', 'Webhooks', 'Chargeback'];

const TAB_MENU = [
  { label: 'Transaction', Icon: IconTransaction },
  { label: 'Refunds', Icon: IconRefunds },
  { label: 'Customer Details', Icon: IconCustomer },
  { label: 'UDF Parameter', Icon: IconUDF },
];

const TRANSACTIONS = [
  { id: 'geddit-YY10ABBMB60434-1', status: 'Authentication Failed', date: 'Dec 12, 2025 | 11:23:22 PM', attempts: '5 Attempts', gateway: 'Razorpay' },
  { id: 'geddit-YY10ABBMB60434-1', status: 'Authentication Failed', date: 'Dec 12, 2025 | 11:23:22 PM', attempts: '5 Attempts', gateway: 'Razorpay' },
  { id: 'geddit-YY10ABBMB60434-1', status: 'Authentication Failed', date: 'Dec 12, 2025 | 11:23:22 PM', attempts: '5 Attempts', gateway: 'Razorpay' },
  { id: 'geddit-YY10ABBMB60434-1', status: 'Authentication Failed', date: 'Dec 12, 2025 | 11:23:22 PM', attempts: '5 Attempts', gateway: 'Razorpay' },
];

const OFFERS = [
  { id: 'Offer Id:5677575757', status: 'Success', txnId: '4657882848', benefit: 'Cashback' },
  { id: 'P1ZFwFteF15AP4fgpVz7', status: 'Failed', txnId: '4657882848', benefit: 'Cashback' },
  { id: 'P1ZFwFteF15AP4fgpVz7', status: 'Success', txnId: '4657882848', benefit: 'Cashback' },
];

// ── Webhook & Chargeback data + components ───────────────────────────────────

const WEBHOOKS = [
  { title: 'Order Succeded', status: 'Notified', datetime: 'Jan 12, 2025 12:44:32', id: 'dhh4HHdjkkkjcc', from: 'Merchant', to: 'Juspay' },
  { title: 'Txn Created',    status: 'Silent',   datetime: 'Jan 12, 2025 12:44:32', id: 'dhh4HHdjkkkjcc', from: 'Juspay',   to: 'Merchant' },
  { title: 'Order Failed',   status: 'Silent',   datetime: 'Jan 12, 2025 12:44:32', id: 'dhh4HHdjkkkjcc', from: 'Merchant', to: 'Juspay' },
];

const CHARGEBACKS = [
  { id: 'Chargeback ID',       status: 'Received', amount: '₹799', datetime: 'Jan 12, 2025 12:44:32' },
  { id: 'P1ZFwFteF15AP4fgpVz7', status: 'Failed',   amount: '₹799', datetime: 'Jan 12, 2025 12:44:32' },
];

function PartyPill({ name }) {
  const isMerchant = name === 'Merchant';
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[12px] font-medium ${
      isMerchant ? 'border-[#e1e4ea] text-[#2b303b]' : 'border-[#e1e4ea] text-[#2b303b]'
    }`}>
      {isMerchant ? (
        <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-red-600">M</span>
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-blue-600">J</span>
        </div>
      )}
      {name}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" viewBox="0 0 14 14" fill="none">
      <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebhookRow({ title, status, datetime, id, from, to }) {
  const isNotified = status === 'Notified';
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#eceff3] hover:bg-[#fcfcfd] transition-colors cursor-pointer last:border-0">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#222530]">{title}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-medium whitespace-nowrap ${
            isNotified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
          }`}>{status}</span>
        </div>
        <span className="text-[13px] text-[#525866]">{datetime} | ID: {id}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <PartyPill name={from} />
        <ArrowRight />
        <PartyPill name={to} />
      </div>
    </div>
  );
}

function ChargebackRow({ id, status, amount, datetime }) {
  const isReceived = status === 'Received';
  return (
    <div className="flex items-start justify-between px-6 py-5 border-b border-[#eceff3] hover:bg-[#fcfcfd] transition-colors cursor-pointer last:border-0">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#222530]">{id}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-medium whitespace-nowrap ${
            isReceived ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
          }`}>{status}</span>
        </div>
        <span className="text-[13px] text-[#525866]">{amount} | {datetime}</span>
      </div>
    </div>
  );
}

function OfferRow({ id, status, txnId, benefit }) {
  const isSuccess = status === 'Success';
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceff3] hover:bg-[#fcfcfd] transition-colors cursor-pointer last:border-0">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-[#222530]">{id}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-medium whitespace-nowrap ${
            isSuccess ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>{status}</span>
        </div>
        <span className="text-[13px] text-[#525866]">TXN ID: {txnId}</span>
      </div>
      <div className="flex items-center gap-2.5 shrink-0 ml-4">
        {/* Benefit | Cashback split tag */}
        <div className="flex items-center h-[22px]">
          <span className="flex items-center px-2 h-full text-[11px] font-semibold text-[#717784] bg-[#f2f4f8] border border-[#e1e4ea] rounded-l-[6px] border-r-0 whitespace-nowrap">Benefit</span>
          <span className="flex items-center px-2 h-full text-[11px] font-semibold text-white bg-[#2b303b] border border-[#2b303b] rounded-r-[6px] whitespace-nowrap">{benefit}</span>
        </div>
        <ChevronRightSmall />
      </div>
    </div>
  );
}

export function OrderDetail({ order, onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const [geniusOpen, setGeniusOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
      <GeniusSidebar open={geniusOpen} onClose={() => setGeniusOpen(false)} order={order} />
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 lg:px-8 h-[68px] border-b border-[#e1e4ea] bg-white shrink-0 gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-[350px] h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white">
          <SearchIcon className="w-4 h-4 text-[#99a0ae] shrink-0" />
          <span className="text-sm text-[#99a0ae] flex-1">Search</span>
          <span className="text-xs text-[#99a0ae] shrink-0 hidden md:block">⌘ + K</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <BellIcon className="w-4 h-4 text-[#525866]" />
          </button>
          <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <ActivityIcon className="w-4 h-4" />
          </button>
          <button onClick={() => setGeniusOpen(true)} className="flex items-center gap-2 h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
            <SparklesIcon className="w-3 h-3 text-[#525866]" />
            <span className="text-sm font-medium text-[#2b303b]">Genius</span>
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 lg:px-10 lg:py-5 flex flex-col gap-6">

          {/* Breadcrumb + title */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-[12px] text-[#99a0ae]">
              <button onClick={onBack} className="hover:text-[#525866] transition-colors">Order Management</button>
              <ChevronRightSmall />
              <span className="text-[#525866] font-medium">Order Detail</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-[24px] font-semibold text-[#222530] leading-8">Order Detail</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white text-[12px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors">
                  <span>Order ID</span>
                  <ChevronDownIcon className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-2 h-8 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white text-[12px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors">
                  <SearchIcon className="w-3 h-3 text-[#99a0ae]" />
                  <span>ID-55668484</span>
                </button>
                <button className="flex items-center justify-center w-8 h-8 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8]">
                  <DotsIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col min-[1010px]:flex-row gap-6 items-start">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6 flex-1 min-w-0 min-[1010px]:min-w-[500px]">

              {/* Hero card */}
              <div className="border border-[#e1e4ea] rounded-xl bg-white overflow-hidden">
                <div className="flex flex-col lg:flex-row items-stretch lg:h-[256px] p-1.5 gap-0">
                  {/* Gray panel */}
                  <div className="min-w-[400px] lg:w-[42%] bg-[#f2f4f8] rounded-[10px] flex flex-col justify-between overflow-hidden">
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
                    <div className="min-w-max flex items-center justify-between px-4 py-3 border-t border-[#e1e4ea]">
                      <p className="text-[14px] font-medium text-[#525866]">Want to know more about this order?</p>
                      <button
                        className="flex items-center gap-2 px-2 py-1 rounded-[8px] hover:bg-[#e8eaed] transition-colors"
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
                    <div className="flex items-center justify-between flex-wrap gap-2">
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
              <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border border-[#e1e4ea] border-l-4 border-l-[#00c951] rounded-xl bg-[#fcfcfd] shadow-xs">
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-medium text-[#222530]">Retries Attempts made</p>
                  <p className="text-[14px] text-[#717784]">The following Juspay features were employed to ensure that this order was successfully completed</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-3 py-1 border border-[#e1e4ea] rounded-[8px] text-[14px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors">Silent Retry</button>
                  <button className="px-3 py-1 border border-[#e1e4ea] rounded-[8px] text-[14px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors">SR V2 Routing</button>
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
                          ? 'text-[#2b303b] border-[#2b303b]'
                          : 'text-[#717784] border-transparent hover:text-[#525866]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                {activeTab === 1 ? (
                  /* Offers — full-width rows */
                  <div className="min-w-0">
                    {OFFERS.map((offer, i) => (
                      <OfferRow key={i} {...offer} />
                    ))}
                  </div>
                ) : activeTab === 2 ? (
                  /* Webhooks — full-width rows */
                  <div className="min-w-0">
                    {WEBHOOKS.map((wh, i) => (
                      <WebhookRow key={i} {...wh} />
                    ))}
                  </div>
                ) : activeTab === 3 ? (
                  /* Chargeback — rows + initiate link */
                  <div className="min-w-0">
                    {CHARGEBACKS.map((cb, i) => (
                      <ChargebackRow key={i} {...cb} />
                    ))}
                    <div className="px-6 py-4">
                      <button className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Initiate Chargeback <ChevronRightSmall />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    {/* Left menu */}
                    <div className="w-[235px] shrink-0 border-r border-[#eceff3] p-2 flex flex-col gap-1">
                      {TAB_MENU.map(({ label, Icon }, i) => (
                        <button
                          key={label}
                          onClick={() => setActiveMenu(i)}
                          className={`w-full text-left flex items-center gap-2 px-3 py-[7px] text-[14px] rounded-[6px] transition-colors ${
                            activeMenu === i
                              ? 'bg-[#f5f7fa] font-medium text-[#2b303b]'
                              : 'text-[#525866] hover:bg-[#fcfcfd]'
                          }`}
                        >
                          <Icon />
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Right — transaction rows */}
                    <div className="flex-1 min-w-0">
                      {TRANSACTIONS.map((tx, i) => (
                        <TransactionRow key={i} {...tx} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN — Timeline: visible above 1010px, min 350px, shrinks naturally */}
            <div className="hidden min-[1010px]:flex min-[1010px]:flex-col gap-3 min-w-[350px] w-[350px] min-[1440px]:w-[466px]">
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
