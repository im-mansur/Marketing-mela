"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // This check is to prevent rendering on the server where new Date() might differ.
    // It ensures this component only renders on the client.
    if (typeof window !== 'undefined') {
      setTimeLeft(calculateTimeLeft(targetDate));
    }
  }, [targetDate]);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!timeLeft) {
    return (
      <div className="text-center py-4">
        <div className="text-2xl font-bold text-accent">
          The event is happening now!
        </div>
      </div>
    );
  }

  const timeParts = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="text-center p-6 bg-secondary rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h3 className="text-sm font-medium text-secondary-foreground/80 mb-4 tracking-wider">TIME LEFT UNTIL STALLS OPEN</h3>
      <div className="grid grid-cols-4 gap-2">
        {timeParts.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-accent tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase font-semibold text-secondary-foreground/60 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
