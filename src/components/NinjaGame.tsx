import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Money extends GameObject {
  id: number;
  collected: boolean;
}

interface Obstacle extends GameObject {
  id: number;
}

interface CloudObject extends GameObject {
  speed: number;
}

const NinjaGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [ninja, setNinja] = useState<GameObject>({
    x: 50,
    y: 320, // Posição no chão (altura do container - altura do ninja)
    width: 40,
    height: 40
  });
  const [isJumping, setIsJumping] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);
  const [moneyBags, setMoneyBags] = useState<Money[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [clouds, setClouds] = useState<CloudObject[]>([]);
  const [invulnerable, setInvulnerable] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const GROUND_Y = 320; // Altura do chão no sistema de coordenadas
  const JUMP_HEIGHT = 100;
  const DOUBLE_JUMP_HEIGHT = 60;
  const GAME_SPEED = 2;
  const MAX_JUMPS = 2;

  const resetGame = useCallback(() => {
    setGameOver(false);
    setScore(0);
    setLives(3);
    setNinja({ x: 50, y: GROUND_Y, width: 40, height: 40 });
    setIsJumping(false);
    setJumpCount(0);
    setMoneyBags([]);
    setObstacles([]);
    setClouds([]);
    setInvulnerable(false);
    setIsFalling(false);
    setShowCongratulations(false);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameStarted(true);
  }, [resetGame]);

  const jump = useCallback(() => {
    if (!gameOver && gameStarted && jumpCount < MAX_JUMPS && !isFalling) {
      setIsJumping(true);
      const newJumpCount = jumpCount + 1;
      setJumpCount(newJumpCount);
      
      const jumpHeight = newJumpCount === 1 ? JUMP_HEIGHT : DOUBLE_JUMP_HEIGHT;
      const targetY = newJumpCount === 1 ? GROUND_Y - JUMP_HEIGHT : GROUND_Y - JUMP_HEIGHT - DOUBLE_JUMP_HEIGHT;
      
      setNinja(prev => ({ ...prev, y: targetY }));
      
      setTimeout(() => {
        setNinja(prev => ({ ...prev, y: GROUND_Y }));
        setIsJumping(false);
        setJumpCount(0);
      }, 600);
    }
  }, [gameOver, gameStarted, jumpCount, isFalling]);

  const handleGameClick = useCallback(() => {
    if (!gameStarted) {
      startGame();
    } else {
      jump();
    }
  }, [gameStarted, startGame, jump]);

  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject) => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }, []);

  const makeNinjaFall = useCallback(() => {
    setIsFalling(true);
    setIsJumping(false);
    setJumpCount(0);
    
    const fallAnimation = setInterval(() => {
      setNinja(prev => {
        const newY = prev.y + 15;
        if (newY >= GROUND_Y) {
          clearInterval(fallAnimation);
          setIsFalling(false);
          return { ...prev, y: GROUND_Y };
        }
        return { ...prev, y: newY };
      });
    }, 30);
  }, []);

  const loseLife = useCallback(() => {
    if (invulnerable || isFalling) return;
    
    console.log('Ninja perdeu uma vida!');
    makeNinjaFall();
    
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameOver(true);
        setGameStarted(false);
      }
      return newLives;
    });
    
    setInvulnerable(true);
    setTimeout(() => setInvulnerable(false), 2000);
  }, [invulnerable, isFalling, makeNinjaFall]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleGameClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleGameClick]);

  useEffect(() => {
    if (score >= 30 && !showCongratulations) {
      setShowCongratulations(true);
      setTimeout(() => setShowCongratulations(false), 3000);
    }
  }, [score, showCongratulations]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move money bags
      setMoneyBags(prev => prev.map(money => ({
        ...money,
        x: money.x - GAME_SPEED
      })).filter(money => money.x > -50));

      // Move obstacles
      setObstacles(prev => prev.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - GAME_SPEED
      })).filter(obstacle => obstacle.x > -50));

      // Move clouds
      setClouds(prev => prev.map(cloud => ({
        ...cloud,
        x: cloud.x - cloud.speed
      })).filter(cloud => cloud.x > -100));

      // Spawn new money bags
      setMoneyBags(prev => {
        if (Math.random() < 0.015 && (prev.length === 0 || prev[prev.length - 1].x < 500)) {
          const newId = Date.now();
          const isAirborne = Math.random() < 0.5;
          return [...prev, {
            id: newId,
            x: 800,
            y: isAirborne ? GROUND_Y - 80 : GROUND_Y - 30, // Posições relativas ao chão
            width: 30,
            height: 30,
            collected: false
          }];
        }
        return prev;
      });

      // Spawn new obstacles
      setObstacles(prev => {
        if (Math.random() < 0.012 && (prev.length === 0 || prev[prev.length - 1].x < 300)) {
          const newId = Date.now();
          return [...prev, {
            id: newId,
            x: 800,
            y: GROUND_Y - 30, // No chão
            width: 30,
            height: 30
          }];
        }
        return prev;
      });

      // Spawn new clouds
      setClouds(prev => {
        if (Math.random() < 0.005 && (prev.length === 0 || prev[prev.length - 1].x < 600)) {
          return [...prev, {
            x: 800,
            y: 50 + Math.random() * 80,
            width: 60,
            height: 30,
            speed: 0.5 + Math.random() * 0.5
          }];
        }
        return prev;
      });

    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const collisionCheck = setInterval(() => {
      // Check money collection
      moneyBags.forEach(money => {
        if (!money.collected && checkCollision(ninja, money)) {
          console.log('Ninja coletou dinheiro!');
          setScore(s => s + 10);
          setMoneyBags(prev => prev.map(m => 
            m.id === money.id ? { ...m, collected: true } : m
          ));
        }
      });

      // Check obstacle collisions
      obstacles.forEach(obstacle => {
        if (!invulnerable && !isFalling && checkCollision(ninja, obstacle)) {
          console.log('Ninja colidiu com obstáculo!');
          loseLife();
        }
      });
    }, 16);

    return () => clearInterval(collisionCheck);
  }, [gameStarted, gameOver, ninja, obstacles, moneyBags, checkCollision, loseLife, invulnerable, isFalling]);

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white cursor-pointer" onClick={handleGameClick}>
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🥷 Ninja do Dinheiro</h3>
          <p className="mb-6">Ajude o ninja a coletar sacos de dinheiro! Use ESPAÇO, ↑ ou clique/toque para pular. Duplo clique para duplo salto!</p>
          <Button onClick={startGame} size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Começar Jogo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-b from-sky-300 to-green-300 relative overflow-hidden cursor-pointer" onClick={handleGameClick}>
      <CardContent className="p-0 h-80 relative">
        <div className="absolute top-4 right-4 text-2xl font-bold text-white z-10 bg-black bg-opacity-50 px-3 py-1 rounded">
          💰 {score}
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="h-5 w-5 fill-red-500 text-red-500" />
          ))}
        </div>

        <div className="absolute top-16 left-4 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Saltos: {jumpCount}/{MAX_JUMPS}
        </div>

        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-green-600 to-green-400"></div>

        <div className="absolute top-8 right-20 text-4xl">☀️</div>
        <div className="absolute bottom-20 left-60 text-4xl opacity-80">🏔️</div>
        <div className="absolute bottom-20 right-40 text-3xl opacity-70">⛰️</div>
        <div className="absolute bottom-20 left-20 text-3xl">🌳</div>
        <div className="absolute bottom-20 right-80 text-2xl">🌲</div>

        {clouds.map((cloud, index) => (
          <div
            key={index}
            className="absolute text-3xl opacity-70"
            style={{
              left: cloud.x,
              top: cloud.y,
              width: cloud.width,
              height: cloud.height
            }}
          >
            ☁️
          </div>
        ))}

        <div
          className={`absolute text-4xl transition-all duration-200 ${invulnerable ? 'animate-pulse opacity-50' : ''} ${isFalling ? 'animate-bounce' : ''}`}
          style={{
            left: ninja.x,
            top: ninja.y,
            width: ninja.width,
            height: ninja.height,
            transform: isJumping ? 'translateY(-10px) rotate(15deg)' : isFalling ? 'rotate(180deg)' : 'translateY(0) rotate(0deg)',
          }}
        >
          🥷
        </div>

        {moneyBags.map((money) => (
          !money.collected && (
            <div
              key={money.id}
              className="absolute text-2xl animate-bounce"
              style={{
                left: money.x,
                top: money.y,
                width: money.width,
                height: money.height
              }}
            >
              💰
            </div>
          )
        ))}

        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className="absolute text-2xl"
            style={{
              left: obstacle.x,
              top: obstacle.y,
              width: obstacle.width,
              height: obstacle.height
            }}
          >
            🪨
          </div>
        ))}

        {showCongratulations && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-lg text-center animate-pulse">
              <h3 className="text-3xl font-bold text-white mb-4">🎉 PARABÉNS! 🎉</h3>
              <p className="text-xl text-white mb-2">Você coletou 3 sacos de dinheiro!</p>
              <p className="text-lg text-yellow-100">Continue coletando para mais aventuras!</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h3>
              <p className="text-lg text-gray-600 mb-2">Dinheiro Coletado: 💰 {score}</p>
              <p className="text-md text-gray-500 mb-4">Você teve uma boa aventura ninja!</p>
              <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                Jogar Novamente
              </Button>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          ESPAÇO/↑/CLIQUE: pular | DUPLO CLIQUE: duplo salto
        </div>
      </CardContent>
    </Card>
  );
};

export default NinjaGame;
