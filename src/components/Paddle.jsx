// src/components/Paddle.jsx
import { forwardRef, useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const DIFFICULTY_CONFIG = {
  easy: {
    chaseSpeed: 0.085,
    returnSpeed: 0.06,
    trackThresholdX: 2.5,
    errorChance: 0.4,
    errorMagnitude: 1.6,
    errorInterval: 0.35,
    trackingAggression: 0.85,
    deadZone: 0.12,
    microJitter: 0.08,
  },
  medium: {
    chaseSpeed: 0.13,
    returnSpeed: 0.1,
    trackThresholdX: 1.2,
    errorChance: 0.18,
    errorMagnitude: 0.8,
    errorInterval: 0.28,
    trackingAggression: 0.95,
    deadZone: 0.08,
    microJitter: 0.03,
  },
  hard: {
    chaseSpeed: 0.2,
    returnSpeed: 0.15,
    trackThresholdX: -1,
    errorChance: 0.05,
    errorMagnitude: 0.3,
    errorInterval: 0.22,
    trackingAggression: 1.05,
    deadZone: 0.05,
    microJitter: 0.01,
  },
};

const Paddle = forwardRef(
  (
    {
      position,
      color,
      isPlayer = false,
      isRedPlayer = false,
      isBot = false,
      botDifficulty = 'medium',
      gameStarted,
      isPaused,
      ballPositionRef,
    },
    ref,
  ) => {
    const initialY = position[1] ?? 0;
    const [currentY, setCurrentY] = useState(initialY); // Posisi Y saat ini
    const currentYRef = useRef(initialY);
    const moveSpeed = 0.1; // Kecepatan gerakan paddle saat tombol ditekan
    const upperLimit = 4.3; // Batas atas yang diperluas agar bisa mencapai border
    const lowerLimit = -4.3; // Batas bawah yang diperluas agar bisa mencapai border

    // State untuk menampung tombol mana yang sedang ditekan
    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);

    const errorOffsetRef = useRef(0);
    const errorTimerRef = useRef(0);

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

    useEffect(() => {
      currentYRef.current = currentY;
      if (ref.current) {
        ref.current.position.y = currentY;
      }
    }, [currentY, ref]);

    const clampY = (value) => Math.max(lowerLimit, Math.min(value, upperLimit));

    useFrame((_, delta) => {
      let nextY = currentYRef.current;

      if (isBot && gameStarted && !isPaused && ballPositionRef?.current) {
        const difficultyKey = typeof botDifficulty === 'string' ? botDifficulty.toLowerCase() : 'medium';
        const config = DIFFICULTY_CONFIG[difficultyKey] ?? DIFFICULTY_CONFIG.medium;
        const { y: ballY = 0, vx = 0, x: ballX = 0 } = ballPositionRef.current;
        const movingTowardsBot = vx > 0;
        const shouldChase = movingTowardsBot && ballX >= config.trackThresholdX;
        const deltaFactor = Math.min(delta * 60, 3);

        errorTimerRef.current += delta;
        if (errorTimerRef.current >= config.errorInterval) {
          errorTimerRef.current = 0;
          const shouldMakeError = Math.random() < config.errorChance;
          errorOffsetRef.current = shouldMakeError
            ? (Math.random() * 2 - 1) * config.errorMagnitude
            : 0;
        }

        if (!shouldChase) {
          errorOffsetRef.current *= 0.92;
          if (Math.abs(errorOffsetRef.current) < 0.05) {
            errorOffsetRef.current = 0;
          }
        }

        const targetY = shouldChase
          ? ballY * config.trackingAggression + errorOffsetRef.current + (Math.random() - 0.5) * config.microJitter
          : (0 + errorOffsetRef.current * 0.15);

        const speed = (shouldChase ? config.chaseSpeed : config.returnSpeed) * deltaFactor;
        const diff = targetY - nextY;

        if (Math.abs(diff) > config.deadZone) {
          const step = Math.sign(diff) * Math.min(Math.abs(diff), speed);
          nextY += step;
        }
      }

      if (gameStarted && !isBot && !isPaused) {
        const deltaFactor = Math.min(delta * 60, 3);
        const frameSpeed = moveSpeed * deltaFactor;

        if (upPressed) {
          nextY = Math.min(nextY + frameSpeed, upperLimit); // Naikkan paddle
        }
        if (downPressed) {
          nextY = Math.max(nextY - frameSpeed, lowerLimit); // Turunkan paddle
        }
      }

      nextY = clampY(nextY);

      if (Math.abs(nextY - currentYRef.current) > 0.0001) {
        currentYRef.current = nextY;
        setCurrentY(nextY);
      }

      if (ref.current) {
        ref.current.position.y = currentYRef.current;
      }
    });

    return (
      <mesh position={position} ref={ref}>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  },
);

export default Paddle;
