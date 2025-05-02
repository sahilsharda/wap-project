'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Aura.module.css';
import { useRouter } from 'next/navigation';

const features = [
    {
        id: 1,
        title: 'AI Assistant',
        description: 'Your personal AI companion that helps you learn, create, and explore. Get instant answers, generate content, and receive personalized recommendations.',
        image: '/images/ai-assistant.jpg',
        link: '/aura/assistant',
        tags: ['AI', 'Learning', 'Personalization', 'Support']
    },
    {
        id: 2,
        title: 'Smart Learning',
        description: 'Adaptive learning system that personalizes content based on your progress, strengths, and areas for improvement.',
        image: '/images/smart-learning.jpg',
        link: '/aura/learning',
        tags: ['Education', 'Adaptive', 'Progress', 'Personalization']
    },
    {
        id: 3,
        title: 'Progress Analytics',
        description: 'Track your learning journey with detailed analytics, insights, and personalized recommendations for improvement.',
        image: '/images/progress-analytics.jpg',
        link: '/aura/analytics',
        tags: ['Analytics', 'Tracking', 'Insights', 'Progress']
    },
    {
        id: 4,
        title: 'Community Hub',
        description: 'Connect with other learners, share knowledge, and collaborate on projects in our vibrant community space.',
        image: '/images/community.jpg',
        link: '/aura/community',
        tags: ['Community', 'Collaboration', 'Networking', 'Support']
    }
];

// Expanded question bank
const questionBank = {
    easy: [
        {
            id: 1,
            question: "What is the correct way to create a React component?",
            options: ["function MyComponent() {}", "class MyComponent {}", "const MyComponent = () => {}", "All of the above"],
            correct: 3,
            category: "React"
        },
        {
            id: 2,
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1,
            category: "HTML"
        },
        {
            id: 3,
            question: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
            correct: 2,
            category: "CSS"
        },
        {
            id: 4,
            question: "Which Python keyword is used to define a function?",
            options: ["func", "def", "function", "define"],
            correct: 1,
            category: "Python"
        },
        {
            id: 5,
            question: "What is the correct way to import a component in React?",
            options: ["import Component from './Component'", "require('./Component')", "include './Component'", "load './Component'"],
            correct: 0,
            category: "React"
        },
        {
            id: 6,
            question: "Which HTML tag is used to create a list?",
            options: ["<list>", "<ul>", "<ol>", "Both B and C"],
            correct: 3,
            category: "HTML"
        },
        {
            id: 7,
            question: "What is the correct way to center an element horizontally in CSS?",
            options: ["text-align: center", "margin: 0 auto", "align: center", "position: center"],
            correct: 1,
            category: "CSS"
        },
        {
            id: 8,
            question: "Which Python data type is immutable?",
            options: ["List", "Dictionary", "Tuple", "Set"],
            correct: 2,
            category: "Python"
        },
        {
            id: 9,
            question: "What is the virtual DOM in React?",
            options: ["A backup of the real DOM", "A lightweight copy of the real DOM", "A different version of the DOM", "A debugging tool"],
            correct: 1,
            category: "React"
        },
        {
            id: 10,
            question: "Which HTML5 tag is used for navigation?",
            options: ["<nav>", "<menu>", "<navigation>", "<navigate>"],
            correct: 0,
            category: "HTML"
        }
    ],
    medium: [
        {
            id: 11,
            question: "What is the purpose of React hooks?",
            options: ["To handle side effects", "To manage state", "To reuse logic", "All of the above"],
            correct: 3,
            category: "React"
        },
        {
            id: 12,
            question: "What is the difference between == and === in JavaScript?",
            options: ["No difference", "== checks value, === checks value and type", "== is newer syntax", "=== is deprecated"],
            correct: 1,
            category: "JavaScript"
        },
        {
            id: 13,
            question: "What is the CSS Box Model?",
            options: ["A layout model", "A design pattern", "A way to create boxes", "A 3D effect"],
            correct: 0,
            category: "CSS"
        },
        {
            id: 14,
            question: "What is a Python decorator?",
            options: ["A function that modifies another function", "A way to comment code", "A type of variable", "A loop structure"],
            correct: 0,
            category: "Python"
        },
        {
            id: 15,
            question: "What is the purpose of React Context?",
            options: ["To manage global state", "To handle routing", "To create components", "To style elements"],
            correct: 0,
            category: "React"
        },
        {
            id: 16,
            question: "What is the difference between let and const in JavaScript?",
            options: ["No difference", "let is mutable, const is immutable", "const is newer", "let is deprecated"],
            correct: 1,
            category: "JavaScript"
        },
        {
            id: 17,
            question: "What is CSS Flexbox?",
            options: ["A layout model", "A design pattern", "A way to create boxes", "A 3D effect"],
            correct: 0,
            category: "CSS"
        },
        {
            id: 18,
            question: "What is a Python generator?",
            options: ["A function that returns an iterator", "A way to generate random numbers", "A type of loop", "A debugging tool"],
            correct: 0,
            category: "Python"
        }
    ],
    hard: [
        {
            id: 19,
            question: "What is the difference between useEffect and useLayoutEffect?",
            options: ["No difference", "useEffect runs after render, useLayoutEffect before", "useLayoutEffect is deprecated", "useEffect is newer"],
            correct: 1,
            category: "React"
        },
        {
            id: 20,
            question: "What is the event loop in JavaScript?",
            options: ["A way to handle events", "A loop structure", "A concurrency model", "A debugging tool"],
            correct: 2,
            category: "JavaScript"
        },
        {
            id: 21,
            question: "What is CSS Grid?",
            options: ["A layout system", "A design pattern", "A way to create boxes", "A 3D effect"],
            correct: 0,
            category: "CSS"
        },
        {
            id: 22,
            question: "What is a Python metaclass?",
            options: ["A class that creates classes", "A type of variable", "A loop structure", "A debugging tool"],
            correct: 0,
            category: "Python"
        },
        {
            id: 23,
            question: "What is React Fiber?",
            options: ["A new feature", "A reconciliation algorithm", "A styling system", "A state management tool"],
            correct: 1,
            category: "React"
        },
        {
            id: 24,
            question: "What is the difference between async/await and Promises?",
            options: ["No difference", "async/await is syntactic sugar", "Promises are deprecated", "async/await is newer"],
            correct: 1,
            category: "JavaScript"
        }
    ]
};

