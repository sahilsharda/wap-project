'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/DevTools.module.css';

const tools = [
    {
        id: 1,
        title: 'Same.new',
        description: 'Design, build, and deploy beautiful fullstack web apps on autopilot. Prompt a single URL to get started.',
        image: '/images/same-new.png',
        link: 'https://same.new/',
        tags: ['Web Apps', 'Fullstack', 'Autopilot']
    },
    {
        id: 2,
        title: 'Uiverse',
        description: 'A community-driven platform for sharing and discovering beautiful UI elements and components.',
        image: '/images/uiverse.png.webp',
        link: 'https://uiverse.io/',
        tags: ['UI', 'Components', 'Community']
    },
    {
        id: 3,
        title: 'RapidAPI',
        description: "The world's largest public API marketplace. Discover, connect, and manage APIs with ease.",
        link: 'https://rapidapi.com/',
        tags: ['API', 'Marketplace', 'Integration']
    },
    {
        id: 4,
        title: 'Whimsical',
        description: 'An all-in-one workspace for projects, boards, docs, and posts. Perfect for wireframes, flowcharts, and team collaboration.',
        image: '/images/whimsical.png.png',
        link: 'https://whimsical.com/',
        tags: ['Wireframes', 'Docs', 'Collaboration']
    },
    {
        id: 5,
        title: 'Ni3',
        description: 'AI-powered viral thumbnail maker. Instantly create captivating thumbnails for your content.',
        image: '/images/ni3.png.webp',
        link: 'https://www.ni3.app/',
        tags: ['AI', 'Thumbnails', 'Content Creation']
    },
    {
        id: 6,
        title: 'DeepSite',
        description: 'AI-powered deep learning tools and demos. Explore the latest in AI research and applications.',
        link: 'https://enzostvs-deepsite.hf.space/',
        tags: ['AI', 'Deep Learning', 'Demos']
    },
    {
        id: 7,
        title: 'AIGC21',
        description: 'AIGC21 offers a suite of AI-generated content tools for creators and businesses.',
        image: '/images/aigc21.png',
        link: 'https://aigc21.com/',
        tags: ['AI', 'Content Generation', 'Tools']
    },
    {
        id: 8,
        title: 'HotBot',
        description: 'Access multiple AI models and expert bots in one place. Enjoy secure, private, and instant AI chats.',
        link: 'https://www.hotbot.com/',
        tags: ['AI', 'Chatbot', 'Productivity']
    },
    {
        id: 9,
        title: 'Vidu',
        description: 'Create AI-powered videos from images. Login to start generating img2video content.',
        link: 'https://www.vidu.com/login?redirect=%2Fcreate%2Fimg2video',
        tags: ['AI', 'Video', 'Image to Video']
    },
    {
        id: 10,
        title: 'Vmake',
        description: 'AI-powered creative tools for video and image editing, enhancement, and more.',
        image: '/images/vmake.png',
        link: 'https://vmake.ai/',
        tags: ['AI', 'Video Editing', 'Image Editing']
    },
    {
        id: 11,
        title: 'ImgUpscaler',
        description: 'Upscale and enhance your images using advanced AI technology. Improve image quality instantly.',
        link: 'https://imgupscaler.com/',
        tags: ['AI', 'Image Upscale', 'Enhancement']
    },
    {
        id: 12,
        title: 'Argil.ai',
        description: 'Generate engaging AI videos, branded avatars, and transform articles into videos in minutes. Perfect for creators, educators, and marketers.',
        image: '/images/argil-ai.png.svg',
        link: 'https://www.argil.ai/',
        tags: ['AI', 'Video', 'Avatar', 'Content Creation']
    },
    {
        id: 13,
        title: 'Readdy',
        description: 'A powerful web tool for productivity and collaboration. Explore its features to enhance your workflow.',
        image: '/images/readdy.avif',
        link: 'https://readdy.ai/',
        tags: ['Web Tool', 'Productivity', 'Collaboration']
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
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {tool.image && (
                                <Image
                                    src={tool.image}
                                    alt={tool.title + ' logo'}
                                    width={32}
                                    height={32}
                                    className={styles.toolLogo}
                                />
                            )}
                            {tool.title}
                        </h2>
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