import { useLocation, useParams } from 'react-router-dom';

const LetterDecoPage = () => {
  const { mode } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <p>편지를 마음껏 꾸며보세요.</p>
    </div>
  );
};

export default LetterDecoPage;
