'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Projects.module.css';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 'newtonnator',
            title: 'Newtonnator',
            description: 'A modern web application built with Next.js and TypeScript, featuring interactive tools and AI-powered features.',
            tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
            image: '/images/newtonnator.jpg',
            link: '/',
            github: 'https://github.com/yourusername/newtonnator'
        },
        {
            id: 'dev-tools',
            title: 'Dev Tools',
            description: 'A collection of developer tools and utilities to enhance productivity and streamline development workflows.',
            tech: ['JavaScript', 'React', 'CSS Modules'],
            image: '/images/dev-tools.jpg',
            link: '/dev-tools',
            github: 'https://github.com/yourusername/dev-tools'
        },
        {
            id: 'aura',
            title: 'Aura Intelligence',
            description: 'An AI-powered learning platform that adapts to user preferences and provides personalized learning experiences.',
            tech: ['React', 'AI/ML', 'Node.js'],
            image: '/images/aura.jpg',
            link: '/aura',
            github: 'https://github.com/yourusername/aura'
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Projects</h1>
            <p className={styles.subtitle}>Explore my latest work and innovations</p>

            <div className={styles.projectsGrid}>
                {projects.map(project => (
                    <div
                        key={project.id}
                        className={`${styles.projectCard} ${selectedProject === project.id ? styles.selected : ''}`}
                        onClick={() => setSelectedProject(project.id)}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={300}
                                className={styles.projectImage}
                            />
                            <div className={styles.techStack}>
                                {project.tech.map((tech, index) => (
                                    <span key={index} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                        </div>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <div className={styles.projectLinks}>
                            <Link href={project.link} className={styles.projectLink}>
                                View Project
                            </Link>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                                GitHub
                            </a>
                        </div>
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
                    <div className={styles.panelLinks}>
                        <Link href={projects.find(p => p.id === selectedProject).link} className={styles.projectLink}>
                            View Project
                        </Link>
                        <a
                            href={projects.find(p => p.id === selectedProject).github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.githubLink}
                        >
                            GitHub
                        </a>
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