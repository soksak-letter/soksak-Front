import { Navigate, useParams } from 'react-router-dom';
import AnonDraftPage from './AnonDraftPage';
import OtherDraftPage from './OtherDraftPage';
import SelfDraftPage from './SelfDraftPage';

export default function LetterDraftRoute() {
  const { target } = useParams<{ target: 'anon' | 'other' | 'self' | 'friend' }>();

  switch (target) {
    case 'anon':
      return <AnonDraftPage />;
    case 'other':
      return <OtherDraftPage />;
    case 'self':
      return <SelfDraftPage />;
    case 'friend':
      return <Navigate to='/friend/draft' replace />;
    default:
      return <Navigate to='/letter/inbox-other' replace />;
  }
}