// Remove preset leaderboard data
const normalLeaderboard = [];
const challengeLeaderboard = [];

const quizModes = [
    {
        id: 1,
        title: 'Normal Quiz',
        description: 'Test your knowledge with 10 general programming questions. No time pressure, just pure learning!',
        image: '/images/normal-quiz.jpg',
        tags: ['10 Questions', 'General', 'Learning', '2.5 Minutes']
    },
    {
        id: 2,
        title: 'Challenge Mode',
        description: 'Push your limits with three difficulty levels. Earn points, climb the leaderboard, and prove your expertise.',
        image: '/images/challenge-quiz.jpg',
        tags: ['Competitive', 'Leaderboard', 'Points', 'Challenge']
    }
];

const difficultyLevels = [
    {
        id: 1,
        title: 'Easy Mode',
        description: '10 questions covering React, HTML, CSS, and Python basics. Perfect for beginners!',
        image: '/images/easy-mode.jpg',
        points: 1,
        questions: 10,
        time: 1, // 1 minute
        tags: ['Beginner', '1 Point', '10 Questions', '1 Minute']
    },
    {
        id: 2,
        title: 'Medium Mode',
        description: '8 challenging questions to test your intermediate knowledge. Double the points!',
        image: '/images/medium-mode.jpg',
        points: 2,
        questions: 8,
        time: 2, // 2 minutes
        tags: ['Intermediate', '2 Points', '8 Questions', '2 Minutes']
    },
    {
        id: 3,
        title: 'Hard Mode',
        description: '6 expert-level questions. High risk, high reward with negative marking!',
        image: '/images/hard-mode.jpg',
        points: 4,
        questions: 6,
        time: 3, // 3 minutes
        tags: ['Expert', '4 Points', '6 Questions', '3 Minutes', '-1 for Wrong']
    }
];

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getStoredLeaderboard = (mode) => {
    const stored = localStorage.getItem(`${mode}Leaderboard`);
    return stored ? JSON.parse(stored) : [];
};

