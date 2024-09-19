// src/components/Paddle.jsx
import { forwardRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Paddle = forwardRef(({ position, color, isPlayer = false, isRedPlayer = false, gameStarted, isPaused }, ref) => {
  const [currentY, setCurrentY] = useState(0); // Posisi Y saat ini
  const moveSpeed = 0.1; // Kecepatan gerakan paddle saat tombol ditekan
  const upperLimit = 4.3; // Batas atas yang diperluas agar bisa mencapai border
  const lowerLimit = -4.3; // Batas bawah yang diperluas agar bisa mencapai border

  // State untuk menampung tombol mana yang sedang ditekan
  const [upPressed, setUpPressed] = useState(false);
  const [downPressed, setDownPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || isPaused) return; // Jangan perbolehkan pergerakan jika game belum dimulai atau sedang di-pause

      if (isPlayer) {
        // Kontrol untuk Paddle Biru (Arrow Keys)
        if (e.key === 'ArrowUp') {
          setUpPressed(true); // Set state tombol 'up' ditekan
        }
        if (e.key === 'ArrowDown') {
          setDownPressed(true); // Set state tombol 'down' ditekan
        }
      } else if (isRedPlayer) {
        // Kontrol untuk Paddle Merah (W dan S Keys)
        if (e.key === 'w' || e.key === 'W') {
          setUpPressed(true); // Set state tombol 'w' ditekan
        }
        if (e.key === 's' || e.key === 'S') {
          setDownPressed(true); // Set state tombol 's' ditekan
        }
      }
    };

    const handleKeyUp = (e) => {
      if (isPlayer) {
        // Hentikan gerakan paddle biru saat tombol dilepas
        if (e.key === 'ArrowUp') {
          setUpPressed(false);
        }
        if (e.key === 'ArrowDown') {
          setDownPressed(false);
        }
      } else if (isRedPlayer) {
        // Hentikan gerakan paddle merah saat tombol dilepas
        if (e.key === 'w' || e.key === 'W') {
          setUpPressed(false);
        }
        if (e.key === 's' || e.key === 'S') {
          setDownPressed(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlayer, isRedPlayer, gameStarted, isPaused]);

  useFrame(() => {
    // Gerakkan paddle hanya jika tombol ditekan, game dimulai, dan tidak di-pause
    if (gameStarted && !isPaused) {
      if (upPressed) {
        setCurrentY((prevY) => Math.min(prevY + moveSpeed, upperLimit)); // Naikkan paddle
      }
      if (downPressed) {
        setCurrentY((prevY) => Math.max(prevY - moveSpeed, lowerLimit)); // Turunkan paddle
      }
    }

    if (ref.current) {
      ref.current.position.y = currentY;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[0.5, 3, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
});

export default Paddle;
