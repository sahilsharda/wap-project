'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../styles/Aura.module.css';

const questionBank = {
    easy: [
        {
            id: 1,
            question: 'What is the correct way to create a React component?',
            options: [
                'function MyComponent() { return <div>Hello</div>; }',
                'class MyComponent extends React { render() { return <div>Hello</div>; } }',
                'const MyComponent = () => { <div>Hello</div> }',
                'React.createComponent(<div>Hello</div>)'
            ],
            correct: 0
        },
        {
            id: 2,
            question: 'Which HTML tag is used to create a hyperlink?',
            options: ['<a>', '<link>', '<href>', '<url>'],
            correct: 0
        },
        {
            id: 3,
            question: 'What does CSS stand for?',
            options: [
                'Cascading Style Sheets',
                'Computer Style Sheets',
                'Creative Style Sheets',
                'Colorful Style Sheets'
            ],
            correct: 0
        },
        {
            id: 4,
            question: 'Which Python keyword is used to define a function?',
            options: ['def', 'function', 'func', 'define'],
            correct: 0
        },
        {
            id: 5,
            question: 'What is the correct way to write a comment in JavaScript?',
            options: [
                '// This is a comment',
                '<!-- This is a comment -->',
                '/* This is a comment */',
                'All of the above'
            ],
            correct: 3
        }
    ],
    medium: [
        {
            id: 1,
            question: 'What is the purpose of the useEffect hook in React?',
            options: [
                'To handle side effects in functional components',
                'To create new components',
                'To update the DOM directly',
                'To manage state'
            ],
            correct: 0
        },
        {
            id: 2,
            question: 'What is the difference between let and const in JavaScript?',
            options: [
                'let can be reassigned, const cannot',
                'const can be reassigned, let cannot',
                'They are exactly the same',
                'let is for strings, const is for numbers'
            ],
            correct: 0
        },
        {
            id: 3,
            question: 'What is the output of console.log(2 + "2")?',
            options: ['4', '22', 'NaN', 'Error'],
            correct: 1
        },
        {
            id: 4,
            question: 'What is the purpose of the async/await keywords in JavaScript?',
            options: [
                'To handle asynchronous operations',
                'To create synchronous code',
                'To define classes',
                'To handle errors'
            ],
            correct: 0
        }
    ],
    hard: [
        {
            id: 1,
            question: 'What is the time complexity of a binary search algorithm?',
            options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
            correct: 1
        },
        {
            id: 2,
            question: 'What is the difference between useMemo and useCallback?',
            options: [
                'useMemo memoizes values, useCallback memoizes functions',
                'useCallback memoizes values, useMemo memoizes functions',
                'They are exactly the same',
                'useMemo is for state, useCallback is for effects'
            ],
            correct: 0
        },
        {
            id: 3,
            question: 'What is the purpose of the virtual DOM in React?',
            options: [
                'To improve performance by minimizing DOM updates',
                'To create a backup of the DOM',
                'To handle server-side rendering',
                'To manage state'
            ],
            correct: 0
        }
    ]
};

const getStoredLeaderboard = (mode) => {
    const stored = localStorage.getItem(`${mode}Leaderboard`);
    return stored ? JSON.parse(stored) : null;
};

const updateLeaderboard = (mode, newEntry) => {
    const storedLeaderboard = getStoredLeaderboard(mode) || [];

    // Add the new entry
    storedLeaderboard.push(newEntry);

    // Sort by score (descending) and time (ascending)
    storedLeaderboard.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
    });

    // Keep only top 5 entries
    const updatedLeaderboard = storedLeaderboard.slice(0, 5);

    // Save to localStorage
    localStorage.setItem(`${mode}Leaderboard`, JSON.stringify(updatedLeaderboard));
    return updatedLeaderboard;
};

