function MaxScoreChoice({ onSelect }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)', // Background semi-transparan untuk shadow
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Choose Maximum Score</h1>
      <div>
        <button
          onClick={() => onSelect(5)}
          style={{ padding: '10px 20px', fontSize: '18px', marginRight: '10px' }}
        >
          5
        </button>
        <button
          onClick={() => onSelect(10)}
          style={{ padding: '10px 20px', fontSize: '18px', marginRight: '10px' }}
        >
          10
        </button>
        <button
          onClick={() => onSelect(20)}
          style={{ padding: '10px 20px', fontSize: '18px' }}
        >
          20
        </button>
      </div>
    </div>
  );
}

export default MaxScoreChoice;
