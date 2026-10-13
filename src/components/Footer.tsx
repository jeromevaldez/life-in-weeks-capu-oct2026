import { Text, Link } from '@radix-ui/themes';

export function Footer() {
  return (
    <Text size="2" color="gray" align="center" as="p" mt="6">
      Inspired by{' '}
      <Link
        href="https://waitbutwhy.com/2014/05/life-weeks.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wait But Why
      </Link>
    </Text>
  );
}
