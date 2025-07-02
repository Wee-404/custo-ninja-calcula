
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Money extends GameObject {
  collected: boolean;
}

const NinjaGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [ninja, setNinja] = useState<GameObject>({
    x: 50,
    y: 200,
    width: 40,
    height: 40
  });
  const [isJumping, setIsJumping] = useState(false);
  const [moneyBags, setMoneyBags] = useState<Money[]>([]);
  const [obstacles, setObstacles] = useState<GameObject[]>([]);

  const GROUND_Y = 200;
  const JUMP_HEIGHT = 80;
  const GAME_SPEED = 2;

  const resetGame = useCallback(() => {
    setGameOver(false);
    setScore(0);
    setNinja({ x: 50, y: GROUND_Y, width: 40, height: 40 });
    setIsJumping(false);
    setMoneyBags([]);
    setObstacles([]);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameStarted(true);
  }, [resetGame]);

  const jump = useCallback(() => {
    if (!isJumping && !gameOver && gameStarted) {
      setIsJumping(true);
      setNinja(prev => ({ ...prev, y: GROUND_Y - JUMP_HEIGHT }));
      
      setTimeout(() => {
        setNinja(prev => ({ ...prev, y: GROUND_Y }));
        setIsJumping(false);
      }, 600);
    }
  }, [isJumping, gameOver, gameStarted]);

  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject) => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!gameStarted) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, jump, startGame]);

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

    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  // Separate effect for collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

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
          setGameOver(true);
        }
      });
    }, 16);

    return () => clearInterval(collisionCheck);
  }, [ninja, obstacles, gameStarted, gameOver, checkCollision]);

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🥷 Ninja do Dinheiro</h3>
          <p className="mb-6">Ajude o ninja a coletar sacos de dinheiro! Use ESPAÇO ou ↑ para pular.</p>
          <Button onClick={startGame} size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Começar Jogo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-b from-sky-300 to-green-300 relative overflow-hidden">
      <CardContent className="p-0 h-80 relative">
        {/* Score */}
        <div className="absolute top-4 right-4 text-2xl font-bold text-white z-10 bg-black bg-opacity-50 px-3 py-1 rounded">
          💰 {score}
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-green-600 to-green-400"></div>

        {/* Ninja */}
        <div
          className="absolute text-4xl transition-all duration-300"
          style={{
            left: ninja.x,
            bottom: 280 - ninja.y - ninja.height,
            width: ninja.width,
            height: ninja.height,
            transform: isJumping ? 'translateY(-10px)' : 'translateY(0)',
          }}
        >
          🥷
        </div>

        {/* Money Bags */}
        {moneyBags.map((money, index) => (
          !money.collected && (
            <div
              key={index}
              className="absolute text-2xl animate-pulse"
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

        {/* Obstacles */}
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

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h3>
              <p className="text-lg text-gray-600 mb-4">Pontuação: {score}</p>
              <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                Jogar Novamente
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          Pressione ESPAÇO ou ↑ para pular
        </div>
      </CardContent>
    </Card>
  );
};

export default NinjaGame;
