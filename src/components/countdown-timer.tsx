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
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!timeLeft) {
    return (
      <div className="text-2xl font-bold text-accent">
        The event is happening now!
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
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max my-6">
      {timeParts.map(({ label, value }) => (
        <div key={label} className="flex flex-col p-4 bg-secondary rounded-lg shadow-inner">
          <span className="font-mono text-4xl md:text-5xl font-bold text-accent">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-sm uppercase font-semibold text-secondary-foreground/70">{label}</span>
        </div>
      ))}
    </div>
  );
}
