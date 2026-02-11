import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FeedLetter } from '@/types/letter';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import EmptyStateCard from '../letters/EmptyStateCard';
import LetterItem from '../letters/LetterItem';

interface LetterCarouselProps {
  letters: FeedLetter[];
  emptyMessage?: string;
  // eslint-disable-next-line no-unused-vars
  onClickItem?: (letter: FeedLetter) => void;
}

export default function LetterCarousel({
  letters,
  emptyMessage,
  onClickItem,
}: LetterCarouselProps) {
  const navigate = useNavigate();

  const [currentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 130;
  const CARD_GAP = 13;
  const CARD_WITH_GAP = CARD_WIDTH + CARD_GAP;

  useEffect(() => {
    if (!containerRef.current) return;
    const target = -currentIndex * CARD_WITH_GAP;
    containerRef.current.style.transform = `translateX(${target}px)`;
  }, [currentIndex, CARD_WITH_GAP]);

  const handleCardClick = useCallback(
    (letter: FeedLetter) => {
      if (onClickItem) {
        onClickItem(letter);
      } else {
        navigate(ROUTES.report.keyword);
      }
    },
    [navigate, onClickItem],
  );

  if (letters.length === 0) {
    return (
      <div className='w-full py-1.5'>
        <div style={{ width: `${CARD_WIDTH}px`, marginLeft: `16px` }}>
          <EmptyStateCard message={emptyMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className='w-full py-1.5'>
      <div className='overflow-hidden'>
        <div
          ref={containerRef}
          className='flex transition-transform duration-300 ease-out'
          style={{
            gap: `${CARD_GAP}px`,
            paddingLeft: `16px`,
          }}
        >
          {letters.map((letter) => (
            <div
              key={letter.letterId}
              className='flex-shrink-0'
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <LetterItem letter={letter} onClick={() => handleCardClick(letter)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