const updateLeaderboard = (mode, newEntry) => {
    const storedLeaderboard = getStoredLeaderboard(mode);

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

export default function Aura() {
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardFilter, setLeaderboardFilter] = useState('all');
    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
    const [showPrizeInfo, setShowPrizeInfo] = useState(false);
    const [nameChangeCount, setNameChangeCount] = useState(0);
    const [currentLeaderboard, setCurrentLeaderboard] = useState({
        normal: getStoredLeaderboard('normal') || normalLeaderboard,
        challenge: getStoredLeaderboard('challenge') || challengeLeaderboard
    });
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem('playerName');
        const changeCount = localStorage.getItem('nameChangeCount');
        if (name) {
            setPlayerName(name);
            setNameChangeCount(changeCount ? parseInt(changeCount) : 0);
            setShowNameInput(false);
        }
    }, []);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            localStorage.setItem('playerName', playerName);
            setShowNameInput(false);
        }
    };

    const handleNameChange = () => {
        if (nameChangeCount >= 3) {
            alert('You have reached the maximum number of name changes (3).');
            return;
        }
        setNameChangeCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('nameChangeCount', newCount.toString());
            return newCount;
        });
        setShowNameInput(true);
        setPlayerName('');
    };

    const handleResetName = () => {
        if (window.confirm('Are you sure you want to reset your name? This will clear your current name and reset your name change count.')) {
            localStorage.removeItem('playerName');
            localStorage.removeItem('nameChangeCount');
            setPlayerName('');
            setNameChangeCount(0);
            setShowNameInput(true);
            setSelectedMode(null);
            setSelectedDifficulty(null);
            setShowLeaderboard(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNameSubmit(e);
        }
    };

    const handleModeSelect = (mode) => {
        if (!localStorage.getItem('playerName')) {
            setShowNameInput(true);
            return;
        }
        setSelectedMode(mode);
        if (mode.id === 1) {
            const questions = JSON.stringify(questionBank.easy);
            router.push(`/aura/quiz?mode=normal&questions=${encodeURIComponent(questions)}&time=2.5`);
        }
    };

    const handleDifficultySelect = (difficulty) => {
        if (!localStorage.getItem('playerName')) {
            setShowNameInput(true);
            return;
        }
        setSelectedDifficulty(difficulty);
        const difficultyLevel = difficulty.title.toLowerCase().split(' ')[0];
        const questions = JSON.stringify(questionBank[difficultyLevel]);
        router.push(`/aura/quiz?mode=challenge&difficulty=${difficultyLevel}&questions=${encodeURIComponent(questions)}&time=${difficulty.time}`);
    };

    const handleResetLeaderboard = () => {
        if (window.confirm('Are you sure you want to reset the leaderboard? This action cannot be undone.')) {
            localStorage.removeItem('normalLeaderboard');
            localStorage.removeItem('challengeLeaderboard');
            window.location.reload();
        }
    };

    const getCurrentLeaderboard = () => {
        if (selectedMode?.id === 1) {
            return currentLeaderboard.normal;
        } else if (selectedMode?.id === 2) {
            return currentLeaderboard.challenge;
        }
        return [...currentLeaderboard.normal, ...currentLeaderboard.challenge];
    };

    return (
        <div className={styles.container}>
            {showNameInput ? (
                <div className={styles.nameInputContainer}>
                    <h2 className={styles.nameInputTitle}>Welcome to Aura Quiz!</h2>
                    <p className={styles.nameInputSubtitle}>Please enter your name to continue</p>
                    <form onSubmit={handleNameSubmit} className={styles.nameForm}>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your name"
                            className={styles.nameInput}
                            required
                            autoFocus
                        />
                        <button type="submit" className={styles.submitButton}>
                            Start Playing
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <h1 className={styles.title}>Check Your Aura</h1>
                    <p className={styles.subtitle}>Test your knowledge, climb the leaderboard, and become a coding champion!</p>

                    <div className={styles.prizeAnnouncement}>
                        <h2 className={styles.prizeTitle}>🏆 Win Up To ₹1000! 🏆</h2>
                        <p className={styles.prizeText}>
                            Top performers who score the highest points in the shortest time will be eligible for cash prizes up to ₹1000!
                            Stay tuned for more details about our upcoming prize pool and competition rules.
                        </p>
                        <button
                            className={styles.prizeButton}
                            onClick={() => setShowPrizeInfo(!showPrizeInfo)}
                        >
                            {showPrizeInfo ? 'Hide Details' : 'Learn More'}
                        </button>

                        {showPrizeInfo && (
                            <div className={styles.prizeDetails}>
                                <h3>How to Win:</h3>
                                <ul>
                                    <li>Score the highest points in your chosen difficulty level</li>
                                    <li>Complete the quiz in the shortest time possible</li>
                                    <li>Maintain a high accuracy rate</li>
                                    <li>Build the longest streak of correct answers</li>
                                </ul>
                                <p className={styles.prizeNote}>
                                    Prize distribution details and competition rules will be announced soon.
                                    Follow us for updates!
                                </p>
                                <div className={styles.prizeAmounts}>
                                    <div className={styles.prizeTier}>
                                        <span className={styles.rank}>1st Place</span>
                                        <span className={styles.amount}>₹1000</span>
                                    </div>
                                    <div className={styles.prizeTier}>
                                        <span className={styles.rank}>2nd Place</span>
                                        <span className={styles.amount}>₹500</span>
                                    </div>
                                    <div className={styles.prizeTier}>
                                        <span className={styles.rank}>3rd Place</span>
                                        <span className={styles.amount}>₹250</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.playerWelcome}>
                        <span>Welcome, {playerName}!</span>
                        <div className={styles.nameControls}>
                            <button
                                className={styles.changeNameButton}
                                onClick={handleNameChange}
                                disabled={nameChangeCount >= 3}
                            >
                                Change Name ({3 - nameChangeCount} left)
                            </button>
                            <button
                                className={styles.resetNameButton}
                                onClick={handleResetName}
                            >
                                Reset Name
                            </button>
                        </div>
                    </div>

                    <div className={styles.leaderboardControls}>
                        <button
                            className={styles.resetButton}
                            onClick={handleResetLeaderboard}
                        >
                            Reset Leaderboard
                        </button>
                    </div>

                    <div className={styles.modesGrid}>
                        {quizModes.map(mode => (
                            <div
                                key={mode.id}
                                className={styles.modeCard}
                                onClick={() => handleModeSelect(mode)}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={mode.image}
                                        alt={mode.title}
                                        fill
                                        className={styles.modeImage}
                                    />
                                </div>
                                <h2>{mode.title}</h2>
                                <p>{mode.description}</p>
                                <div className={styles.tags}>
                                    {mode.tags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedMode && selectedMode.id === 2 && (
                        <div className={styles.difficultiesGrid}>
                            {difficultyLevels.map(level => (
                                <div
                                    key={level.id}
                                    className={styles.difficultyCard}
                                    onClick={() => handleDifficultySelect(level)}
                                >
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={level.image}
                                            alt={level.title}
                                            fill
                                            className={styles.difficultyImage}
                                        />
                                    </div>
                                    <h2>{level.title}</h2>
                                    <p>{level.description}</p>
                                    <div className={styles.stats}>
                                        <div className={styles.statItem}>
                                            <span className={styles.statLabel}>Questions</span>
                                            <span className={styles.statValue}>{level.questions}</span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <span className={styles.statLabel}>Points</span>
                                            <span className={styles.statValue}>{level.points}</span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <span className={styles.statLabel}>Time</span>
                                            <span className={styles.statValue}>{level.time} min</span>
                                        </div>
                                    </div>
                                    <div className={styles.tags}>
                                        {level.tags.map((tag, index) => (
                                            <span key={index} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.leaderboardButton} onClick={() => setShowLeaderboard(!showLeaderboard)}>
                        View Leaderboard
                    </div>

                    {showLeaderboard && (
                        <div className={styles.leaderboard}>
                            <h2>Top Performers - {selectedMode?.id === 1 ? 'Normal Quiz' : selectedMode?.id === 2 ? 'Challenge Mode' : 'All'}</h2>
                            <div className={styles.leaderboardFilters}>
                                <button
                                    className={`${styles.filterButton} ${leaderboardFilter === 'all' ? styles.active : ''}`}
                                    onClick={() => setLeaderboardFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`${styles.filterButton} ${leaderboardFilter === 'expert' ? styles.active : ''}`}
                                    onClick={() => setLeaderboardFilter('expert')}
                                >
                                    Expert
                                </button>
                                <button
                                    className={`${styles.filterButton} ${leaderboardFilter === 'advanced' ? styles.active : ''}`}
                                    onClick={() => setLeaderboardFilter('advanced')}
                                >
                                    Advanced
                                </button>
                                <button
                                    className={`${styles.filterButton} ${leaderboardFilter === 'intermediate' ? styles.active : ''}`}
                                    onClick={() => setLeaderboardFilter('intermediate')}
                                >
                                    Intermediate
                                </button>
                                <button
                                    className={`${styles.filterButton} ${leaderboardFilter === 'beginner' ? styles.active : ''}`}
                                    onClick={() => setLeaderboardFilter('beginner')}
                                >
                                    Beginner
                                </button>
                            </div>
                            <div className={styles.leaderboardList}>
                                {getCurrentLeaderboard().map((entry, index) => (
                                    <div key={index} className={styles.leaderboardItem}>
                                        <span className={styles.rank}>{index + 1}</span>
                                        <span className={styles.name}>{entry.name}</span>
                                        <span className={styles.score}>{entry.score}</span>
                                        <span className={styles.time}>{formatTime(entry.time)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}