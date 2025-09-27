// src/components/GameModeChoice.jsx
function GameModeChoice({ onSelect, onBack }) {
  return (
    <div style={{
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
      textAlign: 'center'
    }}>
      <div>
        <h1>Choose Game Mode</h1>
        <button onClick={() => onSelect('singleplayer')} style={{ padding: '10px 20px', margin: '10px' }}>
          Singleplayer
        </button>
        <button onClick={() => onSelect('multiplayer')} style={{ padding: '10px 20px', margin: '10px' }}>
          Multiplayer
        </button>
        {onBack && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={onBack} style={{ padding: '8px 16px' }}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameModeChoice;
