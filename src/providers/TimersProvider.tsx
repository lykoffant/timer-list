import { createContext, ReactNode } from 'react';

import { useTimers } from '../hooks/useTimers';

import { ITimer } from '../interfaces/timer.interface';

interface ITimersContext {
  timers: ITimer[];
  addTimer: (name: string) => void;
  startTimer: (id: number) => void;
  pauseTimer: (id: number) => void;
  stopTimer: (id: number) => void;
  deleteTimer: (id: number) => void;
}

export const TimersContext = createContext<ITimersContext>({
  timers: [],
  addTimer: () => null,
  startTimer: () => null,
  pauseTimer: () => null,
  stopTimer: () => null,
  deleteTimer: () => null,
});

interface ITimersProviderProps {
  children: ReactNode;
}

export function TimersProvider({ children }: ITimersProviderProps) {
  const value = useTimers([]);

  return (
    <TimersContext.Provider value={value}>{children}</TimersContext.Provider>
  );
}
