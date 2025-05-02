'use client';

import { useState, useEffect } from 'react';
import BasicGame from '../components/BasicGame';
import styles from '../styles/GamePage.module.css';
import slideStyles from '../styles/Slides.module.css';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  const [mode, setMode] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Newtonnator",
      description: "Let's test our potential and explore the power of AI together!",
    },
    {
      title: "DEV Tools",
      description: "Discover our amazing tools that will help you learn and grow.",
    },
    {
      title: "Aura Intelligence",
      description: "Experience the power of AI with our advanced Aura system.",
    }
  ];

  const features = [
    {
      title: "Basic Mode",
      description: "Start with our basic mode to get familiar with the platform and its features.",
      icon: "🎯",
      link: "/"
    },
    {
      title: "DEV Tools",
      description: "Access powerful development tools and resources to enhance your coding experience.",
      icon: "⚙️",
      link: "/dev-tools"
    },
    {
      title: "Aura Intelligence",
      description: "Experience advanced AI capabilities with our cutting-edge Aura system.",
      icon: "✨",
      link: "/aura"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className={slideStyles.slideshow}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${slideStyles.slide} ${index === currentSlide ? slideStyles.active : ''}`}
          >
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      <main className={styles.container}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform"
        >
          <img
            src="/images/github.png"
            alt="Visit GitHub"
            className="w-20 h-20 object-contain rounded-full shadow-lg hover:shadow-xl"
          />
        </a>

        {!mode && (
          <>
            <h1 className={styles.heading}>Choose Game Mode</h1>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => setMode('basic')}
                className={styles.basicBtn}
              >
                Basic Mode
              </button>
            </div>
          </>
        )}

        {mode === 'basic' && <BasicGame />}

        <div className={styles.featuresSection}>
          <h2 className={styles.featuresHeading}>Explore Our Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}