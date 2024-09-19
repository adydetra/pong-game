function StartButton({ onClick }) {
  return (
    <div style={{
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
      textAlign: 'center'
    }}>
      <div>
        <h1>Pong Game</h1>
        <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '18px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartButton;
