function DifficultyChoice({ onSelect }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <h1>Select Difficulty</h1>
      <p style={{ maxWidth: '480px', lineHeight: 1.4 }}>
        Choose how smart the red paddle bot should be. Higher difficulty means faster reaction
        and fewer mistakes.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => onSelect('easy')}
          style={{ padding: '10px 20px', fontSize: '18px', minWidth: '120px' }}
        >
          Easy
        </button>
        <button
          onClick={() => onSelect('medium')}
          style={{ padding: '10px 20px', fontSize: '18px', minWidth: '120px' }}
        >
          Medium
        </button>
        <button
          onClick={() => onSelect('hard')}
          style={{ padding: '10px 20px', fontSize: '18px', minWidth: '120px' }}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default DifficultyChoice;
