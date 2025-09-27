import { useEffect, useState } from 'react';

function Countdown({ onComplete, seconds = 5 }) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete(); // Memulai game setelah countdown selesai
    }
  }, [count, onComplete]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '48px',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {count}
      <div style={{ marginTop: '20px', fontSize: '24px', color: '#f1f1f1' }}>
        Get Ready...
      </div>
    </div>
  );
}

export default Countdown;
