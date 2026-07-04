import MetricCard from "./MetricCard";

function SchedulerSummary({

    data

}) {

    if (

        !data ||

        data.length === 0

    ) {

        return (

            <div

                className="
                rounded-xl
                border
                border-cyan-500/10
                bg-[#08111f]
                p-8
                text-center
                text-slate-400
                "

            >

                No Metrics Available

            </div>

        );

    }

    const latest = data[data.length - 1];

    return (

        <div

            className="
            grid
            grid-cols-5
            gap-5
            "

        >

            <MetricCard

                title="CURRENT TICK"

                value={latest.tick}

                color="text-cyan-300"

            />

            <MetricCard

                title="SCHEDULER"

                value={latest.scheduler}

                color="text-green-400"

            />

            <MetricCard

                title="CPU %"

                value={latest.cpu_utilization}

                color="text-cyan-300"

            />

            <MetricCard

                title="MEMORY %"

                value={latest.memory_utilization}

                color="text-purple-400"

            />

            <MetricCard

                title="AVG WAIT"

                value={latest.average_waiting_time}

                color="text-yellow-400"

            />

        </div>

    );

}

export default SchedulerSummary;