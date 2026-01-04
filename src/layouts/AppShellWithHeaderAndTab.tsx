// 프레임 + 헤더 + 탭바

import { Outlet } from 'react-router-dom';
import BackHeader from '@/components/common/headers/BackHeader';
import TitleHeader from '@/components/common/headers/TitleHeader';
import TabBar from '@/components/TabBar';
import type React from 'react';

type Props = {
  headerType?: 'back' | 'title';
  title: string;
  rightElement?: React.ReactNode;
  titleClassName?: string;
};

export default function AppShellWithHeaderAndTab({
  headerType = 'back',
  title,
  rightElement,
  titleClassName,
}: Props) {
  return (
    <div className='min-h-dvh bg-[#f5f5f5]'>
      <div className='mx-auto min-h-dvh w-[375px] bg-white flex flex-col'>
        {headerType === 'back' ? (
          <BackHeader title={title} rightElement={rightElement} titleClassName={titleClassName} />
        ) : (
          <TitleHeader title={title} />
        )}

        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>

        <TabBar />
      </div>
    </div>
  );
}
