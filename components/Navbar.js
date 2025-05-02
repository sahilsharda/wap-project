'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const autoHidePages = ['/', '/projects'];
    const alwaysVisiblePages = ['/dev-tools', '/aura', '/404'];

    useEffect(() => {
        if (alwaysVisiblePages.includes(pathname)) {
            setIsVisible(true);
            return;
        }

        const handleScroll = () => {
            if (!autoHidePages.includes(pathname)) return;

            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // scrolling down
            } else {
                setIsVisible(true); // scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = (e) => {
            if (e.clientY < 50) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [pathname, lastScrollY]);

    const getNavbarClass = () => {
        const base = styles.navbar;
        if (alwaysVisiblePages.includes(pathname)) return base;
        return `${base} ${isVisible ? styles.visible : styles.hidden}`;
    };

    return (
        <nav className={getNavbarClass()}>
            <div className={styles.logo}>Newtonnator</div>
            <ul className={styles.navLinks}>
                <li><Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link></li>
                <li><Link href="/dev-tools" className={pathname === '/dev-tools' ? styles.active : ''}>Dev Tools</Link></li>
                <li><Link href="/aura" className={pathname === '/aura' ? styles.active : ''}>Aura</Link></li>
                <li><Link href="/projects" className={pathname === '/projects' ? styles.active : ''}>Projects</Link></li>
                <li><Link href="/404" className={pathname === '/404' ? styles.active : ''}>404</Link></li>
            </ul>
        </nav>
    );
}
