import { useEffect, useState } from "react";
import LiveMonitorService from "../services/LiveMonitorService";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function LiveMonitor() {

    const [monitorData, setMonitorData] = useState(null);

    const [cpuHistory, setCpuHistory] = useState([]);

    const [memoryHistory, setMemoryHistory] = useState([]);

    useEffect(() => {

        LiveMonitorService.connect((data) => {

            setMonitorData(data);

            setCpuHistory(prev => {

                const history = [
                    ...prev,
                    {
                        value: data.system.cpu.usage_percent
                    }
                ];

                return history.slice(-30);

            });

            setMemoryHistory(prev => {

                const history = [
                    ...prev,
                    {
                        value: data.system.memory.usage_percent
                    }
                ];

                return history.slice(-30);

            });

        });

        return () => {

            LiveMonitorService.disconnect();

        };

    }, []);

    if (!monitorData) {

        return (

            <div className="flex items-center justify-center h-screen bg-[#050B16] text-white">

                Connecting to Live Monitor...

            </div>

        );

    }

    const cpu = monitorData.system.cpu;

    const memory = monitorData.system.memory;

    const disk = monitorData.system.disk;

    const processes = monitorData.processes;

    const topProcesses = monitorData.top_processes || [];

    return (

<div className="min-h-screen bg-[#050B16] text-white px-10 py-8">

<div className="flex justify-between items-center mb-10">

<div>

<p className="text-cyan-400 uppercase tracking-[0.3em] text-xs">

ACRO OS

</p>

<h1 className="text-5xl font-bold mt-2">

Live System Monitor

</h1>

<p className="text-slate-400 mt-3">

Real-time Operating System Resource Analysis

</p>

</div>

<div className="flex items-center gap-3">

<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/>

<p className="text-green-400 font-semibold">

LIVE

</p>

</div>

</div>

<div className="grid xl:grid-cols-4 md:grid-cols-2 gap-7">

<CardGauge

title="CPU"

value={cpu.usage_percent}

/>

<CardGauge

title="Memory"

value={memory.usage_percent}

/>

<CardGauge

title="Disk"

value={disk.usage_percent}

/>

<div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#111827] to-[#091321] p-6">

<p className="text-slate-400">

Running Processes

</p>

<p className="text-6xl font-bold mt-6 text-cyan-400">

{processes.total_processes}

</p>

</div>

</div>

<div className="grid xl:grid-cols-2 gap-7 mt-8">

<HistoryChart

title="CPU Usage"

data={cpuHistory}

/>

<HistoryChart

title="Memory Usage"

data={memoryHistory}

/>

</div>

<div className="grid xl:grid-cols-2 gap-7 mt-8">

<SystemProcesses

processes={topProcesses}

/>

<SystemInformation

cpu={cpu}

memory={memory}

/>

</div>

</div>

);

}

function CardGauge({ title, value }) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#111827]
            to-[#091321]
            p-6
            shadow-lg
            hover:shadow-cyan-500/20
            hover:-translate-y-1
            transition-all
            duration-300
            "
        >

            <p
                className="
                text-slate-400
                text-sm
                uppercase
                tracking-widest
                text-center
                "
            >

                {title}

            </p>

            <div
                style={{
                    width: 150,
                    height: 150,
                    margin: "25px auto"
                }}
            >

                <CircularProgressbar

                    value={value}

                    text={`${value.toFixed(1)}%`}

                    styles={buildStyles({

                        pathColor: "#00E5FF",

                        trailColor: "#102136",

                        textColor: "#ffffff",

                        textSize: "15px"

                    })}

                />

            </div>

        </div>

    );

}

function HistoryChart({ title, data }) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#111827]
            to-[#091321]
            p-6
            "
        >

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        {title}

                    </h2>

                    <p className="text-slate-400 text-sm mt-1">

                        Last 30 updates

                    </p>

                </div>

            </div>

            <div style={{ height: 260 }}>

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="colorCpu"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#00E5FF"
                                    stopOpacity={0.6}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#00E5FF"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <XAxis

                            tick={false}

                            axisLine={false}

                            tickLine={false}

                        />

                        <YAxis

                            axisLine={false}

                            tickLine={false}

                            tick={{ fill: "#94a3b8" }}

                        />

                        <Tooltip

                            contentStyle={{

                                background: "#08111f",

                                border: "1px solid #00E5FF",

                                borderRadius: "14px"

                            }}

                        />

                        <Area

                            type="monotone"

                            dataKey="value"

                            stroke="#00E5FF"

                            strokeWidth={3}

                            fill="url(#colorCpu)"

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

function SystemProcesses({ processes }) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#111827]
            to-[#091321]
            p-6
            "
        >

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        Top Processes

                    </h2>

                    <p className="text-slate-400 text-sm mt-1">

                        Highest CPU Consumers

                    </p>

                </div>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="border-b border-slate-700">

                        <th className="text-left pb-3">

                            Process

                        </th>

                        <th className="pb-3">

                            CPU %

                        </th>

                        <th className="pb-3">

                            RAM %

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        processes.map((process) => (

                            <tr

                                key={process.pid}

                                className="
                                border-b
                                border-slate-800
                                hover:bg-cyan-500/5
                                transition-all
                                "

                            >

                                <td className="py-3">

                                    {process.name}

                                </td>

                                <td className="text-center text-cyan-400">

                                    {process.cpu_percent.toFixed(1)}

                                </td>

                                <td className="text-center">

                                    {process.memory_percent.toFixed(2)}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

function SystemInformation({ cpu, memory }) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#111827]
            to-[#091321]
            p-6
            "
        >

            <h2 className="text-2xl font-bold mb-6">

                System Information

            </h2>

            <div className="space-y-5">

                <InfoRow

                    title="Physical Cores"

                    value={cpu.physical_cores}

                />

                <InfoRow

                    title="Logical Cores"

                    value={cpu.logical_cores}

                />

                <InfoRow

                    title="Total RAM"

                    value={`${(memory.total / (1024 ** 3)).toFixed(2)} GB`}

                />

                <InfoRow

                    title="Used RAM"

                    value={`${(memory.used / (1024 ** 3)).toFixed(2)} GB`}

                />

                <InfoRow

                    title="Memory Usage"

                    value={`${memory.usage_percent}%`}

                />

                <InfoRow

                    title="CPU Usage"

                    value={`${cpu.usage_percent}%`}

                />

            </div>

        </div>

    );

}

function InfoRow({ title, value }) {

    return (

        <div
            className="
            flex
            justify-between
            items-center
            border-b
            border-slate-800
            pb-3
            "
        >

            <span className="text-slate-400">

                {title}

            </span>

            <span className="font-semibold text-cyan-300">

                {value}

            </span>

        </div>

    );

}

export default LiveMonitor;