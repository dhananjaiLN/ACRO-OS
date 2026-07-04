import { useEffect, useState } from "react";

import HostCard from "./HostCard";

import { getAllHosts } from "../../services/ClusterService";

function HostGrid() {

    const [hosts, setHosts] = useState([]);

    async function loadHosts() {

        try {

            const data = await getAllHosts();

            setHosts(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadHosts();

        const timer = setInterval(

            loadHosts,

            1000

        );

        return () => clearInterval(timer);

    }, []);

    return (

        <div

            className="
            h-[420px]
            overflow-y-auto
            pr-2
            space-y-4
            "

        >

            {

                hosts.map(host => (

                    <HostCard

                        key={host.host_id}

                        id={host.host_id}

                        cpu={host.cpu_utilization}

                        memory={host.memory_utilization}

                        status={host.status}

                        enabled={host.enabled}

                    />

                ))

            }

            {

                hosts.length === 0 && (

                    <div

                        className="
                        text-center
                        text-slate-500
                        py-10
                        "

                    >

                        No Compute Nodes Available

                    </div>

                )

            }

        </div>

    );

}

export default HostGrid;