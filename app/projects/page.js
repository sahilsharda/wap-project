'use client';

import { useState } from 'react';
import styles from '../../styles/Projects.module.css';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 'webapp',
            title: 'Web Application',
            description: 'Modern web application built with React and Next.js',
            tech: ['React', 'Next.js', 'Tailwind CSS'],
            image: '/images/webapp.jpg'
        },
        {
            id: 'mobile',
            title: 'Mobile App',
            description: 'Cross-platform mobile application using React Native',
            tech: ['React Native', 'Expo', 'Firebase'],
            image: '/images/mobile.jpg'
        },
        {
            id: 'api',
            title: 'API Service',
            description: 'RESTful API service with Node.js and Express',
            tech: ['Node.js', 'Express', 'MongoDB'],
            image: '/images/api.jpg'
        },
        {
            id: 'ai',
            title: 'AI Project',
            description: 'Machine learning project with Python and TensorFlow',
            tech: ['Python', 'TensorFlow', 'Scikit-learn'],
            image: '/images/ai.jpg'
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Our Projects</h1>
            <p className={styles.subtitle}>Explore our latest work and innovations</p>

            <div className={styles.projectsGrid}>
                {projects.map(project => (
                    <div
                        key={project.id}
                        className={`${styles.projectCard} ${selectedProject === project.id ? styles.selected : ''}`}
                        onClick={() => setSelectedProject(project.id)}
                    >
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.techStack}>
                                {project.tech.map((tech, index) => (
                                    <span key={index} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                        </div>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div className={styles.detailPanel}>
                    <h2>{projects.find(p => p.id === selectedProject).title}</h2>
                    <p>{projects.find(p => p.id === selectedProject).description}</p>
                    <div className={styles.techList}>
                        {projects.find(p => p.id === selectedProject).tech.map((tech, index) => (
                            <span key={index} className={styles.techTag}>{tech}</span>
                        ))}
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={() => setSelectedProject(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
} 