export default function Quiz() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const difficulty = searchParams.get('difficulty');
    const questions = JSON.parse(searchParams.get('questions') || '[]');
    const timeLimit = parseFloat(searchParams.get('time') || '2.5') * 60; // Convert minutes to seconds

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        // Check for player name on mount
        const name = localStorage.getItem('playerName');
        if (!name) {
            router.push('/aura');
            return;
        }
        setPlayerName(name);
    }, [router]);

    useEffect(() => {
        if (timeLeft > 0 && !quizCompleted) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !quizCompleted) {
            handleQuizComplete();
        }
    }, [timeLeft, quizCompleted]);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            handleQuizComplete();
        }
    };

    const handleQuizComplete = () => {
        const playerName = localStorage.getItem('playerName');
        const mode = searchParams.get('mode');
        const difficulty = searchParams.get('difficulty');
        const timeTaken = timeLimit - timeLeft;
        const accuracy = Math.round((score / questions.length) * 100);
        const streak = Math.max(...questions.map((_, i) => {
            let currentStreak = 0;
            for (let j = i; j >= 0; j--) {
                if (selectedAnswer === questions[j].correct) {
                    currentStreak++;
                } else {
                    break;
                }
            }
            return currentStreak;
        }));

        const newEntry = {
            rank: 0,
            name: playerName,
            score: score,
            time: timeTaken,
            level: difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Normal',
            streak: streak,
            accuracy: accuracy
        };

        // Update leaderboard
        const updatedLeaderboard = updateLeaderboard(mode, newEntry);

        // Update the entry's rank
        const entryIndex = updatedLeaderboard.findIndex(entry =>
            entry.name === playerName &&
            entry.score === score &&
            entry.time === timeTaken
        );
        if (entryIndex !== -1) {
            newEntry.rank = entryIndex + 1;
        }

        setQuizCompleted(true);
        setShowResult(true);

        // Redirect to aura page after 3 seconds
        setTimeout(() => {
            router.push('/aura');
        }, 3000);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (quizCompleted) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Quiz Complete!</h1>
                <div className={styles.scoreCard}>
                    <h2>{playerName}'s Score</h2>
                    <p className={styles.finalScore}>{score} points</p>
                    <div className={styles.quizStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Questions</span>
                            <span className={styles.statValue}>{questions.length}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Correct</span>
                            <span className={styles.statValue}>{accuracy}%</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Time Taken</span>
                            <span className={styles.statValue}>{formatTime(timeTaken)}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Longest Streak</span>
                            <span className={styles.statValue}>🔥 {streak}</span>
                        </div>
                    </div>
                    <p className={styles.redirectMessage}>Redirecting to leaderboard in 3 seconds...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.quizHeader}>
                <h1 className={styles.title}>
                    {mode === 'normal' ? 'Normal Quiz' : `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode`}
                </h1>
                <div className={styles.quizStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Player</span>
                        <span className={styles.statValue}>{playerName}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Time</span>
                        <span className={styles.statValue}>{formatTime(timeLeft)}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Score</span>
                        <span className={styles.statValue}>{score}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Question</span>
                        <span className={styles.statValue}>
                            {currentQuestion + 1}/{questions.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.questionCard}>
                <h2 className={styles.questionText}>
                    {questions[currentQuestion]?.question}
                </h2>
                <div className={styles.optionsGrid}>
                    {questions[currentQuestion]?.options.map((option, index) => (
                        <button
                            key={index}
                            className={`${styles.optionButton} ${selectedAnswer === index ? styles.selected : ''
                                } ${showResult
                                    ? index === questions[currentQuestion].correct
                                        ? styles.correct
                                        : styles.incorrect
                                    : ''
                                }`}
                            onClick={() => !showResult && handleAnswerSelect(index)}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {selectedAnswer !== null && !showResult && (
                    <button
                        className={styles.nextButton}
                        onClick={handleNextQuestion}
                    >
                        Next Question
                    </button>
                )}
            </div>
        </div>
    );
} 