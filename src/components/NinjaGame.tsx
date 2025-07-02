
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
  collected: boolean;
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
    y: 200,
    width: 40,
    height: 40
  });
  const [isJumping, setIsJumping] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);
  const [moneyBags, setMoneyBags] = useState<Money[]>([]);
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [clouds, setClouds] = useState<CloudObject[]>([]);
  const [invulnerable, setInvulnerable] = useState(false);

  const GROUND_Y = 200;
  const JUMP_HEIGHT = 80;
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
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameStarted(true);
  }, [resetGame]);

  const jump = useCallback(() => {
    if (!gameOver && gameStarted && jumpCount < MAX_JUMPS) {
      setIsJumping(true);
      const newJumpCount = jumpCount + 1;
      setJumpCount(newJumpCount);
      
      const jumpHeight = newJumpCount === 1 ? JUMP_HEIGHT : DOUBLE_JUMP_HEIGHT;
      const targetY = newJumpCount === 1 ? GROUND_Y - JUMP_HEIGHT : GROUND_Y - JUMP_HEIGHT - DOUBLE_JUMP_HEIGHT;
      
      setNinja(prev => ({ ...prev, y: targetY }));
      
      // Salto mais rápido - reduzido de 600ms para 400ms
      setTimeout(() => {
        setNinja(prev => ({ ...prev, y: GROUND_Y }));
        setIsJumping(false);
        setJumpCount(0);
      }, 400);
    }
  }, [gameOver, gameStarted, jumpCount]);

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

  const loseLife = useCallback(() => {
    if (invulnerable) return;
    
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameOver(true);
      }
      return newLives;
    });
    
    setInvulnerable(true);
    setTimeout(() => setInvulnerable(false), 2000); // 2 segundos de invulnerabilidade
  }, [invulnerable]);

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

      // Spawn money bags
      setMoneyBags(prev => {
        if (Math.random() < 0.01 && (prev.length === 0 || prev[prev.length - 1].x < 500)) {
          return [...prev, {
            x: 800,
            y: Math.random() < 0.5 ? GROUND_Y - 60 : GROUND_Y - 120,
            width: 30,
            height: 30,
            collected: false
          }];
        }
        return prev;
      });

      // Spawn obstacles
      setObstacles(prev => {
        if (Math.random() < 0.008 && (prev.length === 0 || prev[prev.length - 1].x < 400)) {
          return [...prev, {
            x: 800,
            y: GROUND_Y - 30,
            width: 30,
            height: 30
          }];
        }
        return prev;
      });

      // Spawn clouds
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

  useEffect(() => {
    if (!gameStarted || gameOver || invulnerable) return;

    const collisionCheck = setInterval(() => {
      // Check money collection
      setMoneyBags(prev => prev.map(money => {
        if (!money.collected && checkCollision(ninja, money)) {
          setScore(s => s + 10);
          return { ...money, collected: true };
        }
        return money;
      }));

      // Check obstacle collision
      obstacles.forEach(obstacle => {
        if (checkCollision(ninja, obstacle)) {
          loseLife();
        }
      });
    }, 16);

    return () => clearInterval(collisionCheck);
  }, [ninja, obstacles, gameStarted, gameOver, checkCollision, loseLife, invulnerable]);

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

        {/* Clouds */}
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
          className={`absolute text-4xl transition-all duration-300 ${invulnerable ? 'animate-pulse opacity-50' : ''}`}
          style={{
            left: ninja.x,
            bottom: 280 - ninja.y - ninja.height,
            width: ninja.width,
            height: ninja.height,
            transform: isJumping ? 'translateY(-10px) rotate(15deg)' : 'translateY(0) rotate(0deg)',
          }}
        >
          🥷
        </div>

        {moneyBags.map((money, index) => (
          !money.collected && (
            <div
              key={index}
              className="absolute text-2xl animate-bounce"
              style={{
                left: money.x,
                bottom: 280 - money.y - money.height,
                width: money.width,
                height: money.height
              }}
            >
              💰
            </div>
          )
        ))}

        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            className="absolute text-2xl"
            style={{
              left: obstacle.x,
              bottom: 280 - obstacle.y - obstacle.height,
              width: obstacle.width,
              height: obstacle.height
            }}
          >
            🪨
          </div>
        ))}

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
