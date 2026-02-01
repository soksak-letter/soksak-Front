import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function EmotionConstellation({ data }: { data: any[] }) {
  console.log('렌더링 데이터:', data);
  // 별자리 차트용 데이터 변환
  const formattedKeywords = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data]
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        ...item,
        // x 좌표: index에 따라 왼쪽에서 오른쪽으로 자동 배분
        x: index * 60 + 40,
        // y 좌표: 미리 정해둔 지그재그 패턴
        y: [40, 100, 50, 110, 70, 90][index % 6],
      }));
  }, [data]);

  const maxCount = useMemo(
    () => (formattedKeywords.length > 0 ? Math.max(...formattedKeywords.map((k) => k.count)) : 0),
    [formattedKeywords],
  );

  return (
    <svg width='100%' height='148' className='overflow-visible'>
      {/* 선 연결 로직 */}
      {formattedKeywords.map((node, i) => {
        if (i === 0) return null;
        const prev = formattedKeywords[i - 1];
        return (
          <motion.line
            key={`line-${node.id}`}
            x1={prev.x}
            y1={prev.y}
            x2={node.x}
            y2={node.y}
            stroke='#FFC8C6'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        );
      })}

      {/* 노드(원) 및 텍스트 로직 */}
      {formattedKeywords.map((node) => {
        const isMax = node.count === maxCount;
        const radius = 13 + (node.count / (maxCount || 1)) * 7;

        return (
          <g key={`node-${node.id}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={radius}
              fill={isMax ? '#FF5C5C' : '#FFFFFF'}
              stroke='#FFC8C6'
              strokeWidth='1'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor='middle'
              dominantBaseline='central'
              className={`font-bold select-none ${isMax ? 'fill-white' : 'fill-[#171717]'}`} //가장 크면 흰색 아니면 블랙
              style={{
                fontSize: radius * 0.45 + 2, // 원 크기에 맞춰 글자 크기도 살짝 조절
                pointerEvents: 'none', // 글자가 마우스 이벤트를 방해하지 않게 설정
              }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
