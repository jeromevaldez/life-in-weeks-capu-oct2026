import { Flex } from '@radix-ui/themes';
import { BirthDate } from '@/types';
import { TOTAL_YEARS } from '@/utils/weekCalculations';
import { YearRow } from './YearRow';

interface WeekGridProps {
  birthDate: BirthDate | null;
}

export function WeekGrid({ birthDate }: WeekGridProps) {
  return (
    <Flex direction="column" gap="1" className="week-grid">
      {Array.from({ length: TOTAL_YEARS }, (_, yearIndex) => (
        <YearRow key={yearIndex} yearIndex={yearIndex} birthDate={birthDate} />
      ))}
    </Flex>
  );
}
