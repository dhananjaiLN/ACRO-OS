function SummaryCard({

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
            bg-[#08111f]
            p-5
            "

        >

            <p

                className="
                terminal
                text-xs
                tracking-[0.18em]
                text-slate-500
                "

            >

                {title}

            </p>

            <h2

                className={`
                orbitron
                text-4xl
                mt-3
                ${color}
                `}

            >

                {value}

            </h2>

        </div>

    );

}

function VMSummary({

    total,

    waiting,

    running,

    completed

}) {

    return (

        <div

            className="
            grid
            grid-cols-4
            gap-5
            "

        >

            <SummaryCard

                title="TOTAL"

                value={total}

                color="text-cyan-300"

            />

            <SummaryCard

                title="WAITING"

                value={waiting}

                color="text-yellow-400"

            />

            <SummaryCard

                title="RUNNING"

                value={running}

                color="text-green-400"

            />

            <SummaryCard

                title="COMPLETED"

                value={completed}

                color="text-purple-400"

            />

        </div>

    );

}

export default VMSummary;