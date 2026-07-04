import { useEffect, useRef, useState } from "react";

import { Terminal } from "lucide-react";

import { fetchLogs } from "../../../services/LogService";

function KernelConsole() {

    const [logs, setLogs] = useState([]);

    const logContainerRef = useRef(null);

    useEffect(() => {

        loadLogs();

        const timer = setInterval(loadLogs, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        const container = logContainerRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;

    }, [logs]);

    async function loadLogs() {

        try {

            const data = await fetchLogs();

            setLogs(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    function levelColor(level) {

        switch (level) {

            case "SUCCESS":
                return "text-green-400";

            case "WARNING":
                return "text-yellow-400";

            case "ERROR":
                return "text-red-400";

            default:
                return "text-cyan-300";

        }

    }

    return (

        <div
            className="
            h-full
            flex
            flex-col
            rounded-xl
            bg-[#050816]
            border
            border-cyan-500/10
            overflow-hidden
            "
        >

            {/* Header */}

            <div

                className="
                flex
                items-center
                gap-3
                px-5
                py-3
                border-b
                border-cyan-500/10
                "

            >

                <Terminal

                    size={18}

                    className="text-cyan-400"

                />

                <span

                    className="
                    terminal
                    text-xs
                    tracking-[0.18em]
                    text-cyan-300
                    "

                >

                    LIVE EVENT STREAM

                </span>

            </div>

            {/* Logs */}

            <div
                ref={logContainerRef}
                className="
                flex-1
                overflow-y-auto
                px-5
                py-4
                font-mono
                text-sm
                space-y-2
                "
            >

                {

                    logs.length === 0 && (

                        <p className="text-slate-500">

                            Waiting for simulation events...

                        </p>

                    )

                }

                {

                    logs.map((log, index) => (

                        <div

                            key={index}

                            className="flex gap-4"

                        >

                            <span className="text-slate-500 w-20">

                                {log.time}

                            </span>

                            <span

                                className={`
                                    w-20
                                    font-semibold
                                    ${levelColor(log.level)}
                                `}

                            >

                                {log.level}

                            </span>

                            <span className="text-slate-300">

                                {log.message}

                            </span>

                        </div>

                    ))

                }


            </div>

        </div>

    );

}

export default KernelConsole;