'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function SponsorsSection() {
    const [isActive, setIsActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (isActive) {
                    setIsActive(false);
                }
            }
        };

        if (isActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive]);

    return (
        <div className="bg-card/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/10">
            <div
                ref={containerRef}
                className={`group relative bg-black/50 backdrop-blur-sm rounded-lg border border-primary/20 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-1000 card-hover overflow-hidden touch-manipulation cursor-pointer ${isActive ? 'border-primary/50 bg-black/70' : 'hover:border-primary/50 hover:bg-black/70'
                    }`}
                onClick={handleClick}
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                    {/* Title and Description */}
                    <div className="flex-1 text-center lg:text-left w-full lg:max-w-none">
                        <p className="text-primary font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider font-mono">
                            Partnership
                        </p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 leading-tight">
                            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sponsor</span>
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0">
                            We are grateful to our sponsor for their support in making this event possible
                        </p>
                    </div>

                    {/* Sponsor Logo and Name - Right Side */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto justify-center lg:justify-end">
                        {/* Logo */}
                        <div className="flex justify-center items-center overflow-hidden p-2 sm:p-3 md:p-4 flex-shrink-0">
                            <a
                                href="https://esquirecomputers.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src="/sponsors/Logo.png"
                                    alt="Sponsor Logo"
                                    width={150}
                                    height={240}
                                    className={`object-contain w-24 h-auto sm:w-32 md:w-36 lg:w-40 transition-all duration-500 ease-in-out ${isActive ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'
                                        }`}
                                />
                            </a>
                        </div>

                        {/* Company Name */}
                        <div className="flex flex-col justify-center space-y-1.5 sm:space-y-2 text-center sm:text-left w-full sm:w-auto">
                            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-colors ${isActive ? 'text-primary' : 'text-white group-hover:text-primary'
                                }`}>
                                Esquire Computers
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Official Sponsor
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-1 flex-wrap">
                                {/* Website Link */}
                                <a
                                    href="https://esquirecomputers.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span>esquirecomputers.com</span>
                                </a>

                                {/* Instagram Link */}
                                <a
                                    href="https://www.instagram.com/esquire__associates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    <span>esquire__associates</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />

                {/* Light sweep effect - responsive width */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isActive ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                    }`}>
                    <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
            </div>
        </div>
    );
}
