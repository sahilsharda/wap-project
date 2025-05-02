'use client';

import Link from 'next/link';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
    return (
        <section className={styles.page_404}>
            <div className={styles.four_zero_four_bg}>
                <h1>404</h1>
            </div>

            <div className={styles.contant_box_404}>
                <h3>Look like you're lost</h3>
                <p>the page you are looking for not available!</p>
                <Link href="/" className={styles.link_404}>
                    Go to Home
                </Link>
            </div>
        </section>
    );
} 