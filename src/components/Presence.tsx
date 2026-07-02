import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube, FaSpotify, FaApple, FaSoundcloud, FaTwitter } from 'react-icons/fa';

interface PresenceProps {
    images?: string[];
}

export default function Presence({ images }: PresenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        // Staggered Reveal on Scroll using native IntersectionObserver and CSS transitions
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = cardsRef.current.filter(Boolean);
                        cards.forEach((card, i) => {
                            // Apply a staggered delay via inline style
                            card.style.transitionDelay = `${(i + 1) * 80}ms`;
                            card.classList.add('opacity-100', 'translate-y-0');
                            card.classList.remove('opacity-0', 'translate-y-10');
                        });
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
        <div ref={containerRef} className="relative w-full py-24 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-3xl saturate-[2]">
            <style>{`
                @keyframes orb-float-1 {
                    0% { transform: translate(0, 0) scale(1); border-radius: 40% 60% 70% 30%; }
                    100% { transform: translate(40px, 40px) scale(1.1); border-radius: 60% 40% 30% 70%; }
                }
                @keyframes orb-float-2 {
                    0% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70%; }
                    100% { transform: translate(-40px, -40px) scale(1.2); border-radius: 40% 60% 70% 30%; }
                }
                @keyframes orb-float-3 {
                    0% { transform: translate(-50%, -50%) scale(1); border-radius: 50% 50% 50% 50%; }
                    100% { transform: translate(calc(-50% + 20px), calc(-50% - 30px)) scale(0.9); border-radius: 70% 30% 50% 50%; }
                }
                .animate-orb-1 { animation: orb-float-1 8s ease-in-out infinite alternate; }
                .animate-orb-2 { animation: orb-float-2 9s ease-in-out infinite alternate; }
                .animate-orb-3 { animation: orb-float-3 10s ease-in-out infinite alternate; }
            `}</style>
            
            {/* Pure CSS Liquid Background Orbs */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-600/40 blur-[90px] pointer-events-none -z-10 mix-blend-color-dodge animate-orb-1" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/40 blur-[100px] pointer-events-none -z-10 mix-blend-color-dodge animate-orb-2" />
            <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-purple-600/30 blur-[120px] pointer-events-none -z-10 mix-blend-screen animate-orb-3" />

            {/* Zero-compute static noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10 transform-gpu" style={{ backgroundImage: 'url("/noise.bmp")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}></div>

            <div className="max-w-6xl mx-auto flex flex-col z-10 relative px-6 md:px-12">
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase font-sans text-white/90">
                            Presence
                        </h2>
                        <p className="text-base-content/60 font-mono text-xs md:text-sm uppercase tracking-[0.2em] mt-4">
                            Find <strong>NRVA</strong> anywhere.
                        </p>
                    </div>
                    <div className="w-16 h-[2px] bg-white/20"></div>
                </div>

                {/* 1px gap grid for a wireframe/editorial brutalist look */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 p-[1px]">
                    {socialLinks.map((link, index) => (
                        <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { if (el) cardsRef.current[index] = el }}
                            className="hover-3d opacity-0 translate-y-10 bg-black/60 hover:bg-black/40 transition-all duration-[1000ms] ease-out"
                        >
                            {/* Main content (Child 1) */}
                            <div className="group relative flex flex-col p-10 h-full w-full overflow-hidden">
                                {/* Inner liquid glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
                                
                                <div className="flex items-center justify-between mb-8 pointer-events-none">
                                    <link.icon className={`w-8 h-8 text-base-content/50 transition-all duration-500 transform group-hover:scale-110 ${link.color}`} />
                                    <span className="text-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white/50">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-5 h-5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </span>
                                </div>
                                
                                <div className="mt-auto transform transition-transform duration-500 group-hover:translate-x-2 pointer-events-none">
                                    <h3 className="font-semibold text-xl tracking-tight text-white/80 group-hover:text-white transition-colors duration-500">
                                        {link.title}
                                    </h3>
                                    <span className="block text-xs text-base-content/50 font-mono mt-1 group-hover:text-base-content/90 transition-colors duration-500">
                                        {link.subtitle}
                                    </span>
                                </div>
                            </div>
                            
                            {/* 8 empty divs for hover-3d zones */}
                            <div></div><div></div><div></div><div></div>
                            <div></div><div></div><div></div><div></div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
