'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function EventCoordinator() {
    const [isActive, setIsActive] = useState(false);

    // Handle interaction for both desktop hover and mobile touch
    const handleInteraction = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="bg-card/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/10">
            <div className="space-y-6 sm:space-y-8">
                {/* Section Header */}
                <div className="text-center">
                    <p className="text-primary font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wider font-mono">
                        Meet the Team
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                        Team Behind the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Event</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                        Dedicated individuals who made this event possible
                    </p>
                </div>

                {/* Team Photo Container */}
                <div
                    className={`group relative bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-sm rounded-xl border-2 p-6 sm:p-8 transition-all duration-500 overflow-hidden cursor-pointer touch-manipulation max-w-5xl mx-auto shadow-2xl ${isActive
                        ? 'border-primary/50 bg-card/50 shadow-primary/20'
                        : 'border-primary/30 hover:border-primary/50 hover:bg-card/50 hover:shadow-primary/20'
                        }`}
                    onClick={handleInteraction}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleInteraction();
                    }}
                >
                    {/* Image Container with rounded corners */}
                    <div className="relative w-full aspect-[3/2] sm:aspect-[5/3] rounded-xl overflow-hidden bg-gradient-to-br from-black/40 to-black/60 shadow-xl">
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-500 ${isActive ? 'opacity-20' : 'opacity-60 group-hover:opacity-20'
                            }`} />

                        {/* Team Photo with rounded corners */}
                        <Image
                            src="/team/team.jpg"
                            alt="Event Team"
                            fill
                            className={`object-cover transition-all duration-700 ease-out rounded-xl ${isActive
                                ? 'grayscale-0 scale-105'
                                : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
                                }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                            priority={false}
                        />
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />

                    {/* Light sweep effect */}
                    <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isActive ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                        }`}>
                        <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </div>
                </div>
            </div>
        </div>
    );
}
