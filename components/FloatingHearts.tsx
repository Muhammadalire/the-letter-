import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate static hearts on mount to avoid hydration mismatch if SSR (though this is SPA)
    // and to set up the loop.
    const newHearts: Heart[] = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
        size: 10 + Math.random() * 20,
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-wine-200 opacity-30 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.delay}s`,
            transform: 'translateY(100vh)',
            animationName: 'floatUp'
          }}
        >
          <style>{`
            @keyframes floatUp {
              0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
              10% { opacity: 0.4; }
              100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
          <div style={{ animation: `floatUp ${heart.animationDuration}s linear infinite ${heart.delay}s` }}>
            ❤
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;