import { useEffect, useState } from "react";

import Gauge from "../ui/Gauge";

import { getCluster } from "../../services/ClusterService";

function ClusterOverview() {

    const [cluster, setCluster] = useState(null);

    useEffect(() => {

        loadCluster();

        const timer = setInterval(loadCluster, 1000);

        return () => clearInterval(timer);

    }, []);

    async function loadCluster() {

        try {

            const data = await getCluster();

            setCluster(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!cluster) {

        return (

            <div className="h-[320px] flex items-center justify-center">

                Loading...

            </div>

        );

    }

    const health = Math.max(

        0,

        Math.round(

            100 -

            (

                cluster.cpu_utilization * 0.6 +

                cluster.memory_utilization * 0.4

            )

        )

    );

    return (

        <div className="flex flex-col justify-between h-full">

            <div className="grid grid-cols-4 gap-6">

                <Gauge

                    title="CPU"

                    value={cluster.cpu_utilization}

                    color="#00E5FF"

                />

                <Gauge

                    title="MEMORY"

                    value={cluster.memory_utilization}

                    color="#A855F7"

                />

                <Gauge

                    title="HEALTH"

                    value={health}

                    color="#22C55E"

                />

                <div

                    className="
                    rounded-xl
                    border
                    border-yellow-500/20
                    bg-[#08111f]
                    flex
                    flex-col
                    justify-center
                    items-center
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

                        ONLINE NODES

                    </p>

                    <h2

                        className="
                        orbitron
                        text-5xl
                        text-yellow-400
                        mt-4
                        "

                    >

                        {cluster.online_hosts}

                    </h2>

                    <p

                        className="
                        terminal
                        text-xs
                        text-slate-400
                        mt-2
                        "

                    >

                        OF {cluster.total_hosts} TOTAL

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mt-8">

                <Metric

                    label="TOTAL CPU"

                    value={cluster.total_cpu}

                />

                <Metric

                    label="USED CPU"

                    value={cluster.used_cpu}

                />

                <Metric

                    label="TOTAL MEMORY"

                    value={`${cluster.total_memory} GB`}

                />

                <Metric

                    label="AVAILABLE"

                    value={`${cluster.available_memory} GB`}

                />

            </div>

        </div>

    );

}

function Metric({

    label,

    value

}) {

    return (

        <div

            className="
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            p-4
            "

        >

            <p

                className="
                terminal
                text-xs
                tracking-[0.2em]
                text-slate-500
                "

            >

                {label}

            </p>

            <h2

                className="
                orbitron
                text-2xl
                text-cyan-300
                mt-2
                "

            >

                {value}

            </h2>

        </div>

    );

}

export default ClusterOverview;