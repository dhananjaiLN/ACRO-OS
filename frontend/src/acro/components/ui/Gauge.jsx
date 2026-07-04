import { motion } from "framer-motion";

function Gauge({

    title,

    value,

    color = "#00E5FF"

}) {

    const radius = 60;

    const stroke = 10;

    const circumference = 2 * Math.PI * radius;

    const progress =
        circumference -
        (value / 100) * circumference;

    return (

        <div

            className="

flex

flex-col

items-center

justify-center

"

        >

            <div className="relative">

                <svg

                    width="170"

                    height="170"

                    viewBox="0 0 170 170"

                >

                    <defs>

                        <filter id="glow">

                            <feGaussianBlur

                                stdDeviation="3"

                                result="coloredBlur"

                            />

                            <feMerge>

                                <feMergeNode in="coloredBlur"/>

                                <feMergeNode in="SourceGraphic"/>

                            </feMerge>

                        </filter>

                    </defs>

                    <circle

                        cx="85"

                        cy="85"

                        r={radius}

                        fill="transparent"

                        stroke="#13263B"

                        strokeWidth={stroke}

                    />

                    <motion.circle

                        cx="85"

                        cy="85"

                        r={radius}

                        fill="transparent"

                        stroke={color}

                        strokeWidth={stroke}

                        strokeLinecap="round"

                        strokeDasharray={circumference}

                        initial={{

                            strokeDashoffset:circumference

                        }}

                        animate={{

                            strokeDashoffset:progress

                        }}

                        transition={{

                            duration:1.4

                        }}

                        transform="rotate(-90 85 85)"

                        filter="url(#glow)"

                    />

                </svg>

                <motion.div

                    initial={{

                        opacity:0,

                        scale:0.8

                    }}

                    animate={{

                        opacity:1,

                        scale:1

                    }}

                    transition={{

                        delay:.5

                    }}

                    className="

absolute

inset-0

flex

flex-col

items-center

justify-center

"

                >

                    <h1

                        className="

orbitron

text-4xl

font-bold

"

                        style={{

                            color

                        }}

                    >

                        {value}

                    </h1>

                    <p

                        className="

terminal

text-xs

tracking-[0.2em]

text-slate-500

"

                    >

                        PERCENT

                    </p>

                </motion.div>

            </div>

            <h3

                className="

mt-5

orbitron

tracking-[0.2em]

text-cyan-300

uppercase

"

            >

                {title}

            </h3>

        </div>

    );

}

export default Gauge;