import { useEffect, useState } from "react";

import {
    Play,
    RotateCcw,
    Activity,
    Cpu
} from "lucide-react";

import {
    start,
    reset,
    status,
    scheduler
} from "../../services/SimulationService";

function SchedulerPanel() {

    const algorithms = [
        "FCFS",
        "SJF",
        "Priority",
        "Round Robin",
        "Weighted Fair",
        "Adaptive"
    ];

    const [selected, setSelected] = useState("FCFS");

    const [simulation, setSimulation] = useState({
        running: false,
        tick: 0,
        scheduler: "FCFS",
        running_vms: 0
    });

    useEffect(() => {

        loadStatus();

        const timer = setInterval(loadStatus, 1000);

        return () => clearInterval(timer);

    }, []);

    async function loadStatus() {

        try {

            const data = await status();

            setSimulation(data);

            setSelected(data.scheduler);

        }

        catch (err) {

            console.error(err);

        }

    }

    async function handleStart() {

        try {

            await start();

            loadStatus();

        }

        catch (err) {

            console.error(err);

        }

    }

    async function handleReset() {

        try {

            await reset();

            loadStatus();

        }

        catch (err) {

            console.error(err);

        }

    }

    async function handleScheduler(e) {

        const algorithm = e.target.value;

        setSelected(algorithm);

        try {

            await scheduler(algorithm);

            loadStatus();

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="grid grid-cols-12 gap-6">

            {/* LEFT */}

            <div className="col-span-4 space-y-5">

                <div>

                    <p className="terminal text-xs text-slate-500 mb-2">

                        SCHEDULER

                    </p>

                    <select

                        value={selected}

                        onChange={handleScheduler}

                        disabled={simulation.running}

                        className="
                        w-full
                        bg-[#09111f]
                        border
                        border-cyan-500/20
                        rounded-xl
                        p-3
                        text-cyan-300
                        outline-none
                        "
                    >

                        {algorithms.map(algo => (

                            <option

                                key={algo}

                                value={algo}

                            >

                                {algo}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="flex gap-3">

                    <button

                        onClick={handleStart}

                        disabled={simulation.running}

                        className="
                        flex-1
                        rounded-xl
                        bg-cyan-500
                        hover:bg-cyan-400
                        text-black
                        font-semibold
                        py-3
                        transition
                        disabled:opacity-50
                        "
                    >

                        <div className="flex justify-center items-center gap-2">

                            <Play size={18}/>

                            START

                        </div>

                    </button>

                    <button

                        onClick={handleReset}

                        className="
                        flex-1
                        rounded-xl
                        bg-purple-600
                        hover:bg-purple-500
                        py-3
                        transition
                        "

                    >

                        <div className="flex justify-center items-center gap-2">

                            <RotateCcw size={18}/>

                            RESET

                        </div>

                    </button>

                </div>

            </div>

            {/* RIGHT */}

            <div className="col-span-8 grid grid-cols-2 gap-4">

                <InfoCard

                    icon={<Activity size={18}/>}

                    title="STATUS"

                    value={simulation.running ? "RUNNING" : "STOPPED"}

                    color={
                        simulation.running
                            ? "text-green-400"
                            : "text-red-400"
                    }

                />

                <InfoCard

                    icon={<Cpu size={18}/>}

                    title="TICK"

                    value={simulation.tick}

                    color="text-cyan-300"

                />

                <InfoCard

                    title="RUNNING VMS"

                    value={simulation.running_vms}

                    color="text-yellow-400"

                />

                <InfoCard

                    title="ALGORITHM"

                    value={simulation.scheduler}

                    color="text-purple-400"

                />

            </div>

        </div>

    );

}

function InfoCard({

    icon,

    title,

    value,

    color

}) {

    return (

        <div
            className="
            rounded-xl
            border
            border-cyan-500/10
            bg-[#09111f]
            p-4
            "
        >

            <div className="flex items-center gap-2">

                {icon}

                <p className="terminal text-xs text-slate-500">

                    {title}

                </p>

            </div>

            <h2

                className={`

                mt-3

                orbitron

                text-2xl

                ${color}

                `}

            >

                {value}

            </h2>

        </div>

    );

}

export default SchedulerPanel;