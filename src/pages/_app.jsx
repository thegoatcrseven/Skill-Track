import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';

if (typeof window !== 'undefined') {
  window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', {
      message,
      source,
      lineno,
      colno,
      error
    });
    return false;
  };

  window.onunhandledrejection = function(event) {
    console.error('Unhandled promise rejection:', event.reason);
  };
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ErrorBoundary>
        <main className="font-sans min-h-screen bg-white">
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #39FF14',
              },
              success: {
                iconTheme: {
                  primary: '#39FF14',
                  secondary: '#1e293b',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF10F0',
                  secondary: '#1e293b',
                },
              },
            }}
          />
        </main>
      </ErrorBoundary>
    </SessionProvider>
  );
}
