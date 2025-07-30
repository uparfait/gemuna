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

}