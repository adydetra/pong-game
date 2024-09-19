// src/components/Paddle.jsx
import { forwardRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Paddle = forwardRef(({ position, color, isPlayer = false, isRedPlayer = false, isBot = false, gameStarted, isPaused }, ref) => {
  const [currentY, setCurrentY] = useState(0); // Posisi Y saat ini
  const moveSpeed = 0.1; // Kecepatan gerakan paddle saat tombol ditekan
  const upperLimit = 4.3; // Batas atas yang diperluas agar bisa mencapai border
  const lowerLimit = -4.3; // Batas bawah yang diperluas agar bisa mencapai border

  // State untuk menampung tombol mana yang sedang ditekan
  const [upPressed, setUpPressed] = useState(false);
  const [downPressed, setDownPressed] = useState(false);
  
  // State untuk arah gerakan bot
  const [botDirection, setBotDirection] = useState(4); // 1 untuk naik, -1 untuk turun

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || isPaused) return; // Jangan perbolehkan pergerakan jika game belum dimulai atau sedang di-pause

      if (isPlayer) {
        // Kontrol untuk Paddle Biru (W dan S Keys)
        if (e.key === 'w' || e.key === 'W') {
          setUpPressed(true); // Set state tombol 'w' ditekan
        }
        if (e.key === 's' || e.key === 'S') {
          setDownPressed(true); // Set state tombol 's' ditekan
        }
      } else if (isRedPlayer) {
        // Kontrol untuk Paddle Merah (Arrow Keys)
        if (e.key === 'ArrowUp') {
          setUpPressed(true); // Set state tombol 'up' ditekan
        }
        if (e.key === 'ArrowDown') {
          setDownPressed(true); // Set state tombol 'down' ditekan
        }
      }
    };

    const handleKeyUp = (e) => {
      if (isPlayer) {
        // Hentikan gerakan paddle biru saat tombol dilepas
        if (e.key === 'w' || e.key === 'W') {
          setUpPressed(false);
        }
        if (e.key === 's' || e.key === 'S') {
          setDownPressed(false);
        }
      } else if (isRedPlayer) {
        // Hentikan gerakan paddle merah saat tombol dilepas
        if (e.key === 'ArrowUp') {
          setUpPressed(false);
        }
        if (e.key === 'ArrowDown') {
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
    // Logika bot untuk gerakan acak
    if (isBot && gameStarted && !isPaused) {
      // Update posisi paddle dengan arah gerakan bot
      setCurrentY((prevY) => {
        let newY = prevY + botDirection * 0.05; // Gerakkan paddle sedikit ke atas atau bawah
        if (newY >= upperLimit || newY <= lowerLimit) {
          setBotDirection(-botDirection); // Ubah arah jika mencapai batas
        }
        return Math.max(lowerLimit, Math.min(newY, upperLimit)); // Pastikan tetap di batas
      });
    }

    // Gerakkan paddle hanya jika tombol ditekan dan game dimulai
    if (gameStarted && !isBot && !isPaused) {
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
