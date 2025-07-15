import { useEffect, useState } from 'react';
import './CountDown.css';

// Pass userId (or userEmail) as a prop to make countdown unique per user
interface CountdownProps {
  userKey: string; // e.g. userId or userEmail
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  endTime?: number;
}

export const CountDown: React.FC<CountdownProps> = ({
  userKey,
  initialDays = 25,
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
}) => {
  const storageKey = `countdownState_${userKey}`;

  // Helper to calculate time left
  const calculateTimeLeft = (endTime: number): TimeLeft => {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, endTime };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, endTime };
  };

  // Load or initialize countdown for this user
  const loadSavedState = (): TimeLeft => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.endTime) {
          return calculateTimeLeft(parsed.endTime);
        }
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    // No saved state, start from now + 25 days
    const now = new Date().getTime();
    const endTime =
      now +
      initialDays * 24 * 60 * 60 * 1000 +
      initialHours * 60 * 60 * 1000 +
      initialMinutes * 60 * 1000 +
      initialSeconds * 1000;
    return calculateTimeLeft(endTime);
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(loadSavedState());

  // When userKey changes (new user logs in), reset countdown for that user
  useEffect(() => {
    setTimeLeft(loadSavedState());
    // eslint-disable-next-line
  }, [userKey]);

  // Timer effect
  useEffect(() => {
    if (!timeLeft.endTime) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(timeLeft.endTime!);
      setTimeLeft(newTimeLeft);

      // Save to localStorage for this user
      localStorage.setItem(storageKey, JSON.stringify({ ...newTimeLeft, endTime: timeLeft.endTime }));

      // Stop if countdown finished
      if (
        newTimeLeft.days <= 0 &&
        newTimeLeft.hours <= 0 &&
        newTimeLeft.minutes <= 0 &&
        newTimeLeft.seconds <= 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [timeLeft.endTime, userKey]);

  return (
    <div className="CountDOwn">
      <p>
        <span className="Bold">{timeLeft.days}</span> <span>Days</span>. &nbsp;
        <span className="Bold">{timeLeft.hours}</span> <span>Hour</span>:&nbsp;
        <span className="Bold">{timeLeft.minutes}</span> <span>Minutes</span>:&nbsp;
        <span className="Bold">{timeLeft.seconds}</span> <span>Seconds</span>
      </p>
    </div>
  );
};