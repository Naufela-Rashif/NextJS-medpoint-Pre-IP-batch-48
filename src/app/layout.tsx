import type { Metadata } from 'next';
import 'jekoneng-web-ui/style.css';
import './globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Nunito } from 'next/font/google';
import ThemeProvider from 'jekoneng-web-ui/providers/ThemeProvider';
import { BookProvider } from '@/providers/BookProvider';
import { Providers } from '@/lib/providers';
import { MaterialProvider } from '@/lib/mui/provider';
import SupabaseProvider from '@/lib/supabase/SupabaseProvider';
import { lightTheme, darkTheme } from '@/utils/theme';
import { getTheme, setTheme } from '@/actions/theme';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const nunito = Nunito({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  const theme = await getTheme();

  return (
    <html lang={locale}>
      <body className={nunito.variable}>
        <NextIntlClientProvider messages={messages}>
          <SupabaseProvider
            supabaseUrl={supabaseUrl}
            supabaseKey={supabaseKey}
          >
            <Providers CustomThemeProvider={ThemeProvider} providers={[BookProvider]} theme={theme} setTheme={setTheme}>
              <MaterialProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                {children}
              </MaterialProvider>
            </Providers>
          </SupabaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
