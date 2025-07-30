import React, { useRef, useEffect } from 'react';

function SkipBird({ user, onProgress }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Placeholder for skip bird game logic
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 320, 480);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Skip Bird Game', 60, 240);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={320} height={480} className="rounded-lg shadow-2xl border-4 border-blue-500 bg-black" />
      <p className="mt-2 text-blue-300">Skip obstacles!</p>
    </div>
  );
}
export default SkipBird;
