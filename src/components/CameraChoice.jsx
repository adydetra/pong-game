// src/components/CameraChoice.jsx
function CameraChoice({ onChoose }) {
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
      </div>
    </div>
  );
}

export default CameraChoice;
