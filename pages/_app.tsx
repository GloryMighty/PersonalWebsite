import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '../styles/globals.css';

// Dynamically import Toaster to ensure client-side only rendering
const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  // Prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {isClient && (
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
      )}
    </>
  );
}

export default MyApp;
