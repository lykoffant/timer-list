import { PlusIcon } from '@heroicons/react/24/solid';

import cn from 'classnames';

import { FormEvent, useContext, useState } from 'react';

import styles from './AddTimerForm.module.scss';

import { IAddTimerFormProps } from './AddTimerForm.props';

import { ITimer } from '../../interfaces/timer.interface';

import { TimersContext } from '../../providers/TimersProvider';

function AddTimerForm({ className, ...props }: IAddTimerFormProps) {
  const { addTimer } = useContext(TimersContext);
  const [timerName, setTimerName] = useState<ITimer['name']>('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clearedTimerName = timerName.trim().replace(/\s{2,}/g, ' ');

    if (clearedTimerName.length > 0) {
      addTimer(clearedTimerName);
      setTimerName('');
    }
  };

  return (
    <form
      className={cn(className, styles.parent)}
      {...props}
      onSubmit={(e) => submitHandler(e)}
    >
      <input
        className={styles.input}
        type='text'
        placeholder='Timer name'
        autoFocus
        value={timerName}
        onChange={(e) => setTimerName(e.target.value)}
      />
      <button
        className={styles.button}
        type='submit'
        disabled={!timerName.trim()}
      >
        <PlusIcon className={styles.icon} />
      </button>
    </form>
  );
}

export { AddTimerForm };
