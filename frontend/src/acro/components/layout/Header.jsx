import {
    ShieldCheck,
    Clock3,
    Timer,
    Activity
} from "lucide-react";

import { useEffect, useState } from "react";

function Header() {

    const [time, setTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(
                new Date().toLocaleTimeString()
            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header

            className="

            h-20

            border-b

            border-cyan-500/20

            bg-[#07101d]/80

            backdrop-blur-xl

            px-8

            flex

            items-center

            justify-between

            "

        >

            {/* LEFT */}

            <div>

                <h1

                    className="

                    orbitron

                    text-3xl

                    tracking-[0.25em]

                    text-cyan-300

                    "

                >

                    ◇ ACRO OS

                </h1>

                <p

                    className="

                    terminal

                    text-xs

                    tracking-[0.18em]

                    text-slate-500

                    "

                >

                    Adaptive Cloud Resource Orchestrator

                </p>

            </div>

            {/* RIGHT */}

            <div className="flex gap-8">

                <Status

                    icon={<ShieldCheck size={16}/>}

                    label="SYSTEM"

                    value="ONLINE"

                    color="text-green-400"

                />

                <Status

                    icon={<Activity size={16}/>}

                    label="BACKEND"

                    value="CONNECTED"

                    color="text-cyan-400"

                />

                <Status

                    icon={<Timer size={16}/>}

                    label="TICK"

                    value="00000"

                    color="text-purple-400"

                />

                <Status

                    icon={<Clock3 size={16}/>}

                    label="TIME"

                    value={time}

                    color="text-yellow-400"

                />

            </div>

        </header>

    );

}

function Status({

    icon,

    label,

    value,

    color

}) {

    return (

        <div className="flex items-center gap-3">

            <div className={color}>

                {icon}

            </div>

            <div>

                <p

                    className="

                    terminal

                    text-[10px]

                    tracking-[0.15em]

                    text-slate-500

                    "

                >

                    {label}

                </p>

                <h4

                    className={`

                    orbitron

                    text-sm

                    ${color}

                    `}

                >

                    {value}

                </h4>

            </div>

        </div>

    );

}

export default Header;