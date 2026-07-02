'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '../lib/utils'
import { FaGithub, FaSlack, FaTwitter } from 'react-icons/fa'
import { LiquidMetalButton } from './LiquidMetalButton'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
    href?: string
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

export function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },
    className,
    showFooter = true,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        // Note: we target both regular images and bento images if possible
        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        return () => {
            // Cleanup
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item: any) => {
                const colAttr = item.getAttribute('data-col');
                // Use data-col if available, fallback to a safe index calculation
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container')

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                // Animate Bento Container to move down and scale slightly
                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.05, // Move down slightly
                    scale: 0.8, // Subtle scale up instead of massive 1.5
                    zIndex: 1000,
                    ease: 'power2.out', // Smooth easing
                    duration: 1,
                    force3D: true // Force hardware acceleration
                }, 0)
            }
        }
    }, [isLoaded])

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    // This perfectly balances the 3rd row with 2 cards on each side of the bento container.
    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => images[i % images.length]);

    // Replace the slot where we want the bento group
    // Position at index 14 = Row 3 (middle row), spanning all 7 columns
    mixedGridItems[14] = 'BENTO_GROUP';

    return (
        <div
            className={cn("relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            {/* Ambient Background Orbs for Glass Effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-zinc-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />
            <section className="grid place-items-center w-full relative mt-[10vh]">
                <div ref={textRef} className="text font-alt uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-neutral-900 dark:text-white">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="grid place-items-center w-full relative">
                <div ref={gridFullRef} className="grid--full relative w-full my-[10vh] h-auto aspect-[1.3] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            // Render the HoverExpand Group using passed bentoItems
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={0} className="grid__item bento-container col-span-7 row-span-1 relative z-20 flex items-center justify-center h-full w-full will-change-transform px-4 md:px-12">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-5xl mx-auto">
                                        {bentoItems.map((bentoItem) => {
                                            return (
                                                <a 
                                                    key={bentoItem.id} 
                                                    href={bentoItem.href} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="w-full"
                                                >
                                                    <LiquidMetalButton
                                                        icon={bentoItem.icon}
                                                        size="md"
                                                        className="w-full"
                                                        metalConfig={{
                                                            colorBack: "#3f3f46", // zinc-700
                                                            colorTint: "#71717a", // zinc-500
                                                            speed: 0.6,
                                                            distortion: 0.2
                                                        }}
                                                    >
                                                        {bentoItem.title}
                                                    </LiquidMetalButton>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }

                        // Skip rendering for the slots that the group takes up
                        // Group starts at 14, takes up the entire row (15 through 20)
                        if (i > 14 && i <= 20) return null;

                        if (typeof item === 'string') {
                            return (
                                <figure key={`img-${i}`} data-col={i % 7} className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-white/20">

                                        {/* Background Image (using provided URL) */}
                                        <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0">
                                            <img
                                                src={item}
                                                alt=""
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            />
                                        </div>

                                        {/* Gradient Overlay for Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section >

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div >
    )
}

export default StaggeredGrid
