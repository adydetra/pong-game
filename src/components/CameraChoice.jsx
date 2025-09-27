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
    </div>
  );
}

export default CameraChoice;
