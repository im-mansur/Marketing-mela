"use client";

import { useEffect, useState, useCallback } from 'react';

// A single confetti piece component
const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute w-2 h-4" style={style} />
);

// The main confetti component
const Confetti = () => {
  const [pieces, setPieces] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const colors = ['#D633FF', '#8A2BE2', '#f0eafd', '#FFC700', '#FF4D4D'];
    const newPieces = Array.from({ length: 150 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${-20 + Math.random() * -80}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `fall ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards`,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {pieces.map((style, i) => <ConfettiPiece key={i} style={style} />)}
    </div>
  );
};

// Component to trigger the confetti
export const ConfettiTrigger = () => {
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    
    const triggerConfetti = useCallback(() => {
        setIsConfettiActive(false);
        setTimeout(() => {
            setIsConfettiActive(true);
            setTimeout(() => setIsConfettiActive(false), 5000); // Confetti lasts for 5 seconds
        }, 10);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'm') {
                triggerConfetti();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [triggerConfetti]);
    
    // Add CSS animation keyframes dynamically
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        }
    }, [])

    return isConfettiActive ? <Confetti /> : null;
};
