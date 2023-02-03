import { useEffect, useState } from 'react';

import { ITimer } from '../interfaces/timer.interface';

function getInitialTimers(key: string): ITimer[] {
  const countersFromLocalStorage = localStorage.getItem(key);

  if (countersFromLocalStorage) {
    return JSON.parse(countersFromLocalStorage) as ITimer[];
  }

  const initialCounters: ITimer[] = [];
  localStorage.setItem(key, JSON.stringify(initialCounters));
  return initialCounters;
}

function useTimers() {
  const timersKey = 'timers';
  const [timers, setTimers] = useState<ITimer[]>(getInitialTimers(timersKey));

  window.addEventListener('beforeunload', () => {
    localStorage.setItem(
      timersKey,
      JSON.stringify(timers.map((timer) => ({ ...timer, intervalId: null }))),
    );
  });

  useEffect(() => {
    localStorage.setItem(timersKey, JSON.stringify(timers));
  }, [timers]);

  const addTimer = (name: ITimer['name']) => {
    const timer = {
      id: Date.now(),
      name,
      intervalId: null,
      seconds: 0,
    };

    setTimers((prevTimers) => [timer, ...prevTimers]);
  };

  const startTimer = (id: ITimer['id']) => {
    const targetTimer = timers.find((timer) => timer.id === id);

    if (targetTimer?.intervalId === null) {
      const timeStep = 1;

      const intervalId = window.setInterval(() => {
        setTimers((prevTimers) =>
          prevTimers.map((timer) =>
            timer.id === id
              ? { ...timer, seconds: timer.seconds + timeStep }
              : timer,
          ),
        );
      }, timeStep * 1000);

      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.id === id ? { ...timer, intervalId } : timer,
        ),
      );
    }
  };

  const pauseTimer = (id: ITimer['id']) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === id) {
          if (typeof timer.intervalId === 'number') {
            clearInterval(timer.intervalId);
          }

          return { ...timer, intervalId: null };
        }

        return timer;
      }),
    );
  };

  const stopTimer = (id: ITimer['id']) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === id) {
          if (typeof timer.intervalId === 'number') {
            clearInterval(timer.intervalId);
          }

          return { ...timer, intervalId: null, seconds: 0 };
        }

        return timer;
      }),
    );
  };

  const deleteTimer = (id: ITimer['id']) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => {
        if (timer.id === id) {
          if (typeof timer.intervalId === 'number') {
            clearInterval(timer.intervalId);
          }

          return false;
        }

        return true;
      }),
    );
  };

  return {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    stopTimer,
    deleteTimer,
  };
}

export { useTimers };
