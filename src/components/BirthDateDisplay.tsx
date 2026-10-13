import { Flex, Text, IconButton, Tooltip } from '@radix-ui/themes';
import { PencilSimple, ArrowCounterClockwise } from '@phosphor-icons/react';
import { BirthDate } from '@/types';
import { formatBirthDate } from '@/utils/dateUtils';

interface BirthDateDisplayProps {
  birthDate: BirthDate;
  onEdit: () => void;
  onReset: () => void;
}

export function BirthDateDisplay({
  birthDate,
  onEdit,
  onReset,
}: BirthDateDisplayProps) {
  return (
    <Flex gap="3" align="center" justify="center" wrap="wrap">
      <Text size="3">
        Born: <Text weight="bold">{formatBirthDate(birthDate)}</Text>
      </Text>
      <Flex gap="2">
        <Tooltip content="Edit birth date">
          <IconButton variant="outline" size="1" onClick={onEdit}>
            <PencilSimple />
          </IconButton>
        </Tooltip>
        <Tooltip content="Reset birth date">
          <IconButton variant="outline" size="1" onClick={onReset}>
            <ArrowCounterClockwise />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
