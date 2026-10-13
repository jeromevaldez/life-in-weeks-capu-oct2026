import { memo } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { BirthDate } from '@/types';
import { getWeekInfo, WEEKS_PER_YEAR } from '@/utils/weekCalculations';
import { WeekSquare } from './WeekSquare';

interface YearRowProps {
  yearIndex: number;
  birthDate: BirthDate | null;
}

function YearRowComponent({ yearIndex, birthDate }: YearRowProps) {
  const yearLabel = yearIndex + 1;

  return (
    <Flex gap="1" align="center" className="year-row">
      <Text
        size="1"
        color="gray"
        className="year-label"
        style={{ minWidth: '2rem', textAlign: 'right' }}
      >
        {yearLabel}
      </Text>
      <div className="weeks-container">
        {Array.from({ length: WEEKS_PER_YEAR }, (_, weekIndex) => {
          if (birthDate) {
            const weekInfo = getWeekInfo(yearIndex, weekIndex, birthDate);
            return <WeekSquare key={weekIndex} weekInfo={weekInfo} />;
          }
          // Empty state - gray squares with no tooltip
          return (
            <div
              key={weekIndex}
              className="week-square"
              style={{
                aspectRatio: '1',
                borderRadius: '2px',
                backgroundColor: 'var(--gray-5)',
              }}
            />
          );
        })}
      </div>
    </Flex>
  );
}

export const YearRow = memo(YearRowComponent);
