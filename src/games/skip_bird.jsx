import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SkipBird({ user, onProgress }) {
  const mountRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Initialize Three.js scene
    const width = mountRef.current.clientWidth;
    const height = Math.min(window.innerHeight * 0.7, 600);
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.002);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create bird
    const birdGeometry = new THREE.SphereGeometry(1, 32, 32);
    const birdMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff69b4,
      shininess: 100,
      specular: 0xffffff
    });
    const bird = new THREE.Mesh(birdGeometry, birdMaterial);
    bird.castShadow = true;
    bird.position.y = 5;
    scene.add(bird);

    // Create pipes
    const pipes = [];
    const pipeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4caf50,
      shininess: 30 
    });

    function createPipePair(xPos) {
      const gapHeight = 10;
      const gapPosition = Math.random() * 10 + 5;

      // Bottom pipe
      const bottomPipeGeometry = new THREE.BoxGeometry(5, gapPosition, 5);
      const bottomPipe = new THREE.Mesh(bottomPipeGeometry, pipeMaterial);
      bottomPipe.position.set(xPos, gapPosition / 2, 0);
      bottomPipe.receiveShadow = true;
      scene.add(bottomPipe);

      // Top pipe
      const topPipeHeight = height / 10 - gapPosition - gapHeight;
      const topPipeGeometry = new THREE.BoxGeometry(5, topPipeHeight, 5);
      const topPipe = new THREE.Mesh(topPipeGeometry, pipeMaterial);
      topPipe.position.set(xPos, gapPosition + gapHeight + topPipeHeight / 2, 0);
      topPipe.receiveShadow = true;
      scene.add(topPipe);

      pipes.push({ 
        bottom: bottomPipe, 
        top: topPipe,
        x: xPos,
        passed: false
      });
    }

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(200, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b4513,
      shininess: 10 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Game variables
    let birdVelocity = 0;
    const gravity = 0.2;
    const jumpForce = -5;
    let gameSpeed = 0.5;
    let lastPipeTime = 0;
    let animationId;
    let gameActive = false;

    // Add clouds
    const clouds = [];
    const cloudGeometry = new THREE.SphereGeometry(2, 16, 16);
    const cloudMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 5; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        Math.random() * 100 - 50,
        Math.random() * 20 + 10,
        Math.random() * 20 - 10
      );
      cloud.scale.set(1 + Math.random(), 0.5 + Math.random(), 1 + Math.random());
      scene.add(cloud);
      clouds.push(cloud);
    }

    // Handle window resize
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = Math.min(window.innerHeight * 0.7, 600);
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Game controls
    const handleJump = () => {
      if (!gameActive && !gameOver) {
        gameActive = true;
        setGameStarted(true);
      }
      if (gameActive) {
        birdVelocity = jumpForce;
      }
    };

    // Add event listeners
    window.addEventListener('click', handleJump);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') handleJump();
    });

    // Game loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (gameActive && !gameOver) {
        // Bird physics
        birdVelocity += gravity;
        bird.position.y += birdVelocity * 0.1;

        // Rotate bird based on velocity
        bird.rotation.z = birdVelocity * 0.1;

        // Check collisions with ground and ceiling
        if (bird.position.y < 0.5) {
          bird.position.y = 0.5;
          gameActive = false;
          setGameOver(true);
          if (onProgress) onProgress(score);
        }

        if (bird.position.y > 19) {
          bird.position.y = 19;
          birdVelocity = 0;
        }

        // Move pipes
        const currentTime = Date.now();
        if (currentTime - lastPipeTime > 2000) {
          createPipePair(30);
          lastPipeTime = currentTime;
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
          const pipe = pipes[i];
          pipe.x -= gameSpeed;

          pipe.bottom.position.x = pipe.x;
          pipe.top.position.x = pipe.x;

          // Check if passed pipe
          if (pipe.x < bird.position.x && !pipe.passed) {
            pipe.passed = true;
            setScore(prev => prev + 1);
            gameSpeed += 0.02;
          }

          // Check collision with pipes
          if (
            bird.position.x + 1 > pipe.x - 2.5 &&
            bird.position.x - 1 < pipe.x + 2.5 &&
            (bird.position.y - 1 < pipe.bottom.position.y + pipe.bottom.geometry.parameters.height / 2 ||
             bird.position.y + 1 > pipe.top.position.y - pipe.top.geometry.parameters.height / 2)
          ) {
            gameActive = false;
            setGameOver(true);
            if (onProgress) onProgress(score);
          }

          // Remove pipes that are off screen
          if (pipe.x < -20) {
            scene.remove(pipe.bottom);
            scene.remove(pipe.top);
            pipes.splice(i, 1);
          }
        }

        // Move clouds
        clouds.forEach(cloud => {
          cloud.position.x -= gameSpeed * 0.2;
          if (cloud.position.x < -50) {
            cloud.position.x = 50;
            cloud.position.y = Math.random() * 20 + 10;
            cloud.position.z = Math.random() * 20 - 10;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleJump);
      window.removeEventListener('keydown', handleJump);
      cancelAnimationFrame(animationId);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [onProgress]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div 
        ref={mountRef} 
        className="w-full rounded-xl shadow-2xl overflow-hidden"
        style={{ height: Math.min(window.innerHeight * 0.7, 600) }}
      />
      
      {/* Game UI */}
      <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
        <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          Score: <span className="font-bold">{score}</span>
        </div>
        
        {!gameStarted && !gameOver && (
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg animate-pulse">
            Click or press SPACE to start
          </div>
        )}
        
        {gameOver && (
          <button 
            onClick={restartGame}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Play Again
          </button>
        )}
      </div>
      
      {/* Controls info */}
      <div className="mt-2 text-center text-gray-600">
        {gameStarted && !gameOver && (
          <p className="text-sm">Click or press SPACE to jump</p>
        )}
      </div>
    </div>
  );
}

export default SkipBird;