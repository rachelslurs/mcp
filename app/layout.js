import './globals.css';
    import { Inter } from 'next/font/google';

    const inter = Inter({ subsets: ['latin'] });

    export const metadata = {
      title: 'MCP Workflow Directory',
      description: 'A directory of MCP workflows.',
    };

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      );
    }
