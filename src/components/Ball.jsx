// src/components/Ball.jsx
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function Ball({ paddleLeft, paddleRight, updateScore, isPaused }) {
  const ref = useRef();

  // Fungsi untuk menghasilkan arah kecepatan acak
  const getRandomDirection = () => {
    // Menghasilkan nilai acak antara -1 dan 1 untuk X dan Y, kemudian menormalkan
    const directionX = Math.random() < 0.5 ? -1 : 1; // Tentukan apakah X positif atau negatif
    const directionY = Math.random() < 0.5 ? -1 : 1; // Tentukan apakah Y positif atau negatif
    return [directionX * 0.1, directionY * 0.04]; // Atur besar kecepatan
  };

  // Inisialisasi velocity dengan arah acak saat game pertama kali dimulai
  const [velocity, setVelocity] = useState(getRandomDirection);
  const speedIncrease = 1.1; // Faktor peningkatan kecepatan bola

  useFrame(() => {
    // Jika game di-pause, hentikan bola
    if (isPaused) return;

    ref.current.position.x += velocity[0];
    ref.current.position.y += velocity[1];

    // Deteksi tabrakan dengan dinding (batas atas dan bawah)
    if (ref.current.position.y > 5.5 || ref.current.position.y < -5.5) {
      setVelocity(([vx, vy]) => [vx, -vy]); // Pantulkan bola di batas atas/bawah
    }

    // Deteksi tabrakan dengan paddle kanan
    if (
      ref.current.position.x > 7.5 &&
      ref.current.position.x < 8.5 &&
      Math.abs(ref.current.position.y - paddleRight.current.position.y) < 2
    ) {
      // Pantulkan bola ke kiri dan tingkatkan kecepatan
      setVelocity(([vx, vy]) => [-Math.abs(vx) * speedIncrease, vy * speedIncrease]);
      ref.current.position.x = 7.5; // Jaga agar bola tidak keluar dari paddle
    }

    // Deteksi tabrakan dengan paddle kiri
    if (
      ref.current.position.x < -7.5 &&
      ref.current.position.x > -8.5 &&
      Math.abs(ref.current.position.y - paddleLeft.current.position.y) < 2
    ) {
      // Pantulkan bola ke kanan dan tingkatkan kecepatan
      setVelocity(([vx, vy]) => [Math.abs(vx) * speedIncrease, vy * speedIncrease]);
      ref.current.position.x = -7.5; // Jaga agar bola tidak keluar dari paddle
    }

    // Deteksi jika bola melewati paddle kanan (Skor untuk biru)
    if (ref.current.position.x > 7.7) {
      updateScore('blue');
      ref.current.position.x = 0; // Reset posisi bola ke tengah
      ref.current.position.y = 0; // Reset posisi bola ke tengah
      setVelocity(getRandomDirection()); // Set kecepatan acak untuk arah bola
    }

    // Deteksi jika bola melewati paddle kiri (Skor untuk merah)
    if (ref.current.position.x < -7.7) {
      updateScore('red');
      ref.current.position.x = 0; // Reset posisi bola ke tengah
      ref.current.position.y = 0; // Reset posisi bola ke tengah
      setVelocity(getRandomDirection()); // Set kecepatan acak untuk arah bola
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
