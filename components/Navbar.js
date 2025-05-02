'use client';

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Newtonnator</div>
            <ul className={styles.navLinks}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/dev-tools">Dev Tools</Link></li>
                <li><Link href="/aura">Aura</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/404">404</Link></li>
            </ul>
        </nav>
    );
}