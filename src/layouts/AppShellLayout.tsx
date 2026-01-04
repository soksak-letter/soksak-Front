// 모바일 너비 375px 프레임만

import { Outlet } from 'react-router-dom';

export default function AppShellLayout() {
  return (
    <div className='min-h-dvh bg-[#f5f5f5]'>
      <div className='mx-auto min-h-dvh w-[375px] bg-[var(--color-bg-primary)]'>
        {/* <main className="flex-1 overflow-y-auto"></main> */}
        <Outlet />
      </div>
    </div>
  );
}
