import MetricCard from "./MetricCard";

function SimulationSummary({

    data

}) {

    if (

        data.length === 0

    ) {

        return null;

    }

    const averageCPU = (

        data.reduce(

            (sum, item) =>

                sum + item.cpu_utilization,

            0

        ) / data.length

    ).toFixed(1);

    const averageMemory = (

        data.reduce(

            (sum, item) =>

                sum + item.memory_utilization,

            0

        ) / data.length

    ).toFixed(1);

    const peakWaiting = Math.max(

        ...data.map(

            item => item.waiting_vms

        )

    );

    const latest = data[data.length - 1];

    return (

        <div className="space-y-4">

            <h2

                className="
                orbitron
                text-cyan-300
                text-xl
                "

            >

                Simulation Summary

            </h2>

            <div

                className="
                grid
                grid-cols-4
                gap-5
                "

            >

                <MetricCard

                    title="AVG CPU"

                    value={`${averageCPU}%`}

                    color="text-cyan-300"

                />

                <MetricCard

                    title="AVG MEMORY"

                    value={`${averageMemory}%`}

                    color="text-purple-400"

                />

                <MetricCard

                    title="PEAK WAITING"

                    value={peakWaiting}

                    color="text-yellow-400"

                />

                <MetricCard

                    title="COMPLETED VMS"

                    value={latest.completed_vms}

                    color="text-green-400"

                />

            </div>

        </div>

    );

}

export default SimulationSummary;