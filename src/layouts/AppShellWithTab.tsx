// 프레임 + 탭바

import { Outlet } from 'react-router-dom';
import TabBar from '@/components/TabBar';

export default function AppShellWithTab() {
  return (
    <div className='min-h-dvh bg-[#f5f5f5]'>
      <div className='mx-auto min-h-dvh w-[375px] bg-[var(--color-bg-primary)] flex flex-col'>
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
        <TabBar />
      </div>
    </div>
  );
}
