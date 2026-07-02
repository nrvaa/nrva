import React from 'react';
import StaggeredGrid, { type BentoItem } from './StaggeredGrid';
import { FaInstagram, FaYoutube, FaSpotify, FaApple, FaSoundcloud, FaTwitter } from 'react-icons/fa';

// Background images for the grid (using Astro assets path)
// We use simple URLs for the background grid images, we can just use the public folder if needed, 
// or since they are imported in Astro, we might need to pass them down from Astro. 
// For simplicity, let's accept images as props from Astro.

interface PresenceProps {
    images: string[];
}

export default function Presence({ images }: PresenceProps) {
    const bentoItems: BentoItem[] = [
        {
            id: 'instagram',
            title: 'Instagram',
            subtitle: '@nrvamusic',
            description: 'Follow for the latest updates and behind the scenes.',
            icon: <FaInstagram className="w-5 h-5" />,
            href: 'https://www.instagram.com/nrvamusic/',
        },
        {
            id: 'youtube',
            title: 'YouTube',
            subtitle: '@NRVAMusic',
            description: 'Watch music videos, live performances and more.',
            icon: <FaYoutube className="w-5 h-5" />,
            href: 'https://youtube.com/@NRVAMusic',
        },
        {
            id: 'spotify',
            title: 'Spotify',
            subtitle: 'NRVA',
            description: 'Listen to the latest releases on Spotify.',
            icon: <FaSpotify className="w-5 h-5" />,
            href: 'https://open.spotify.com/artist/7tmtimnvL3LiQglZ8awTqp',
        },
        {
            id: 'apple',
            title: 'Apple Music',
            subtitle: 'NRVA',
            description: 'Stream all tracks in high quality audio.',
            icon: <FaApple className="w-5 h-5" />,
            href: 'https://music.apple.com/id/artist/nrva/1640313345',
        },
        {
            id: 'soundcloud',
            title: 'Soundcloud',
            subtitle: 'nrvuh',
            description: 'Exclusive bootlegs and remixes.',
            icon: <FaSoundcloud className="w-5 h-5" />,
            href: 'https://soundcloud.com/nrvuh',
        },
        {
            id: 'twitter',
            title: 'Twitter',
            subtitle: '@DeemonKeeng',
            description: 'Random thoughts and announcements.',
            icon: <FaTwitter className="w-5 h-5" />,
            href: 'https://www.x.com/DeemonKeeng/',
        },
    ];

    return (
        <StaggeredGrid
            images={images}
            bentoItems={bentoItems}
            centerText="PRESENCE"
            showFooter={false}
        />
    );
}
