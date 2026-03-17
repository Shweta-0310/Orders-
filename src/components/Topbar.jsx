import { SearchIcon, BellIcon, ActivityIcon, SparklesIcon, ChevronDownIcon } from './icons.jsx';

export function Topbar() {
  return (
    <div className="flex items-center justify-between px-8 h-[68px] border-b border-[#e1e4ea] bg-white shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 w-[350px] h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white">
        <SearchIcon className="w-4 h-4 text-[#99a0ae] shrink-0" />
        <span className="text-sm text-[#99a0ae] flex-1">Search</span>
        <span className="text-xs text-[#99a0ae] shrink-0">⌘ + K</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Bell button */}
        <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8] transition-colors">
          <BellIcon className="w-4 h-4 text-[#525866]" />
        </button>

        {/* Activity button */}
        <button className="flex items-center justify-center w-9 h-9 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8] transition-colors">
          <ActivityIcon className="w-4 h-4" />
        </button>

        {/* Genius button */}
        <button className="flex items-center gap-2 h-9 px-3 border border-[#e1e4ea] rounded-[10px] shadow-xs bg-white hover:bg-[#f2f4f8] transition-colors">
          <SparklesIcon className="w-3 h-3 text-[#525866]" />
          <span className="text-sm font-medium text-[#2b303b]">Genius</span>
        </button>
      </div>
    </div>
  );
}
