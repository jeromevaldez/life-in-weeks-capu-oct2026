import { useState } from 'react';
import { Flex, Select, Button, Text, Box } from '@radix-ui/themes';
import { BirthDate } from '@/types';
import { validateBirthDate, getDaysInMonth, MONTH_NAMES } from '@/utils/dateUtils';

interface BirthDateInputProps {
  initialDate?: BirthDate | null;
  onSubmit: (date: BirthDate) => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export function BirthDateInput({
  initialDate,
  onSubmit,
  onCancel,
  showCancel = false,
}: BirthDateInputProps) {
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState<string>(
    initialDate?.month?.toString() || ''
  );
  const [day, setDay] = useState<string>(initialDate?.day?.toString() || '');
  const [year, setYear] = useState<string>(
    initialDate?.year?.toString() || ''
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    const yearNum = parseInt(year, 10);

    if (!month || !day || !year) {
      setError('Please fill in all fields');
      return;
    }

    const birthDate: BirthDate = {
      month: monthNum,
      day: dayNum,
      year: yearNum,
    };

    const validation = validateBirthDate(birthDate);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid date');
      return;
    }

    setError(null);
    onSubmit(birthDate);
  };

  // Generate year options (last 90 years)
  const years = Array.from({ length: 91 }, (_, i) => currentYear - i);

  // Generate day options based on selected month and year
  const selectedMonth = parseInt(month, 10) || 1;
  const selectedYear = parseInt(year, 10) || currentYear;
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Box>
      <Flex gap="3" align="end" wrap="wrap" justify="center">
        <Box>
          <Select.Root size="1" value={month} onValueChange={setMonth}>
            <Select.Trigger placeholder="Month" />
            <Select.Content>
              {MONTH_NAMES.map((name, i) => (
                <Select.Item key={i + 1} value={(i + 1).toString()}>
                  {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>

        <Box>
          <Select.Root size="1" value={day} onValueChange={setDay}>
            <Select.Trigger placeholder="Day" />
            <Select.Content>
              {days.map((d) => (
                <Select.Item key={d} value={d.toString()}>
                  {d}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>

        <Box>
          <Select.Root size="1" value={year} onValueChange={setYear}>
            <Select.Trigger placeholder="Year" />
            <Select.Content>
              {years.map((y) => (
                <Select.Item key={y} value={y.toString()}>
                  {y}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>

        <Flex gap="2">
          <Button size="1" onClick={handleSubmit}>Submit</Button>
          {showCancel && onCancel && (
            <Button size="1" variant="soft" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Flex>
      </Flex>

      {error && (
        <Text size="2" color="red" align="center" mt="3" as="p">
          {error}
        </Text>
      )}
    </Box>
  );
}
