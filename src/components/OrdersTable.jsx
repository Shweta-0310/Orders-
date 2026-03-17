import { useState } from 'react';
import { Tag } from './Tag.jsx';
import {
  ChevronSelectorIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, ChevronDownIcon,
} from './icons.jsx';

const STATUS_COLORS = {
  'New': 'primary',
  'Auth Failed': 'warning',
  'Success': 'success',
  'Auto Refund': 'purple',
  'Partial Charged': 'primary',
  'Authorization Failed': 'error',
};

const REFUND_COLORS = {
  'Available': 'primary',
  'Unavailable': 'neutral',
};

const tableData = [
  { id: '6770_F52A6B030', status: 'New', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'Order Payment', amount: '342', refund: 'Available' },
  { id: '6770_F52A6B030', status: 'New', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'Mandate Payment', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'Auth Failed', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'Mandate Register', amount: '342', refund: 'Available' },
  { id: '6770_F52A6B030', status: 'Success', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'TPV Payment', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'Auto Refund', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'VAN Payment', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'Partial Charged', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'TPV Mandate', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'Authorization Failed', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'TPV Payment', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'New', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'Mandate Register', amount: '342', refund: 'Unavailable' },
  { id: '6770_F52A6B030', status: 'New', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'TPV Payment', amount: '342', refund: 'Available' },
  { id: '6770_F52A6B030', status: 'New', createdAt: 'Dec 10, 2025 08:42pm', lastModified: 'Dec 10, 2025 08:42pm', orderType: 'Order Payment', amount: '342', refund: 'Unavailable' },
];


function RowsPerPage({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = [10, 15, 30, 50];

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-sm font-medium text-[#525866] hover:text-[#2b303b]"
        onClick={() => setOpen(!open)}
      >
        <span>Rows per page</span>
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-[10px] hover:bg-[#f2f4f8]">
          <span>{value}</span>
          <ChevronDownIcon className="w-4 h-4 text-[#525866]" />
        </div>
      </button>
      {open && (
        <div className="absolute left-24 bottom-8 bg-white border border-[#e1e4ea] rounded-[8px] shadow-[0px_3px_16px_3px_rgba(5,5,6,0.07)] w-[92px] py-1 z-50">
          {options.map((opt) => (
            <button
              key={opt}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-[4px] mx-1 text-sm hover:bg-[#f2f4f8] ${
                opt === value ? 'font-semibold text-[#2b303b] bg-[#f2f4f8]' : 'font-medium text-[#525866]'
              }`}
              style={{ width: 'calc(100% - 8px)' }}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              <span>{opt}</span>
              {opt === value && <CheckIcon className="w-4 h-4 text-[#2b303b]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, currentPage, '...', totalPages);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        className="flex items-center justify-center p-1.5 rounded-[10px] hover:bg-[#f2f4f8] disabled:opacity-40"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className="w-3.5 h-3.5 text-[#525866]" />
      </button>
      <div className="flex items-center gap-1">
        {[1, 2, '...', 4].map((p, i) => (
          <button
            key={i}
            className={`flex items-center justify-center w-7 h-7 rounded-[8px] text-[12px] font-medium transition-colors ${
              p === currentPage ? 'bg-[#f2f4f8] text-[#2b303b]' : 'text-[#717784] hover:bg-[#f2f4f8]'
            }`}
            onClick={() => typeof p === 'number' && onPageChange(p)}
            disabled={p === '...'}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        className="flex items-center justify-center p-1.5 rounded-[10px] hover:bg-[#f2f4f8] disabled:opacity-40"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon className="w-3.5 h-3.5 text-[#525866]" />
      </button>
    </div>
  );
}

export function OrdersTable({ onRowClick }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 4;

  return (
    <div className="px-10 pb-6">
      <div className="flex flex-col w-full">
        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header row */}
            <div className="flex w-full">
              <div className="w-[199px] shrink-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-l border-[#eceff3] rounded-tl-xl">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Order ID</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="w-[184px] shrink-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Status</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Created At</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Last Modified</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="w-[168px] shrink-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Order Type</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="w-[128px] shrink-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Amount</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="w-[149px] shrink-0">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#fcfcfd] border-b border-t border-[#eceff3]">
                  <span className="text-[12px] font-semibold text-[#99a0ae] truncate flex-1">Refunds</span>
                  <ChevronSelectorIcon className="w-3.5 h-3.5 text-[#99a0ae] shrink-0" />
                </div>
              </div>
              <div className="w-12 shrink-0">
                <div className="flex items-center justify-center px-4 py-[15px] bg-[#fcfcfd] border-b border-t border-r border-[#eceff3] rounded-tr-xl">
                  <PlusIcon className="w-4 h-4 text-[#525866]" />
                </div>
              </div>
            </div>

            {/* Data rows */}
            {tableData.map((row, i) => (
              <div key={i} onClick={() => onRowClick?.(row)} className="flex w-full hover:bg-[#fcfcfd] transition-colors group cursor-pointer">
                {/* Order ID */}
                <div className="w-[199px] shrink-0 flex items-center gap-2 px-4 py-[18px] border-b border-l border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <span className="text-[14px] font-medium text-[#2b303b] truncate leading-5">{row.id}</span>
                </div>
                {/* Status */}
                <div className="w-[184px] shrink-0 flex items-center px-4 py-[17px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <Tag text={row.status} color={STATUS_COLORS[row.status] || 'neutral'} />
                </div>
                {/* Created At */}
                <div className="flex-1 min-w-0 flex items-center px-4 py-[18px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <p className="text-[14px] font-medium text-[#2b303b] truncate leading-5 whitespace-nowrap">
                    {row.createdAt}{' '}
                    <span className="text-[12px] text-[#99a0ae]">(IST)</span>
                  </p>
                </div>
                {/* Last Modified */}
                <div className="flex-1 min-w-0 flex items-center px-4 py-[18px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <p className="text-[14px] font-medium text-[#2b303b] truncate leading-5 whitespace-nowrap">
                    {row.lastModified}{' '}
                    <span className="text-[12px] text-[#99a0ae]">(IST)</span>
                  </p>
                </div>
                {/* Order Type */}
                <div className="w-[168px] shrink-0 flex items-center px-4 py-[18px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <span className="text-[14px] font-medium text-[#2b303b] truncate leading-5">{row.orderType}</span>
                </div>
                {/* Amount */}
                <div className="w-[128px] shrink-0 flex items-center gap-2 px-4 py-[18px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <span className="text-[14px] font-medium text-[#99a0ae]">₹</span>
                  <span className="text-[14px] font-medium text-[#222530]">{row.amount}</span>
                </div>
                {/* Refund */}
                <div className="w-[149px] shrink-0 flex items-center px-4 py-[17px] border-b border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]">
                  <Tag text={row.refund} color={REFUND_COLORS[row.refund]} />
                </div>
                {/* Action */}
                <div className="w-12 shrink-0 flex items-center px-4 py-[20px] border-b border-r border-[#eceff3] bg-white group-hover:bg-[#fcfcfd]" />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-white border-b border-l border-r border-[#eceff3] rounded-bl-xl rounded-br-xl">
          <RowsPerPage value={rowsPerPage} onChange={setRowsPerPage} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
