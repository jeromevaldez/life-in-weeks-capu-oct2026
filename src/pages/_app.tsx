import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme
      accentColor="indigo"
      grayColor="gray"
      panelBackground="solid"
      radius="medium"
      scaling="100%"
    >
      <Component {...pageProps} />
    </Theme>
  );
}
