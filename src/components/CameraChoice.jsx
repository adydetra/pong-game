// src/components/CameraChoice.jsx
function CameraChoice({ onChoose, onBack }) {
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
        <h1>Choose Camera</h1>
        <button onClick={() => onChoose('default')} style={{ padding: '10px 20px', fontSize: '18px', marginRight: '10px' }}>
          Default Camera
        </button>
        <button onClick={() => onChoose('alternative')} style={{ padding: '10px 20px', fontSize: '18px' }}>
          Alternative Camera
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

export default CameraChoice;
