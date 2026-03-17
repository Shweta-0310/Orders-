import {
  LayoutIcon, HomeIcon, GlobeIcon, BellIcon, DatabaseIcon,
  UserIcon, TrendUpIcon, HeadphonesIcon, CardholderIcon,
  SlidersIcon, KeyIcon, SettingsIcon,
} from './icons.jsx';
import { BellIcon as BellIcon2 } from './icons.jsx';

const navItems = [
  { icon: HomeIcon, active: true },
  { icon: GlobeIcon },
  { icon: BellIcon2 },
];

const navItems2 = [
  { icon: DatabaseIcon },
  { icon: UserIcon },
  { icon: TrendUpIcon },
  { icon: HeadphonesIcon },
  { icon: CardholderIcon },
  { icon: SlidersIcon },
  { icon: KeyIcon },
  { icon: BellIcon2 },
  { icon: GlobeIcon },
];

const navItems3 = [
  { icon: KeyIcon },
  { icon: LayoutIcon },
  { icon: HomeIcon },
  { icon: GlobeIcon },
];

function SidebarItem({ icon: Icon, active }) {
  return (
    <button
      className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${
        active ? 'bg-[#eceff3]' : 'hover:bg-[#f2f4f8]'
      }`}
    >
      <Icon className="w-3.5 h-3.5 text-[#525866]" />
    </button>
  );
}

function Divider() {
  return <div className="w-full h-px bg-[#e1e4ea] mx-auto" style={{ width: 'calc(100% - 8px)' }} />;
}

export function Sidebar() {
  return (
    <div className="flex flex-col h-full w-14 bg-[#fcfcfd] border-r border-[#eceff3] shrink-0">
      {/* Header */}
      <div className="flex items-center justify-center h-14 shrink-0">
        <button className="flex items-center justify-center w-8 h-8 rounded-[4px] hover:bg-[#f2f4f8]">
          <LayoutIcon className="w-3.5 h-3.5 text-[#525866]" />
        </button>
      </div>

      {/* Nav group 1 */}
      <div className="flex flex-col items-center gap-2 px-3 py-3">
        {navItems.map((item, i) => (
          <SidebarItem key={i} icon={item.icon} active={item.active} />
        ))}
      </div>

      <Divider />

      {/* Nav group 2 */}
      <div className="flex flex-col items-center gap-2 px-3 py-3">
        {navItems2.map((item, i) => (
          <SidebarItem key={i} icon={item.icon} />
        ))}
      </div>

      <Divider />

      {/* Nav group 3 */}
      <div className="flex flex-col items-center gap-2 px-3 py-3">
        {navItems3.map((item, i) => (
          <SidebarItem key={i} icon={item.icon} />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="border-t border-[#e1e4ea]">
        <div className="flex flex-col items-center gap-2 px-3 py-3">
          <SidebarItem icon={SettingsIcon} />
          <SidebarItem icon={KeyIcon} />
        </div>
        <div className="border-t border-[#e1e4ea] flex items-center justify-center py-3">
          <button className="flex items-center justify-center w-6 h-6 rounded-[4px] overflow-hidden">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-purple-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
