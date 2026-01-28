type StyleTab = 'font' | 'paper' | 'stamp';

type StyleTabProps = {
  selectedTab: StyleTab;
  onChangeTab: (tab: StyleTab) => void;
};

const LABEL: Record<StyleTab, string> = {
  font: '글씨체',
  paper: '편지지',
  stamp: '우표',
};

const StyleTabs = ({ selectedTab, onChangeTab }: StyleTabProps) => {
  return (
    <div className='sticky top-0 z-10 bg-white pt-1'>
      {(['font', 'paper', 'stamp'] as const).map((tab) => (
        <button
          key={tab}
          type='button'
          onClick={() => onChangeTab(tab)}
          className={`ty-body3 pb-2 transition-colors ${
            selectedTab === tab ? 'text-(--color-primary-500)' : 'text-black opacity-40'
          }`}
        >
          {LABEL[tab]}
        </button>
      ))}
    </div>
  );
};

export default StyleTabs;
