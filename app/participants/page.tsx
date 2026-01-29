import { Participant, columns } from "@/components/participants/columns"
import { DataTable } from "@/components/participants/data-table"

async function getData(): Promise<Participant[]> {
    // Mock data matching the futuristic Indian college context
    return [
        {
            id: "1",
            name: "Arjun Narayanan",
            email: "arjun.n@christ.edu.in",
            college: "CHRIST College of Engineering",
            registrationDate: "2026-01-28T09:30:00",
        },
        {
            id: "2",
            name: "Sneha Reddy",
            email: "sneha.r@iitm.ac.in",
            college: "IIT Madras",
            registrationDate: "2026-01-28T10:15:00",
        },
        {
            id: "3",
            name: "Mohammed Fazil",
            email: "fazil.m@nitc.ac.in",
            college: "NIT Calicut",
            registrationDate: "2026-01-28T11:45:00",
        },
        {
            id: "4",
            name: "Diya Menon",
            email: "diya.menon@cet.ac.in",
            college: "College of Engineering Trivandrum",
            registrationDate: "2026-01-27T14:20:00",
        },
        {
            id: "5",
            name: "Rahul Krishnan",
            email: "rahul.k@cusat.ac.in",
            college: "CUSAT",
            registrationDate: "2026-01-27T16:50:00",
        },
        {
            id: "6",
            name: "Ananya S",
            email: "ananya.s@rajagiri.edu",
            college: "Rajagiri School of Engineering",
            registrationDate: "2026-01-26T09:00:00",
        },
        {
            id: "7",
            name: "Karthik V",
            email: "karthik.v@model.ac.in",
            college: "Model Engineering College",
            registrationDate: "2026-01-26T11:10:00",
        },
        {
            id: "8",
            name: "Priya Thomas",
            email: "priya.t@fisat.ac.in",
            college: "FISAT",
            registrationDate: "2026-01-25T13:45:00",
        },
        {
            id: "9",
            name: "Abhishek Kumar",
            email: "abhishek.k@amrita.edu",
            college: "Amrita Vishwa Vidyapeetham",
            registrationDate: "2026-01-25T15:30:00",
        },
        {
            id: "10",
            name: "Lakshmi Nair",
            email: "lakshmi.n@scms.ac.in",
            college: "SCMS School of Engineering",
            registrationDate: "2026-01-24T10:20:00",
        },
        {
            id: "11",
            name: "Rohan Das",
            email: "rohan.d@bits.edu",
            college: "BITS Pilani",
            registrationDate: "2026-01-24T12:00:00",
        },
        {
            id: "12",
            name: "Meera John",
            email: "meera.j@mac.ac.in",
            college: "Mar Athanasius College",
            registrationDate: "2026-01-23T09:40:00",
        },
        {
            id: "13",
            name: "Varun B",
            email: "varun.b@tkm.ac.in",
            college: "TKM College of Engineering",
            registrationDate: "2026-01-23T14:15:00",
        },
        {
            id: "14",
            name: "Nandini R",
            email: "nandini.r@gec.ac.in",
            college: "GEC Thrissur",
            registrationDate: "2026-01-22T11:00:00",
        },
        {
            id: "15",
            name: "Sanjay Gupta",
            email: "sanjay.g@vit.ac.in",
            college: "VIT Vellore",
            registrationDate: "2026-01-22T16:30:00",
        }
    ]
}

export default async function ParticipantsPage() {
    const data = await getData()

    return (
        <div className="min-h-screen w-full bg-black text-white overflow-x-hidden selection:bg-cyan-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-secondary/10 to-black opacity-50 pointer-events-none" />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-secondary/15 to-transparent blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center min-h-screen p-4 md:p-8">

                {/* Header Section */}
                <header className="w-full max-w-7xl mx-auto text-center mb-12 mt-8 animate-slide-up">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs md:text-sm text-primary tracking-wider font-mono">LIVE REGISTRATIONS</span>
                    </div>

                    <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-2 flex flex-col md:block">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">KINETIC</span>{' '}
                        <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(194,100,200,0.3)]">ART</span>{' '}
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">SUPER COMPUTER</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-muted-foreground font-light tracking-wide mb-4">
                        Registered Participants
                    </p>

                    <div className="h-px w-24 md:w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4"></div>

                    <p className="text-xs md:text-sm text-muted-foreground font-mono">
                        Department of Computer Science and Engineering • CHRIST College of Engineering (Autonomous)
                    </p>
                </header>

                {/* Main Card */}
                <main className="w-full max-w-7xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="relative rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_50px_-10px_rgba(194,100,200,0.15)] overflow-hidden">
                        {/* Top decorative line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">List of Registered Attendees</h2>
                                    <p className="text-sm text-muted-foreground">Join the innovators and creators shaping the future.</p>
                                </div>
                            </div>

                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-16 text-center text-sm text-muted-foreground pb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p>Thank you for being part of Kinetic Art Super Computer!</p>
                </footer>

            </div>
        </div>
    )
}
