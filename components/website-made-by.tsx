'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

interface Developer {
    name: string;
    role: string;
    image?: string;
    github?: string;
    linkedin?: string;
    email?: string;
}

export default function WebsiteMadeBy() {
    const [isHovered, setIsHovered] = useState(false);

    // Add your developer information here
    const developers: Developer[] = [
        {
            name: 'John Antony',
            role: 'Full Stack Developer',
            github: 'https://github.com/KNOWASJOHN',
            linkedin: 'https://www.linkedin.com/in/johnantony-/',
            email: 'ja416271@gmail.com',
        },
        // Add more developers if needed
    ];

    const developer = developers[0]; // Get the single developer

    return (
        <div className="bg-card/30 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-white/10">
            <div
                className="group relative bg-black/50 backdrop-blur-sm rounded-lg border border-primary/20 p-3 sm:p-4 transition-all duration-500 overflow-hidden hover:border-primary/50 hover:bg-black/70"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* ID Card Container */}
                <div className="max-w-2xl mx-auto">
                    {/* ID Card Body - Horizontal Layout */}
                    <div className="group/card relative bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-sm rounded-lg border-2 border-primary/30 p-3 sm:p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01]">
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Left Side - Photo */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-primary/40 to-secondary/40 border-2 border-primary/60 overflow-hidden shadow-lg relative">
                                    <Image
                                        src="/me/john.jpg"
                                        alt={developer.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 80px, 96px"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Right Side - Information */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                                    {/* Name and Role */}
                                    <div className="space-y-1">
                                        <div>
                                            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">
                                                Website Developer
                                            </p>
                                            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                                                {developer.name}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                                            {developer.role}
                                        </p>
                                    </div>

                                    {/* Contact and Social */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {/* Email - Desktop only text */}
                                        {developer.email && (
                                            <a
                                                href={`mailto:${developer.email}`}
                                                className="text-xs text-white/70 hover:text-primary transition-colors duration-200 hidden sm:block truncate max-w-[150px]"
                                                title={developer.email}
                                            >
                                                {developer.email}
                                            </a>
                                        )}

                                        {/* Social Links */}
                                        <div className="flex gap-2.5">
                                            {developer.email && (
                                                <a
                                                    href={`mailto:${developer.email}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors duration-200 sm:hidden"
                                                    aria-label="Email"
                                                    title={developer.email}
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            )}
                                            {developer.github && (
                                                <a
                                                    href={developer.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                                    aria-label="GitHub"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                            {developer.linkedin && (
                                                <a
                                                    href={developer.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                                    aria-label="LinkedIn"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack - Inline at Bottom */}
                                <div className="mt-2 pt-2 border-t border-primary/20">
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Next.js', 'React', 'TypeScript', 'Tailwind CSS'].map(
                                            (tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 text-[9px] bg-primary/10 border border-primary/30 rounded text-primary font-semibold hover:bg-primary/20 transition-colors duration-200"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                </div>

                {/* Hover glow effect */}
                <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                />

                {/* Light sweep effect */}
                <div
                    className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isHovered ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                        }`}
                >
                    <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
            </div>
        </div>
    );
}
