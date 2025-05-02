'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Home.module.css';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.gradientBackground}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
          '--scroll-position': `${scrollPosition}px`
        }}
      />

      <div className={styles.content} ref={contentRef}>
        <div className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src="/images/hero-image.png"
              alt="Newtonnator Hero"
              width={500}
              height={300}
              className={styles.heroImg}
            />
          </div>
          <h1 className={styles.title}>
            <span className={styles.gradientText}>Welcome to Newtonnator</span>
            <span className={styles.subtitle}>Where Code Meets Creativity</span>
          </h1>

          <div className={styles.welcomeMessage}>
            <p className={styles.animatedText}>Discover the power of AI-driven character guessing games!</p>
            <p className={styles.animatedText}>Choose your mode and start the adventure today.</p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Active Users</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5K+</span>
              <span className={styles.statLabel}>Daily Quizzes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>99%</span>
              <span className={styles.statLabel}>User Satisfaction</span>
            </div>
          </div>
        </div>

        <div className={styles.modesGrid}>
          <div className={styles.modeCard}>
            <div className={styles.cardImage}>
              <Image
                src="/images/akinator-mode.png"
                alt="Akinator Mode"
                width={200}
                height={150}
                className={styles.modeImg}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>Akinator Mode</h2>
              <p>Think of a famous character, and our AI will try to guess who you're thinking of! From movie stars to historical figures, test our knowledge.</p>
              <div className={styles.tags}>
                <span>Characters</span>
                <span>Movies</span>
                <span>History</span>
              </div>
            </div>
            <div className={styles.cardHover} />
          </div>

          <div className={styles.modeCard}>
            <div className={styles.cardImage}>
              <Image
                src="/images/newtonnator-mode.png"
                alt="Newtonnator Mode"
                width={200}
                height={150}
                className={styles.modeImg}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>Newtonnator Mode</h2>
              <p>Challenge our AI to guess famous scientists, mathematicians, and innovators! From Newton to Einstein, test your knowledge of scientific minds.</p>
              <div className={styles.tags}>
                <span>Scientists</span>
                <span>Innovators</span>
                <span>Genius</span>
              </div>
            </div>
            <div className={styles.cardHover} />
          </div>
        </div>

        <div className={styles.availableFeatures}>
          <h3 className={styles.availableTitle}>Available Features</h3>
          <p className={styles.availableText}>While we work on these exciting new modes, check out our current features:</p>
        </div>

        <div className={styles.featuresGrid}>
          <Link href="/aura" className={styles.featureCard}>
            <div className={styles.cardImage}>
              <Image
                src="/images/quiz-feature.png"
                alt="Aura Quiz"
                width={150}
                height={150}
                className={styles.featureImg}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>Aura Quiz</h2>
              <p>Test your knowledge, climb the leaderboard, and win prizes!</p>
              <div className={styles.tags}>
                <span>Quiz</span>
                <span>Leaderboard</span>
                <span>Prizes</span>
              </div>
            </div>
            <div className={styles.cardHover} />
          </Link>

          <Link href="/projects" className={styles.featureCard}>
            <div className={styles.cardImage}>
              <Image
                src="/images/projects-feature.png"
                alt="Projects"
                width={150}
                height={150}
                className={styles.featureImg}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>Projects</h2>
              <p>Explore and contribute to exciting coding projects.</p>
              <div className={styles.tags}>
                <span>Projects</span>
                <span>Collaboration</span>
                <span>Learning</span>
              </div>
            </div>
            <div className={styles.cardHover} />
          </Link>

          <Link href="/dev-tools" className={styles.featureCard}>
            <div className={styles.cardImage}>
              <Image
                src="/images/dev-tools-feature.png"
                alt="Dev Tools"
                width={150}
                height={150}
                className={styles.featureImg}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>Dev Tools</h2>
              <p>Powerful tools to enhance your development workflow.</p>
              <div className={styles.tags}>
                <span>Tools</span>
                <span>Productivity</span>
                <span>Development</span>
              </div>
            </div>
            <div className={styles.cardHover} />
          </Link>
        </div>

        <div className={styles.comingSoonSection}>
          <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
          <div className={styles.comingSoonGrid}>
            <div className={styles.comingSoonCard}>
              <div className={styles.cardImage}>
                <Image
                  src="/images/snapfile-feature.png"
                  alt="SnapFile"
                  width={150}
                  height={150}
                  className={styles.comingSoonImg}
                />
              </div>
              <div className={styles.cardContent}>
                <h2>SnapFile</h2>
                <p>Transform your images into code instantly! Upload any screenshot or design and get clean, production-ready code.</p>
                <div className={styles.tags}>
                  <span>AI</span>
                  <span>Code Generation</span>
                  <span>Free</span>
                </div>
              </div>
              <div className={styles.comingSoonBadge}>Coming Soon</div>
            </div>
          </div>
        </div>

        <div className={styles.testimonials}>
          <h3 className={styles.testimonialsTitle}>What Our Users Say</h3>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"The quiz feature is amazing! I've learned so much while having fun."</p>
                <div className={styles.testimonialAuthor}>
                  <Image src="/images/user1.png" alt="User" width={40} height={40} className={styles.testimonialImage} />
                  <div>
                    <span className={styles.authorName}>Sarah Johnson</span>
                    <span className={styles.authorRole}>Student</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"The dev tools have significantly improved my workflow. Can't wait for more features!"</p>
                <div className={styles.testimonialAuthor}>
                  <Image src="/images/user2.png" alt="User" width={40} height={40} className={styles.testimonialImage} />
                  <div>
                    <span className={styles.authorName}>Mike Chen</span>
                    <span className={styles.authorRole}>Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Stay Updated</h3>
          <p className={styles.newsletterText}>Subscribe to our newsletter for the latest updates and feature releases.</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email" className={styles.newsletterInput} />
            <button className={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <Link href="/about" className={styles.footerLink}>About Us</Link>
            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://twitter.com/newtonnator" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image src="/images/twitter.png" alt="Twitter" width={24} height={24} />
              <span className={styles.socialText}>@newtonnator</span>
            </a>
            <a href="https://github.com/newtonnator" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image src="/images/github.png" alt="GitHub" width={24} height={24} />
              <span className={styles.socialText}>/newtonnator</span>
            </a>
            <a href="https://discord.gg/newtonnator" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image src="/images/discord.png" alt="Discord" width={24} height={24} />
              <span className={styles.socialText}>/newtonnator</span>
            </a>
            <a href="https://instagram.com/newtonnator" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image src="/images/instagram.png" alt="Instagram" width={24} height={24} />
              <span className={styles.socialText}>@newtonnator</span>
            </a>
            <a href="https://linkedin.com/company/newtonnator" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} />
              <span className={styles.socialText}>/newtonnator</span>
            </a>
          </div>

          <div className={styles.reviewSection}>
            <h3 className={styles.reviewTitle}>Help Us Improve</h3>
            <p className={styles.reviewText}>We value your feedback! Share your thoughts and suggestions to help us make Newtonnator even better.</p>
            <div className={styles.reviewButtons}>
              <a href="https://forms.gle/feedback-form-url" target="_blank" rel="noopener noreferrer" className={styles.reviewButton}>
                Share Feedback
              </a>
              <a href="https://forms.gle/feature-request-form-url" target="_blank" rel="noopener noreferrer" className={styles.reviewButton}>
                Request Features
              </a>
            </div>
          </div>

          <p className={styles.copyright}>© 2024 Newtonnator. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}