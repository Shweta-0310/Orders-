import { Tag } from './Tag.jsx';
import {
  CalendarIcon, FilterIcon, StatusIcon, TypeIcon, ChevronDownIcon,
} from './icons.jsx';

function DropdownButton({ icon: Icon, label, value }) {
  return (
    <button className="flex items-center gap-1.5 h-8 px-3.5 bg-white border border-[#e1e4ea] rounded-[10px] shadow-xs text-[12px] font-medium text-[#525866] hover:bg-[#f2f4f8] transition-colors whitespace-nowrap">
      {Icon && <Icon className="w-3 h-3 text-[#525866] shrink-0" />}
      <span>{value || label}</span>
      <ChevronDownIcon className="w-3 h-3 text-[#525866] shrink-0" />
    </button>
  );
}

function Divider() {
  return <div className="w-px h-[30px] bg-[#e1e4ea] shrink-0" />;
}

export function Filters() {
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

        {/* Right: Date range with Order ID picker */}
        <div className="flex items-center gap-2">
          <DropdownButton icon={null} label="Order ID" value="Order ID" />
          <div className="flex items-center gap-2 h-8 px-3 bg-white border border-[#e1e4ea] rounded-[10px] shadow-xs">
            <CalendarIcon className="w-3 h-3 text-[#525866] shrink-0" />
            <span className="text-[12px] font-medium text-[#525866]">Quick Search</span>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 py-2 mb-8 bg-white sticky top-0 z-10 flex-wrap">
        {/* Date picker */}
        <DropdownButton icon={CalendarIcon} label="Today" value="Today" />
        <DropdownButton icon={CalendarIcon} label="12 June 2025" value="12 June 2025" />

        <Divider />

        <DropdownButton icon={StatusIcon} label="Status" />
        <DropdownButton icon={TypeIcon} label="Type" />

        <Divider />

        <DropdownButton icon={FilterIcon} label="Advance Filters" />
      </div>
    </div>
  );
}
