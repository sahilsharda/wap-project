'use client';

import { useState } from 'react';
import styles from '../../styles/Aura.module.css';

export default function Aura() {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const features = [
        {
            id: 'ai',
            title: 'AI Assistant',
            description: 'Get instant help from our advanced AI assistant for coding, debugging, and learning.',
            icon: '🤖'
        },
        {
            id: 'learning',
            title: 'Smart Learning',
            description: 'Personalized learning paths and recommendations based on your progress.',
            icon: '📚'
        },
        {
            id: 'analytics',
            title: 'Progress Analytics',
            description: 'Track your learning progress with detailed analytics and insights.',
            icon: '📊'
        },
        {
            id: 'community',
            title: 'Community Hub',
            description: 'Connect with other learners and share knowledge in our community space.',
            icon: '👥'
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Aura Intelligence</h1>
            <p className={styles.subtitle}>Experience the power of AI in your learning journey</p>

            <div className={styles.featuresGrid}>
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className={`${styles.featureCard} ${selectedFeature === feature.id ? styles.selected : ''}`}
                        onClick={() => setSelectedFeature(feature.id)}
                    >
                        <div className={styles.icon}>{feature.icon}</div>
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            {selectedFeature && (
                <div className={styles.detailPanel}>
                    <h2>{features.find(f => f.id === selectedFeature).title}</h2>
                    <p>{features.find(f => f.id === selectedFeature).description}</p>
                    <button
                        className={styles.exploreButton}
                        onClick={() => setSelectedFeature(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
} 