import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';

import cn from 'classnames';

import { useContext } from 'react';

import styles from './TimerItem.module.scss';

import { ITimerItemProps } from './TimerItem.props';

import { TimersContext } from '../../providers/TimersProvider';

function addZero(num: number) {
  return num < 10 ? '0' + num : String(num);
}

function secondsToTime(seconds: number) {
  const hours = Math.trunc(seconds / 3600);
  const minutes = Math.trunc((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(remainingSeconds)}`;
}

function TimerItem({ timer, className, ...props }: ITimerItemProps) {
  const { startTimer, pauseTimer, stopTimer, deleteTimer } =
    useContext(TimersContext);

  return (
    <li className={cn(className, styles.parent)} {...props}>
      <div className={cn(styles.name, styles.block)}>{timer.name}</div>
      <div className={cn(styles.time, styles.block)}>
        {secondsToTime(timer.seconds)}
      </div>

      <div className={cn(styles.actions, styles.block)}>
        {timer.intervalId === null ? (
          <button
            className={cn(styles.button, styles.button_play)}
            type='button'
            onClick={() => startTimer(timer.id)}
          >
            <PlayIcon className={styles.icon} />
          </button>
        ) : (
          <button
            className={cn(styles.button, styles.button_pause)}
            type='button'
            onClick={() => pauseTimer(timer.id)}
          >
            <PauseIcon className={styles.icon} />
          </button>
        )}

        <button
          className={cn(styles.button, styles.button_stop)}
          type='button'
          disabled={timer.seconds === 0}
          onClick={() => stopTimer(timer.id)}
        >
          <StopIcon className={styles.icon} />
        </button>

        <button
          className={cn(styles.button, styles.button_delete)}
          type='button'
          onClick={() => deleteTimer(timer.id)}
        >
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </li>
  );
}

export { TimerItem };
