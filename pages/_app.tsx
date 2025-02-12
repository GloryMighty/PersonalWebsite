import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* Mobile-friendly toast container */}
      <Toaster 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            maxWidth: '90vw',
            width: 'fit-content',
            fontSize: '14px',
            padding: '10px 15px',
          },
          duration: 3000,
        }}
      />
    </>
  );
}

export default MyApp;
