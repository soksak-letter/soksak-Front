import FeedPageTemplate from '@/components/feed/FeedPageTemplate';
import { useOtherPublicFeed } from '@/hooks/usePublicFeed';

export default function FeedPage() {
  const { data, isLoading } = useOtherPublicFeed();

  return (
    <FeedPageTemplate
      title='공개 편지'
      navigateTo='/letter/anon/draft'
      letters={data}
      isLettersLoading={isLoading}
    />
  );
}
