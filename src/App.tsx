import GithubCorner from 'react-github-corner';

import styles from './App.module.scss';
import { AddTimerForm, TimerList } from './components';

function App() {
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <h1 className={styles.title}>Timer List</h1>
        <AddTimerForm className={styles.form} />
        <TimerList className={styles.list} />
      </div>
      <GithubCorner href='https://github.com/lykoffant/timer-list' size={60} />
    </div>
  );
}

export default App;
