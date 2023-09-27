import './global.css';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Welcome to frontend',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
