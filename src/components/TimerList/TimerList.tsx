import cn from 'classnames';

import { useContext } from 'react';

import styles from './TimerList.module.scss';

import { ITimerListProps } from './TimerList.props';

import { TimersContext } from '../../providers/TimersProvider';

import { TimerItem } from '../TimerItem/TimerItem';

function TimerList({ className, ...props }: ITimerListProps) {
  const { timers } = useContext(TimersContext);

  return (
    <ul className={cn(className)} {...props}>
      {timers.map((timer) => (
        <TimerItem className={styles.item} key={timer.id} timer={timer} />
      ))}
    </ul>
  );
}

export { TimerList };
