import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    // This will redirect to the replit app
    // This should only happen on the client side, so we use useEffect
    window.location.href = 'https://stickmananimations.replit.app';
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#0f172a',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <Head>
        <title>GK Animates - Loading...</title>
        <meta name="description" content="GK Animates - Professional Animation Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#38bdf8' }}>
        GK Animates
      </h1>
      
      <div style={{
        display: 'inline-block',
        width: '50px',
        height: '50px',
        margin: '30px auto',
        border: '3px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '50%',
        borderTopColor: '#38bdf8',
        animation: 'spin 1s linear infinite'
      }} />
      
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '600px' }}>
        Redirecting to the animation portfolio...
      </p>

      <p style={{ fontSize: '0.9rem', marginTop: '30px' }}>
        If you are not redirected automatically, please 
        <a href="https://stickmananimations.replit.app" style={{ color: '#38bdf8', marginLeft: '5px' }}>
          click here
        </a>
      </p>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}