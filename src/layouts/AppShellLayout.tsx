import TabBar from '@/components/TabBar';
import { Outlet } from 'react-router-dom';

export default function AppShellLayout() {
  return (
    <div className="min-h-dvh bg-[#f5f5f5]">
      <div className="mx-auto min-h-dvh w-[375px] bg-white">
        {/* <Header /> */}
        {/* <main className="flex-1 overflow-y-auto"></main> */}
        <Outlet />
        <TabBar />
      </div>
    </div>
  );
}
