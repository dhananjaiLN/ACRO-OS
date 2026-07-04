import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

import ActionButton from "../ui/ActionButton";
import StatusBadge from "../ui/StatusBadge";
import StatCard from "../ui/StatCard";

import {
    start,
    reset,
    status,
    scheduler
} from "../../services/SimulationService";

function MissionControl() {

    const algorithms = [
        "FCFS",
        "SJF",
        "Priority",
        "Round Robin",
        "Weighted Fair",
        "Adaptive"
    ];

    const [selectedScheduler, setSelectedScheduler] = useState("FCFS");

    const [simulation, setSimulation] = useState({
        running: false,
        tick: 0,
        scheduler: "FCFS",
        total_vms: 0,
        running_vms: 0,
        waiting_vms: 0,
        completed_vms: 0
    });

    async function loadStatus() {

        try {

            const data = await status();

            setSimulation(data);

            setSelectedScheduler(data.scheduler);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadStatus();

        const timer = setInterval(loadStatus, 1000);

        return () => clearInterval(timer);

    }, []);

    async function handleSchedulerChange(e) {

        const algorithm = e.target.value;

        setSelectedScheduler(algorithm);

        try {

            await scheduler(algorithm);

            loadStatus();

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

    return (

        <div className="space-y-6">

            {/* Controls */}

            <div className="flex justify-between items-end">

                <div>

                    <label className="terminal text-xs tracking-[0.2em] text-slate-500">

                        SCHEDULER

                    </label>

                    <select

                        value={selectedScheduler}

                        onChange={handleSchedulerChange}

                        disabled={simulation.running}

                        className="
                        mt-2
                        w-72
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-[#09111f]
                        px-4
                        py-3
                        text-cyan-300
                        outline-none
                        "

                    >

                        {

                            algorithms.map(algo => (

                                <option

                                    key={algo}

                                    value={algo}

                                >

                                    {algo}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="flex gap-4">

                    <ActionButton

                        icon={<Play size={18} />}

                        onClick={handleStart}

                        disabled={simulation.running}

                    >

                        START

                    </ActionButton>

                    <ActionButton

                        variant="purple"

                        icon={<RotateCcw size={18} />}

                        onClick={handleReset}

                    >

                        RESET

                    </ActionButton>

                </div>

            </div>

            <StatusBadge

                online={simulation.running}

                text={
                    simulation.running
                        ? "SIMULATION RUNNING"
                        : "SIMULATION STOPPED"
                }

            />

            <div className="grid grid-cols-6 gap-4">

                <StatCard

                    title="Tick"

                    value={simulation.tick}

                    color="text-cyan-300"

                />

                <StatCard

                    title="Running"

                    value={simulation.running_vms}

                    color="text-green-400"

                />

                <StatCard

                    title="Waiting"

                    value={simulation.waiting_vms}

                    color="text-yellow-400"

                />

                <StatCard

                    title="Completed"

                    value={simulation.completed_vms}

                    color="text-purple-400"

                />

                <StatCard

                    title="Total"

                    value={simulation.total_vms}

                    color="text-cyan-300"

                />

                <StatCard

                    title="Algorithm"

                    value={simulation.scheduler}

                    color="text-pink-400"

                />

            </div>

        </div>

    );

}

export default MissionControl;