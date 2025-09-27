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
import MaxScoreChoice from './components/MaxScoreChoice'; // Import komponen MaxScoreChoice
import Countdown from './components/Countdown';
import DifficultyChoice from './components/DifficultyChoice';

function App() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [cameraOption, setCameraOption] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [maxScore, setMaxScore] = useState(null); // Set initial value to null
  const [difficulty, setDifficulty] = useState(null);
  const [postScoreCountdown, setPostScoreCountdown] = useState(false);
  const [paddleResetToken, setPaddleResetToken] = useState(0);

  const paddleLeft = useRef();
  const paddleRight = useRef();
  const ballPositionRef = useRef({ x: 0, y: 0 });

  const resetGame = () => {
    setScoreBlue(0);
    setScoreRed(0);
    setWinner(null);
    setGameStarted(false);
    setCameraOption(null);
    setIsPaused(false);
    setGameMode(null);
    setShowCountdown(false);
    setMaxScore(null); // Reset max score to null
    setDifficulty(null);
    setPostScoreCountdown(false);
    setPaddleResetToken((prev) => prev + 1);
  };

  const updateScore = (scorer) => {
    setPostScoreCountdown(true);
    setPaddleResetToken((prev) => prev + 1);
    if (scorer === 'blue') {
      setScoreBlue((prev) => prev + 1);
      if (scoreBlue + 1 === maxScore) {
        setWinner('Blue');
      }
    } else if (scorer === 'red') {
      setScoreRed((prev) => prev + 1);
      if (scoreRed + 1 === maxScore) {
        setWinner('Red');
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const chooseCamera = (option) => {
    setCameraOption(option);
    setShowCountdown(true); // Show countdown after choosing camera
  };

  const onCountdownComplete = () => {
    setShowCountdown(false);
    setGameStarted(true); // Start game after countdown completes
  };

  const onPostScoreCountdownComplete = () => {
    setPostScoreCountdown(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const selectGameMode = (mode) => {
    setGameMode(mode);
    setDifficulty(null);
    setMaxScore(null);
  };

  const selectMaxScore = (score) => {
    setMaxScore(score); // Set max score based on selection
  };

  const selectDifficulty = (level) => {
    setDifficulty(level);
  };

  const needsDifficulty = gameMode === 'singleplayer';

  const hasDifficulty = !needsDifficulty || !!difficulty;
  const overlayActive = showCountdown || postScoreCountdown;

  return (
    <>
      {/* Render game canvas only if camera and game mode have been chosen and countdown is complete */}
      {cameraOption && gameMode && hasDifficulty && gameStarted && !winner && (
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #17AEEB, #4682B4)',
            filter: overlayActive ? 'blur(5px)' : 'none',
          }}
          camera={
            cameraOption === 'default'
              ? { position: [0, 0, 10], fov: 80 }
              : { position: [0, -20, 15], fov: 50, near: 0.1, far: 1000 }
          }
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />

          {/* Blue Paddle controlled by Arrow Keys */}
          <Paddle
            position={[-8, 0, 0]}
            color="blue"
            isPlayer
            gameStarted={gameStarted}
            isPaused={isPaused || overlayActive}
            resetSignal={paddleResetToken}
            ref={paddleLeft}
          />

          <Paddle
            position={[8, 0, 0]}
            color="red"
            isRedPlayer
            gameStarted={gameStarted}
            isPaused={isPaused || overlayActive}
            isBot={gameMode === 'singleplayer'}
            botDifficulty={difficulty}
            ballPositionRef={ballPositionRef}
            resetSignal={paddleResetToken}
            ref={paddleRight}
          />

          {/* Ball only appears when game starts and remains when paused */}
          {gameStarted && !winner && (
            <Ball
              paddleLeft={paddleLeft}
              paddleRight={paddleRight}
              updateScore={updateScore}
              isPaused={isPaused || overlayActive}
              ballPositionRef={ballPositionRef}
            />
          )}

          {/* Boundary Lines */}
          <mesh position={[-8.5, 0, 0]}>
            <boxGeometry args={[0.4, 12, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[8.5, 0, 0]}>
            <boxGeometry args={[0.4, 12, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>

          {/* Back Boundary Lines */}
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

      {/* Display score and controls only if game is playing and not in countdown */}
      {gameStarted && cameraOption && gameMode && hasDifficulty && !overlayActive && (
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
          {/* Blue Control Image */}
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
          {/* Red Control Image only in multiplayer */}
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

      {/* Display max score selection if game mode is chosen but max score is not */}
      {gameMode && hasDifficulty && !maxScore && (
        <MaxScoreChoice
          onSelect={selectMaxScore}
          onBack={() => {
            if (gameMode === 'singleplayer') {
              setDifficulty(null);
            } else {
              setGameMode(null);
            }
          }}
        />
      )}

      {/* Display difficulty selection for singleplayer before max score */}
      {needsDifficulty && !difficulty && (
        <DifficultyChoice onSelect={selectDifficulty} onBack={() => setGameMode(null)} />
      )}

      {/* Display game mode selection if not chosen */}
      {!gameMode && gameStarted && (
        <GameModeChoice
          onSelect={selectGameMode}
          onBack={() => {
            setGameStarted(false);
            setCameraOption(null);
            setShowCountdown(false);
            setDifficulty(null);
            setMaxScore(null);
            setPostScoreCountdown(false);
          }}
        />
      )}

      {/* Display camera selection if game mode is chosen */}
      {!cameraOption && gameStarted && gameMode && maxScore && hasDifficulty && (
        <CameraChoice
          onChoose={chooseCamera}
          onBack={() => {
            setCameraOption(null);
            setShowCountdown(false);
            setPostScoreCountdown(false);
            setMaxScore(null);
          }}
        />
      )}

      {/* Display start button if game has not started */}
      {!gameStarted && !winner && <StartButton onClick={startGame} />}

      {/* Display pause button if game is playing and not in countdown */}
      {cameraOption && !winner && !overlayActive && (
        <PauseButton isPaused={isPaused} onClick={togglePause} />
      )}

      {/* Display winner message and play again button */}
      {winner && <PlayAgainButton winner={winner} onClick={resetGame} />}

      {/* Display countdown if camera is chosen */}
      {showCountdown && <Countdown onComplete={onCountdownComplete} />}

      {/* Post-score countdown */}
      {postScoreCountdown && !winner && (
        <Countdown key={`score-${scoreBlue}-${scoreRed}`} seconds={5} onComplete={onPostScoreCountdownComplete} />
      )}
    </>
  );
}

export default App;
