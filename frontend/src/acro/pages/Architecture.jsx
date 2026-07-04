import {

    Cpu,

    Server,

    Database,

    Activity,

    FileText,

    Monitor,

    Layers,

    GitBranch,

    Box,

    Network

} from "lucide-react";

function ArchitectureCard({

    title,

    subtitle,

    Icon

}) {

    return (

        <div

            className="

            w-72

            rounded-2xl

            border

            border-cyan-500/20

            bg-[#08111f]

            p-6

            shadow-lg

            shadow-cyan-500/5

            transition-all

            duration-300

            hover:-translate-y-1

            hover:border-cyan-400

            hover:shadow-cyan-500/30

            "

        >

            <div

                className="

                flex

                flex-col

                items-center

                text-center

                "

            >

                <div

                    className="

                    rounded-xl

                    bg-cyan-500/10

                    p-4

                    mb-4

                    "

                >

                    <Icon

                        className="

                        h-8

                        w-8

                        text-cyan-400

                        "

                    />

                </div>

                <h2

                    className="

                    orbitron

                    text-lg

                    text-cyan-300

                    mb-4

                    "

                >

                    {title}

                </h2>

            </div>

            {

                Array.isArray(subtitle)

                ?

                (

                    <div

                        className="

                        space-y-2

                        "

                    >

                        {

                            subtitle.map((item) => (

                                <div

                                    key={item}

                                    className="

                                    flex

                                    items-center

                                    gap-2

                                    text-sm

                                    text-slate-400

                                    "

                                >

                                    <span className="text-cyan-400">

                                        •

                                    </span>

                                    <span>

                                        {item}

                                    </span>

                                </div>

                            ))

                        }

                    </div>

                )

                :

                (

                    <p

                        className="

                        text-center

                        text-sm

                        text-slate-400

                        leading-relaxed

                        "

                    >

                        {subtitle}

                    </p>

                )

            }

        </div>

    );

}
function Architecture() {

    return (

        <div className="p-8 overflow-auto h-full bg-[#050b14]">

            <div className="mb-14 text-center">

                <h1 className="orbitron text-4xl text-cyan-300">

                    System Architecture

                </h1>

                <p className="mt-4 text-slate-400 max-w-4xl mx-auto leading-7">

                    ACRO is built as a layered operating system and cloud scheduling
                    platform that combines real-time system monitoring, scheduling
                    analysis and cloud resource simulation into a unified architecture.

                </p>

            </div>

            {/* FRONTEND */}

            <div className="flex justify-center">

                <ArchitectureCard

                    title="React Frontend"

                    subtitle={[
                        "Interactive Dashboard",
                        "Live Monitoring",
                        "Scheduler Analysis",
                        "Cluster Management",
                        "Analytics & Reports"
                    ]}

                    Icon={Monitor}

                />

            </div>

            <div className="flex justify-center py-5">

                <div className="h-10 w-[2px] bg-cyan-500"/>

            </div>

            {/* API */}

            <div className="flex justify-center">

                <ArchitectureCard

                    title="REST API + WebSocket"

                    subtitle={[
                        "REST API Communication",
                        "Live WebSocket Streaming",
                        "JSON Data Exchange",
                        "Real-Time Updates"
                    ]}

                    Icon={Network}

                />

            </div>

            <div className="flex justify-center py-5">

                <div className="h-10 w-[2px] bg-cyan-500"/>

            </div>

            {/* CORE */}

            <div className="flex justify-center">

                <ArchitectureCard

                    title="ACRO Core Controller"

                    subtitle={[
                        "Request Routing",
                        "Scheduler Coordination",
                        "Monitoring Pipeline",
                        "Simulation Control"
                    ]}

                    Icon={Layers}

                />

            </div>

            <div className="flex justify-center py-6">

                <div className="h-10 w-[2px] bg-cyan-500"/>

            </div>

            {/* SERVICE */}

            <div className="flex justify-center">

                <ArchitectureCard

                    title="Simulation Service"

                    subtitle="Controls the Simulation Lifecycle"

                    Icon={Layers}

                />

            </div>

            <div className="flex justify-center py-4">

                <div className="h-10 w-[2px] bg-cyan-500" />

            </div>

            <div
                className="
                flex
                justify-center
                gap-16
                flex-wrap
                "
            >

                <ArchitectureCard

                    title="Live Monitoring"

                    subtitle={[

                        "System Monitor",

                        "Process Monitor",

                        "Resource Monitor",

                        "WebSocket Streaming"

                    ]}

                    Icon={Activity}

                />

                <ArchitectureCard

                    title="Scheduler Analysis"

                    subtitle={[

                        "Live Workload Adapter",

                        "Scheduling Engine",

                        "Metrics Engine",

                        "Recommendation Engine"

                    ]}

                    Icon={Cpu}

                />

                <ArchitectureCard

                    title="Reporting & Analytics"

                    subtitle={[

                        "Performance Reports",

                        "Visualization",

                        "Analytics Dashboard",

                        "PDF Report Generator"

                    ]}

                    Icon={FileText}

                />

            </div>

            <div className="flex justify-center py-8">

                <div className="h-12 w-[2px] bg-cyan-500"/>

            </div>
                        {/* CONNECTOR */}

            <div

                className="

                flex

                justify-center

                "

            >

                <div

                    className="

                    h-10

                    w-[2px]

                    bg-cyan-500

                    "

                />

            </div>

                        {/* BACKEND EXECUTION LAYER */}

            <div
                className="
                flex
                flex-wrap
                justify-center
                gap-10
                "
            >

                <ArchitectureCard

                    title="Scheduling Algorithms"

                    subtitle={[

                        "First Come First Serve",

                        "Shortest Job First",

                        "Priority Scheduling",

                        "Round Robin",

                        "Multi-Level Feedback Queue"

                    ]}

                    Icon={GitBranch}

                />

                <ArchitectureCard

                    title="Resource Management"

                    subtitle={[

                        "Cluster Manager",

                        "Host Manager",

                        "Virtual Machine Manager",

                        "Workload Allocation"

                    ]}

                    Icon={Server}

                />

                <ArchitectureCard

                    title="Analytics Engine"

                    subtitle={[

                        "Waiting Time",

                        "Response Time",

                        "Turnaround Time",

                        "Throughput",

                        "CPU Utilization"

                    ]}

                    Icon={Activity}

                />

                <ArchitectureCard

                    title="Communication Layer"

                    subtitle={[

                        "REST APIs",

                        "WebSocket Streaming",

                        "JSON Responses",

                        "Real-Time Updates"

                    ]}

                    Icon={Network}

                />

            </div>

            <div

                className="

                flex

                justify-center

                py-8

                "

            >

                <div

                    className="

                    h-10

                    w-[2px]

                    bg-cyan-500

                    "

                />

            </div>

            {/* CLUSTER */}

                        {/* EXECUTION LAYER */}

            <div className="flex justify-center">

                <ArchitectureCard

                    title="Execution Layer"

                    subtitle={[

                        "Cloud Simulation",

                        "Live Operating System",

                        "Hosts & Virtual Machines",

                        "Processes & Resources"

                    ]}

                    Icon={Box}

                />

            </div>

            <div className="flex justify-center py-10">

                <div className="h-10 w-[2px] bg-cyan-500"/>

            </div>
                        {/* ===================================================== */}
            {/* TECHNOLOGY STACK */}
            {/* ===================================================== */}

            <div className="mt-24">

                <h2 className="orbitron text-3xl text-cyan-300 text-center">

                    Technology Stack

                </h2>

                <p className="mt-3 text-center text-slate-400">

                    Core technologies powering ACRO

                </p>

                <div className="mt-10 grid grid-cols-3 gap-8">

                    <ArchitectureCard

                        title="Frontend"

                        subtitle={[

                            "React",

                            "Vite",

                            "JavaScript",

                            "Tailwind CSS",

                            "React Router",

                            "Axios",

                            "Recharts",

                            "React Circular Progressbar",

                            "Lucide React"

                        ]}

                        Icon={Monitor}

                    />

                    <ArchitectureCard

                        title="Backend"

                        subtitle={[

                            "Python",

                            "FastAPI",

                            "Uvicorn",

                            "Pydantic",

                            "WebSockets",

                            "ReportLab",

                            "psutil"

                        ]}

                        Icon={Cpu}

                    />

                    <ArchitectureCard

                        title="Monitoring"

                        subtitle={[

                            "System Monitor",

                            "Process Monitor",

                            "Resource Monitor",

                            "Live Monitoring Collector",

                            "Performance Metrics"

                        ]}

                        Icon={Layers}

                    />

                    <ArchitectureCard

                        title="Scheduling"

                        subtitle={[

                            "FCFS",

                            "Shortest Job First",

                            "Priority Scheduling",

                            "Round Robin",

                            "Multi-Level Feedback Queue"

                        ]}

                        Icon={GitBranch}

                    />

                    <ArchitectureCard

                        title="Infrastructure"

                        subtitle={[

                            "Cloud Cluster",

                            "Hosts",

                            "Virtual Machines",

                            "Simulation Engine",

                            "Live Operating System"

                        ]}

                        Icon={Server}

                    />

                    <ArchitectureCard

                        title="Communication"

                        subtitle={[

                            "REST APIs",

                            "WebSockets",

                            "HTTP",

                            "JSON",

                            "Real-Time Streaming"

                        ]}

                        Icon={Network}

                    />

                </div>

            </div>

            <div

                className="

                mt-20

                rounded-2xl

                border

                border-cyan-500/20

                bg-[#08111f]

                p-8

                "

            >

                <h2

                    className="

                    orbitron

                    text-2xl

                    text-cyan-300

                    mb-5

                    "

                >

                    Architectural Overview

                </h2>

                <p

                    className="

                    leading-8

                    text-slate-300

                    "

                >

                    Adaptive Cloud Resource Orchestrator (ACRO) is built using a

                    layered architecture that separates the presentation,

                    service, simulation and infrastructure layers. The React

                    frontend communicates with the FastAPI backend through REST

                    APIs, while the Simulation Service coordinates workload

                    generation, scheduling, resource allocation, metrics

                    collection, logging and report generation. The modular

                    architecture enables new scheduling algorithms, analytics

                    components and cloud resource management strategies to be

                    integrated independently without affecting the remaining

                    subsystems.

                </p>

            </div>

        </div>

    );

}

export default Architecture;