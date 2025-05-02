'use client';

import styles from '../styles/QuestionBox.module.css';

export default function QuestionBox({ question, onAnswer }) {
  return (
    <div className={styles.container}>
      <p className={styles.question}>{question}</p>
      <div className={styles.buttonGroup}>
        <button onClick={() => onAnswer(true)} className={styles.button}>Yes</button>
        <button onClick={() => onAnswer(false)} className={styles.button}>No</button>
      </div>
    </div>
  );
}
