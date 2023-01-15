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
    </div>
  );
}

export default App;
