type StyleTab = 'font' | 'paper' | 'stamp';

type StyleTabProps = {
  selectedTab: StyleTab;
  // eslint-disable-next-line no-unused-vars
  onChangeTab: (tab: StyleTab) => void;
};

const StyleTabs = ({ selectedTab, onChangeTab }: StyleTabProps) => {
  return (
    <div className='sticky top-0 z-10 bg-white pt-1'>
      <div className='flex justify-center gap-23 mb-7'>
        <button
          onClick={() => onChangeTab('font')}
          className={
            selectedTab === 'font'
              ? 'ty-body3 text-[var(--color-primary-500)]'
              : 'ty-body3 text-black/40'
          }
        >
          글씨체
        </button>

        <button
          onClick={() => onChangeTab('paper')}
          className={
            selectedTab === 'paper'
              ? 'ty-body3 text-[var(--color-primary-500)]'
              : 'ty-body3 text-black/40'
          }
        >
          색상
        </button>

        <button
          onClick={() => onChangeTab('stamp')}
          className={
            selectedTab === 'stamp'
              ? 'ty-body3 text-[var(--color-primary-500)]'
              : 'ty-body3 text-black/40'
          }
        >
          우표
        </button>
      </div>
    </div>
  );
};

export default StyleTabs;
