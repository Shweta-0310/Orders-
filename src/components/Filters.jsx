import { useState } from 'react';
import { Tag } from './Tag.jsx';
import { AdvancedFiltersPopover } from './AdvancedFiltersPopover.jsx';
import { FilterDropdownMenu } from './FilterDropdownMenu.jsx';
import { DatePickerCalendar } from './DatePickerCalendar.jsx';
import {
  CalendarIcon, FilterIcon, StatusIcon, TypeIcon, ChevronDownIcon,
} from './icons.jsx';

const STATUS_OPTIONS = ['New', 'Success', 'Failed', 'Auth Failed', 'Partial Charged', 'Auto Refund', 'Authorization Failed'];
const TYPE_OPTIONS = ['Order Payment', 'Mandate Payment', 'Mandate Register', 'TPV Payment', 'VAN Payment', 'TPV Mandate'];

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateBtn(date) {
  if (!date) return null;
  return `${String(date.getDate()).padStart(2, '0')} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

function Divider() {
  return <div className="w-px h-[30px] bg-[#e1e4ea] shrink-0" />;
}

function XIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function chipLabel(categoryName, values) {
  if (values.length === 0) return categoryName;
  if (values.length <= 2) return values.join(', ');
  return `+${values.length}`;
}

export function Filters() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Date picker state
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleApplyDates(start, end) {
    setStartDate(start);
    setEndDate(end);
  }

  function handleApplyFilters(filters) {
    const next = {};
    Object.entries(filters).forEach(([label, opts]) => {
      if (opts.length > 0) next[label] = opts;
    });
    setAppliedFilters(next);
  }

  function removeFilter(categoryLabel) {
    setAppliedFilters((prev) => {
      const next = { ...prev };
      delete next[categoryLabel];
      return next;
    });
  }

  const appliedEntries = Object.entries(appliedFilters);

  // Button label: "Today", a single date, or "12 Jun – 15 Jun"
  function dateButtonLabel() {
    if (!startDate) return 'Today';
    const s = formatDateBtn(startDate);
    if (!endDate) return s;
    return `${s} – ${formatDateBtn(endDate)}`;
  }

  return (
    <div className="px-10 bg-white">
      {/* Title row */}
      <div className="flex items-center justify-between h-[68px]">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[24px] font-semibold text-[#222530] leading-8 whitespace-nowrap">
            Order Management
          </h1>
          <Tag text="Updated 12 mins ago" color="neutral" size="xs" />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-8 px-3.5 bg-white border border-[#e1e4ea] rounded-[10px] shadow-xs text-[12px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors whitespace-nowrap">
            <span>Order ID</span>
            <ChevronDownIcon className="w-3 h-3 text-[#525866] shrink-0" />
          </button>
          <div className="flex items-center gap-2 h-8 px-3 bg-white border border-[#e1e4ea] rounded-[10px] shadow-xs">
            <CalendarIcon className="w-3 h-3 text-[#525866] shrink-0" />
            <span className="text-[12px] font-medium text-[#525866]">Quick Search</span>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 py-2 mb-8 bg-white sticky top-0 z-10 flex-wrap">

        {/* Date range picker button */}
        <div className="relative">
          <button
            onClick={() => setDatePickerOpen((v) => !v)}
            className={`flex items-center gap-1.5 h-8 px-3.5 border rounded-[10px] shadow-xs text-[12px] font-medium transition-colors whitespace-nowrap ${
              datePickerOpen || startDate
                ? 'bg-[#f2f4f8] border-[#cacfd8] text-[#2b303b]'
                : 'bg-white border-[#e1e4ea] text-[#525866] hover:bg-[#f2f4f8]'
            }`}
          >
            <CalendarIcon className="w-3 h-3 shrink-0" />
            <span>{dateButtonLabel()}</span>
            <ChevronDownIcon className={`w-3 h-3 shrink-0 transition-transform ${datePickerOpen ? 'rotate-180' : ''}`} />
          </button>

          {datePickerOpen && (
            <DatePickerCalendar
              onClose={() => setDatePickerOpen(false)}
              onApply={handleApplyDates}
              initialStart={startDate}
              initialEnd={endDate}
            />
          )}
        </div>

        <Divider />

        <FilterDropdownMenu icon={StatusIcon} label="Status" options={STATUS_OPTIONS} selected={selectedStatus} onChange={setSelectedStatus} />
        <FilterDropdownMenu icon={TypeIcon} label="Type" options={TYPE_OPTIONS} selected={selectedType} onChange={setSelectedType} />

        <Divider />

        {/* Advance Filters button */}
        <div className="relative">
          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className={`flex items-center gap-1.5 h-8 px-3.5 border rounded-[10px] shadow-xs text-[12px] font-medium transition-colors whitespace-nowrap ${
              advancedOpen
                ? 'bg-[#f2f4f8] border-[#cacfd8] text-[#2b303b]'
                : 'bg-white border-[#e1e4ea] text-[#525866] hover:bg-[#f2f4f8]'
            }`}
          >
            <FilterIcon className="w-3 h-3 shrink-0" />
            <span>Filters</span>
            {appliedEntries.length > 0 && (
              <span className="text-[11px] font-semibold text-white bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {appliedEntries.length}
              </span>
            )}
            <ChevronDownIcon className={`w-3 h-3 shrink-0 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
          </button>

          {advancedOpen && (
            <AdvancedFiltersPopover
              onClose={() => setAdvancedOpen(false)}
              onApply={handleApplyFilters}
              initialFilters={appliedFilters}
            />
          )}
        </div>

        {/* Applied filter chips */}
        {appliedEntries.map(([label, values]) => (
          <div
            key={label}
            className="flex items-center gap-1.5 h-8 px-3 bg-white border border-[#e1e4ea] rounded-[10px] shadow-xs text-[12px] font-medium text-[#525866] whitespace-nowrap"
          >
            <FilterIcon className="w-3 h-3 text-[#525866] shrink-0" />
            <span className="text-[#525866]">{label}</span>
            <span className="text-[#2b303b] font-semibold">{chipLabel(label, values)}</span>
            <ChevronDownIcon className="w-3 h-3 text-[#525866] shrink-0" />
            <button
              onClick={() => removeFilter(label)}
              className="flex items-center justify-center w-4 h-4 rounded-[4px] text-[#99a0ae] hover:text-[#525866] hover:bg-[#f2f4f8] transition-colors ml-0.5"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
