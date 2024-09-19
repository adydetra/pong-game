import { useState } from 'react';

const PauseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path fill="currentColor" d="M14 10h-2v12h2zm6 0h-2v12h2z" />
    <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" />
  </svg>
);

const ResumeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z" />
    <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" />
  </svg>
);

function PauseButton({ isPaused, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 15px',
        borderRadius: '10px',
        background: isPaused ? (isHovered ? '#ff3b30' : 'red') : isHovered ? '#34c759' : 'green',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background 0.3s ease',
      }}
    >
      {isPaused ? ResumeIcon : PauseIcon}
    </button>
  );
}

export default PauseButton;
