import React, { useRef, useEffect } from 'react';

function SkitBirdGame({ user, onProgress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Simple bird game placeholder
    let y = 100, vy = 0, gravity = 0.5, jump = -8, score = 0, running = true;
    function draw() {
      ctx.clearRect(0, 0, 320, 480);
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, 320, 480);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(60, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = '20px Arial';
      ctx.fillText('Score: ' + score, 10, 30);
    }
    function update() {
      vy += gravity;
      y += vy;
      if (y > 460) { y = 460; vy = 0; running = false; }
      if (y < 20) { y = 20; vy = 0; }
      score++;
      draw();
      if (running) requestAnimationFrame(update);
      else if (onProgress) onProgress(score);
    }
    function jumpBird() { vy = jump; }
    canvas.addEventListener('click', jumpBird);
    update();
    return () => canvas.removeEventListener('click', jumpBird);
  }, [onProgress]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={320} height={480} className="rounded-lg shadow-2xl border-4 border-pink-500 bg-black" />
      <p className="mt-2 text-pink-300">Click to jump!</p>
    </div>
  );
}

export default SkitBirdGame;
