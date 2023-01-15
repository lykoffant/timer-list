import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

import { ITimer } from '../../interfaces/timer.interface';

export interface ITimerItemProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  timer: ITimer;
}
