import FeedPageTemplate from '@/components/feed/FeedPageTemplate';
import { useFriendPublicFeed } from '@/hooks/usePublicFeed';

export default function FriendFeedPage() {
  const { data, isLoading } = useFriendPublicFeed();

  return (
    <FeedPageTemplate
      title='친구 편지'
      navigateTo='/friend/inbox'
      letters={data}
      isLettersLoading={isLoading}
    />
  );
}
