'use client';

import { useState } from 'react';
import QuestionBox from './QuestionBox';
import GuessResult from './GuessResult';
import { guessPersonFromAnswers } from '../utils/logic';
import styles from '../styles/BasicGame.module.css';

export default function BasicGame() {
  const questions = [
    'Is the person male?',
    'Is the person under 30?',
    'Do they live in Newton?',
    'Does the person like sports?',
    'Is the person a software engineer?',
    'Does the person enjoy reading books?',
    'Is the person into video games?',
    'Does the person like to travel?',
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalGuess, setFinalGuess] = useState(null);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const guess = guessPersonFromAnswers(newAnswers);
      setFinalGuess(guess);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setFinalGuess(null);
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Newtonnator Basic Mode</h1>
      {finalGuess ? (
        <GuessResult person={finalGuess} onRestart={handleRestart} />
      ) : (
        <QuestionBox question={questions[step]} onAnswer={handleAnswer} />
      )}
    </main>
  );
}
