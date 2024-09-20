// src/App.jsx
import { Canvas } from '@react-three/fiber';
import Paddle from './components/Paddle';
import Ball from './components/Ball';
import { useState, useRef } from 'react';
import StartButton from './components/StartButton';
import PlayAgainButton from './components/PlayAgainButton';
import CameraChoice from './components/CameraChoice';
import PauseButton from './components/PauseButton';
import GameModeChoice from './components/GameModeChoice';
import Countdown from './components/Countdown'; // Import komponen Countdown

function App() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [cameraOption, setCameraOption] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false); // State untuk countdown

  const paddleLeft = useRef();
  const paddleRight = useRef();

  const resetGame = () => {
    setScoreBlue(0);
    setScoreRed(0);
    setWinner(null);
    setGameStarted(false);
    setCameraOption(null);
    setIsPaused(false);
    setGameMode(null);
    setShowCountdown(false);
  };

  const updateScore = (scorer) => {
    if (scorer === 'blue') {
      setScoreBlue((prev) => prev + 1);
      if (scoreBlue + 1 === 5) {
        setWinner('Blue');
      }
    } else if (scorer === 'red') {
      setScoreRed((prev) => prev + 1);
      if (scoreRed + 1 === 5) {
        setWinner('Red');
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const chooseCamera = (option) => {
    setCameraOption(option);
    setShowCountdown(true); // Tampilkan countdown setelah kamera dipilih
  };

  const onCountdownComplete = () => {
    setShowCountdown(false);
    setGameStarted(true); // Mulai game setelah countdown selesai
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const selectGameMode = (mode) => {
    setGameMode(mode);
  };

  return (
    <>
      {/* Render game canvas hanya jika kamera dan mode game telah dipilih dan countdown selesai */}
      {cameraOption && gameMode && !showCountdown && gameStarted && (
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #17AEEB, #4682B4)',
          }}
          camera={
            cameraOption === 'default'
              ? { position: [0, 0, 10], fov: 80 }
              : { position: [0, -20, 15], fov: 50, near: 0.1, far: 1000 }
          }
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />

          {/* Paddle Biru dikendalikan oleh Arrow Keys */}
          <Paddle
            position={[-8, 0, 0]}
            color="blue"
            isPlayer
            gameStarted={gameStarted}
            isPaused={isPaused}
            ref={paddleLeft}
          />

          {/* Paddle Merah dikendalikan oleh bot jika singleplayer, manual jika multiplayer */}
          <Paddle
            position={[8, 0, 0]}
            color="red"
            isRedPlayer
            gameStarted={gameStarted}
            isPaused={isPaused}
            isBot={gameMode === 'singleplayer'}
            ref={paddleRight}
          />

          {/* Bola hanya muncul setelah game dimulai dan tetap saat pause */}
          {gameStarted && !winner && (
            <Ball
              paddleLeft={paddleLeft}
              paddleRight={paddleRight}
              updateScore={updateScore}
              isPaused={isPaused}
            />
          )}

          {/* Garis Pembatas */}
          <mesh position={[-8.5, 0, 0]}>
            <boxGeometry args={[0.4, 12, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[8.5, 0, 0]}>
            <boxGeometry args={[0.4, 12, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>

          {/* Garis belakang untuk pembatas */}
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[17, 0.4, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0, -6, 0]}>
            <boxGeometry args={[17, 0.4, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>

          <mesh position={[0, 0, -0.4]}>
            <boxGeometry args={[16.6, 11.6, 0.4]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </Canvas>
      )}

      {/* Tampilkan skor dan kontrol hanya jika game sedang dimainkan dan tidak sedang countdown */}
      {gameStarted && cameraOption && gameMode && !showCountdown && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'white',
              fontSize: '24px',
            }}
          >
            Blue: {scoreBlue}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'white',
              fontSize: '24px',
            }}
          >
            Red: {scoreRed}
          </div>
          {/* Gambar kontrol untuk Blue */}
          <img
            style={{
              position: 'absolute',
              top: '100px',
              left: '10px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            src="/key-blue.png"
            draggable="false"
            alt="Blue Controls"
          />
          {/* Gambar kontrol untuk Red hanya muncul di multiplayer */}
          {gameMode === 'multiplayer' && (
            <img
              style={{
                position: 'absolute',
                top: '100px',
                right: '10px',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              src="/key-red.png"
              draggable="false"
              alt="Red Controls"
            />
          )}
        </>
      )}

      {/* Tampilkan modal pemilihan mode game jika belum dipilih */}
      {!gameMode && gameStarted && <GameModeChoice onSelect={selectGameMode} />}

      {/* Tampilkan modal overlay untuk memilih kamera */}
      {!cameraOption && gameStarted && gameMode && <CameraChoice onChoose={chooseCamera} />}

      {/* Tampilkan modal overlay dan tombol Start Game */}
      {!gameStarted && !winner && <StartButton onClick={startGame} />}

      {/* Tampilkan tombol Pause jika game sudah dimulai dan tidak sedang countdown */}
      {cameraOption && !winner && !showCountdown && (
        <PauseButton isPaused={isPaused} onClick={togglePause} />
      )}

      {/* Tampilkan pesan pemenang dan tombol "Play Again" */}
      {winner && <PlayAgainButton winner={winner} onClick={resetGame} />}

      {/* Tampilkan countdown jika sudah memilih kamera */}
      {showCountdown && <Countdown onComplete={onCountdownComplete} />}
    </>
  );
}

export default App;
