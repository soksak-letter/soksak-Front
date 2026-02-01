import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function EmotionConstellation({ data }: { data: any[] }) {
  const VIEWBOX_WIDTH = 343; // 카드 내부 실질 너비 (375 - 패딩)
  const VIEWBOX_HEIGHT = 200;

  // 별자리 노드(별) 좌표 및 데이터 변환 로직
  const nodes = useMemo(() => {
    if (!data || data.length === 0) return [];
    //빈도수(count)가 높은 순서대로 정렬
    const sorted = [...data].sort((a, b) => b.count - a.count);
    const count = sorted.length;

    return sorted.map((item, index) => {
      // [X 좌표 계산]전체 너비에서 여백(60px)을 빼고 노드개수만큼 분할 데이터가 많아질수록 간격(step)이 좁아짐
      const xStep = (VIEWBOX_WIDTH - 60) / (count > 1 ? count - 1 : 1);
      return {
        ...item,
        id: index,
        x: index * xStep + 30, // 양옆 여백 30px 부여
        // [Y 좌표 계산] 별자리 느낌을 위해 상하 폭을 조금 더 좁게 조정 (짧은 선 유도)높이값을 순환(index % 6)
        y: [50, 90, 90, 100, 70, 85][index % 6],
      };
    });
  }, [data]);

  // 가장 높은 빈도수 추출 (노드 크기 및 강조 효과의 기준점)
  const maxCount = useMemo(
    () => (nodes.length > 0 ? Math.max(...nodes.map((k) => k.count)) : 0),
    [nodes],
  );

  return (
    <svg
      width='100%'
      height={VIEWBOX_HEIGHT}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className='overflow-visible' // 노드의 글로우 효과나 텍스트가 잘리지 않게 설정
    >
      <defs>
        {/* 노드를 위한 글로우 효과 */}
        {/* 강한 빛 (가장 큰 노드용) */}
        <filter id='glow-strong' x='-50%' y='-50%' width='200%' height='200%'>
          <feGaussianBlur stdDeviation='3' result='blur' />
          <feComposite in='SourceGraphic' in2='blur' operator='over' />
        </filter>

        {/* 은은한 빛 (일반 노드용) */}
        <filter id='glow-soft' x='-40%' y='-40%' width='300%' height='300%'>
          <feGaussianBlur stdDeviation='2.5' result='blur' />
          {/* 글로우에 색상을 입히는 과정 (Flood) */}
          <feFlood floodColor='#FFC8C6' floodOpacity='0.8' result='color' />
          <feComposite in='color' in2='blur' operator='in' result='coloredBlur' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      {/* 선 연결 로직 */}
      {nodes.map((node, i) => {
        if (i === 0) return null; // 첫 번째 노드는 연결할 이전 노드가 없으므로 생략
        const prev = nodes[i - 1];
        return (
          <motion.line
            key={`line-${node.id}`}
            x1={prev.x}
            y1={prev.y}
            x2={node.x}
            y2={node.y}
            stroke='#FFC8C6'
            strokeWidth='1.5'
            // 애니메이션: 선이 그려지는 효과 (pathLength 0 -> 1)
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        );
      })}

      {/* 노드(원) 및 텍스트 로직 */}
      {nodes.map((node) => {
        const isMax = node.count === maxCount; // 현재 노드가 최대 빈도인지 확인
        // 노드 개수가 많아지면(6개 초과) 반지름을 살짝 줄여서 겹침 방지
        const baseRadius = nodes.length > 6 ? 10 : 13;
        // 빈도수 비율에 따라 반지름을 10px 범위 내에서 추가로 키움
        const radius = baseRadius + (node.count / (maxCount || 1)) * 10;

        return (
          <g key={`node-${node.id}`}>
            {/* 별(원) 그리기 */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={radius}
              fill={isMax ? '#FF5C5C' : '#FFFFFF'} // 최대값은 붉은색, 나머지는 흰색
              stroke='#FFC8C6'
              strokeWidth='1'
              filter={isMax ? 'url(#glow-strong)' : 'url(#glow-soft)'} // 노드에  글로우 필터 적용
              // 애니메이션: 톡톡 튀어나오는 느낌의 스프링 효과
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, delay: node.id * 0.05 }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor='middle'
              dominantBaseline='central'
              className={isMax ? 'fill-white' : 'fill-[#171717]'} //가장 크면 흰색 아니면 블랙
              style={{
                fontSize: `${radius * 0.45 + 2}px`, // 원 크기에 맞춰 글자 크기도 살짝 조절
                fontWeight: 'bold',
                pointerEvents: 'none', // 글자가 마우스 이벤트를 방해하지 않게 설정
                userSelect: 'none',
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
