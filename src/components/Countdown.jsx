import { useEffect, useState } from 'react';

function Countdown({ onComplete }) {
  const [count, setCount] = useState(5);

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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '48px',
        color: 'black',
        fontWeight: 'bold',
      }}
    >
      {count}
      <div style={{ marginTop: '20px', fontSize: '24px', color: '#333' }}>
        Get Ready...
      </div>
    </div>
  );
}

export default Countdown;
