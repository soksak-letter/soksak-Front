import Header from '../Header';

const TitleHeader = ({ title }: { title: string }) => {
  return (
    <Header className='h-[49px]'>
      <h1 className='ty-title3'>{title}</h1>
    </Header>
  );
};
export default TitleHeader;
