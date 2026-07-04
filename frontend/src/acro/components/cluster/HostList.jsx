import HostCard from "./HostCard";

function HostList({

    hosts,

    selectedHost,

    onSelect

}) {

    return (

        <div

            className="
            h-[650px]
            overflow-y-auto
            pr-2
            space-y-4
            "

        >

            {

                hosts.map(host => (

                    <div

                        key={host.host_id}

                        onClick={() => onSelect(host)}

                        className={

                            selectedHost?.host_id === host.host_id

                                ? "ring-2 ring-cyan-400 rounded-xl"

                                : ""

                        }

                    >

                        <HostCard

                            id={host.host_id}

                            cpu={host.cpu_utilization}

                            memory={host.memory_utilization}

                            status={host.status}

                            enabled={host.enabled}

                        />

                    </div>

                ))

            }

        </div>

    );

}

export default HostList;