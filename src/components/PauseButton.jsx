function PauseButton({ isPaused, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        fontSize: '18px',
        background: isPaused ? 'green' : 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {isPaused ? 'Resume' : 'Pause'}
    </button>
  );
}

export default PauseButton;
