'use client';

export default function CertificateSection() {
    return (
        <div className="bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-primary/30 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-50" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Certificate Video */}
                <div className="relative rounded-lg overflow-hidden bg-black/50 border-2 border-primary/30">
                    <video
                        src="/certificate.mp4"
                        poster="certificate.jpg"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                    />
                </div>

                {/* Event Ended Message */}
                <div className="space-y-4 text-center md:text-left">
                    <div>
                        <p className="text-secondary font-semibold text-sm mb-2 uppercase tracking-wider font-mono">
                            Event Concluded
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                            Thank You for <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Participating!</span>
                        </h2>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                        The <img src="/kinetic.png" className="inline-block w-28 mx-1 pb-1" alt="Kinetic Art" /> event has successfully concluded on <span className="text-white font-semibold">February 5th, 2026</span>. We appreciate everyone who joined us for this incredible journey into the world of parallel computing and kinetic art.
                    </p>

                    <div className="pt-2 space-y-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Certificates will be distributed soon</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground/80 pt-2">
                        Stay tuned for updates from <a href="https://www.instagram.com/techletics_cce/"><span className="font-orbitron tracking-wide whitespace-nowrap"><img src="/techletics-logo.png" className="inline-block w-7" alt="Techletics" /><span className="text-[#c9a55c]">TECH</span>LETICS<span className="text-[#c9a55c]">'26</span></span></a>
                    </p>
                </div>
            </div>
        </div>
    );
}
