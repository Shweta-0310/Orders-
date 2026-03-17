import { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Topbar } from './components/Topbar.jsx';
import { Filters } from './components/Filters.jsx';
import { OrdersTable } from './components/OrdersTable.jsx';
import { OrderDetail } from './components/OrderDetail.jsx';

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {selectedOrder ? (
          <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        ) : (
          <>
            <Topbar />
            <div className="flex-1 overflow-y-auto">
              <Filters />
              <OrdersTable onRowClick={setSelectedOrder} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
