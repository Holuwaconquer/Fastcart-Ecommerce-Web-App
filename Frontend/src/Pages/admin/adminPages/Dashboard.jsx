import React, { useContext, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { RxCaretUp } from "react-icons/rx";
import { PiShoppingCartSimple } from "react-icons/pi";
import { CategoryContext } from '../../../CategoryContext';
import { AdminContext } from '../admincomponents/AdminContext';
import DashboardChart from '../admincomponents/DashboardChart';

const Dashboard = () => {
  const { allOrders } = useContext(CategoryContext);
  const { allCustomers, ordersMontly, customersMonthly } = useContext(AdminContext)
  useEffect(() => {
    if (allOrders && allCustomers) {
      console.log("All Orders in ProductPage", allOrders);
      console.log("All Customers in ProductPage", allCustomers);
      console.log("Monthly Orders in ProductPage", ordersMontly);
      console.log("Monthly Customers in ProductPage", customersMonthly);
    }
  }, [allOrders, allCustomers, ordersMontly, customersMonthly]);
  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 100;
    return (((current - previous) / previous) * 100).toFixed(2);
  };
  let ordersPercentage = 0;
  let customersPercentage = 0;
  let revenuePercentage = 0;

  if (ordersMontly && ordersMontly.length > 1) {
    const sorted = [...ordersMontly].sort((a, b) =>
      a._id.localeCompare(b._id)
    );
    const lastMonth = sorted[sorted.length - 2]?.totalOrders || 0;
    const thisMonth = sorted[sorted.length - 1]?.totalOrders || 0;
    ordersPercentage = calculatePercentageChange(thisMonth, lastMonth);
  }
  if (customersMonthly && customersMonthly.length > 1) {
    const sorted = [...customersMonthly].sort((a, b) =>
      a._id.localeCompare(b._id)
    );
    const lastMonth = sorted[sorted.length - 2]?.totalCustomers  || 0;
    const thisMonth = sorted[sorted.length - 1]?.totalCustomers || 0;
    customersPercentage = calculatePercentageChange(thisMonth, lastMonth);
  }
  if (ordersMontly && ordersMontly.length > 1) {
    const sorted = [...ordersMontly].sort((a, b) =>
      a._id.localeCompare(b._id)
    );
    const lastMonthRevenue = sorted[sorted.length - 2]?.totalRevenue || 0;
    const thisMonthRevenue = sorted[sorted.length - 1]?.totalRevenue || 0;
    revenuePercentage = calculatePercentageChange(thisMonthRevenue, lastMonthRevenue);
  }
  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        {/* for dashboard title */}
        <div className='w-full flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-[#131523] text-[24px]'>Dashboard</h1>
          </div>
          {/* for manage button */}
          <div>
            <button className='rounded-[4px] border-1 border-[#D7DBEC] flex gap-2 items-center text-[#1E5EFf] curcosr-pointer hover:bg-[#D7DBEC] cursor-pointer' style={{padding: '10px'}}><span><IoSettingsOutline /></span><span>Manage Settings</span></button>
          </div>
        </div>
        <div className='w-full grid grid-cols-5 gap-4'>
          {/* for total revenue */}
          <div className='bg-white shadow rounded-[6px] flex items-center justify-center gap-8' style={{ padding: '8px 12px' }}>
            <div>
              <p className='text-[16px] text-[#131523] font-bold'>{allOrders && allOrders.length > 0 ?
              `₦${allOrders.reduce((sum, order) => sum + (order.subtotal || 0), 0).toLocaleString()}` : '₦0'}</p>
              <p className='text-[14px] text-[#5A607F]'>Total Revenue</p>
              <p
                className={`flex items-center gap-2 ${
                  revenuePercentage >= 0 ? 'text-[#06A561]' : 'text-[#F0142F]'
                }`}
              >
                <span>{revenuePercentage}%</span>
                <RxCaretUp className={revenuePercentage >= 0 ? '' : 'rotate-180'} />
              </p>
            </div>
            <div className='bg-[#ECF2FF] rounded-[50%] flex flex-col items-center justify-center' style={{padding: '10px'}}>
              <TbCurrencyNaira size={20} className='text-[#1E5EFf]' />
            </div>
          </div>
          {/* for total orders */}
          <div className='bg-white shadow rounded-[6px] flex items-center justify-center gap-8' style={{ padding: '8px 12px' }}>
            <div>
              <p className='text-[16px] text-[#131523] font-bold'>{allOrders && allOrders.length || 0}</p>
              <p className='text-[14px] text-[#5A607F]'>Orders</p>
              <p
                className={`flex items-center gap-2 ${
                  ordersPercentage >= 0 ? 'text-[#06A561]' : 'text-[#F0142F]'
                }`}
              >
                <span>{ordersPercentage}%</span>
                <RxCaretUp
                  className={ordersPercentage >= 0 ? '' : 'rotate-180'}
                />
              </p>
            </div>
            <div className='bg-[#ECF2FF] rounded-[50%] flex flex-col items-center justify-center' style={{padding: '10px'}}>
              <PiShoppingCartSimple  size={20} className='text-[#1E5EFf]' />
            </div>
          </div>
          {/* for all users */}
          <div className='bg-white shadow rounded-[6px] flex items-center justify-center gap-8' style={{ padding: '8px 12px' }}>
            <div>
              <p className='text-[16px] text-[#131523] font-bold'>{allCustomers && allCustomers.length || 0}</p>
              <p className='text-[14px] text-[#5A607F]'>Customers</p>
              <p
                className={`flex items-center gap-2 ${
                  customersPercentage >= 0 ? 'text-[#06A561]' : 'text-[#F0142F]'
                }`}
              >
                <span>{customersPercentage}%</span>
                <RxCaretUp
                  className={customersPercentage >= 0 ? '' : 'rotate-180'}
                />
              </p>
            </div>
            <div className='bg-[#ECF2FF] rounded-[50%] flex flex-col items-center justify-center' style={{padding: '10px'}}>
              <PiShoppingCartSimple  size={20} className='text-[#1E5EFf]' />
            </div>
          </div>
        </div>
        {/* for chart and seven days sales */}
        <div className='w-full grid grid-cols-[3fr_1fr] gap-4'>
          <div className='w-full flex flex-col gap-4 rounded-[6px] bg-white' style={{padding: '40px'}}>
            <div className='w-full flex justify-between items-center'>
              <h1 className='text-[16px] text-[#131523] font-bold'>Orders Over Time</h1>
              <p className='text-[14px] text-[#5A607F]'>Last 24 hours</p>
            </div>
            <DashboardChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard