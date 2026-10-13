import { Box, Container, Flex } from '@radix-ui/themes';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BirthDateInput } from '@/components/BirthDateInput';
import { BirthDateDisplay } from '@/components/BirthDateDisplay';
import { SummaryRow } from '@/components/SummaryRow';
import { WeekGrid } from '@/components/WeekGrid/WeekGrid';
import { useBirthDate } from '@/hooks/useBirthDate';

export default function Home() {
  const {
    birthDate,
    isEditing,
    isHydrated,
    showInput,
    saveBirthDate,
    startEditing,
    cancelEditing,
    reset,
  } = useBirthDate();

  // Wait for hydration to avoid mismatch
  if (!isHydrated) {
    return (
      <Box className="min-h-screen bg-gray-1 py-8">
        <Container size="4">
          <Header />
        </Container>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-1 py-8">
      <Container size="4">
        <Flex direction="column" align="center">
          <Header />

          {showInput ? (
            <BirthDateInput
              initialDate={birthDate}
              onSubmit={saveBirthDate}
              onCancel={cancelEditing}
              showCancel={isEditing}
            />
          ) : (
            birthDate && (
              <BirthDateDisplay
                birthDate={birthDate}
                onEdit={startEditing}
                onReset={reset}
              />
            )
          )}

          {birthDate && <SummaryRow birthDate={birthDate} />}

          <Box mt="6" className="w-full overflow-x-auto">
            <WeekGrid birthDate={birthDate} />
          </Box>

          <Footer />
        </Flex>
      </Container>
    </Box>
  );
}
