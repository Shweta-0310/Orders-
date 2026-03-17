const colorMap = {
  primary: 'bg-blue-50 text-blue-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  error: 'bg-red-50 text-red-700',
  purple: 'bg-purple-50 text-purple-700',
  neutral: 'bg-[#f2f4f8] text-[#525866]',
};

export function Tag({ text, color = 'primary', size = 'sm' }) {
  const colorClass = colorMap[color] || colorMap.primary;
  const sizeClass = size === 'xs' ? 'text-[11px] px-1.5 py-0.5' : 'text-[12px] px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-[6px] font-medium whitespace-nowrap ${colorClass} ${sizeClass}`}>
      {text}
    </span>
  );
}
