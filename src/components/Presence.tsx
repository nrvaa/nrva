import React, { useEffect, useRef } from 'react';
import { animate, random, stagger } from 'animejs';
import { FaInstagram, FaYoutube, FaSpotify, FaApple, FaSoundcloud, FaTwitter } from 'react-icons/fa';

interface PresenceProps {
    images?: string[];
}

export default function Presence({ images }: PresenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbsRef = useRef<HTMLDivElement[]>([]);
    const cardsRef = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        // 1. Ambient Floating Orbs Animation
        if (orbsRef.current.length > 0) {
            animate(orbsRef.current.filter(Boolean), {
                translateX: () => random(-30, 30),
                translateY: () => random(-30, 30),
                scale: () => random(90, 110) / 100,
                duration: () => random(6000, 10000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        }

        // 2. Staggered Reveal on Scroll using IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Play staggered entrance animation
                        const cards = cardsRef.current.filter(Boolean);
                        if (cards.length > 0) {
                            animate(cards, {
                                translateY: [40, 0],
                                opacity: [0, 1],
                                duration: 1200,
                                delay: stagger(100, { start: 100 }),
                                easing: 'easeOutExpo'
                            });
                        }
                        // Unobserve after playing once
                        if (containerRef.current) observer.unobserve(containerRef.current);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const socialLinks = [
        {
            id: 'instagram',
            title: 'Instagram',
            subtitle: '@nrvamusic',
            icon: FaInstagram,
            href: 'https://www.instagram.com/nrvamusic/',
            color: 'group-hover:text-pink-500'
        },
        {
            id: 'youtube',
            title: 'YouTube',
            subtitle: '@NRVAMusic',
            icon: FaYoutube,
            href: 'https://youtube.com/@NRVAMusic',
            color: 'group-hover:text-red-500'
        },
        {
            id: 'spotify',
            title: 'Spotify',
            subtitle: 'NRVA',
            icon: FaSpotify,
            href: 'https://open.spotify.com/artist/7tmtimnvL3LiQglZ8awTqp',
            color: 'group-hover:text-green-500'
        },
        {
            id: 'apple',
            title: 'Apple Music',
            subtitle: 'NRVA',
            icon: FaApple,
            href: 'https://music.apple.com/id/artist/nrva/1640313345',
            color: 'group-hover:text-red-400'
        },
        {
            id: 'soundcloud',
            title: 'Soundcloud',
            subtitle: 'nrvuh',
            icon: FaSoundcloud,
            href: 'https://soundcloud.com/nrvuh',
            color: 'group-hover:text-orange-500'
        },
        {
            id: 'twitter',
            title: 'Twitter',
            subtitle: '@DeemonKeeng',
            icon: FaTwitter,
            href: 'https://www.x.com/DeemonKeeng/',
            color: 'group-hover:text-blue-400'
        },
    ];

    return (
        <div ref={containerRef} className="relative w-full py-16 px-4 md:px-8 overflow-hidden rounded-[2rem] border border-white/5 bg-black/20 backdrop-blur-3xl shadow-2xl">
            {/* Ambient Background Orbs */}
            <div 
                ref={el => { if (el) orbsRef.current[0] = el }} 
                className="absolute top-0 left-1/4 w-72 h-72 bg-red-600/30 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" 
            />
            <div 
                ref={el => { if (el) orbsRef.current[1] = el }} 
                className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" 
            />
            <div 
                ref={el => { if (el) orbsRef.current[2] = el }} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" 
            />

            {/* Optional subtle noise overlay for texture within the card */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay -z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-4xl mx-auto flex flex-col items-center z-10 relative">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase font-sans text-shadow-red-900">
                    Presence
                </h2>
                <p className="text-base-content/60 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-16 text-center">
                    Connect across frequencies
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                    {socialLinks.map((link, index) => (
                        <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { if (el) cardsRef.current[index] = el }}
                            className="opacity-0 group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.08)]"
                        >
                            {/* Inner ambient glow on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            
                            <link.icon className={`w-10 h-10 mb-4 text-base-content/70 transition-colors duration-300 ${link.color}`} />
                            <h3 className="font-semibold text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                                {link.title}
                            </h3>
                            <span className="text-xs text-base-content/50 font-mono mt-2 group-hover:text-base-content/80 transition-colors duration-300">
                                {link.subtitle}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
