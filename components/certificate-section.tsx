export default function CertificateSection() {
    return (
        <div className="bg-card/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Certificate Video */}
                <div className="relative rounded-lg overflow-hidden bg-black/50 border border-primary/20">
                    <video
                        src="/certificate.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                    />
                </div>

                {/* Certificate Description */}
                <div className="space-y-4">
                    <div>
                        <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wider font-mono">Recognition</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                            Certificate of <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Participation</span>
                        </h2>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Awarded to individuals who actively participated in the technical event conducted as part of the Tech Fest organized by the Department of Computer Science & Engineering, Christ College of Engineering.
                    </p>
                    <div className="pt-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Official Recognition</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
