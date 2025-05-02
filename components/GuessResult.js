'use client';

import styles from '../styles/GuessResult.module.css';

export default function GuessResult({ person, onRestart }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{person.name}</p>
      {person.image && (
        <img src={person.image} alt={person.name} className={styles.image} />
      )}
      {person.description && (
        <p className={styles.description}>{person.description}</p>
      )}
      <button onClick={onRestart} className={styles.restartButton}>
        Restart Game
      </button>
    </div>
  );
}
