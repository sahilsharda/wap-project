'use client';

import styles from '../../styles/DevTools.module.css';

export default function DevTools() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Developer Tools</h1>
            <div className={styles.toolsGrid}>
                <div className={styles.toolCard}>
                    <h2>Code Editor</h2>
                    <p>Advanced code editor with syntax highlighting and auto-completion</p>
                </div>
                <div className={styles.toolCard}>
                    <h2>Debugger</h2>
                    <p>Powerful debugging tools for JavaScript and TypeScript</p>
                </div>
                <div className={styles.toolCard}>
                    <h2>Terminal</h2>
                    <p>Integrated terminal for running commands and scripts</p>
                </div>
                <div className={styles.toolCard}>
                    <h2>Git Integration</h2>
                    <p>Seamless Git version control integration</p>
                </div>
            </div>
        </div>
    );
} 