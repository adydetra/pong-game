function DifficultyChoice({ onSelect, onBack }) {
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
      {onBack && (
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={onBack}
            style={{
              padding: '8px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default DifficultyChoice;
