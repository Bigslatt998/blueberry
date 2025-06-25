import {useEffect, useState} from 'react'
import './CountDown.css'
interface CountdownProps {
  initialDays: number;
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  endTime?: number; 
}
export const CountDown: React.FC<CountdownProps> = ({
     initialDays = 25,
  initialHours = 21,
  initialMinutes = 47,
  initialSeconds = 45,
}) => {
  
  const loadSavedState = (): TimeLeft => {
    const savedState = localStorage.getItem('countdownState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // If we have an endTime, calculate current time left
        if (parsed.endTime) {
          return calculateTimeLeft(parsed.endTime);
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    // No saved state, return initial values
    return {
      days: initialDays,
      hours: initialHours,
      minutes: initialMinutes,
      seconds: initialSeconds
    };
  };
   // Calculate time left based on end timestamp
  const calculateTimeLeft = (endTime: number): TimeLeft => {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, endTime };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(loadSavedState());
  // Calculate end time when component mounts
  useEffect(() => {
    // Only calculate end time if we don't have one saved
    if (!timeLeft.endTime) {
      const now = new Date();
      const endTime = new Date(
        now.getTime() +
          timeLeft.days * 24 * 60 * 60 * 1000 +
          timeLeft.hours * 60 * 60 * 1000 +
          timeLeft.minutes * 60 * 1000 +
          timeLeft.seconds * 1000
      ).getTime();

      setTimeLeft(prev => ({ ...prev, endTime }));
    }
  }, [timeLeft.endTime, timeLeft.hours, timeLeft.days, timeLeft.minutes, timeLeft.seconds]);
   // Timer effect
  useEffect(() => {
    if (!timeLeft.endTime) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(timeLeft.endTime!);
      setTimeLeft(newTimeLeft);
      
      // Save to localStorage
      localStorage.setItem('countdownState', JSON.stringify(newTimeLeft));

      // Stop if countdown finished
      if (newTimeLeft.days <= 0 && newTimeLeft.hours <= 0 && 
          newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft.endTime]);
  
  return (
    <div className="CountDOwn">
        <p> <span className="Bold">{timeLeft.days}</span> <span>Days</span>. &nbsp; 
        <span className="Bold">{timeLeft.hours}</span> <span>Hour</span>:&nbsp;
        <span className="Bold">{timeLeft.minutes}</span> <span>Minutes</span>:&nbsp;
        <span className="Bold">{timeLeft.seconds}</span> <span>Seconds</span></p>
    </div>
  )
}