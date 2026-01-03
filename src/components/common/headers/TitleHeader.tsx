import Header from "../Header";


const TitleHeader = ({ title }: { title: string }) => {
  return (
    <Header className="h-[49px]">
      <h1 className="text-lg font-semibold">{title}</h1>
    </Header>
  );
};
export default TitleHeader;