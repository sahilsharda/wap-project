'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/DevTools.module.css';

const tools = [
    {
        id: 1,
        title: 'AI Code Assistant',
        description: 'An intelligent coding assistant that helps you write, debug, and optimize code in multiple programming languages.',
        image: '/images/code-assistant.jpg',
        link: 'https://github.com/your-repo/code-assistant',
        tags: ['AI', 'Coding', 'Debugging', 'Optimization']
    },
    {
        id: 2,
        title: 'Smart Documentation',
        description: 'Automatically generate and maintain documentation for your projects with AI-powered analysis.',
        image: '/images/documentation.jpg',
        link: 'https://github.com/your-repo/smart-docs',
        tags: ['Documentation', 'AI', 'Analysis']
    },
    {
        id: 3,
        title: 'Code Review Bot',
        description: 'Automated code review system that provides detailed feedback and suggestions for improvement.',
        image: '/images/code-review.jpg',
        link: 'https://github.com/your-repo/review-bot',
        tags: ['Code Review', 'Automation', 'Quality']
    },
    {
        id: 4,
        title: 'Performance Analyzer',
        description: 'Analyze and optimize your application performance with detailed metrics and recommendations.',
        image: '/images/performance.jpg',
        link: 'https://github.com/your-repo/performance-analyzer',
        tags: ['Performance', 'Optimization', 'Metrics']
    },
    {
        id: 5,
        title: 'Security Scanner',
        description: 'Automated security scanning tool that identifies vulnerabilities and suggests fixes.',
        image: '/images/security.jpg',
        link: 'https://github.com/your-repo/security-scanner',
        tags: ['Security', 'Vulnerability', 'Automation']
    },
    {
        id: 6,
        title: 'API Generator',
        description: 'Generate RESTful APIs automatically from your database schema or models.',
        image: '/images/api-generator.jpg',
        link: 'https://github.com/your-repo/api-generator',
        tags: ['API', 'Automation', 'REST']
    }
];

export default function DevTools() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTool, setSelectedTool] = useState(null);
    const [filteredTools, setFilteredTools] = useState(tools);

    useEffect(() => {
        const filtered = tools.filter(tool =>
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredTools(filtered);
    }, [searchQuery]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dev Tools</h1>
            <p className={styles.subtitle}>Explore our collection of AI-powered development tools</p>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.toolsGrid}>
                {filteredTools.map(tool => (
                    <div
                        key={tool.id}
                        className={styles.toolCard}
                        onClick={() => setSelectedTool(tool)}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={tool.image}
                                alt={tool.title}
                                fill
                                className={styles.toolImage}
                            />
                        </div>
                        <h2>{tool.title}</h2>
                        <p>{tool.description}</p>
                        <div className={styles.tags}>
                            {tool.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTool && (
                <div className={styles.detailPanel}>
                    <h2>{selectedTool.title}</h2>
                    <p>{selectedTool.description}</p>
                    <div className={styles.tags}>
                        {selectedTool.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                    <div className={styles.panelLinks}>
                        <Link href={selectedTool.link} className={styles.toolLink}>
                            Try Tool
                        </Link>
                        <Link href={`${selectedTool.link}/docs`} className={styles.docsLink}>
                            Documentation
                        </Link>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={() => setSelectedTool(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
} 