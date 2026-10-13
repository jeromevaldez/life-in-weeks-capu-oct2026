import { Text } from '@radix-ui/themes';
import { BirthDate } from '@/types';
import { calculateWeeksLived } from '@/utils/weekCalculations';

interface SummaryRowProps {
  birthDate: BirthDate;
}

export function SummaryRow({ birthDate }: SummaryRowProps) {
  const { years, weeks } = calculateWeeksLived(birthDate);

  return (
    <Text size="4" align="center" as="p" my="4">
      You have lived{' '}
      <Text weight="bold">
        {years} {years === 1 ? 'year' : 'years'}
      </Text>{' '}
      and{' '}
      <Text weight="bold">
        {weeks} {weeks === 1 ? 'week' : 'weeks'}
      </Text>
    </Text>
  );
}
