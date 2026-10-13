import { memo } from 'react';
import { Tooltip, Box } from '@radix-ui/themes';
import { WeekInfo } from '@/types';
import { formatWeekTooltip } from '@/utils/weekCalculations';

interface WeekSquareProps {
  weekInfo: WeekInfo;
}

function WeekSquareComponent({ weekInfo }: WeekSquareProps) {
  const tooltipContent = formatWeekTooltip(weekInfo);

  let bgColor = 'var(--gray-5)';
  if (weekInfo.isCurrent) {
    bgColor = 'var(--indigo-9)';
  } else if (weekInfo.isLived) {
    bgColor = 'var(--indigo-7)';
  }

  return (
    <Tooltip content={tooltipContent}>
      <Box
        className="week-square"
        style={{
          aspectRatio: '1',
          borderRadius: '2px',
          cursor: 'pointer',
          backgroundColor: bgColor,
        }}
      />
    </Tooltip>
  );
}

export const WeekSquare = memo(WeekSquareComponent);
