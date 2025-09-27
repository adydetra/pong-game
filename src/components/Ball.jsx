// src/components/Ball.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Ball({ paddleLeft, paddleRight, updateScore, isPaused, ballPositionRef }) {
  const ref = useRef();

  // Fungsi untuk menghasilkan arah kecepatan acak
  const getRandomDirection = () => {
    const horizontalSpeed = 0.1 + Math.random() * 0.05; // 0.10 - 0.15
    const verticalSpeed = 0.03 + Math.random() * 0.05; // 0.03 - 0.08
    const directionX = Math.random() < 0.5 ? -1 : 1;
    const directionY = Math.random() < 0.5 ? -1 : 1;

    return {
      x: directionX * horizontalSpeed,
      y: directionY * verticalSpeed,
    };
  };

  // Inisialisasi velocity dengan arah acak saat game pertama kali dimulai
  const velocity = useRef(getRandomDirection());
  const speedIncrease = 1.1; // Faktor peningkatan kecepatan bola

  useFrame(() => {
    // Jika game di-pause, hentikan bola
    if (isPaused) return;

    ref.current.position.x += velocity.current.x;
    ref.current.position.y += velocity.current.y;

    // Deteksi tabrakan dengan dinding (batas atas dan bawah)
    if (ref.current.position.y > 5.5 || ref.current.position.y < -5.5) {
      velocity.current.y = -velocity.current.y; // Pantulkan bola di batas atas/bawah
    }

    // Deteksi tabrakan dengan paddle kanan
    if (
      ref.current.position.x > 7.5 &&
      ref.current.position.x < 8.5 &&
      Math.abs(ref.current.position.y - paddleRight.current.position.y) < 2
    ) {
      // Pantulkan bola ke kiri dan tingkatkan kecepatan
      velocity.current.x = -Math.abs(velocity.current.x) * speedIncrease;
      velocity.current.y = velocity.current.y * speedIncrease;
      ref.current.position.x = 7.5; // Jaga agar bola tidak keluar dari paddle
    }

    // Deteksi tabrakan dengan paddle kiri
    if (
      ref.current.position.x < -7.5 &&
      ref.current.position.x > -8.5 &&
      Math.abs(ref.current.position.y - paddleLeft.current.position.y) < 2
    ) {
      // Pantulkan bola ke kanan dan tingkatkan kecepatan
      velocity.current.x = Math.abs(velocity.current.x) * speedIncrease;
      velocity.current.y = velocity.current.y * speedIncrease;
      ref.current.position.x = -7.5; // Jaga agar bola tidak keluar dari paddle
    }

    // Deteksi jika bola melewati paddle kanan (Skor untuk biru)
    if (ref.current.position.x > 7.7) {
      updateScore('blue');
      ref.current.position.x = 0; // Reset posisi bola ke tengah
      ref.current.position.y = 0; // Reset posisi bola ke tengah
      velocity.current = getRandomDirection(); // Set kecepatan acak untuk arah bola
    }

    // Deteksi jika bola melewati paddle kiri (Skor untuk merah)
    if (ref.current.position.x < -7.7) {
      updateScore('red');
      ref.current.position.x = 0; // Reset posisi bola ke tengah
      ref.current.position.y = 0; // Reset posisi bola ke tengah
      velocity.current = getRandomDirection(); // Set kecepatan acak untuk arah bola
    }

    if (ballPositionRef && ref.current) {
      ballPositionRef.current = {
        x: ref.current.position.x,
        y: ref.current.position.y,
        vx: velocity.current.x,
        vy: velocity.current.y,
      };
    }
  });

  return (
    <mesh position={[0, 0, 0]} ref={ref}>
      <sphereGeometry args={[0.4, 32, 32]} /> {/* Ukuran bola */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Ball;
